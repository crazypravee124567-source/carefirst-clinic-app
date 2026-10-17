/// <reference types="vite/client" />

// Env vars available to the frontend at build time.
// VITE_API_BASE: absolute URL of the Spring Boot backend (no trailing slash).
//   Local dev: leave unset -> falls back to http://localhost:8081
//   Production: set in Vercel project env vars -> https://<your-backend>.onrender.com
interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
