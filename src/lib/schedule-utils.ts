// CB Transit - Schedule utility functions

import { type Route, type Direction, type ScheduleTime } from "@/data/routes";
import { holidayDates, holidayServiceHours, type HolidayDate, type ServiceLevel } from "@/data/holidays";

export type ServiceType = "weekday" | "saturday" | "sunday_holiday";

/**
 * Parse a time string like "7:30" or "14:15" into minutes since midnight.
 * Returns NaN for invalid times (empty strings, "—" markers).
 */
export function parseTime(time: string): number {
  if (!time || !time.includes(":")) return NaN;
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return NaN;
  return hours * 60 + minutes;
}

/**
 * Format a 24h time string (e.g. "14:30") for display (e.g. "2:30 PM").
 * Returns "—" for invalid times.
 */
export function formatTime(time: string): string {
  if (!time || !time.includes(":")) return "—";
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return "—";
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

/**
 * Format a date to an ISO date string (YYYY-MM-DD) in local timezone.
 */
function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Check if a given date is a transit holiday. Returns the holiday info or null.
 */
export function isHoliday(date: Date): HolidayDate | null {
  const dateString = toLocalDateString(date);
  return holidayDates.find((h) => h.date === dateString) ?? null;
}

/**
 * Determine the service type for a given date.
 * Checks holidays first, then falls back to day of week.
 */
export function getServiceType(date: Date): ServiceType {
  const holiday = isHoliday(date);

  if (holiday) {
    const level: ServiceLevel = holiday.holiday.serviceLevel;
    if (level === "no_service" || level === "sunday_schedule") {
      return "sunday_holiday";
    }
    if (level === "reduced") {
      return "sunday_holiday";
    }
  }

  const day = date.getDay();
  if (day === 0) return "sunday_holiday";
  if (day === 6) return "saturday";
  return "weekday";
}

/**
 * Check whether service is running for a given date.
 * Returns false on no-service holidays and Sundays (most routes have no Sunday service).
 */
export function isServiceRunning(date: Date): boolean {
  const holiday = isHoliday(date);
  if (holiday && holiday.holiday.serviceLevel === "no_service") {
    return false;
  }
  return true;
}

/**
 * Get the schedule times for a direction based on the service type.
 * For sunday_holiday, filters times within holiday service hours.
 * Returns null if no service is available.
 */
export function getScheduleForServiceType(
  direction: Direction,
  serviceType: ServiceType,
): ScheduleTime[] | null {
  const schedule = direction.schedule;

  if (serviceType === "weekday") {
    return schedule.weekday;
  }

  if (serviceType === "saturday") {
    return schedule.saturday;
  }

  // sunday_holiday: use sunday schedule if available, otherwise filter saturday
  // to holiday service hours
  if (schedule.sunday && schedule.sunday.length > 0) {
    return schedule.sunday;
  }

  // Filter saturday schedule to holiday service hours (10 AM - 6 PM)
  const startMin = parseTime(holidayServiceHours.start);
  const endMin = parseTime(holidayServiceHours.end);

  const filtered = schedule.saturday.map((st) => ({
    stop: st.stop,
    times: st.times.filter((t) => {
      const mins = parseTime(t);
      return !isNaN(mins) && mins >= startMin && mins <= endMin;
    }),
  }));

  // If all stops have zero times after filtering, no service
  if (filtered.every((st) => st.times.length === 0)) {
    return null;
  }

  return filtered;
}

/**
 * Find the next departure time from a specific stop in a direction.
 * Returns the next time string, or null if no more departures today.
 */
export function getNextDeparture(
  direction: Direction,
  stopName: string,
  date: Date = new Date(),
): string | null {
  if (!isServiceRunning(date)) {
    return null;
  }

  const serviceType = getServiceType(date);
  const scheduleTimes = getScheduleForServiceType(direction, serviceType);

  if (!scheduleTimes) {
    return null;
  }

  const stopSchedule = scheduleTimes.find((st) => st.stop === stopName);
  if (!stopSchedule) {
    return null;
  }

  const nowMinutes = date.getHours() * 60 + date.getMinutes();

  for (const time of stopSchedule.times) {
    if (parseTime(time) > nowMinutes) {
      return time;
    }
  }

  return null;
}

/**
 * Get the current service status for a route: the next departure from
 * the first stop of its first direction.
 */
export function getCurrentService(
  route: Route,
  date: Date = new Date(),
): { direction: Direction; nextDeparture: string } | null {
  if (!isServiceRunning(date)) {
    return null;
  }

  for (const direction of route.directions) {
    const firstStop = direction.stops[0]?.name;
    if (!firstStop) continue;

    const next = getNextDeparture(direction, firstStop, date);
    if (next) {
      return { direction, nextDeparture: next };
    }
  }

  return null;
}

/**
 * Get all upcoming departures from a stop across all routes.
 */
export function getUpcomingDeparturesFromStop(
  routes: Route[],
  stopName: string,
  date: Date = new Date(),
  limit: number = 5,
): { route: Route; direction: Direction; time: string }[] {
  const results: { route: Route; direction: Direction; time: string; minutes: number }[] = [];

  if (!isServiceRunning(date)) {
    return [];
  }

  const serviceType = getServiceType(date);
  const nowMinutes = date.getHours() * 60 + date.getMinutes();

  for (const route of routes) {
    for (const direction of route.directions) {
      const scheduleTimes = getScheduleForServiceType(direction, serviceType);
      if (!scheduleTimes) continue;

      const stopSchedule = scheduleTimes.find((st) => st.stop === stopName);
      if (!stopSchedule) continue;

      for (const time of stopSchedule.times) {
        const mins = parseTime(time);
        if (mins > nowMinutes) {
          results.push({ route, direction, time, minutes: mins });
        }
      }
    }
  }

  results.sort((a, b) => a.minutes - b.minutes);
  return results.slice(0, limit).map(({ route, direction, time }) => ({ route, direction, time }));
}

export interface StopTimeContext {
  stop: string;
  lastDeparture: string | null;
  nextDeparture: string | null;
  minutesUntilNext: number | null;
}

/**
 * For each stop in a direction's schedule, find the most recent past departure
 * and the next upcoming departure relative to the given date/time.
 */
export function getStopSurroundingTimes(
  direction: Direction,
  date: Date = new Date(),
): StopTimeContext[] | null {
  if (!isServiceRunning(date)) {
    return null;
  }

  const serviceType = getServiceType(date);
  const scheduleTimes = getScheduleForServiceType(direction, serviceType);

  if (!scheduleTimes || scheduleTimes.length === 0) {
    return null;
  }

  const nowMinutes = date.getHours() * 60 + date.getMinutes();

  return scheduleTimes.map((st) => {
    let lastDeparture: string | null = null;
    let nextDeparture: string | null = null;

    for (const time of st.times) {
      const mins = parseTime(time);
      if (isNaN(mins)) continue;

      if (mins <= nowMinutes) {
        lastDeparture = time;
      } else if (nextDeparture === null) {
        nextDeparture = time;
      }
    }

    const minutesUntilNext = nextDeparture
      ? parseTime(nextDeparture) - nowMinutes
      : null;

    return { stop: st.stop, lastDeparture, nextDeparture, minutesUntilNext };
  });
}

/**
 * Get the direction with the soonest upcoming departure.
 * Also considers directions with an in-transit last run.
 * Falls back to directions[0].
 */
export function getActiveDirection(
  route: Route,
  date: Date = new Date(),
): { direction: Direction; directionIndex: number } {
  // First: direction with upcoming scheduled departures
  for (let i = 0; i < route.directions.length; i++) {
    const context = getStopSurroundingTimes(route.directions[i], date);
    if (context && context.some((s) => s.nextDeparture !== null)) {
      return { direction: route.directions[i], directionIndex: i };
    }
  }
  // Second: direction with a last run still in transit
  for (let i = 0; i < route.directions.length; i++) {
    const lastRun = getLastRunStatus(route.directions[i], date);
    if (lastRun) {
      return { direction: route.directions[i], directionIndex: i };
    }
  }
  return { direction: route.directions[0], directionIndex: 0 };
}

export interface LastRunStop {
  stop: string;
  time: string;
  minutes: number;
  isPast: boolean;
}

export interface LastRunInfo {
  isInTransit: boolean;
  currentStopIndex: number;
  stops: LastRunStop[];
}

/**
 * Detect if the final run of the day is still in transit.
 * Compares current time against the last scheduled departure at each stop.
 * Returns info about the bus position, or null if no run is active.
 */
export function getLastRunStatus(
  direction: Direction,
  date: Date = new Date(),
): LastRunInfo | null {
  if (!isServiceRunning(date)) return null;

  const serviceType = getServiceType(date);
  const scheduleTimes = getScheduleForServiceType(direction, serviceType);
  if (!scheduleTimes || scheduleTimes.length === 0) return null;

  const nowMinutes = date.getHours() * 60 + date.getMinutes();

  // Extract the last valid time from each stop (= the final run)
  const lastRunStops: LastRunStop[] = [];
  for (const st of scheduleTimes) {
    const validTimes = st.times.filter((t) => !isNaN(parseTime(t)));
    const lastTime = validTimes[validTimes.length - 1];
    if (!lastTime) continue;
    const mins = parseTime(lastTime);
    lastRunStops.push({
      stop: st.stop,
      time: lastTime,
      minutes: mins,
      isPast: mins <= nowMinutes,
    });
  }

  if (lastRunStops.length < 2) return null;

  const firstDeparture = lastRunStops[0].minutes;
  const lastArrival = lastRunStops[lastRunStops.length - 1].minutes;
  // Buffer: allow 10 minutes past the last stop for the bus to finish
  const buffer = 10;

  if (nowMinutes < firstDeparture || nowMinutes > lastArrival + buffer) {
    return null;
  }

  // Find the stop the bus just passed (last stop with time <= now)
  let currentStopIndex = 0;
  for (let i = 0; i < lastRunStops.length; i++) {
    if (lastRunStops[i].minutes <= nowMinutes) {
      currentStopIndex = i;
    }
  }

  return { isInTransit: true, currentStopIndex, stops: lastRunStops };
}

/**
 * Get all routes that serve a given stop.
 */
export function getRoutesForStop(
  allRoutes: Route[],
  stopName: string,
): { route: Route; direction: Direction }[] {
  const results: { route: Route; direction: Direction }[] = [];

  for (const route of allRoutes) {
    for (const direction of route.directions) {
      if (direction.stops.some((s) => s.name === stopName)) {
        results.push({ route, direction });
      }
    }
  }

  return results;
}
