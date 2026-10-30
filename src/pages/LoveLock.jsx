import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, Sparkles, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';
import confetti from 'canvas-confetti';

export default function LoveLock({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === birthdayConfig.recipient.secretPassword) {
      setIsUnlocked(true);
      setError('');

      // Burst gentle romantic confetti & sparkles
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffffff']
      });

      // Smooth delay to appreciate lock opening animation
      setTimeout(() => {
        onUnlock();
      }, 1400);
    } else {
      setError(birthdayConfig.recipient.wrongPasswordMessage);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden z-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md mx-auto text-center"
      >
        {/* Animated Heart Lock Icon */}
        <div className="relative inline-block mb-6">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-rose-400/30 rounded-full blur-2xl transform scale-150 animate-pulse"></div>

          <motion.div
            animate={isUnlocked ? { scale: [1, 1.2, 1.1], rotate: [0, -10, 10, 0] } : { y: [0, -8, 0] }}
            transition={isUnlocked ? { duration: 0.8 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-28 h-28 md:w-32 md:h-32 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 p-1 shadow-2xl shadow-rose-500/30 flex items-center justify-center border-4 border-white/70"
          >
            {/* Heart Shape Shackle Effect */}
            <div className="flex flex-col items-center justify-center">
              {isUnlocked ? (
                <motion.div
                  initial={{ scale: 0.5, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Unlock className="w-14 h-14 md:w-16 md:h-16 text-white stroke-[2.2] drop-shadow-md" />
                </motion.div>
              ) : (
                <Lock className="w-14 h-14 md:w-16 md:h-16 text-white stroke-[2.2] drop-shadow-md" />
              )}
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-1"
              >
                <Heart className="w-4 h-4 fill-white text-white drop-shadow" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Card Content */}
        <motion.div
          animate={isShaking ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="glass-panel-romantic rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top romantic decorative badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs md:text-sm font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>A Secret Realm for You</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          </div>

          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 leading-tight">
            A little surprise is waiting for you...
          </h1>
          <p className="font-sans text-rose-600/90 text-sm md:text-base mb-6 leading-relaxed">
            Only someone special can enter this little world. 💕
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter our secret code..."
                className="w-full px-5 py-3.5 pl-12 rounded-2xl bg-white/90 border-2 border-rose-200 text-slate-800 placeholder-rose-300 font-mono tracking-widest text-center text-lg focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-200/50 shadow-inner transition-all duration-200"
                disabled={isUnlocked}
                autoFocus
              />
              <KeyRound className="w-5 h-5 text-rose-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  className="p-3 rounded-xl bg-rose-100/90 border border-rose-300 text-rose-700 text-xs md:text-sm font-medium leading-snug shadow-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-2">
              <RomanticButton
                type="submit"
                size="md"
                className="w-full"
                disabled={isUnlocked || !password}
                icon={isUnlocked ? Unlock : Heart}
              >
                {isUnlocked ? "Unlocking My Heart... ✨" : "Unlock My World ❤️"}
              </RomanticButton>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

