import { create } from 'zustand';
import type { BackendType, Creature, CreatureType, MetricsState, SettingsState } from './types';
import { getInitialEnv } from './config';

const initial = getInitialEnv();
const DEFAULT_BACKEND = (initial.backend as BackendType) || 'ollama';
const DEFAULT_BASE = (initial.base as string) || 'http://localhost:11434';
const DEFAULT_MODEL = (initial.model as string) || 'llama3.2:3b';

export interface OceanState {
  creatures: Creature[];
  metrics: MetricsState;
  settings: SettingsState;
  addCreature: (partial?: Partial<Creature>) => Creature;
  setCreatureNoise: (id: string, noise: string, latencyMs: number) => void;
  setCreatureError: (id: string, error: string) => void;
  setCreatureVelocity: (id: string, vx: number, vy: number) => void;
  stepMovement: (dtSec: number) => void;
  setBackend: (b: BackendType) => void;
  setBaseUrl: (url: string) => void;
  setModel: (m: string) => void;
  setAutoSpawn: (enabled: boolean) => void;
  setSpawnRate: (rate: number) => void;
  setTalking: (enabled: boolean) => void;
  setTalkRate: (rate: number) => void;
  incrementInflight: () => void;
  decrementInflight: () => void;
  sampleLoad: () => void;
}

const randomCreatureType = (): CreatureType => {
  const pool: CreatureType[] = ['meatball', 'ikea-bag', 'spotify-speaker', 'dala-horse', 'northern-lights'];
  return pool[Math.floor(Math.random() * pool.length)];
};

const randomPos = () => ({
  x: Math.random() * 90 + 5,
  y: Math.random() * 80 + 10
});

export const useOcean = create<OceanState>((set, get) => ({
  creatures: [],
  metrics: {
    totalCreatures: 0,
    inflight: 0,
    avgLatencyMs: 0,
    errors: 0,
    loadPoints: []
  },
  settings: {
    backend: DEFAULT_BACKEND,
    llmBaseUrl: DEFAULT_BASE,
    model: DEFAULT_MODEL,
    autoSpawn: false,
    spawnRatePerSec: 1,
    talking: true,
    talkRatePerSec: 0.5
  },
  addCreature: (partial) => {
    const id = crypto.randomUUID();
    const now = Date.now();
    const pos = randomPos();
    const creature: Creature = {
      id,
      type: partial?.type || randomCreatureType(),
      x: partial?.x ?? pos.x,
      y: partial?.y ?? pos.y,
      vx: (Math.random() * 10 - 5) * 0.2, // vw/s small drift
      vy: (Math.random() * 10 - 5) * 0.2, // vh/s
      createdAt: now
    };
    set((s) => ({
      creatures: [...s.creatures, creature],
      metrics: { ...s.metrics, totalCreatures: s.metrics.totalCreatures + 1 }
    }));
    return creature;
  },
  setCreatureNoise: (id, noise, latencyMs) => {
    set((s) => ({
      creatures: s.creatures.map((c) => (c.id === id ? { ...c, noise, latencyMs } : c)),
      metrics: {
        ...s.metrics,
        avgLatencyMs:
          s.metrics.avgLatencyMs === 0 ? latencyMs : Math.round((s.metrics.avgLatencyMs + latencyMs) / 2)
      }
    }));
  },
  setCreatureError: (id, error) => {
    set((s) => ({
      creatures: s.creatures.map((c) => (c.id === id ? { ...c, error } : c)),
      metrics: { ...s.metrics, errors: s.metrics.errors + 1 }
    }));
  },
  setCreatureVelocity: (id, vx, vy) => set((s) => ({
    creatures: s.creatures.map((c) => (c.id === id ? { ...c, vx, vy } : c))
  })),
  stepMovement: (dtSec) => set((s) => ({
    creatures: s.creatures.map((c) => {
      const vx = c.vx ?? 0; const vy = c.vy ?? 0;
      let nx = c.x + vx * dtSec; let ny = c.y + vy * dtSec;
      let nvx = vx; let nvy = vy;
      if (nx < 2 || nx > 98) { nvx = -vx; nx = Math.min(98, Math.max(2, nx)); }
      if (ny < 6 || ny > 94) { nvy = -vy; ny = Math.min(94, Math.max(6, ny)); }
      return { ...c, x: nx, y: ny, vx: nvx, vy: nvy };
    })
  })),
  setBackend: (b) => set((s) => ({ settings: { ...s.settings, backend: b } })),
  setBaseUrl: (url) => set((s) => ({ settings: { ...s.settings, llmBaseUrl: url } })),
  setModel: (m) => set((s) => ({ settings: { ...s.settings, model: m } })),
  setAutoSpawn: (enabled) => set((s) => ({ settings: { ...s.settings, autoSpawn: enabled } })),
  setSpawnRate: (rate) => set((s) => ({ settings: { ...s.settings, spawnRatePerSec: rate } })),
  setTalking: (enabled) => set((s) => ({ settings: { ...s.settings, talking: enabled } })),
  setTalkRate: (rate) => set((s) => ({ settings: { ...s.settings, talkRatePerSec: rate } })),
  incrementInflight: () => set((s) => ({ metrics: { ...s.metrics, inflight: s.metrics.inflight + 1 } })),
  decrementInflight: () => set((s) => ({ metrics: { ...s.metrics, inflight: Math.max(0, s.metrics.inflight - 1) } })),
  sampleLoad: () => set((s) => {
    const points = s.metrics.loadPoints ?? [];
    const next = [...points, s.metrics.inflight].slice(-100);
    return { metrics: { ...s.metrics, loadPoints: next } };
  })
}));


