# FirstGreen Technical Documentation

## Architecture
- SPA with modular sections (`index.html` + `app.js` components rendered from data maps)
- PWA capabilities via `manifest.webmanifest` and `sw.js`
- SSR-ready migration path: port sections to Next.js app router and hydrate `app.js` interaction modules client-side.

## Security/Compliance Readiness
- TLS enforced in deployment layer (reverse proxy/CDN)
- MFA and biometric setup represented in onboarding flow
- Fraud alert / security center hooks represented in UI and integration section
- Compliance controls checklist:
  - SOC 2 Type II logging, change management, SIEM forwarding
  - PCI DSS segmentation for payment paths

## API Integration Points
- `POST /api/v1/profile/create`
- `POST /api/v1/auth/mfa/enroll`
- `GET /api/v1/rates/live`
- `POST /api/v1/fraud/events`
- `POST /api/v1/integrations/bricksgold/webhook`

## Deployment Checklist
1. Serve through edge CDN with Brotli and HTTP/2.
2. Set strict CSP, HSTS, X-Frame-Options, Referrer-Policy.
3. Run Lighthouse + accessibility scans in CI.
4. Configure uptime monitors and synthetic journey tests.
5. Enable GA4 events and consent mode.
