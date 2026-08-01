import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/auth/me", () => {
    return HttpResponse.json({
      id: "u1",
      email: "test@example.com",
      role: "PATIENT",
    });
  }),
];
