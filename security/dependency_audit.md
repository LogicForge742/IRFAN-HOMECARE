# Dependency Security Audit

## Backend (Python)
- Run `pip-audit` regularly.
- Keep dependencies updated.
- Notable vulnerabilities checked:
  - `Werkzeug`: Verified running version >= 3.0 to avoid session parsing vulnerabilities.
  - `PyJWT`: Verified running version >= 2.4 to avoid token bypass vulnerabilities.

## Frontend (Node.js)
- Run `npm audit` regularly.
- Maintain minimal vulnerability count.
