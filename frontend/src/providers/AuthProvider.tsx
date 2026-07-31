import { ReactNode, useEffect, useState } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [hydrated, setHydrated] = useState(
        useAuthStore.persist.hasHydrated()
    );

    useEffect(() => {
        const unsubscribe =
            useAuthStore.persist.onFinishHydration(() => {
                setHydrated(true);
            });

        if (!useAuthStore.persist.hasHydrated()) {
            useAuthStore.persist.rehydrate();
        }

        return unsubscribe;
    }, []);

    if (!hydrated) {
        return null;
    }

    return <>{children}</>;
}