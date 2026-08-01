# Support Runbook

## Core Troubleshooting Flows
### 1. High API Error Rate
- Inspect logs:
  ```bash
  kubectl logs -n irfan-homecare -l app=backend --tail=100
  ```
- Check database usage & connection limits.

### 2. Live Notifications Delay
- Check Celery worker logs:
  ```bash
  kubectl logs -n irfan-homecare -l app=celery-worker --tail=100
  ```
- Restart Celery worker deployment if hung.
