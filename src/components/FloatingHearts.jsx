import React, { useMemo } from 'react';

export default function FloatingHearts({ count = 18 }) {
  const particles = useMemo(() => {
    const types = ['❤️', '💖', '💕', '✨', '🌸', '💗'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      char: types[i % types.length],
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.random() * 16 + 14, // 14px to 30px
      duration: Math.random() * 10 + 12, // 12s to 22s
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.15, // 0.15 to 0.55
      sway: Math.random() * 40 - 20, // -20px to +20px
    }));
  }, [count]);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute inline-block transition-transform will-change-transform"
          style={{
            left: `${p.left}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.char}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-50vh) translateX(15px) rotate(180deg);
          }
          100% {
            transform: translateY(-110vh) translateX(-15px) rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform {
            animation: none !important;
            opacity: 0.1 !important;
          }
        }
      `}</style>
    </div>
  );
}

