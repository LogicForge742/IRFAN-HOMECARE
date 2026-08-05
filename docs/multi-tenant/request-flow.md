# Multi-Tenant Request Resolution Flow

## Sequence Diagram & Request Lifecycle

```
[ HTTP Request ]
       │
       ▼
1. Flask Request Ingestion
       │
       ▼
2. `init_tenant_context` Middleware Triggered
       │
       ├──► Check `X-Tenant-ID` / `X-Tenant-Slug` Header
       ├──► Check `tenant_id` Query Parameter
       ├──► Extract Host Subdomain (e.g. `nairobi.irfanhomecare.ke`)
       └──► Lookup Custom Host Domain
       │
       ▼
3. Tenant Object Resolution & Validation
       │
       ├──► Found & Active? ──► Inject `g.tenant_id`, `g.tenant`, `g.tenant_config`
       └──► Suspended / Missing? ──► Block request via `@tenant_required` decorator (400/403)
       │
       ▼
4. Controller Execution & Isolated Query Filtering
       │
       ▼
5. Response Returned to Frontend Client
```
