#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <path_to_backup.sql.gz>"
  exit 1
fi

BACKUP_FILE="$1"

echo "=== Running Database Restore ==="
gunzip -c "${BACKUP_FILE}" | psql -U "${DB_USER:-postgres}" -h "${DB_HOST:-localhost}" "${DB_NAME:-irfan_db}"

echo "=== Database Restore Completed ==="
