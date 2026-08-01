#!/bin/bash
set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/postgres_backup_${TIMESTAMP}.sql"

echo "=== Initializing Database Backup ==="
mkdir -p "${BACKUP_DIR}"

if kubectl get pods -n irfan-homecare &> /dev/null; then
  echo "Backing up database from Kubernetes Postgres pod..."
  POSTGRES_POD=$(kubectl get pods -n irfan-homecare -l app=postgres -o jsonpath="{.items[0].metadata.name}")
  kubectl exec -n irfan-homecare "${POSTGRES_POD}" -- pg_dump -U postgres irfan_db > "${BACKUP_FILE}"
else
  echo "Backing up database from local Postgres instance..."
  pg_dump -U postgres -h localhost irfan_db > "${BACKUP_FILE}"
fi

gzip "${BACKUP_FILE}"
echo "=== Backup Completed: ${BACKUP_FILE}.gz ==="
