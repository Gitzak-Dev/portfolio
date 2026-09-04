#!/bin/bash
# STACKSPACER — Phase 6B + 6C Wave 1 Production Deployment Script
# Execute this via SSH to: u318730766@stackspacer.com
# Production root: /home/u318730766/domains/stackspacer.com/nodejs/

set -e

PROD_ROOT="/home/u318730766/domains/stackspacer.com/nodejs"
BACKUP_ROOT="/home/u318730766/backups"
TIMESTAMP=$(date -u +%Y%m%d-%H%M%S)
BACKUP_DIR="${BACKUP_ROOT}/stackspacer-us-city-wave1-${TIMESTAMP}"

echo "=== STACKSPACER WAVE 1 DEPLOYMENT ==="
echo "Timestamp: ${TIMESTAMP}"
echo "Backup dir: ${BACKUP_DIR}"

# 1. Create backup directory
mkdir -p "${BACKUP_DIR}"

# 2. Backup current production source (files being replaced)
echo "[1/6] Creating backup..."
cd "${PROD_ROOT}"
tar -czf "${BACKUP_DIR}/source-before-${TIMESTAMP}.tar.gz" \
  app/layout.tsx \
  app/page.tsx \
  app/services/web-development/page.tsx \
  app/services/mobile-app-development/page.tsx \
  app/services/ai-automation/page.tsx \
  app/services/machine-learning/page.tsx \
  app/sitemap.ts \
  components/Footer/Footer.tsx

# 3. Backup current .next build
echo "[2/6] Backing up current .next build..."
tar -czf "${BACKUP_DIR}/next-build-before-${TIMESTAMP}.tar.gz" .next/ 2>/dev/null || true

echo "Backup saved to: ${BACKUP_DIR}"

# 4. Deploy new source files (run from local machine via SCP)
# Upload these files from local source to production:
#   app/locations/page.tsx
#   app/locations/LocationsPage.module.css
#   app/locations/[slug]/page.tsx
#   app/locations/[slug]/CityPage.module.css
#   data/locations.ts
#   app/layout.tsx (Phase 6B)
#   app/page.tsx (Phase 6B)
#   app/services/web-development/page.tsx (Phase 6B)
#   app/services/mobile-app-development/page.tsx (Phase 6B)
#   app/services/ai-automation/page.tsx (Phase 6B)
#   app/services/machine-learning/page.tsx (Phase 6B)
#   app/sitemap.ts (Phase 6B+6C)
#   components/Footer/Footer.tsx (Phase 6B+6C)
echo "[3/6] Upload source files via SCP (run from local machine):"
echo "  scp app/locations/page.tsx       u318730766@stackspacer.com:${PROD_ROOT}/app/locations/page.tsx"
echo "  scp app/locations/LocationsPage.module.css u318730766@stackspacer.com:${PROD_ROOT}/app/locations/LocationsPage.module.css"
echo "  scp 'app/locations/[slug]/page.tsx'      u318730766@stackspacer.com:${PROD_ROOT}/app/locations/[slug]/page.tsx"
echo "  scp 'app/locations/[slug]/CityPage.module.css' u318730766@stackspacer.com:${PROD_ROOT}/app/locations/[slug]/CityPage.module.css"
echo "  scp data/locations.ts            u318730766@stackspacer.com:${PROD_ROOT}/data/locations.ts"
echo "  scp app/layout.tsx               u318730766@stackspacer.com:${PROD_ROOT}/app/layout.tsx"
echo "  scp app/page.tsx                 u318730766@stackspacer.com:${PROD_ROOT}/app/page.tsx"
echo "  scp app/services/web-development/page.tsx     u318730766@stackspacer.com:${PROD_ROOT}/app/services/web-development/page.tsx"
echo "  scp app/services/mobile-app-development/page.tsx u318730766@stackspacer.com:${PROD_ROOT}/app/services/mobile-app-development/page.tsx"
echo "  scp app/services/ai-automation/page.tsx       u318730766@stackspacer.com:${PROD_ROOT}/app/services/ai-automation/page.tsx"
echo "  scp app/services/machine-learning/page.tsx    u318730766@stackspacer.com:${PROD_ROOT}/app/services/machine-learning/page.tsx"
echo "  scp app/sitemap.ts               u318730766@stackspacer.com:${PROD_ROOT}/app/sitemap.ts"
echo "  scp components/Footer/Footer.tsx u318730766@stackspacer.com:${PROD_ROOT}/components/Footer/Footer.tsx"
echo "IMPORTANT: Do NOT upload these unrelated files:"
echo "  0)console.log(c.slice(n"
echo "  hani-dialerpad/"
echo "  opencode.json"
echo "  test.txt"
echo "  docs/phase6/"

# 5. Production build
echo "[4/6] Running production build..."
cd "${PROD_ROOT}"
export NODE_ENV=production
export NODE_VERSION=22
npm run build

# 6. Restart Passenger
echo "[5/6] Restarting Passenger..."
touch "${PROD_ROOT}/tmp/restart.txt"

# 7. Verify
echo "[6/6] Verifying deployment..."
echo "Check these URLs return HTTP 200:"
echo "  GET https://stackspacer.com/"
echo "  GET https://stackspacer.com/services"
echo "  GET https://stackspacer.com/services/web-development"
echo "  GET https://stackspacer.com/services/mobile-app-development"
echo "  GET https://stackspacer.com/services/ai-automation"
echo "  GET https://stackspacer.com/services/machine-learning"
echo "  GET https://stackspacer.com/locations"
echo "  GET https://stackspacer.com/locations/new-york-city"
echo "  GET https://stackspacer.com/locations/los-angeles"
echo "  GET https://stackspacer.com/locations/chicago"
echo "  GET https://stackspacer.com/locations/houston"
echo "  GET https://stackspacer.com/locations/phoenix"
echo "  GET https://stackspacer.com/locations/philadelphia"
echo "  GET https://stackspacer.com/locations/san-francisco"
echo "  GET https://stackspacer.com/locations/san-jose"
echo "  GET https://stackspacer.com/locations/seattle"
echo "  GET https://stackspacer.com/locations/dallas"
echo "  GET https://stackspacer.com/locations/austin"
echo "  GET https://stackspacer.com/locations/miami"
echo "  GET https://stackspacer.com/sitemap.xml"
echo "  GET https://stackspacer.com/robots.txt"
echo "  GET https://stackspacer.com/admin (should require auth)"
echo ""
echo "Verify sitemap.xml contains exactly 34 public URLs."
echo "Verify /locations pages contain neutral delivery wording."
echo "Verify /locations/austin does NOT mention Austin address."

echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo "Backup location: ${BACKUP_DIR}"
echo "Rollback: restore from ${BACKUP_DIR}/source-before-${TIMESTAMP}.tar.gz and ${BACKUP_DIR}/next-build-before-${TIMESTAMP}.tar.gz"
