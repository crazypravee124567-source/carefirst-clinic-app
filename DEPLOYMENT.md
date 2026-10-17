# CareFirst Clinic — Production Deployment Guide

Stack: React/Vite frontend on **Vercel**, Spring Boot backend + PostgreSQL on **Render**.
Both platforms connect to this GitHub repository and redeploy automatically on every
push to `main` (CI runs first via GitHub Actions — see `.github/workflows/ci.yml`).

---

## 1. Backend on Render (Spring Boot + Postgres)

Render reads [`render.yaml`](render.yaml) (Blueprint).

1. Push this repo to GitHub (commit `render.yaml` at the repo root).
2. In the Render dashboard: **New → Blueprint**, select this repo.
   Render creates:
   - `carefirst-db` — managed PostgreSQL (free plan)
   - `carefirst-backend` — Java web service (rootDir `carefirst-clinic/backend/backend`,
     Java 21, health check `/api/health`)
3. After the first deploy, open **carefirst-db → Connections** and fill the three
   `sync: false` env vars on `carefirst-backend` (Environment tab):
   - `DB_URL` = `jdbc:postgresql://<db-host>:5432/carefirst`
     (**must** use the `jdbc:postgresql://` scheme — Render shows a `postgres://` URI, change the scheme)
   - `DB_USER` = the database user Render generated
   - `DB_PASSWORD` = the database password Render generated
4. Set `FRONTEND_URL` to the exact Vercel origin, e.g. `https://carefirst-clinic.vercel.app`
   (no trailing slash). The backend's CORS config only allows this origin in prod.
5. Redeploy the service (Manual Deploy → Clear build cache & deploy).
   Flyway migrates the schema automatically on boot.

Smoke test: `https://<your-backend>.onrender.com/api/health` → 200,
`https://<your-backend>.onrender.com/api/clinic` → clinic JSON.

## 2. Frontend on Vercel (static Vite build)

1. In Vercel: **Add New → Project**, import the GitHub repo.
2. Set **Root Directory** to `carefirst-clinic/Frontend` (Settings → General).
   Build command `npm run build`, output directory `dist` are auto-detected.
3. Add one env var (Settings → Environment Variables), then redeploy:
   - `VITE_API_BASE` = `https://<your-backend>.onrender.com` (no trailing slash)
4. `Frontend/vercel.json` already contains the SPA rewrite so deep links
   (`/appointments`, `/schedule`, …) work on refresh.
5. Optional: add your custom domain under Settings → Domains, then update
   `FRONTEND_URL` on Render to the new origin and redeploy the backend.

Smoke test: open the Vercel URL — admin portal loads, patient portal
(`/patient`) shows live doctors from the Render API, booking end-to-end works.

## 3. Environment variable reference

| Where | Variable | Example | Purpose |
|---|---|---|---|
| Vercel (build) | `VITE_API_BASE` | `https://carefirst-backend.onrender.com` | API base URL compiled into the frontend |
| Render | `SPRING_PROFILES_ACTIVE` | `prod` (set by blueprint) | Activates `application-prod.properties` |
| Render | `JAVA_VERSION` | `21` (set by blueprint) | JDK used by Render's Java runtime |
| Render | `DB_URL` | `jdbc:postgresql://host:5432/carefirst` | Prod datasource URL (JDBC scheme!) |
| Render | `DB_USER` / `DB_PASSWORD` | *(from Render DB page)* | Prod datasource credentials |
| Render | `FRONTEND_URL` | `https://<site>.vercel.app` | CORS allowlist for the frontend origin |

Never put these values in the repo — both platforms store them securely, and
`.gitignore` blocks every `.env*` file except `.env.example`.

## 4. Notes and limits

- Render and Vercel free tiers sleep after inactivity; the first request may
  take ~30s. Fine for evaluation — move to paid plans for a real clinic.
- The patient flow is hash-routed (`/patient#/...`) and works on any static host;
  the admin portal uses real paths and needs the SPA rewrite (already in `vercel.json`).
- Postgres on Render free plan: daily backups are not included — upgrade the
  database plan once real patient data exists.
