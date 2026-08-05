# Multi-Tenant Security & Data Isolation Guarantees

## Data Isolation Policies
1. **Tenant ID Injection**: Every tenant-bound API route must extract `tenant_id` from `g.tenant_id` set by middleware rather than trusting user payloads.
2. **Membership Authorization (`@tenant_member_required`)**: Restricts access to organization records unless the authenticated JWT user is explicitly enrolled in the resolved tenant organization.
3. **Suspended Tenant Enforcement**: Suspended tenants (`is_active = False`) are rejected at the middleware boundary before executing downstream business logic or database reads.
4. **Header Sanitization**: Cross-tenant header tampering is prevented by validating JWT claim scopes against resolved tenant entities.
