# Deployment Rollback Strategy

## In Case of Failure
1. **Rollback Kubernetes deployments**:
   ```bash
   kubectl rollout undo deployment/backend -n irfan-homecare
   kubectl rollout undo deployment/frontend -n irfan-homecare
   ```
2. **Revert database scheme migrations**:
   Restore the DB to pre-migration backup using `restore.sh`.
