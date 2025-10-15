import type { BackendType } from './types';

declare global {
  interface Window { __OCEAN_CONFIG__?: Record<string, string>; }
}

export function getInitialEnv() {
  const w = typeof window !== 'undefined' ? window.__OCEAN_CONFIG__ ?? {} : {};
  const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {};
  const backend = (env.VITE_LLM_API || w.VITE_LLM_API || 'ollama') as BackendType;
  const base = (env.VITE_LLM_BASE || w.VITE_LLM_BASE || 'http://localhost:11434') as string;
  const model = (env.VITE_MODEL || w.VITE_MODEL || 'ramalama') as string;
  return { backend, base, model };
}


