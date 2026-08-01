#!/bin/bash
set -e

API_URL="http://localhost:5000/api/health"
echo "=== Running Health Check ==="

RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/health_response.json "${API_URL}")

if [ "${RESPONSE}" -eq 200 ]; then
  echo "System Health: OK (HTTP 200)"
  cat /tmp/health_response.json
  echo ""
  rm /tmp/health_response.json
  exit 0
else
  echo "System Health: FAILED (HTTP ${RESPONSE})"
  cat /tmp/health_response.json
  echo ""
  rm /tmp/health_response.json
  exit 1
fi
