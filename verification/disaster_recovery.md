# Disaster Recovery (DR) Plan

## Target SLA
- Recovery Point Objective (RPO): 24 hours.
- Recovery Time Objective (RTO): 2 hours.

## Disaster Scenarios
### 1. Database Corruption
- Run restore steps using the latest night backup.
### 2. Provider Outage
- Re-run Terraform setup pointing to backup secondary region.
