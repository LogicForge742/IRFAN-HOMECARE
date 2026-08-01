# Deployment Guide

## Production Requirements
- Kubernetes Cluster v1.26+
- Helm v3+
- Ingress controller (Nginx Ingress controller recommended)

## Steps to Deploy
1. **Initialize Cluster & Namespace**:
   ```bash
   kubectl apply -f deployment/kubernetes/namespace.yaml
   ```
2. **Apply Storage & Databases**:
   ```bash
   kubectl apply -f deployment/kubernetes/postgres.yaml
   kubectl apply -f deployment/kubernetes/redis.yaml
   ```
3. **Deploy Applications**:
   ```bash
   kubectl apply -f deployment/kubernetes/backend.yaml
   kubectl apply -f deployment/kubernetes/frontend.yaml
   kubectl apply -f deployment/kubernetes/celery-worker.yaml
   ```
4. **Deploy Traffic Router**:
   ```bash
   kubectl apply -f deployment/kubernetes/ingress.yaml
   ```
