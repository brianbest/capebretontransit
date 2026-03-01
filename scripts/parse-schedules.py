#!/usr/bin/env python3
"""
Parse CBRM Transit schedule PDFs and generate routes.ts

Usage:
  python3 scripts/parse-schedules.py              # Parse all PDFs and generate routes.ts
  python3 scripts/parse-schedules.py --extract     # Extract raw data to JSON for review
  python3 scripts/parse-schedules.py --route 1     # Parse only route 1
"""

import json
import os
import re
import sys
from pathlib import Path

import pdfplumber

SCRIPT_DIR = Path(__file__).parent
PDF_DIR = SCRIPT_DIR / "pdfs"
CONFIG_FILE = SCRIPT_DIR / "routes-config.json"
OUTPUT_JSON = SCRIPT_DIR / "extracted-schedules.json"
OUTPUT_TS = SCRIPT_DIR.parent / "src" / "data" / "routes.ts"


def decode_cid(text: str) -> str:
    """Decode CID-encoded characters: (cid:XX) -> chr(XX + 31)"""
    if not text:
        return text or ""

    def replace_cid(m):
        cid = int(m.group(1))
        ch = chr(cid + 31)
        if ord(ch) > 126:
            return "'"  # Most common non-ASCII: apostrophe
        if ord(ch) < 32:
            return ""
        return ch

    return re.sub(r'\(cid:(\d+)\)', replace_cid, text)


def detect_schedule_type(page_text: str) -> str:
    """Detect the schedule type from page text."""
    if not page_text:
        return "weekday"

    # Decode CID FIRST on original text, THEN uppercase
    decoded = decode_cid(page_text).upper()

    if "SUNDAY" in decoded:
        if "MONDAY" in decoded or "SATURDAY" in decoded:
            return "weekday_and_sunday"
        return "sunday"
    if "SATURDAY ONLY" in decoded:
        return "saturday"
    if "SATURDAY" in decoded:
        if "MONDAY" in decoded or "FRIDAY" in decoded:
            return "weekday_and_saturday"
        return "saturday"
    if "MONDAY" in decoded or "FRIDAY" in decoded:
        return "weekday"

    return "weekday"


def get_stop_column_ranges(header: list) -> list[tuple[int, int]]:
    """Identify column ranges for each stop based on non-empty header cells.

    Returns list of (start, end) tuples where start is inclusive and end exclusive.
    Each range corresponds to one stop in the schedule table.
    """
    stop_starts = []
    for i, cell in enumerate(header):
        if cell is not None and isinstance(cell, str) and cell.strip():
            stop_starts.append(i)

    ranges = []
    for i, start in enumerate(stop_starts):
        end = stop_starts[i + 1] if i + 1 < len(stop_starts) else len(header)
        ranges.append((start, end))

    return ranges


