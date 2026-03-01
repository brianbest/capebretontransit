#!/bin/bash
# Download all CBRM Transit schedule PDFs
# Usage: ./scripts/download-pdfs.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PDF_DIR="$SCRIPT_DIR/pdfs"

mkdir -p "$PDF_DIR"

echo "Downloading CBRM Transit schedule PDFs..."

# Route 1 - Sydney to Glace Bay (bidirectional)
curl -sL -o "$PDF_DIR/route-1-outbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-1-Schedule-Sydney-to-Glace-Bay.pdf"
echo "  Downloaded: Route 1 outbound"
curl -sL -o "$PDF_DIR/route-1-inbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-1-Schedule-Glace-Bay-to-Sydney.pdf"
echo "  Downloaded: Route 1 inbound"

# Route 2 - Express (bidirectional)
curl -sL -o "$PDF_DIR/route-2-outbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-2-Schedule-Sydney-to-Glace-Bay-Express.pdf"
echo "  Downloaded: Route 2 outbound"
curl -sL -o "$PDF_DIR/route-2-inbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-2-Schedule-Glace-Bay-to-Sydney-Express.pdf"
echo "  Downloaded: Route 2 inbound"

# Route 3 - New Aberdeen
curl -sL -o "$PDF_DIR/route-3-loop.pdf" "https://cbrm.ns.ca/wp-content/uploads/2025/11/Route-3-Schedule.pdf"
echo "  Downloaded: Route 3"

# Route 4 - Steele's Hill
curl -sL -o "$PDF_DIR/route-4-loop.pdf" "https://cbrm.ns.ca/wp-content/uploads/2025/11/Route-4-Schedule.pdf"
echo "  Downloaded: Route 4"

# Route 5 - Sydney to Sydney Mines (bidirectional)
curl -sL -o "$PDF_DIR/route-5-outbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-5-Schedule-Sydney-to-Sydney-Mines.pdf"
echo "  Downloaded: Route 5 outbound"
curl -sL -o "$PDF_DIR/route-5-inbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-5-Schedule-Sydney-Mines-to-Sydney.pdf"
echo "  Downloaded: Route 5 inbound"

# Route 6 - Westmount
curl -sL -o "$PDF_DIR/route-6-loop.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-6-Schedule.pdf"
echo "  Downloaded: Route 6"

# Route 7 - Howie Centre
curl -sL -o "$PDF_DIR/route-7-loop.pdf" "https://cbrm.ns.ca/wp-content/uploads/2025/11/Route-7-Schedule.pdf"
echo "  Downloaded: Route 7"

# Route 8 - Whitney Pier
curl -sL -o "$PDF_DIR/route-8-loop.pdf" "https://cbrm.ns.ca/wp-content/uploads/2025/11/Route-8-Schedule.pdf"
echo "  Downloaded: Route 8"

# Route 9 - Sydney to New Waterford (bidirectional)
curl -sL -o "$PDF_DIR/route-9-outbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-9-Schedule-Sydney-to-New-Waterford.pdf"
echo "  Downloaded: Route 9 outbound"
curl -sL -o "$PDF_DIR/route-9-inbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-9-Schedule-New-Waterford-to-Sydney.pdf"
echo "  Downloaded: Route 9 inbound"

# Route 10 - Alexandra Street
curl -sL -o "$PDF_DIR/route-10-loop.pdf" "https://cbrm.ns.ca/wp-content/uploads/2025/11/Route-10-Schedule.pdf"
echo "  Downloaded: Route 10"

# Route 11 - Ashby
curl -sL -o "$PDF_DIR/route-11-loop.pdf" "https://cbrm.ns.ca/wp-content/uploads/2025/11/Route-11-Schedule.pdf"
echo "  Downloaded: Route 11"

# Route 12 - Sydney/Membertou/Sydney River (bidirectional)
curl -sL -o "$PDF_DIR/route-12-outbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-12-Sydney-to-Membertou-to-Sydney-River.pdf"
echo "  Downloaded: Route 12 outbound"
curl -sL -o "$PDF_DIR/route-12-inbound.pdf" "https://cbrm.ns.ca/wp-content/uploads/2026/02/Route-12-Sydney-River-to-Membertou-to-Sydney.pdf"
echo "  Downloaded: Route 12 inbound"

# Route 13 - George Street
curl -sL -o "$PDF_DIR/route-13-loop.pdf" "https://cbrm.ns.ca/wp-content/uploads/2025/11/Route-13-Schedule.pdf"
echo "  Downloaded: Route 13"

echo ""
echo "All 20 PDFs downloaded to $PDF_DIR"
ls -la "$PDF_DIR"
