#!/bin/bash
# STACKSPACER — Rollback Script for Wave 1 Deployment
# Execute this via SSH to: u318730766@stackspacer.com
# Production root: /home/u318730766/domains/stackspacer.com/nodejs/

set -e

PROD_ROOT="/home/u318730766/domains/stackspacer.com/nodejs"
BACKUP_ROOT="/home/u318730766/backups"

echo "=== STACKSPACER WAVE 1 ROLLBACK ==="

# Find the most recent backup
LATEST_BACKUP=$(ls -t "${BACKUP_ROOT}"/stackspacer-us-city-wave1-*/ 2>/dev/null | head -1)

if [ -z "${LATEST_BACKUP}" ]; then
  echo "ERROR: No backup found in ${BACKUP_ROOT}"
  exit 1
fi

echo "Restoring from: ${LATEST_BACKUP}"

cd "${PROD_ROOT}"

# Restore source files
if [ -f "${LATEST_BACKUP}source-before-*.tar.gz" ]; then
  LATEST_SOURCE=$(ls -t "${LATEST_BACKUP}"/source-before-*.tar.gz | head -1)
  echo "[1/3] Restoring source files from ${LATEST_SOURCE}"
  tar -xzf "${LATEST_SOURCE}" -C "${PROD_ROOT}"
else
  echo "WARNING: No source backup found in ${LATEST_BACKUP}"
fi

# Restore .next build
if [ -f "${LATEST_BACKUP}next-build-before-*.tar.gz" ]; then
  LATEST_NEXT=$(ls -t "${LATEST_BACKUP}"/next-build-before-*.tar.gz | head -1)
  echo "[2/3] Restoring .next build from ${LATEST_NEXT}"
  tar -xzf "${LATEST_NEXT}" -C "${PROD_ROOT}"
else
  echo "WARNING: No .next backup found. Build will need to be re-run."
fi

# Restart Passenger
echo "[3/3] Restarting Passenger..."
touch "${PROD_ROOT}/tmp/restart.txt"

echo ""
echo "=== ROLLBACK COMPLETE ==="
echo "Backup preserved at: ${LATEST_BACKUP}"
echo "Verify public routes are working correctly."
