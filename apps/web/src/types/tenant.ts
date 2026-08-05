export interface TenantBranding {
  logo_url: string;
  primary_color: string;
  secondary_color?: string;
  accent_color?: string;
}

export interface TenantFeatures {
  telehealth_video: boolean;
  ai_triage_assistant: boolean;
  fhir_interoperability: boolean;
  mpesa_payments: boolean;
  sso_integration: boolean;

  [key: string]: boolean;
}

export interface TenantLocalization {
  default_timezone: string;
  currency: string;
  locale: string;
}

export interface TenantSecurity {
  mfa_required: boolean;
  session_timeout_minutes: number;
}

export interface TenantSettings {
  features?: Partial<TenantFeatures>;
  branding?: Partial<TenantBranding>;
  localization?: Partial<TenantLocalization>;
  security?: Partial<TenantSecurity>;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo_url?: string;
  primary_color: string;
  is_active: boolean;
  settings?: TenantSettings;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTenantPayload {
  name: string;
  slug?: string;
  domain?: string;
  logo_url?: string;
  primary_color?: string;
  is_active?: boolean;
  settings?: TenantSettings;
}

export interface UpdateTenantPayload {
  name?: string;
  logo_url?: string;
  primary_color?: string;
  is_active?: boolean;
  settings?: TenantSettings;
}
