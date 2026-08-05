import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTenants,
  getTenantById,
  getTenantBySlug,
  createTenant,
  updateTenant,
  getActiveTenantId,
  setActiveTenantId,
} from "../api/tenant-api";
import type { CreateTenantPayload, UpdateTenantPayload } from "@/types/tenant";

export function useTenants() {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });
}

export function useTenant(id?: string) {
  const activeId = id || getActiveTenantId();

  return useQuery({
    queryKey: ["tenants", activeId],
    queryFn: () => getTenantById(activeId),
    enabled: Boolean(activeId),
  });
}

export function useTenantBySlug(slug: string) {
  return useQuery({
    queryKey: ["tenants", "slug", slug],
    queryFn: () => getTenantBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTenantPayload) => createTenant(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
  });
}

export function useUpdateTenant(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTenantPayload) => updateTenant(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants", id] });
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
  });
}

export function useTenantSwitcher() {
  const [activeTenantId, setTenantIdState] = useState<string>(getActiveTenantId());
  const queryClient = useQueryClient();

  const switchTenant = (tenantId: string) => {
    setActiveTenantId(tenantId);
    setTenantIdState(tenantId);
    queryClient.invalidateQueries();
  };

  return {
    activeTenantId,
    switchTenant,
  };
}
