export type BackendType = 'openai' | 'ollama';

export type CreatureType = 'lobster' | 'fish' | 'crab' | 'jelly' | 'octopus';

export interface Creature {
  id: string;
  type: CreatureType;
  x: number; // 0..100 vw percentage
  y: number; // 0..100 vh percentage
  vx?: number; // vw per second
  vy?: number; // vh per second
  createdAt: number;
  noise?: string; // last utterance
  latencyMs?: number;
  error?: string;
}

export interface MetricsState {
  totalCreatures: number;
  inflight: number;
  avgLatencyMs: number;
  errors: number;
  loadPoints?: number[]; // recent inflight/request load samples
}

export interface SettingsState {
  backend: BackendType; // openai (vLLM) or ollama (llama.cpp)
  llmBaseUrl: string; // VITE_LLM_BASE
  model: string; // VITE_MODEL
  autoSpawn: boolean;
  spawnRatePerSec: number; // when autoSpawn true
  talking: boolean;
  talkRatePerSec: number; // per creature average
}


