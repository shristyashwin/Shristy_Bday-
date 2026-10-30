import React, { useState } from 'react';
import { Heart, Sparkles, Check, Award, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';
import confetti from 'canvas-confetti';

export default function HeartGame({ onNext }) {
  const [collectedHearts, setCollectedHearts] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [activeHeartIndex, setActiveHeartIndex] = useState(null);

  const messages = birthdayConfig.heartGame.messages;
  const totalHearts = messages.length;
  const isAllCollected = collectedHearts.length === totalHearts;

  const handleHeartClick = (index) => {
    // Add to collected if not already
    if (!collectedHearts.includes(index)) {
      const nextCollected = [...collectedHearts, index];
      setCollectedHearts(nextCollected);

      // Cute burst of confetti
      confetti({
        particleCount: 25,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#ffd700', '#ffffff']
      });

      if (nextCollected.length === totalHearts) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700', '#ffffff']
          });
        }, 300);
      }
    }

    // Set active message
    setActiveHeartIndex(index);
    setActiveMessage(messages[index]);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 z-10 select-none">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center flex-1">
        
        {/* Header & Instructions */}
        <div className="text-center mb-5 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold mb-2 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span>Interactive Mini-Game</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-1">
            Collect My Hearts ❤️
          </h1>
          <p className="text-rose-600 text-xs sm:text-sm font-medium">
            {birthdayConfig.heartGame.instruction}
          </p>

          {/* Collection Progress Counter */}
          <div className="mt-3 px-5 py-2.5 rounded-2xl bg-white/90 border border-rose-200 shadow-md max-w-xs mx-auto">
            <div className="flex items-center justify-between text-xs font-bold text-rose-900 mb-1">
              <span>Hearts Collected:</span>
              <span className="font-mono text-sm text-rose-600 font-extrabold">
                {collectedHearts.length} / {totalHearts}
              </span>
            </div>
            <div className="w-full bg-rose-100 rounded-full h-3 overflow-hidden p-0.5 border border-rose-200/50">
              <div
                className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(collectedHearts.length / totalHearts) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Message Display Area (Always visible, fixed height so content doesn't shift) */}
        <div className="w-full max-w-lg min-h-[90px] mb-6 flex items-center justify-center">
          {activeMessage ? (
            <div className="w-full glass-panel-romantic rounded-2xl px-5 py-4 text-center shadow-lg border-2 border-rose-300 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Love Note #{(activeHeartIndex ?? 0) + 1}</span>
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              </div>
              <p className="font-serif italic text-base sm:text-lg text-slate-800 font-medium">
                "{activeMessage}"
              </p>
            </div>
          ) : (
            <div className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-dashed border-rose-300 text-center text-rose-600/90 text-sm italic shadow-xs">
              ✨ Click on any of the 10 hearts below to reveal its secret love note! ✨
            </div>
          )}
        </div>

        {/* 10 Hearts in Fixed, Clear, Distinct Positions (2 rows of 5) */}
        <div className="w-full max-w-2xl bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-rose-200/70 shadow-lg mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 md:gap-5 justify-items-center">
            {messages.map((_, index) => {
              const isCollected = collectedHearts.includes(index);
              const isActive = activeHeartIndex === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleHeartClick(index)}
                  className={`w-24 h-24 sm:w-26 sm:h-26 rounded-3xl p-2 flex flex-col items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer border-2 ${
                    isActive
                      ? 'ring-4 ring-rose-400 scale-105 border-white'
                      : 'hover:scale-105'
                  } ${
                    isCollected
                      ? 'bg-gradient-to-tr from-pink-400 via-rose-500 to-rose-600 text-white shadow-md border-rose-300'
                      : 'bg-white hover:bg-rose-50 text-rose-500 shadow-sm border-rose-200'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <Heart
                      className={`w-10 h-10 transition-transform ${
                        isCollected ? 'fill-white text-white drop-shadow' : 'fill-rose-100 text-rose-500'
                      }`}
                    />
                    {isCollected && (
                      <Check className="w-5 h-5 text-rose-600 stroke-[3.5] absolute" />
                    )}
                  </div>

                  <span className={`text-xs font-bold mt-1.5 ${isCollected ? 'text-white' : 'text-rose-700'}`}>
                    Heart #{index + 1}
                  </span>

                  <span className={`text-[10px] font-medium ${isCollected ? 'text-rose-100' : 'text-rose-400'}`}>
                    {isCollected ? 'Collected ❤️' : 'Click me!'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Completion Card (Appears when all 10 are collected) */}
        {isAllCollected && (
          <div className="w-full max-w-lg glass-panel-romantic rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-2 border-rose-300 my-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-400/40 mb-3 animate-bounce">
              <Award className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              All 10 Hearts Collected!
            </h2>
            <p className="text-rose-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              {birthdayConfig.heartGame.completionMessage}
            </p>

            <RomanticButton
              onClick={onNext}
              size="lg"
              className="shadow-xl"
            >
              {birthdayConfig.heartGame.buttonText}
            </RomanticButton>
          </div>
        )}

      </div>

      {/* Footer status */}
      <div className="w-full max-w-md mx-auto pt-2 text-center text-xs text-rose-600/80 font-medium">
        {collectedHearts.length < totalHearts 
          ? `Click each heart to read all 10 love notes (${collectedHearts.length}/${totalHearts} collected)`
          : "All 10 love notes unlocked for Shristy! ❤️"}
      </div>
    </div>
  );
}
