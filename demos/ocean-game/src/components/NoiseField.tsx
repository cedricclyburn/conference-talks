import React from 'react';
import type { Creature } from '../types';

export const NoiseField: React.FC<{ creatures: Creature[] }> = ({ creatures }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {creatures.map((c) => (
        <div key={c.id} className="absolute text-white/90 noise-text" style={{
          left: `${(c.x + 2) % 100}vw`,
          top: `${(c.y - 5 + 100) % 100}vh`,
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(12px, 2.2vw, 28px)'
        }}>
          {c.error ? (
            <span className="text-red-200">✖</span>
          ) : (
            <span>{c.noise ?? '...'}</span>
          )}
        </div>
      ))}
    </div>
  );
};


