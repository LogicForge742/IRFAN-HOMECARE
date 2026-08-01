# Backup and Restore Verification

## Purpose
Ensure all backup and restore script files under `backups/` are executing successfully.

## Verification Steps
1. **Trigger database dump**:
   ```bash
   ./backups/backup_database.sh
   ```
2. **Confirm database dump exists**:
   Verify size and type of the generated `db_backup_*.sql.gz` file.
3. **Trigger upload assets backup**:
   ```bash
   ./backups/backup_uploads.sh
   ```
4. **Trigger database restore**:
   Verify script restore using:
   ```bash
   ./backups/restore_database.sh <path_to_backup_file.sql.gz>
   ```
