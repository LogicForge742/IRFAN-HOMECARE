# Irfan HomeCare System Architecture

```mermaid
graph TD
  User[Client / Browser] --> Ingress[Nginx Ingress / Reverse Proxy]
  Ingress --> |Static Content| Frontend[React / Vite PWA]
  Ingress --> |API requests| Backend[Flask REST API]
  Backend --> |Relational Data| PostgreSQL[(PostgreSQL Database)]
  Backend --> |Caches & Socket sessions| Redis[(Redis Cache)]
  Backend --> |Queue jobs| Celery[Celery Workers]
  Celery --> Redis
```

## Technology Stack
- **Frontend**: React (Vite, TypeScript, Tailwind CSS, Recharts)
- **Backend**: Flask, Flask-SQLAlchemy, Flask-SocketIO, Celery
- **Database**: PostgreSQL (Relational persistence), Redis (Broker/Cache)
