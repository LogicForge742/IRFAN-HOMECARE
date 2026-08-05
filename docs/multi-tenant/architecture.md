# Multi-Tenant Healthcare Architecture — Irfan HomeCare

## Overview
The Irfan HomeCare multi-tenant architecture enables a single application instance to serve multiple hospitals, clinics, NGOs, and home-care organizations independently. Data isolation, tenant-specific configuration, dynamic branding, and feature toggling are managed seamlessly via application middleware and tenant repositories.

## Core Architectural Layers
1. **Tenant Domain Model (`Tenant`)**: Stores tenant metadata, domain bindings, branding tokens, active status, and custom settings.
2. **Tenant Resolver (`TenantResolver`)**: Analyzes incoming HTTP requests to resolve the tenant context via headers (`X-Tenant-ID`, `X-Tenant-Slug`), query parameters (`tenant_id`), subdomains (`clinic.irfanhomecare.ke`), or custom host domains.
3. **Context Middleware (`tenant_context.py`)**: Attaches resolved `g.tenant_id`, `g.tenant`, and `g.tenant_config` to Flask's global request context.
4. **Configuration Loader (`TenantLoader`)**: Merges system default configurations with tenant-specific custom feature flags and theme tokens.
5. **Frontend Context & Switcher (`useTenant`, `TenantSwitcher`)**: Provides reactive UI updates, dynamic branding (`TenantBranding`), and tenant context switching in single-page application layouts.
