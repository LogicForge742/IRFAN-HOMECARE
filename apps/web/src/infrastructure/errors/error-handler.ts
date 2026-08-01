import { toast } from "sonner";
import { ApiError } from "./api-error";

export function handleApiError(error: unknown): void {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      toast.error("Session expired. Please login again.");
      return;
    }

    if (error.status === 403) {
      toast.error("You don't have permission for this action.");
      return;
    }

    if (error.status === 404) {
      toast.error("The requested resource was not found.");
      return;
    }

    if (error.status === 409) {
      toast.error(error.message || "A scheduling conflict was detected.");
      return;
    }

    if (error.status === 422) {
      toast.error(error.message || "Validation failed. Please check your input.");
      return;
    }

    if (error.status && error.status >= 500) {
      toast.error("Server error. Our team has been notified.");
      return;
    }

    toast.error(error.message);
    return;
  }

  toast.error("Something went wrong. Please try again.");
}
