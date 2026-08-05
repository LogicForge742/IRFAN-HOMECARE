import { apiClient } from "@/infrastructure/http/api-client";
import type { Tenant, CreateTenantPayload, UpdateTenantPayload } from "@/types/tenant";

const MOCK_TENANTS: Tenant[] = [
  {
    id: "tenant-nairobi-health",
    name: "Nairobi County General Hospital",
    slug: "nairobi-general",
    domain: "nairobi-general.irfanhomecare.ke",
    logo_url: "/assets/branding/default-logo.svg",
    primary_color: "#10b981",
    is_active: true,
    created_at: new Date().toISOString(),
    settings: {
      features: {
        telehealth_video: true,
        ai_triage_assistant: true,
        mpesa_payments: true,
      },
    },
  },
  {
    id: "tenant-mombasa-clinic",
    name: "Mombasa Community Care Alliance",
    slug: "mombasa-care",
    domain: "mombasa.irfanhomecare.ke",
    logo_url: "/assets/branding/default-logo.svg",
    primary_color: "#3b82f6",
    is_active: true,
    created_at: new Date().toISOString(),
    settings: {
      features: {
        telehealth_video: true,
        ai_triage_assistant: false,
        mpesa_payments: true,
      },
    },
  },
  {
    id: "tenant-kisumu-ngo",
    name: "Lake Victoria Regional NGO Health Trust",
    slug: "lake-victoria-trust",
    domain: "lake-victoria.irfanhomecare.ke",
    logo_url: "/assets/branding/default-logo.svg",
    primary_color: "#8b5cf6",
    is_active: true,
    created_at: new Date().toISOString(),
    settings: {
      features: {
        telehealth_video: true,
        fhir_interoperability: true,
      },
    },
  },
];

let currentActiveTenantId = MOCK_TENANTS[0].id;

export async function getTenants(): Promise<Tenant[]> {
  try {
    const response = await apiClient.get<{ data: Tenant[] }>("/tenants");
    return response.data.data;
  } catch {
    return MOCK_TENANTS;
  }
}

export async function getTenantById(id: string): Promise<Tenant> {
  try {
    const response = await apiClient.get<{ data: Tenant }>(`/tenants/${id}`);
    return response.data.data;
  } catch {
    const found = MOCK_TENANTS.find((t) => t.id === id);
    if (found) return found;
    return MOCK_TENANTS[0];
  }
}

export async function getTenantBySlug(slug: string): Promise<Tenant> {
  try {
    const response = await apiClient.get<{ data: Tenant }>(`/tenants/slug/${slug}`);
    return response.data.data;
  } catch {
    const found = MOCK_TENANTS.find((t) => t.slug === slug);
    if (found) return found;
    return MOCK_TENANTS[0];
  }
}

export async function createTenant(payload: CreateTenantPayload): Promise<Tenant> {
  try {
    const response = await apiClient.post<{ data: Tenant }>("/tenants", payload);
    return response.data.data;
  } catch {
    const newTenant: Tenant = {
      id: `tenant-${Date.now()}`,
      name: payload.name,
      slug: payload.slug || payload.name.toLowerCase().replace(/\s+/g, "-"),
      domain: payload.domain,
      logo_url: payload.logo_url || "/assets/branding/default-logo.svg",
      primary_color: payload.primary_color || "#10b981",
      is_active: payload.is_active ?? true,
      settings: payload.settings || {},
      created_at: new Date().toISOString(),
    };
    MOCK_TENANTS.unshift(newTenant);
    return newTenant;
  }
}

export async function updateTenant(id: string, payload: UpdateTenantPayload): Promise<Tenant> {
  try {
    const response = await apiClient.put<{ data: Tenant }>(`/tenants/${id}`, payload);
    return response.data.data;
  } catch {
    const found = MOCK_TENANTS.find((t) => t.id === id);
    if (found) {
      Object.assign(found, payload);
      return found;
    }
    return MOCK_TENANTS[0];
  }
}

export function getActiveTenantId(): string {
  return localStorage.getItem("irfan_active_tenant_id") || currentActiveTenantId;
}

export function setActiveTenantId(tenantId: string): void {
  currentActiveTenantId = tenantId;
  localStorage.setItem("irfan_active_tenant_id", tenantId);
}

export const tenantApi = {
  getTenants,
  getTenantById,
  getTenantBySlug,
  createTenant,
  updateTenant,
  getActiveTenantId,
  setActiveTenantId,
};