def extract_times_from_row(row: list, num_stops: int, stop_col_ranges: list = None) -> list[list[str]]:
    """Extract time values from a table row, handling split cells, CID encoding,
    partial service (*** markers), and double-trip rows (newline-separated times).

    Uses stop_col_ranges (from header analysis) to group cells by stop,
    which handles PDFs where times are split across multiple columns.

    Returns a list of trip lists. Each trip list has num_stops entries.
    Empty list means no service at all (all-*** row).
    Uses '—' for stops with no service on a given trip.
    """
    # Decode all cells
    all_decoded = []
    for cell in row:
        if cell is None:
            all_decoded.append('')
        else:
            all_decoded.append(decode_cid(str(cell)))

    # Group cells by stop using column ranges
    stop_groups = None
    if stop_col_ranges and len(stop_col_ranges) >= num_stops:
        stop_groups = []
        for start, end in stop_col_ranges[:num_stops]:
            parts = []
            for i in range(start, min(end, len(all_decoded))):
                parts.append(all_decoded[i])
            stop_groups.append(''.join(parts))

    # Full concatenation for overall checks
    full_text = ''.join(re.sub(r'\s+', '', c) for c in all_decoded)

    # Check all-*** (no service at all)
    all_times_in_full = re.findall(r'\d{1,2}:\d{2}', full_text)
    if not all_times_in_full and '*' in full_text:
        return []

    # No times at all, skip
    if not all_times_in_full:
        return []

    # Check for double-trip rows (stop groups contain newline-separated times)
    if stop_groups:
        has_newline_times = False
        for group in stop_groups:
            lines = group.strip().split('\n')
            if len(lines) >= 2:
                times_per_line = [re.findall(r'\d{1,2}:\d{2}', l) for l in lines]
                if all(len(t) >= 1 for t in times_per_line[:2]):
                    has_newline_times = True
                    break

        if has_newline_times:
            trip_a = []
            trip_b = []
            for group in stop_groups:
                lines = group.strip().split('\n')
                if len(lines) >= 2:
                    a_times = re.findall(r'\d{1,2}:\d{2}', lines[0])
                    b_times = re.findall(r'\d{1,2}:\d{2}', lines[1])
                    trip_a.append(a_times[0] if a_times else '—')
                    trip_b.append(b_times[0] if b_times else '—')
                else:
                    t = re.findall(r'\d{1,2}:\d{2}', group)
                    trip_a.append(t[0] if t else '—')
                    trip_b.append('—')

            result = []
            if len(trip_a) == num_stops:
                result.append(trip_a)
            if len(trip_b) == num_stops:
                result.append(trip_b)
            return result

    # Check for partial service (*** mixed with times)
    has_asterisks = '***' in full_text

    if has_asterisks and stop_groups:
        result = []
        for group in stop_groups:
            cleaned = re.sub(r'\s+', '', group)
            if re.match(r'^\*+$', cleaned):
                result.append('—')
            else:
                t = re.findall(r'\d{1,2}:\d{2}', cleaned)
                if t:
                    result.append(t[0])
                else:
                    result.append('—')

        if len(result) == num_stops:
            return [result]
        return []

    # Stop-group-based extraction: preserves positional mapping
    if stop_groups:
        result = []
        for group in stop_groups:
            cleaned = re.sub(r'\s+', '', group)
            t = re.findall(r'\d{1,2}:\d{2}', cleaned)
            if t:
                result.append(t[0])
            else:
                result.append('')

        valid_count = sum(1 for r in result if r)
        if valid_count >= 2:
            return [result]

    # Fallback: concatenate all cells, find times (no positional info)
    if len(all_times_in_full) == num_stops:
        return [all_times_in_full]
    if len(all_times_in_full) == 2 * num_stops:
        # Interleaved double trip
        trip_a = [all_times_in_full[i * 2] for i in range(num_stops)]
        trip_b = [all_times_in_full[i * 2 + 1] for i in range(num_stops)]
        return [trip_a, trip_b]
    if len(all_times_in_full) > num_stops:
        return [all_times_in_full[:num_stops]]
    if len(all_times_in_full) > 0:
        return [all_times_in_full + [''] * (num_stops - len(all_times_in_full))]
    return []


def filter_garbage_trips(trips: list) -> list:
    """Remove trips where too few stops have valid times.

    Garbage rows from PDF map overlays typically have 0-1 valid times.
    Partial service rows have at least 2-3 valid times.
    """
    filtered = []
    for trip in trips:
        valid_count = sum(1 for t in trip if re.match(r'\d{1,2}:\d{2}$', t))
        if valid_count >= 2:
            filtered.append(trip)
    return filtered


def convert_to_24h(times_12h: list[str]) -> list[str]:
    """Convert sequential 12-hour times to 24-hour format.

    Assumes times go from morning to evening (transit operates ~6 AM to ~10 PM).
    Handles '—' markers for no-service by passing them through.
    """
    if not times_12h:
        return []

    result = []
    prev_minutes = 0

    for t in times_12h:
        if t == '—' or t == '' or not re.match(r'\d{1,2}:\d{2}$', t):
            result.append(t)
            continue

        h, m = int(t.split(':')[0]), int(t.split(':')[1])

        if h == 12:
            candidates = [12, 0]
        else:
            candidates = [h, h + 12]

        # Pick the smallest candidate >= previous time
        chosen = None
        for c in sorted(candidates):
            total = c * 60 + m
            if total >= prev_minutes:
                chosen = c
                break

        if chosen is None:
            chosen = max(candidates)

        prev_minutes = chosen * 60 + m
        result.append(f"{chosen}:{m:02d}")

    return result


