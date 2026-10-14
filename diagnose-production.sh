#!/bin/bash
# STACKSPACER — Production Diagnostics
# Run this via SSH to check production environment
# Usage: ssh u318730766@stackspacer.com "bash -s" < diagnose-production.sh

echo "=== PRODUCTION ENVIRONMENT DIAGNOSTICS ==="
echo ""

echo "[1] OS Information"
uname -a
echo ""
uname -m
echo ""
cat /etc/os-release 2>/dev/null || echo "Cannot read /etc/os-release"
echo ""

echo "[2] Node.js Version"
node -v
echo ""

echo "[3] npm Version"
npm -v
echo ""

echo "[4] OpenSSL Version"
openssl version
echo ""

echo "[5] Prisma Version"
cd /home/u318730766/domains/stackspacer.com/nodejs
npx prisma -v 2>/dev/null || echo "Prisma CLI not available"
echo ""

echo "[6] Prisma Binary Targets in Schema"
grep -A2 "binaryTargets" prisma/schema.prisma 2>/dev/null || echo "No binaryTargets specified in schema"
echo ""

echo "[7] Available Prisma Query Engine Binaries"
ls -la node_modules/.prisma/client/query_engine*.node 2>/dev/null || echo "No query engine binaries found"
echo ""

echo "[8] Prisma Client Package Info"
cat node_modules/@prisma/client/package.json 2>/dev/null | grep -E '"version"|"name"' | head -5
echo ""

echo "[9] Current .next Build ID"
cat .next/BUILD_ID 2>/dev/null || echo "No .next directory found"
echo ""

echo "[10] Checking for Windows binaries in current build"
if grep -r "query_engine-windows" .next/ 2>/dev/null; then
  echo "WARNING: Windows Prisma binary found in .next/"
else
  echo "PASS: No Windows binaries in .next/"
fi
echo ""

echo "[11] Checking for Windows paths in build traces"
if grep -rl "C:\\\\Users" .next/ 2>/dev/null | head -5; then
  echo "WARNING: Windows paths found in build traces"
else
  echo "PASS: No Windows paths in build traces"
fi
echo ""

echo "[12] Passenger Status"
passenger-status 2>/dev/null | head -20 || echo "Passenger status unavailable"
echo ""

echo "[13] Recent Application Errors"
ls -lt /home/u318730766/domains/stackspacer.com/nodejs/tmp/ 2>/dev/null | head -10
echo ""
cat /home/u318730766/domains/stackspacer.com/nodejs/tmp/error.log 2>/dev/null | tail -30 || echo "No error.log found"
echo ""

echo "=== DIAGNOSTICS COMPLETE ==="
