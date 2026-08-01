# Production Deployment Runbook — Irfan HomeCare API

This guide provides step-by-step instructions for deploying the **Irfan HomeCare API** backend infrastructure to a Linux production server using Docker, Nginx, Let's Encrypt (Certbot), and Cloudflare.

---

## 1. Server Environment Setup

Log into your production server via SSH and install Docker, Docker Compose, and Git:

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin git
```

Verify the installations:

```bash
docker --version
docker compose version
```

---

## 2. Clone Repository & Navigate

Clone the official repository onto your production server:

```bash
git clone https://github.com/LogicForge742/IRFAN-HOMECARE.git
cd IRFAN-HOMECARE/backend
```

---

## 3. Configure Production Secrets

Create the production environment file (`.env.production`):

```bash
nano .env.production
```

Add your production secrets (ensure these are kept secret and never committed to GitHub):

```env
FLASK_ENV=production
APP_ENV=production
DEBUG=False

SECRET_KEY=generate-a-strong-random-64-character-secret
JWT_SECRET_KEY=generate-another-strong-random-64-character-secret

DATABASE_URL=postgresql://irfan_user:strong_password@postgres:5432/irfan_homecare_prod
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

SENTRY_DSN=https://your-sentry-dsn-key@o0.ingest.sentry.io/0

MPESA_ENV=production
MPESA_CONSUMER_KEY=your_production_consumer_key
MPESA_CONSUMER_SECRET=your_production_consumer_secret
MPESA_PASSKEY=your_production_passkey
MPESA_SHORTCODE=your_production_shortcode

MAIL_SERVER=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=apikey
MAIL_PASSWORD=your_sendgrid_api_key
MAIL_DEFAULT_SENDER=Irfan HomeCare <noreply@irfanhomecare.com>
```

---

## 4. Containerized Deployment

Launch all containerized production services in detached mode:

```bash
docker compose --env-file .env.production up -d --build
```

Verify service statuses:

```bash
docker compose ps
```

Expected Output:
- `irfan_postgres`: `healthy`
- `irfan_redis`: `healthy`
- `irfan_backend`: `healthy`
- `irfan_celery_worker`: `running`
- `irfan_nginx`: `running`

---

## 5. Database Initial Migrations

Run database migrations to initialize tables and schemas on PostgreSQL:

```bash
docker compose exec backend flask db upgrade
```

---

## 6. Domain Setup & HTTPS (Nginx & Certbot)

Install Certbot for SSL/TLS encryption:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Obtain Let's Encrypt SSL certificates for your custom domain:

```bash
sudo certbot --nginx -d api.irfanhomecare.com
```

---

## 7. Production Verification

Execute smoke tests to verify api liveness and readiness:

```bash
# 1. Liveness Probe
curl https://api.irfanhomecare.com/health

# Expected: {"status": "healthy"}

# 2. Readiness Probe (Database + Redis)
curl https://api.irfanhomecare.com/ready

# Expected: {"database": "connected", "redis": "connected", "status": "ready"}
```

---

## 8. Post-Deployment Checklist

- [x] User registration & email verification
- [x] JWT Login authentication
- [x] Rate limiting enforcement (Flask-Limiter)
- [x] Security headers active (Flask-Talisman)
- [x] M-Pesa Daraja STK Push callbacks
- [x] PDF Receipt generation (ReportLab)
- [x] Celery background email dispatch
- [x] Sentry real-time exception tracking