def build_schedule_from_trips(trips: list, stop_names: list) -> list[dict]:
    """Convert trip rows into per-stop schedule times with 24h conversion."""
    num_stops = len(stop_names)
    if not trips:
        return []

    # Transpose: rows (trips) -> columns (stops)
    columns = []
    for col_idx in range(num_stops):
        col_times = []
        for trip in trips:
            if col_idx < len(trip) and trip[col_idx]:
                col_times.append(trip[col_idx])
            else:
                col_times.append('')
        columns.append(col_times)

    # Convert each column to 24h (preserving '—' markers for no-service)
    schedule_times = []
    for col_idx, col in enumerate(columns):
        converted = convert_to_24h(col)
        schedule_times.append({
            'stop': stop_names[col_idx],
            'times': converted,
        })

    return schedule_times


def parse_direction_pdf(pdf_path: str, direction_config: dict, route_id: str):
    """Parse a single direction's PDF file."""
    if not os.path.exists(pdf_path):
        print(f"  WARNING: PDF not found: {pdf_path}")
        return None

    config_stops = direction_config.get('stops', [])
    page_types = direction_config.get('pages', {})
    num_stops_override = direction_config.get('num_stops_override')

    pdf = pdfplumber.open(pdf_path)

    weekday_trips = []
    saturday_trips = []
    sunday_trips = []

    stop_names = config_stops if config_stops else None
    num_stops = num_stops_override or (len(config_stops) if config_stops else None)

    for page_idx, page in enumerate(pdf.pages):
        text = page.extract_text() or ""

        # Determine schedule type
        if str(page_idx) in page_types:
            sched_type = page_types[str(page_idx)]
        else:
            sched_type = detect_schedule_type(text)

        tables = page.extract_tables()
        if not tables:
            continue

        for table_idx, table in enumerate(tables):
            if not table or len(table) < 2:
                continue

            header = table[0]

            # Compute column ranges for each stop based on header
            stop_col_ranges = get_stop_column_ranges(header)

            # If we don't have stop count yet, derive from header
            if num_stops is None:
                num_stops = len(stop_col_ranges)

            if num_stops == 0:
                continue

            # Parse each data row
            found_trips = False
            for row_idx in range(1, len(table)):
                row = table[row_idx]
                trip_lists = extract_times_from_row(row, num_stops, stop_col_ranges)

                if not trip_lists:
                    continue

                found_trips = True
                for trip in trip_lists:
                    if sched_type in ('weekday', 'weekday_and_saturday', 'weekday_and_sunday'):
                        weekday_trips.append(trip)
                    elif sched_type == 'saturday':
                        saturday_trips.append(trip)
                    elif sched_type == 'sunday':
                        sunday_trips.append(trip)

            # Only use the first valid table per page
            if found_trips:
                break

        # Handle combined weekday+saturday
        if sched_type == 'weekday_and_saturday':
            saturday_trips = list(weekday_trips)

        # Handle Sunday from text (for pages like Route 1 with both in one page)
        if sched_type == 'weekday_and_sunday' and num_stops:
            in_sunday = False
            for line in text.split('\n'):
                if 'SUNDAY' in line.upper() or 'Sunday' in line:
                    in_sunday = True
                    continue
                if in_sunday:
                    times = re.findall(r'(\d{1,2}:\d{2})', line)
                    if times and len(times) >= num_stops:
                        sunday_trips.append(times[:num_stops])

    pdf.close()

    # Derive stop names if not provided
    if not stop_names and num_stops:
        stop_names = [f"Stop {i+1}" for i in range(num_stops)]

    # Filter garbage trips (broken rows from PDF map overlays)
    weekday_trips = filter_garbage_trips(weekday_trips)
    saturday_trips = filter_garbage_trips(saturday_trips)
    sunday_trips = filter_garbage_trips(sunday_trips)

    # Build schedules
    weekday_schedule = build_schedule_from_trips(weekday_trips, stop_names) if weekday_trips else None
    saturday_schedule = build_schedule_from_trips(saturday_trips, stop_names) if saturday_trips else None
    sunday_schedule = build_schedule_from_trips(sunday_trips, stop_names) if sunday_trips else None

    return {
        'stops': [{'name': s} for s in (stop_names or [])],
        'stop_names': stop_names or [],
        'weekday': weekday_schedule,
        'saturday': saturday_schedule,
        'sunday': sunday_schedule,
    }


