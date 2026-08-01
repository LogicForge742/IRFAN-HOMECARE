#!/bin/bash
set -e

UPLOADS_DIR="/app/uploads"
BACKUP_DIR="/var/backups/irfan-homecare/uploads"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_PATH="${BACKUP_DIR}/uploads_backup_${TIMESTAMP}.tar.gz"

echo "=== Running Uploads Backup ==="
mkdir -p "${BACKUP_DIR}"

if [ -d "${UPLOADS_DIR}" ]; then
  tar -czf "${BACKUP_PATH}" "${UPLOADS_DIR}"
  find "${BACKUP_DIR}" -type f -name "*.tar.gz" -mtime +14 -delete
  echo "=== Uploads Backup Completed: ${BACKUP_PATH} ==="
else
  echo "Warning: Uploads directory ${UPLOADS_DIR} does not exist. Skipping backup."
fi
