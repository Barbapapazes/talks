/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INTERACTIVE_TALKS_BASE_URL: string
  readonly VITE_INTERACTIVE_TALKS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
