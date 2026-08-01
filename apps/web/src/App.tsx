import React from "react";
import { AppProviders } from "@/app/providers";
import { AppRouter } from "@/app/router";
import { OfflineBanner } from "@/components/pwa/OfflineBanner";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { UpdatePrompt } from "@/components/pwa/UpdatePrompt";

export const App: React.FC = () => {
  return (
    <AppProviders>
      <AppRouter />
      <OfflineBanner />
      <InstallPrompt />
      <UpdatePrompt />
    </AppProviders>
  );
};

export default App;
