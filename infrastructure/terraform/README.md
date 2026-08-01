# Terraform Infrastructure Configuration

This directory contains Infrastructure as Code scripts for managing cloud resources of Irfan HomeCare.

## Structure
- `/aws`: Manages Amazon Web Services setups (VPCs, RDS PostgreSQL, ElastiCache Redis, EKS, ECS Fargate).
- `/render`: Blueprints for deploying API servers and static sites to Render.com.
- `/cloudflare`: Handles DNS records, CDN caching rules, and Web Application Firewall (WAF) rule sets.

## Usage
1. Configure credentials:
   ```bash
   export AWS_ACCESS_KEY_ID="..."
   export AWS_SECRET_ACCESS_KEY="..."
   ```
2. Initialize directories:
   ```bash
   cd aws
   terraform init
   ```
3. Plan and deploy:
   ```bash
   terraform plan -out=tfplan
   terraform apply tfplan
   ```
