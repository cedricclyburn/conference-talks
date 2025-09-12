import React, { useEffect } from 'react';
import { useOcean } from '../store';
import type { BackendType } from '../types';

export const Hud: React.FC = () => {
  const { metrics, settings, setBackend, setAutoSpawn, setSpawnRate, setModel, setTalking, setTalkRate, sampleLoad } = useOcean();
  const onBackendChange = (e: React.ChangeEvent<HTMLSelectElement>) => setBackend(e.target.value as BackendType);

  useEffect(() => {
    const id = setInterval(() => sampleLoad(), 1000);
    return () => clearInterval(id);
  }, [sampleLoad]);

  return (
    <div className="absolute top-2 left-2 right-2 md:left-4 md:right-auto z-20 bg-white/70 backdrop-blur rounded px-3 py-2 text-sm shadow">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <div className="font-semibold">Ocean of Tokens</div>
        <div>Creatures: <span className="font-medium">{metrics.totalCreatures}</span></div>
        <div>Inflight: <span className="font-medium">{metrics.inflight}</span></div>
        <div>Avg latency: <span className="font-medium">{metrics.avgLatencyMs} ms</span></div>
        <div>Errors: <span className="font-medium text-red-600">{metrics.errors}</span></div>
      </div>
      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <LoadSparkline points={metrics.loadPoints || []} />
        <label className="flex items-center gap-2">
          <span>Backend</span>
          <select value={settings.backend} onChange={onBackendChange} className="border rounded px-2 py-1">
            <option value="ollama">llama.cpp (Ollama API)</option>
            <option value="openai">vLLM (OpenAI API)</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span>Model</span>
          <input value={settings.model} onChange={(e) => setModel(e.target.value)} className="border rounded px-2 py-1 w-40"/>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={settings.autoSpawn} onChange={(e) => setAutoSpawn(e.target.checked)} />
          <span>Auto-spawn</span>
        </label>
        <label className="flex items-center gap-2">
          <span>Rate</span>
          <input type="range" min={0.2} max={10} step={0.2} value={settings.spawnRatePerSec}
                 onChange={(e) => setSpawnRate(Number(e.target.value))}
          />
          <span className="tabular-nums w-10">{settings.spawnRatePerSec.toFixed(1)}/s</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={settings.talking} onChange={(e) => setTalking(e.target.checked)} />
          <span>Talking</span>
        </label>
        <label className="flex items-center gap-2">
          <span>Talk rate</span>
          <input type="range" min={0.2} max={3} step={0.1} value={settings.talkRatePerSec}
                 onChange={(e) => setTalkRate(Number(e.target.value))}
          />
          <span className="tabular-nums w-10">{settings.talkRatePerSec.toFixed(1)}/s</span>
        </label>
      </div>
    </div>
  );
};

const LoadSparkline: React.FC<{ points: number[] }> = ({ points }) => {
  const w = 160; const h = 36; const pad = 4;
  const max = Math.max(1, ...points);
  const step = points.length > 1 ? (w - pad * 2) / (points.length - 1) : 0;
  const d = points.map((p, i) => {
    const x = pad + i * step;
    const y = h - pad - (p / max) * (h - pad * 2);
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} className="text-slate-700">
      <rect x={0} y={0} width={w} height={h} rx={4} className="fill-white/70" />
      <path d={d || ''} fill="none" stroke="#0ea5e9" strokeWidth={2} />
    </svg>
  );
};


