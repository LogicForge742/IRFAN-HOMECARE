export const CHART_COLORS = {
  primary: "#10b981",    // emerald-500
  secondary: "#3b82f6",  // blue-500
  tertiary: "#f59e0b",   // amber-500
  danger: "#ef4444",     // red-500
  info: "#06b6d4",       // cyan-500
  purple: "#8b5cf6",     // purple-500
  pink: "#ec4899",       // pink-500
  
  emerald: ["#10b981", "#059669", "#047857", "#065f46"],
  blue: ["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"],
  amber: ["#f59e0b", "#d97706", "#b45309", "#92400e"],
  slate: ["#64748b", "#475569", "#334155", "#1e293b"],
  
  payment: {
    completed: "#10b981",
    pending: "#f59e0b",
    failed: "#ef4444",
  },
  
  appointment: {
    completed: "#10b981",
    pending: "#f59e0b",
    cancelled: "#ef4444",
  },
  
  system: {
    healthy: "#10b981",
    warning: "#f59e0b",
    unhealthy: "#ef4444",
  }
};
export default CHART_COLORS;
