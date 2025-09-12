import React from 'react';
import type { Creature } from '../types';

export const CreaturesLayer: React.FC<{ creatures: Creature[] }> = ({ creatures }) => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {creatures.map((c) => (
        <div
          key={c.id}
          className="absolute animate-drift"
          style={{ left: `${c.x}vw`, top: `${c.y}vh` }}
        >
          <CreatureSVG type={c.type} />
        </div>
      ))}
    </div>
  );
};

const CreatureSVG: React.FC<{ type: Creature['type'] }> = ({ type }) => {
  const size = 72; // enlarged
  switch (type) {
    case 'lobster':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7c0-1.657 1.79-3 4-3s4 1.343 4 3" stroke="#ff4d4f" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="8" cy="10" r="2" fill="#ff7875"/>
          <circle cx="16" cy="10" r="2" fill="#ff7875"/>
          <path d="M12 12v6" stroke="#ff4d4f" strokeWidth="2"/>
          <path d="M10 18h4" stroke="#ff4d4f" strokeWidth="2"/>
        </svg>
      );
    case 'crab':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" fill="#ff6b6b"/>
          <path d="M4 12c2-2 3-2 5 0M20 12c-2-2-3-2-5 0" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'jelly':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10a6 6 0 0 1 12 0v1H6v-1z" fill="#a78bfa"/>
          <path d="M8 11v4M12 11v5M16 11v4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'octopus':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="10" r="4" fill="#34d399"/>
          <path d="M6 14c1 2 3 3 6 3s5-1 6-3" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12s4-4 9-4 9 4 9 4-4 4-9 4-9-4-9-4z" fill="#60a5fa"/>
          <circle cx="10" cy="12" r="1" fill="#1f2937"/>
        </svg>
      );
  }
};


