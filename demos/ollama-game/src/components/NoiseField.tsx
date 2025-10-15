import React from 'react';
import type { Creature } from '../types';

export const NoiseField: React.FC<{ creatures: Creature[] }> = ({ creatures }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {creatures.map((c) => (
        <div key={c.id} className="absolute text-white/90 noise-text tracking-wide" style={{
          left: `${(c.x + 2) % 100}vw`,
          top: `${(c.y - 5 + 100) % 100}vh`,
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(12px, 2.2vw, 28px)'
        }}>
          {c.noise ? (
            <span className={c.error ? 'text-red-200/90 drop-shadow' : undefined}>
              {c.noise}
              {c.error ? <span className="ml-2 text-red-300">✖</span> : null}
            </span>
          ) : c.error ? (
            <span className="text-red-200">✖</span>
          ) : (
            <span>...</span>
          )}
        </div>
      ))}
    </div>
  );
};


