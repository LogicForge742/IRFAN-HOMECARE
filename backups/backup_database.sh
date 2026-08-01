#!/bin/bash
set -e

BACKUP_DIR="/var/backups/irfan-homecare/db"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_PATH="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

echo "=== Running Database Backup ==="
mkdir -p "${BACKUP_DIR}"

pg_dump -U "${DB_USER:-postgres}" -h "${DB_HOST:-localhost}" "${DB_NAME:-irfan_db}" | gzip > "${BACKUP_PATH}"

find "${BACKUP_DIR}" -type f -name "*.sql.gz" -mtime +7 -delete

echo "=== Database Backup Completed: ${BACKUP_PATH} ==="
