import React, { useEffect, useRef } from 'react';
import { useOcean } from './store';
import { generateNoise } from './llm';
import { CreaturesLayer } from './components/Creatures';
import { NoiseField } from './components/NoiseField';
import { Hud } from './components/Hud';
import { Bubbles } from './components/Bubbles';
import type { CreatureType } from './types';

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
        prompt: promptForCreatureWithNeighbors(id),
        signal: c.signal
      });
      const latency = Math.round(performance.now() - start);
      setCreatureNoise(id, text, latency);
    } catch (e: any) {
      console.error('Stockholm chatter error', e);
      const latency = Math.round(performance.now() - start);
      setCreatureError(id, e?.message || 'error');
      setCreatureNoise(id, fallbackNoise(), latency);
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
    <div className="relative w-full h-dvh theme-bg overflow-hidden text-white">
      <div className="aurora" />
      <div className="floating-islands" />
      <div className="stockholm-skyline" />
      <Bubbles count={28} />
      <Hud />
      <CreaturesLayer creatures={creatures} />
      <NoiseField creatures={creatures} />
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
        <button onClick={handleAdd} className="px-6 py-3 rounded-full bg-white/85 hover:bg-white text-slate-900 shadow-lg font-semibold tracking-wide">
          Add Swedish Vibe
        </button>
      </div>
    </div>
  );
};

function promptForCreatureWithNeighbors(id: string): string {
  const state = useOcean.getState();
  const me = state.creatures.find((c) => c.id === id);
  if (!me) return basePrompt('northern-lights');
  // Find nearest neighbor and take its last noise
  let nearest: { d: number; noise: string } | null = null;
  for (const other of state.creatures) {
    if (other.id === id || !other.noise) continue;
    const dx = (other.x - me.x); const dy = (other.y - me.y);
    const d = dx * dx + dy * dy;
    if (!nearest || d < nearest.d) nearest = { d, noise: other.noise };
  }
  if (nearest?.noise) {
    const heard = cleanNoise(nearest.noise);
    return `${basePrompt(me.type)} You just heard another Stockholm icon exclaim "${heard}". Answer with a fresh, upbeat riff that complements it without copying the same words.`;
  }
  return basePrompt(me.type);
}


const creatureVibes: Record<CreatureType, { persona: string; emoji: string }> = {
  'meatball': { persona: 'a sizzling skillet of köttbullar cheering for fika time', emoji: '🍽️' },
  'ikea-bag': { persona: 'a trusty IKEA FRAKTA bag rustling along Drottninggatan', emoji: '🛍️' },
  'spotify-speaker': { persona: 'a Spotify boombox blasting ABBA on a summer ferry', emoji: '🎶' },
  'dala-horse': { persona: 'a painted Dala horse trotting through Gamla Stan', emoji: '🐴' },
  'northern-lights': { persona: 'a ribbon of northern lights dancing above Stockholm', emoji: '✨' }
};

function basePrompt(type: CreatureType): string {
  const vibe = creatureVibes[type] ?? creatureVibes['northern-lights'];
  return `You are ${vibe.persona}. Share a short, joyful burst (max 8 words) mixing Swedish charm, playful onomatopoeia, and maybe words like "hej", "fika", "lagom", or "skål". Include one fitting emoji such as ${vibe.emoji} or 🇸🇪.`;
}

function cleanNoise(noise: string): string {
  return noise.replace(/\s+/g, ' ').trim().slice(0, 160);
}

function fallbackNoise(): string {
  const samples = [
    'Hej hej skål-skål! 🇸🇪',
    'Fika-fiika woohoo! ☕️',
    'Lagom lull lull! 🎶',
    'Stockholm swoosh wüü! ✨',
    'ABBA bop skål! 🎤'
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}


