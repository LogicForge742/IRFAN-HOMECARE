#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <path_to_backup_file.sql.gz>"
  exit 1
fi

BACKUP_FILE="$1"
TEMP_FILE="/tmp/restore.sql"

echo "=== Initializing Database Restore ==="
gunzip -c "${BACKUP_FILE}" > "${TEMP_FILE}"

if kubectl get pods -n irfan-homecare &> /dev/null; then
  echo "Restoring database to Kubernetes Postgres pod..."
  POSTGRES_POD=$(kubectl get pods -n irfan-homecare -l app=postgres -o jsonpath="{.items[0].metadata.name}")
  kubectl cp "${TEMP_FILE}" -n irfan-homecare "${POSTGRES_POD}":/tmp/restore.sql
  kubectl exec -n irfan-homecare "${POSTGRES_POD}" -- psql -U postgres -d irfan_db -f /tmp/restore.sql
else
  echo "Restoring database to local Postgres instance..."
  psql -U postgres -h localhost -d irfan_db -f "${TEMP_FILE}"
fi

rm "${TEMP_FILE}"
echo "=== Restore Completed ==="
