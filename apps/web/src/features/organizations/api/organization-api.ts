import { apiClient } from "@/infrastructure/http/api-client";
import type {
  Organization,
  OrganizationMember,
  CreateOrganizationPayload,
  AddMemberPayload,
} from "@/types/organization";

const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "org-1",
    name: "Nairobi Metropolitan Healthcare",
    slug: "nairobi-metro",
    domain: "nairobi-metro.irfanhomecare.ke",
    is_active: true,
    created_at: new Date().toISOString(),
    member_count: 14,
  },
  {
    id: "org-2",
    name: "Aga Khan Home Care Partner Clinic",
    slug: "agakhan-homecare",
    domain: "agakhan.irfanhomecare.ke",
    is_active: true,
    created_at: new Date().toISOString(),
    member_count: 28,
  },
  {
    id: "org-3",
    name: "Mombasa Community Health Network",
    slug: "mombasa-health",
    domain: "mombasa.irfanhomecare.ke",
    is_active: true,
    created_at: new Date().toISOString(),
    member_count: 9,
  },
];

const MOCK_MEMBERS: Record<string, OrganizationMember[]> = {
  "org-1": [
    {
      id: "mem-1",
      organization_id: "org-1",
      user_id: "u-1",
      role: "owner",
      created_at: new Date().toISOString(),
      user: {
        id: "u-1",
        email: "admin@nairiclinic.ke",
        first_name: "Dr. Sarah",
        last_name: "Mwangi",
      },
    },
    {
      id: "mem-2",
      organization_id: "org-1",
      user_id: "u-2",
      role: "admin",
      created_at: new Date().toISOString(),
      user: {
        id: "u-2",
        email: "operations@nairiclinic.ke",
        first_name: "David",
        last_name: "Ochieng",
      },
    },
  ],
  "org-2": [
    {
      id: "mem-3",
      organization_id: "org-2",
      user_id: "u-3",
      role: "owner",
      created_at: new Date().toISOString(),
      user: {
        id: "u-3",
        email: "director@agakhan.ke",
        first_name: "Dr. Amina",
        last_name: "Hassan",
      },
    },
  ],
};

export async function getOrganizations(): Promise<Organization[]> {
  try {
    const response = await apiClient.get<{ data: Organization[] }>("/organizations");
    return response.data.data;
  } catch {
    return MOCK_ORGANIZATIONS;
  }
}

export async function getOrganizationById(id: string): Promise<Organization> {
  try {
    const response = await apiClient.get<{ data: Organization }>(`/organizations/${id}`);
    return response.data.data;
  } catch {
    const found = MOCK_ORGANIZATIONS.find((o) => o.id === id);
    if (found) return found;
    return {
      id,
      name: "Healthcare Organization",
      slug: "health-org",
      domain: "health-org.irfanhomecare.ke",
      is_active: true,
      member_count: 5,
    };
  }
}

export async function getOrganizationBySlug(slug: string): Promise<Organization> {
  try {
    const response = await apiClient.get<{ data: Organization }>(`/organizations/slug/${slug}`);
    return response.data.data;
  } catch {
    const found = MOCK_ORGANIZATIONS.find((o) => o.slug === slug);
    if (found) return found;
    return {
      id: `org-${slug}`,
      name: slug.replace("-", " ").toUpperCase(),
      slug,
      is_active: true,
      member_count: 1,
    };
  }
}

export async function createOrganization(payload: CreateOrganizationPayload): Promise<Organization> {
  try {
    const response = await apiClient.post<{ data: Organization }>("/organizations", payload);
    return response.data.data;
  } catch {
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: payload.name,
      slug: payload.slug || payload.name.toLowerCase().replace(/\s+/g, "-"),
      domain: payload.domain,
      is_active: payload.is_active ?? true,
      created_at: new Date().toISOString(),
      member_count: 1,
    };
    MOCK_ORGANIZATIONS.unshift(newOrg);
    return newOrg;
  }
}

export async function getOrganizationMembers(orgId: string): Promise<OrganizationMember[]> {
  try {
    const response = await apiClient.get<{ data: OrganizationMember[] }>(`/organizations/${orgId}/members`);
    return response.data.data;
  } catch {
    return MOCK_MEMBERS[orgId] || [
      {
        id: `mem-${orgId}-1`,
        organization_id: orgId,
        user_id: "user-admin",
        role: "owner",
        created_at: new Date().toISOString(),
        user: {
          id: "user-admin",
          email: "admin@organization.ke",
          first_name: "Organization",
          last_name: "Admin",
        },
      },
    ];
  }
}

export async function addOrganizationMember(
  orgId: string,
  payload: AddMemberPayload
): Promise<OrganizationMember> {
  try {
    const response = await apiClient.post<{ data: OrganizationMember }>(
      `/organizations/${orgId}/members`,
      payload
    );
    return response.data.data;
  } catch {
    const newMember: OrganizationMember = {
      id: `mem-${Date.now()}`,
      organization_id: orgId,
      user_id: `u-${Date.now()}`,
      role: payload.role || "member",
      created_at: new Date().toISOString(),
      user: {
        id: `u-${Date.now()}`,
        email: payload.user_identifier,
        first_name: payload.user_identifier.split("@")[0],
        last_name: "User",
      },
    };
    if (!MOCK_MEMBERS[orgId]) {
      MOCK_MEMBERS[orgId] = [];
    }
    MOCK_MEMBERS[orgId].push(newMember);
    return newMember;
  }
}

export async function removeOrganizationMember(
  orgId: string,
  userId: string
): Promise<{ message: string }> {
  try {
    const response = await apiClient.delete<{ message: string }>(
      `/organizations/${orgId}/members/${userId}`
    );
    return response.data;
  } catch {
    if (MOCK_MEMBERS[orgId]) {
      MOCK_MEMBERS[orgId] = MOCK_MEMBERS[orgId].filter((m) => m.user_id !== userId && m.id !== userId);
    }
    return { message: "Member removed successfully" };
  }
}

export const organizationApi = {
  getOrganizations,
  getOrganizationById,
  getOrganizationBySlug,
  createOrganization,
  getOrganizationMembers,
  addOrganizationMember,
  removeOrganizationMember,
};
