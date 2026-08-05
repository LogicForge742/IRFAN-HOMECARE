# 🏥 Irfan HomeCare — Premium Home Healthcare Platform

A state-of-the-art, production-ready healthcare management platform featuring role-based dashboards, multi-tenant scheduling engines, secure checkout flows, and clinical telemedicine capabilities.

---

## 🚀 Key Features

- **Multi-Tenant Architecture**: Dedicated tenant and organization isolation for scalable clinical enterprise management.
- **Dynamic Role-Based Dashboards**: Customized workflows and statistics for Patients, Healthcare Professionals, and Administrators.
- **Robust Scheduling Engine**: Conflict-aware booking rules preventing double-booking and tracking professional availability.
- **Real-Time Communications**: Audio/Video consultation capabilities and unified event-driven notification dispatchers (Email, SMS, Push).
- **Secure Telemetry & Payments**: Integrated billing systems supporting online payment processing and receipt generation.

---

## 📂 Repository Structure

The project is structured as a monorepo containing the following workspaces:

```
├── apps/
│   └── web/                 # Corporate site & SSO organization portal
├── backend/                 # Flask REST API, Celery Workers, Redis, PostgreSQL
├── frontend/                # Client Patient & Professional Application (Vite + React)
├── infrastructure/          # Terraform configurations, CI/CD, and deploy scripts
└── docs/                    # Technical architecture & API documentation
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, TanStack Query, Zustand |
| **Backend** | Python, Flask, Flask-SQLAlchemy (PostgreSQL), Marshmallow |
| **Asynchronous Tasks** | Celery, Redis |
| **Infrastructure** | Terraform, Docker, GitHub Actions |

---

## 💻 Local Development Setup

### 1. Prerequisites
Ensure you have the following installed on your system:
- **Python 3.10+**
- **Node.js 18+ & npm**
- **PostgreSQL** & **Redis**

---

### 2. Backend Setup

1. **Navigate and Setup Virtual Environment:**
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   FLASK_APP=run.py
   FLASK_ENV=development
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/irfan_homecare_db
   REDIS_URL=redis://localhost:6379/0
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

3. **Run Migrations & Seeds:**
   ```bash
   flask db upgrade
   python seeds.py
   ```

4. **Start the Flask Server:**
   ```bash
   flask run --port=5000
   ```

5. **Start Celery Worker (in a separate terminal):**
   ```bash
   celery -A run.celery worker --loglevel=info
   ```

---

### 3. Frontend Setup

1. **Navigate and Install Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the Frontend Dev Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

## 🔒 Security & Compliance

- **JWT Authentication**: Secure transport-level and session authentication.
- **Strict CORS & Talisman Middleware**: Hardened request policies preventing cross-site scripting (XSS) and injection vectors.
- **FHIR Interoperability**: Integration capabilities conforming to clinical resource standards.