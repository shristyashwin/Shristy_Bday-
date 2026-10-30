import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, ShieldCheck, Check } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';
import confetti from 'canvas-confetti';

export default function Promises({ onNext }) {
  const [openedCards, setOpenedCards] = useState([]);

  const promises = birthdayConfig.promises.cards;
  const allOpened = openedCards.length === promises.length;

  const handleCardClick = (id) => {
    if (!openedCards.includes(id)) {
      const newOpened = [...openedCards, id];
      setOpenedCards(newOpened);

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#ffd1dc']
      });

      if (newOpened.length === promises.length) {
        setTimeout(() => {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700']
          });
        }, 300);
      }
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'sparkles': return <Sparkles className="w-6 h-6 text-amber-300" />;
      case 'heart': return <Heart className="w-6 h-6 fill-rose-300 text-rose-300" />;
      case 'star': return <Star className="w-6 h-6 fill-amber-300 text-amber-300" />;
      default: return <ShieldCheck className="w-6 h-6 text-pink-300" />;
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 md:px-8 z-10 select-none">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-xl"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200 text-rose-700 text-xs md:text-sm font-semibold mb-3 shadow-sm backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Vows From My Soul</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            {birthdayConfig.promises.heading}
          </h1>
          <p className="font-script text-2xl md:text-3xl text-rose-600 font-bold">
            {birthdayConfig.promises.subheading}
          </p>

          <p className="text-xs text-rose-500 mt-2 font-medium">
            (Tap each heart card to reveal my promise to you 💕)
          </p>
        </motion.div>

        {/* The 3 Promise Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl">
          {promises.map((p, index) => {
            const isOpened = openedCards.includes(p.id);

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => handleCardClick(p.id)}
                className={`relative min-h-[320px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl border ${
                  isOpened 
                    ? 'glass-panel-romantic border-rose-300 shadow-rose-300/30' 
                    : 'bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 text-white border-white/40 shadow-rose-500/30 hover:shadow-2xl'
                }`}
              >
                {/* Closed Card View */}
                {!isOpened ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30"
                    >
                      {getIcon(p.icon)}
                    </motion.div>

                    <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">
                      Promise #{p.id}
                    </span>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                      {p.title}
                    </h3>

                    <p className="text-xs text-white/90 font-medium italic mb-6">
                      "{p.preview}"
                    </p>

                    <span className="px-4 py-1.5 rounded-full bg-white/25 hover:bg-white/35 text-xs font-semibold text-white backdrop-blur-sm transition-colors border border-white/40">
                      Tap to Unfold ✨
                    </span>
                  </div>
                ) : (
                  /* Opened Card View */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col justify-between text-left"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-wider uppercase">
                          Promise #{p.id}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-900 mb-3">
                        {p.title}
                      </h3>

                      <p className="font-serif text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed italic">
                        "{p.description}"
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-rose-200/60 flex items-center gap-1.5 text-xs text-rose-500 font-semibold">
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>Sealed with love</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message & Next Step */}
        <AnimatePresence>
          {allOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mt-14 text-center max-w-lg glass-panel-romantic rounded-3xl p-8 shadow-2xl border border-rose-200"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-400/40 mb-3">
                <Heart className="w-7 h-7 fill-white" />
              </div>

              <p className="font-serif italic text-lg md:text-xl text-rose-900 mb-6 font-semibold leading-relaxed">
                "{birthdayConfig.promises.completionMessage}"
              </p>

              <RomanticButton
                onClick={onNext}
                size="lg"
                className="shadow-xl"
              >
                {birthdayConfig.promises.buttonText}
              </RomanticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

