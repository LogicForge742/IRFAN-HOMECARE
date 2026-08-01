import { apiClient } from "@/infrastructure/http/api-client";

export interface SSOProviderInfo {
  name: string;
  icon: string;
  protocol: "oidc" | "oauth2" | "saml";
}

export interface SSOProvidersResponse {
  status: string;
  providers: Record<string, SSOProviderInfo>;
}

export interface SSOLoginUrlResponse {
  status: string;
  data: {
    url: string;
    state: string;
  };
}

export const ssoApi = {
  getProviders: async (): Promise<SSOProvidersResponse> => {
    const response = await apiClient.get<SSOProvidersResponse>("/sso/providers");
    return response.data;
  },

  getLoginUrl: async (provider: string, redirectUri?: string): Promise<SSOLoginUrlResponse> => {
    const params = redirectUri ? `?redirect_uri=${encodeURIComponent(redirectUri)}` : "";
    const response = await apiClient.get<SSOLoginUrlResponse>(`/sso/login/${provider}${params}`);
    return response.data;
  },

  linkAccount: async (provider: string, providerSubjectId: string): Promise<{ status: string; message: string }> => {
    const response = await apiClient.post<{ status: string; message: string }>("/sso/link-account", {
      provider,
      provider_subject_id: providerSubjectId,
    });
    return response.data;
  },

  unlinkAccount: async (): Promise<{ status: string; message: string }> => {
    const response = await apiClient.post<{ status: string; message: string }>("/sso/unlink-account", {
      confirm: true,
    });
    return response.data;
  },
};
