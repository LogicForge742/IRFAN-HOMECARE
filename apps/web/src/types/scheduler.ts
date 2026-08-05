export interface SchedulerJob {
  id: string;
  name: string;
  task: string;
  description: string;
  cron: string;
  queue: string;
  category: string;
  status: "IDLE" | "RUNNING" | "PAUSED";
  last_run?: string;
  next_run?: string;
}

export interface TaskExecutionHistory {
  id: string;
  job_id: string;
  task: string;
  status: "SUCCESS" | "FAILURE" | "RUNNING";
  executed_at: string;
  duration_ms: number;
  result?: Record<string, any>;
  error?: string;
}

export interface SystemHealthMetrics {
  status: "HEALTHY" | "DEGRADED" | "DOWN";
  worker_count: number;
  active_queues: string[];
  broker_connected: boolean;
  pending_tasks: number;
  failed_tasks_24h: number;
  uptime_seconds: number;
}
