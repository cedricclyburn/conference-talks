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
  const size = 80;
  switch (type) {
    case 'meatball':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="22" fill="#8c4a2f" stroke="#5e2c16" strokeWidth="4"/>
          <circle cx="24" cy="24" r="4" fill="rgba(255,187,120,0.7)"/>
          <circle cx="38" cy="28" r="3" fill="rgba(255,187,120,0.6)"/>
          <circle cx="30" cy="40" r="5" fill="rgba(255,187,120,0.5)"/>
          <path d="M18 18c3-6 8-10 14-11" stroke="#f4d35e" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );
    case 'ikea-bag':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="20" width="40" height="30" rx="4" fill="#0a74da"/>
          <rect x="12" y="36" width="40" height="16" rx="4" fill="#0857a6"/>
          <path d="M20 20c0-8 24-8 24 0" stroke="#f5c518" strokeWidth="4" strokeLinecap="round"/>
          <path d="M16 32h32" stroke="#f5c518" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4"/>
        </svg>
      );
    case 'spotify-speaker':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="10" width="28" height="44" rx="6" fill="#1ed760" stroke="#0f5132" strokeWidth="4"/>
          <circle cx="32" cy="26" r="6" fill="#0f5132"/>
          <circle cx="32" cy="40" r="10" fill="#0f5132"/>
          <path d="M26 38c4 2 12 2 16 0" stroke="#1ed760" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );
    case 'dala-horse':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 38c2-12 6-20 16-22 6-1 10 2 14 6 6 5 14 6 14 6l-4 12H12z" fill="#d62839" stroke="#84151f" strokeWidth="4" strokeLinejoin="round"/>
          <path d="M20 36c6-6 14-6 20 0" stroke="#f4d35e" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="22" cy="24" r="3" fill="#fdd85d"/>
        </svg>
      );
    case 'northern-lights':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 48c6-10 16-18 24-18s18 8 24 18" stroke="#8cf0ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
          <path d="M12 36c4-6 12-14 20-14s16 8 20 14" stroke="#a7ffd9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          <path d="M16 24c4-6 10-10 16-10s12 4 16 10" stroke="#6ad1ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
        </svg>
      );
  }
};


