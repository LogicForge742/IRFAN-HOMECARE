# OWASP Top 10 Security Review

## A01:2021-Broken Access Control
- Enforce strict role-based access control (RBAC) on all routes.
- Analytics endpoints require the `admin` role.
- Medical records require ownership or assigned healthcare professional association.

## A02:2021-Cryptographic Failures
- SSL/TLS v1.3 configuration enforced at Nginx/Cloudflare layers.
- Salting and hashing passwords via Bcrypt.

## A03:2021-Injection
- Parameterized queries utilizing SQLAlchemy ORM.
- Sanitized user input schema serialization via Marshmallow.
