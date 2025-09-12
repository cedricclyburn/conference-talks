import React, { useEffect, useRef } from 'react';
import { useOcean } from './store';
import { generateNoise } from './llm';
import { CreaturesLayer } from './components/Creatures';
import { NoiseField } from './components/NoiseField';
import { Hud } from './components/Hud';
import { Bubbles } from './components/Bubbles';

export const App: React.FC = () => {
  const { creatures, addCreature, setCreatureNoise, setCreatureError, settings, incrementInflight, decrementInflight, stepMovement } = useOcean();
  const aborters = useRef(new Map<string, AbortController>());
  const talkTimers = useRef(new Map<string, number>());

  const requestNoise = async (id: string) => {
    const c = new AbortController();
    aborters.current.set(id, c);
    incrementInflight();
    const start = performance.now();
    try {
      const text = await generateNoise({
        backend: settings.backend,
        baseUrl: settings.llmBaseUrl,
        model: settings.model,
        prompt: promptForCreatureWithNeighbors(id)
      });
      const latency = Math.round(performance.now() - start);
      setCreatureNoise(id, text, latency);
    } catch (e: any) {
      setCreatureError(id, e?.message || 'error');
    } finally {
      decrementInflight();
      aborters.current.delete(id);
    }
  };

  const handleAdd = () => {
    const creature = addCreature();
    requestNoise(creature.id);
    scheduleNextTalk(creature.id);
  };

  // Auto-spawn interval
  useEffect(() => {
    if (!settings.autoSpawn) return;
    const intervalMs = 1000 / Math.max(0.1, settings.spawnRatePerSec);
    const int = window.setInterval(() => {
      const creature = addCreature();
      requestNoise(creature.id);
      scheduleNextTalk(creature.id);
    }, intervalMs);
    return () => window.clearInterval(int);
  }, [settings.autoSpawn, settings.spawnRatePerSec, settings.backend, settings.model, settings.llmBaseUrl]);

  // Movement loop
  useEffect(() => {
    let raf = 0; let last = performance.now();
    const loop = () => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      stepMovement(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [stepMovement]);

  // Talking scheduler
  const scheduleNextTalk = (id: string) => {
    if (!settings.talking) return;
    const jitter = (Math.random() * 0.6 + 0.7); // 0.7..1.3
    const intervalMs = (1000 / Math.max(0.1, settings.talkRatePerSec)) * jitter;
    const t = window.setTimeout(() => {
      requestNoise(id);
      scheduleNextTalk(id);
    }, intervalMs);
    talkTimers.current.set(id, t);
  };

  // Cleanup on unmount
  useEffect(() => () => {
    aborters.current.forEach((ac) => ac.abort());
    aborters.current.clear();
    talkTimers.current.forEach((t) => clearTimeout(t));
    talkTimers.current.clear();
  }, []);

  return (
    <div className="relative w-full h-dvh ocean-bg">
      <Bubbles />
      <Hud />
      <CreaturesLayer creatures={creatures} />
      <NoiseField creatures={creatures} />
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
        <button onClick={handleAdd} className="px-5 py-3 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow font-semibold">
          Add Creature
        </button>
      </div>
    </div>
  );
};

function promptForCreatureWithNeighbors(id: string): string {
  const state = useOcean.getState();
  const me = state.creatures.find((c) => c.id === id);
  if (!me) return 'Sea creature sound. Short, fun, emojis allowed.';
  // Find nearest neighbor and take its last noise
  let nearest: { d: number; noise: string } | null = null;
  for (const other of state.creatures) {
    if (other.id === id || !other.noise) continue;
    const dx = (other.x - me.x); const dy = (other.y - me.y);
    const d = dx * dx + dy * dy;
    if (!nearest || d < nearest.d) nearest = { d, noise: other.noise };
  }
  if (nearest?.noise) {
    return `Respond playfully to this nearby creature's sound with your own short ocean noise: "${nearest.noise}". Only sounds/emojis.`;
  }
  return 'Make the sound a sea creature would make. Short, fun, emojis allowed.';
}


