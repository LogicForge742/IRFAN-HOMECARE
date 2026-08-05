import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrganizations,
  getOrganizationById,
  getOrganizationBySlug,
  createOrganization,
  getOrganizationMembers,
  addOrganizationMember,
  removeOrganizationMember,
} from "../api/organization-api";
import type { CreateOrganizationPayload, AddMemberPayload } from "@/types/organization";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationById(id),
    enabled: Boolean(id),
  });
}

export function useOrganizationBySlug(slug: string) {
  return useQuery({
    queryKey: ["organizations", "slug", slug],
    queryFn: () => getOrganizationBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrganizationPayload) => createOrganization(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useOrganizationMembers(orgId: string) {
  return useQuery({
    queryKey: ["organizations", orgId, "members"],
    queryFn: () => getOrganizationMembers(orgId),
    enabled: Boolean(orgId),
  });
}

export function useAddOrganizationMember(orgId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddMemberPayload) => addOrganizationMember(orgId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}

export function useRemoveOrganizationMember(orgId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => removeOrganizationMember(orgId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId, "members"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", orgId] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}
