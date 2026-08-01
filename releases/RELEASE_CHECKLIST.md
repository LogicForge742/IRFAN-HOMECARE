# Release Checklist — v1.0.0

## Pre-Release Checks
- [ ] Run all frontend unit tests (`npm run test`).
- [ ] Run all backend unit/integration tests (`pytest`).
- [ ] Compile the frontend build production bundle.
- [ ] Execute security vulnerability audits (`npm audit` & `pip-audit`).

## Release Action Items
- [ ] Tag the release commit: `git tag -a v1.0.0 -m "Release v1.0.0"`.
- [ ] Push tags to remote: `git push origin v1.0.0`.
- [ ] Run deploy pipeline script `deploy.sh`.
