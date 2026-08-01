import { useQuery, useMutation } from "@tanstack/react-query";
import { ssoApi } from "../api/sso-api";

export function useSSOProviders() {
  return useQuery({
    queryKey: ["sso", "providers"],
    queryFn: () => ssoApi.getProviders(),
  });
}

export function useSSOLogin() {
  return useMutation({
    mutationFn: ({ provider, redirectUri }: { provider: string; redirectUri?: string }) =>
      ssoApi.getLoginUrl(provider, redirectUri),
  });
}

export function useLinkAccount() {
  return useMutation({
    mutationFn: ({ provider, providerSubjectId }: { provider: string; providerSubjectId: string }) =>
      ssoApi.linkAccount(provider, providerSubjectId),
  });
}

export function useUnlinkAccount() {
  return useMutation({
    mutationFn: () => ssoApi.unlinkAccount(),
  });
}
