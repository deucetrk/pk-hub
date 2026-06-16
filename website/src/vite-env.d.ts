/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PARTNER_LEAD_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
