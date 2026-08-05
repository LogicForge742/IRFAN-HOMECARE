export interface Organization {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  member_count?: number;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: "owner" | "admin" | "member" | string;
  created_at?: string;
  updated_at?: string;
  user?: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface CreateOrganizationPayload {
  name: string;
  slug?: string;
  domain?: string;
  is_active?: boolean;
}

export interface AddMemberPayload {
  user_identifier: string;
  role?: string;
}
