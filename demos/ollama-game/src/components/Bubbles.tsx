import React, { useMemo } from 'react';

export const Bubbles: React.FC<{ count?: number }> = ({ count = 24 }) => {
  const bubbles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 8
  })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b) => (
        <div key={b.id}
             className="absolute rounded-full bg-sky-100/40"
             style={{
               left: `${b.left}vw`,
               bottom: `-10vh`,
               width: `${b.size}px`,
               height: `${b.size}px`,
               animation: `bubbleUp ${b.duration}s linear ${b.delay}s infinite`
             }}
        />
      ))}
      <style>{`
        @keyframes bubbleUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-110vh) translateX(-5vw); opacity: 0; }
        }
      `}</style>
    </div>
  );
};


