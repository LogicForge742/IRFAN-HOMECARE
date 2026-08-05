import { apiClient } from "./client";

apiClient.interceptors.request.use((config) => {
    let token = localStorage.getItem("access_token");

    if (!token) {
        try {
            const authState = localStorage.getItem("irfan-homecare-auth");
            if (authState) {
                const parsed = JSON.parse(authState);
                token = parsed.state?.accessToken || null;
            }
        } catch (e) {
            // ignore JSON parse errors
        }
    }

    // Check if an Authorization header is already explicitly provided
    console.log("Interceptor: config.headers is:", config.headers);
    const hasAuthHeader = 
        config.headers.Authorization || 
        config.headers.authorization || 
        (typeof config.headers.get === "function" && (config.headers.get("Authorization") || config.headers.get("authorization"))) ||
        (typeof config.headers.has === "function" && (config.headers.has("Authorization") || config.headers.has("authorization")));

    console.log("Interceptor: hasAuthHeader?", hasAuthHeader, "explicit header:", config.headers.Authorization || config.headers.authorization);

    if (token && !hasAuthHeader) {
        console.log("Interceptor: Injecting token from localStorage:", token);
        config.headers.Authorization = `Bearer ${token}`;
    } else if (token && hasAuthHeader) {
        console.log("Interceptor: Keeping explicit Authorization header:", config.headers.Authorization || config.headers.authorization);
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized");
        }

        return Promise.reject(error);
    }
);