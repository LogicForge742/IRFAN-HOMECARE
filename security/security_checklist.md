# Irfan HomeCare — Production Security Checklist

## 1. Authentication & Session Management
- [x] All communications enforced via HTTPS.
- [x] Passwords hashed using bcrypt.
- [x] JWT sessions short-lived.
- [x] Rate limiting configured on auth routes (Flask-Limiter).

## 2. Infrastructure Security
- [ ] Database isolated within private VPC subnet.
- [ ] SSH root logins disabled on deployment hosts.
- [ ] Secrets loaded via environment variables/Secrets Manager.

## 3. Data Protection & Privacy
- [ ] All database connections encrypted in transit.
- [ ] Patient medical records encrypted at rest using AES-256.
