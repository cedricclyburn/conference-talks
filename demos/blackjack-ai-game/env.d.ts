/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_AI_ENDPOINT: string
  readonly VITE_REMOTE_AI_ENDPOINT: string
  readonly VITE_REMOTE_AI_KEY: string
  readonly VITE_USE_LOCAL_AI: string
  readonly VITE_SHOW_PERFORMANCE_MONITOR: string
  readonly VITE_SESSION_TIMEOUT: string
  readonly VITE_MAX_CONCURRENT_SESSIONS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
