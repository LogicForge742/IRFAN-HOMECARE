import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TenantBranding } from "../components/TenantBranding";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("TenantBranding Component", () => {
  it("renders branding title correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TenantBranding showBadge={true} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Irfan HomeCare|Nairobi/i)).toBeInTheDocument();
  });
});
