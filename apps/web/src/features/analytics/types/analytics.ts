export interface DashboardTotals {
  total_users: number;
  total_patients: number;
  total_professionals: number;
  total_revenue: number;
  total_payments: number;
  total_appointments: number;
}

export interface DashboardSummary {
  totals: DashboardTotals;
  growth: {
    users: number;
    patients: number;
    professionals: number;
    revenue: number;
    payments: number;
    appointments: number;
  };
}

export interface RevenueTrend {
  month: string;
  amount: number;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  amount: number;
  status: string;
  date: string;
  patient_name: string;
}

export interface PaymentAnalytics {
  distribution: Record<string, number>;
  recent: PaymentTransaction[];
}

export interface AppointmentTrend {
  month: string;
  completed: number;
  cancelled: number;
}

export interface AppointmentAnalytics {
  distribution: Record<string, number>;
  trends: AppointmentTrend[];
}

export interface ProfessionalAnalytic {
  id: string;
  name: string;
  specialization: string;
  appointments_count: number;
}

export interface PatientGrowth {
  month: string;
  count: number;
}

export interface SystemHealth {
  services: {
    postgresql: string;
    redis: string;
    celery: string;
    socketio: string;
    api: string;
  };
  metrics: {
    requests_total: number;
    requests_failed: number;
    payment_failures: number;
    celery_task_failures: number;
    avg_response_time_ms: number;
  };
}
