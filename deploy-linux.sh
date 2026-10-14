#!/bin/bash
# STACKSPACER — Linux Build Deployment Script
# Run this on the production server after downloading the build artifact
# Usage: bash deploy-linux.sh <artifact.tar.gz>

set -e

PROD_ROOT="/home/u318730766/domains/stackspacer.com/nodejs"
BACKUP_ROOT="/home/u318730766/backups"
TIMESTAMP=$(date -u +%Y%m%d-%H%M%S)
ARTIFACT="${1:?Usage: bash deploy-linux.sh <artifact.tar.gz>}"

echo "=== STACKSPACER LINUX BUILD DEPLOYMENT ==="
echo "Timestamp: ${TIMESTAMP}"
echo "Artifact: ${ARTIFACT}"
echo "Production root: ${PROD_ROOT}"

# Validate artifact exists
if [ ! -f "${ARTIFACT}" ]; then
  echo "ERROR: Artifact not found: ${ARTIFACT}"
  exit 1
fi

# Create backup directory
BACKUP_DIR="${BACKUP_ROOT}/stackspacer-linux-build-rollback-${TIMESTAMP}"
mkdir -p "${BACKUP_DIR}"
echo "[1/5] Creating rollback backup..."

# Backup current .next build
if [ -d "${PROD_ROOT}/.next" ]; then
  tar -czf "${BACKUP_DIR}/next-build-before-${TIMESTAMP}.tar.gz" -C "${PROD_ROOT}" .next/ 2>/dev/null || true
  echo "  Backed up .next/"
fi

# Backup current prisma client binaries
if [ -d "${PROD_ROOT}/node_modules/.prisma/client" ]; then
  tar -czf "${BACKUP_DIR}/prisma-client-before-${TIMESTAMP}.tar.gz" -C "${PROD_ROOT}" node_modules/.prisma/client/ 2>/dev/null || true
  echo "  Backed up prisma client"
fi

echo "  Backup saved to: ${BACKUP_DIR}"

# Extract new build
echo "[2/5] Extracting new build..."
cd "${PROD_ROOT}"

# Extract .next directory
tar -xzpf "${ARTIFACT}" --strip-components=2 -C . .next/ 2>/dev/null || \
tar -xzpf "${ARTIFACT}" -C . 2>/dev/null || {
  # Try alternate extraction if tar structure differs
  TEMP_DIR=$(mktemp -d)
  tar -xzf "${ARTIFACT}" -C "${TEMP_DIR}"
  cp -r "${TEMP_DIR}"/.next "${PROD_ROOT}/.next" 2>/dev/null || true
  rm -rf "${TEMP_DIR}"
}

echo "  .next/ extracted"

# Update Prisma client binaries (Linux-only)
echo "[3/5] Updating Prisma client binaries..."
TEMP_DIR=$(mktemp -d)
tar -xzf "${ARTIFACT}" -C "${TEMP_DIR}" 2>/dev/null || true

# Copy Linux Prisma binaries
if [ -d "${TEMP_DIR}/node_modules/.prisma/client" ]; then
  mkdir -p "${PROD_ROOT}/node_modules/.prisma/client"
  cp "${TEMP_DIR}/node_modules/.prisma/client/query_engine-linux*".node \
     "${PROD_ROOT}/node_modules/.prisma/client/" 2>/dev/null || true
  echo "  Linux Prisma binaries installed"
fi

if [ -d "${TEMP_DIR}/node_modules/@prisma/client" ]; then
  rsync -av --delete "${TEMP_DIR}/node_modules/@prisma/client/" \
    "${PROD_ROOT}/node_modules/@prisma/client/" 2>/dev/null || {
    # Fallback: copy recursively
    rm -rf "${PROD_ROOT}/node_modules/@prisma/client/"
    cp -r "${TEMP_DIR}/node_modules/@prisma/client/" \
      "${PROD_ROOT}/node_modules/@prisma/client/"
  }
  echo "  @prisma/client updated"
fi

rm -rf "${TEMP_DIR}"

# Verify no Windows binaries in new build
echo "[4/5] Verifying Linux compatibility..."
if grep -r "query_engine-windows" "${PROD_ROOT}/.next/" 2>/dev/null; then
  echo "ERROR: Windows Prisma binary still present in build!"
  echo "Rolling back..."
  if [ -f "${BACKUP_DIR}/next-build-before-${TIMESTAMP}.tar.gz" ]; then
    tar -xzf "${BACKUP_DIR}/next-build-before-${TIMESTAMP}.tar.gz" -C "${PROD_ROOT}"
  fi
  exit 1
fi

if grep -r "C:\\\\Users" "${PROD_ROOT}/.next/" 2>/dev/null; then
  echo "ERROR: Windows paths found in build artifacts!"
  echo "Rolling back..."
  if [ -f "${BACKUP_DIR}/next-build-before-${TIMESTAMP}.tar.gz" ]; then
    tar -xzf "${BACKUP_DIR}/next-build-before-${TIMESTAMP}.tar.gz" -C "${PROD_ROOT}"
  fi
  exit 1
fi

echo "  PASS: No Windows binaries or paths detected"

# Restart Passenger
echo "[5/5] Restarting Passenger..."
mkdir -p "${PROD_ROOT}/tmp"
touch "${PROD_ROOT}/tmp/restart.txt"

echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo "BUILD_ID: $(cat "${PROD_ROOT}/.next/BUILD_ID" 2>/dev/null || echo 'unknown')"
echo "Backup location: ${BACKUP_DIR}"
echo ""
echo "Verify these routes return HTTP 200:"
echo "  GET https://stackspacer.com/"
echo "  GET https://stackspacer.com/insights"
echo "  GET https://stackspacer.com/insights/what-nextjs-production-ready"
echo "  GET https://stackspacer.com/sitemap.xml"
echo ""
echo "Rollback if needed:"
echo "  cd ${PROD_ROOT}"
echo "  tar -xzf ${BACKUP_DIR}/next-build-before-${TIMESTAMP}.tar.gz"
echo "  touch tmp/restart.txt"
