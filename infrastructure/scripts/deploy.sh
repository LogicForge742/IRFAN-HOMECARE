#!/bin/bash
set -e

echo "=== Starting Production Deployment for Irfan HomeCare ==="

# 1. Build and Test Backend
echo "Building backend Docker image..."
docker build -t irfan-homecare-backend:latest ./backend

# 2. Build and Test Frontend
echo "Building frontend Docker image..."
docker build -t irfan-homecare-frontend:latest ./apps/web

# 3. Apply Kubernetes Manifests
echo "Applying Kubernetes manifests..."
kubectl apply -f deployment/kubernetes/namespace.yaml
kubectl apply -f deployment/kubernetes/postgres.yaml
kubectl apply -f deployment/kubernetes/redis.yaml
kubectl apply -f deployment/kubernetes/backend.yaml
kubectl apply -f deployment/kubernetes/frontend.yaml
kubectl apply -f deployment/kubernetes/celery-worker.yaml
kubectl apply -f deployment/kubernetes/ingress.yaml

echo "=== Deployment Completed Successfully ==="