def generate_routes_ts(all_routes: dict, config: dict) -> str:
    """Generate the routes.ts TypeScript file content."""
    lines = []
    lines.append("// CB Transit - CBRM Transit Route Data")
    lines.append("// Extracted from official CBRM transit schedule PDFs")
    lines.append("// Source: https://cbrm.ns.ca/transportation/transit-cape-breton/routes-schedules/")
    lines.append("")
    lines.append("export interface Stop {")
    lines.append("  name: string;")
    lines.append("}")
    lines.append("")
    lines.append("export interface ScheduleTime {")
    lines.append("  stop: string;")
    lines.append("  times: string[];")
    lines.append("}")
    lines.append("")
    lines.append("export interface Schedule {")
    lines.append("  weekday: ScheduleTime[];")
    lines.append("  saturday: ScheduleTime[];")
    lines.append("  sunday?: ScheduleTime[];")
    lines.append("}")
    lines.append("")
    lines.append("export interface Direction {")
    lines.append("  id: string;")
    lines.append("  name: string;")
    lines.append("  nameKey: string;")
    lines.append("  schedule: Schedule;")
    lines.append("  stops: Stop[];")
    lines.append("}")
    lines.append("")
    lines.append("export interface Route {")
    lines.append("  id: number;")
    lines.append("  name: string;")
    lines.append("  nameKey: string;")
    lines.append("  description: string;")
    lines.append("  descriptionKey: string;")
    lines.append("  color: string;")
    lines.append("  directions: Direction[];")
    lines.append("  mapUrl?: string;")
    lines.append("}")
    lines.append("")
    lines.append("export const routes: Route[] = [")

    route_ids = sorted(all_routes.keys(), key=int)

    for route_id in route_ids:
        route_data = all_routes[route_id]
        route_config = config[route_id]

        lines.append(f"  // Route {route_id}: {route_config['name']}")
        lines.append("  {")
        lines.append(f"    id: {route_id},")
        lines.append(f"    name: {json.dumps(route_config['name'])},")
        lines.append(f"    nameKey: {json.dumps(route_config['nameKey'])},")
        lines.append(f"    description: {json.dumps(route_config['description'])},")
        lines.append(f"    descriptionKey: {json.dumps(route_config['descriptionKey'])},")
        lines.append(f"    color: {json.dumps(route_config['color'])},")

        if route_config.get('mapUrl'):
            lines.append(f"    mapUrl: {json.dumps(route_config['mapUrl'])},")

        lines.append("    directions: [")

        for dir_config in route_config['directions']:
            dir_id = dir_config['id']
            dir_data = route_data.get('directions', {}).get(dir_id, {})

            lines.append("      {")
            lines.append(f"        id: {json.dumps(dir_id)},")
            lines.append(f"        name: {json.dumps(dir_config['name'])},")
            lines.append(f"        nameKey: {json.dumps(dir_config['nameKey'])},")

            # Stops
            stops = dir_data.get('stops', [])
            lines.append("        stops: [")
            for stop in stops:
                lines.append(f"          {{ name: {json.dumps(stop['name'])} }},")
            lines.append("        ],")

            # Schedule
            lines.append("        schedule: {")

            weekday = dir_data.get('weekday') or []
            lines.append("          weekday: [")
            for st in weekday:
                times_str = ", ".join(f'"{t}"' for t in st['times'])
                lines.append(f"            {{ stop: {json.dumps(st['stop'])}, times: [{times_str}] }},")
            lines.append("          ],")

            saturday = dir_data.get('saturday') or []
            lines.append("          saturday: [")
            for st in saturday:
                times_str = ", ".join(f'"{t}"' for t in st['times'])
                lines.append(f"            {{ stop: {json.dumps(st['stop'])}, times: [{times_str}] }},")
            lines.append("          ],")

            sunday = dir_data.get('sunday')
            if sunday:
                lines.append("          sunday: [")
                for st in sunday:
                    times_str = ", ".join(f'"{t}"' for t in st['times'])
                    lines.append(f"            {{ stop: {json.dumps(st['stop'])}, times: [{times_str}] }},")
                lines.append("          ],")

            lines.append("        },")
            lines.append("      },")

        lines.append("    ],")
        lines.append("  },")
        lines.append("")

    lines.append("];")
    lines.append("")
    lines.append("export function getRouteById(id: number): Route | undefined {")
    lines.append("  return routes.find((route) => route.id === id);")
    lines.append("}")
    lines.append("")
    lines.append("export function getAllStopNames(): string[] {")
    lines.append("  const stopNames = new Set<string>();")
    lines.append("  for (const route of routes) {")
    lines.append("    for (const direction of route.directions) {")
    lines.append("      for (const stop of direction.stops) {")
    lines.append("        stopNames.add(stop.name);")
    lines.append("      }")
    lines.append("    }")
    lines.append("  }")
    lines.append("  return Array.from(stopNames).sort();")
    lines.append("}")
    lines.append("")

    return "\n".join(lines)


def main():
    extract_only = "--extract" in sys.argv
    route_filter = None
    if "--route" in sys.argv:
        idx = sys.argv.index("--route")
        if idx + 1 < len(sys.argv):
            route_filter = sys.argv[idx + 1]

    with open(CONFIG_FILE) as f:
        config = json.load(f)

    all_routes = {}

    for route_id, route_config in sorted(config.items(), key=lambda x: int(x[0])):
        if route_filter and route_id != route_filter:
            continue

        print(f"Processing Route {route_id}: {route_config['name']}")
        route_result = {'directions': {}}

        for dir_config in route_config['directions']:
            dir_id = dir_config['id']
            filename = dir_config['filename']
            pdf_path = str(PDF_DIR / filename)

            print(f"  Direction: {dir_config['name']} ({filename})")

            result = parse_direction_pdf(pdf_path, dir_config, route_id)

            if result:
                route_result['directions'][dir_id] = result

                if result['weekday']:
                    num_trips = len(result['weekday'][0]['times']) if result['weekday'] else 0
                    num_stops = len(result['stop_names'])
                    print(f"    Weekday: {num_trips} trips, {num_stops} stops")
                    print(f"    Stops: {', '.join(result['stop_names'])}")
                    # Print first/last times for verification
                    if result['weekday'] and result['weekday'][0]['times']:
                        first = result['weekday'][0]['times'][0]
                        last = result['weekday'][0]['times'][-1]
                        print(f"    First trip: {first}, Last trip: {last}")
                if result['saturday']:
                    num_trips = len(result['saturday'][0]['times']) if result['saturday'] else 0
                    print(f"    Saturday: {num_trips} trips")
                if result['sunday']:
                    num_trips = len(result['sunday'][0]['times']) if result['sunday'] else 0
                    print(f"    Sunday: {num_trips} trips")
                if not result['weekday'] and not result['saturday']:
                    print(f"    WARNING: No schedule data extracted!")
            else:
                print(f"    ERROR: Could not parse PDF")

        all_routes[route_id] = route_result
        print()

    print(f"Saving extracted data to {OUTPUT_JSON}")
    with open(OUTPUT_JSON, 'w') as f:
        json.dump(all_routes, f, indent=2)

    if extract_only:
        print("Extract mode: skipping routes.ts generation")
        return

    print(f"Generating {OUTPUT_TS}")
    ts_content = generate_routes_ts(all_routes, config)
    with open(OUTPUT_TS, 'w') as f:
        f.write(ts_content)

    print("Done!")


if __name__ == "__main__":
    main()
