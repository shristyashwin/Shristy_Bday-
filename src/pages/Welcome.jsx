import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Stars, Gift } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';

export default function Welcome({ onNext }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-xl mx-auto"
      >
        <div className="glass-panel-romantic rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border border-rose-200/80 text-center">
          {/* Decorative Corner Flowers / Hearts */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-bl from-rose-300/40 to-pink-200/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-rose-300/40 to-pink-200/20 rounded-full blur-xl pointer-events-none" />

          {/* Cute Romantic Illustration */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-flex items-center justify-center mb-5"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-rose-400 via-pink-400 to-rose-300 flex items-center justify-center shadow-lg shadow-rose-300/50 border-4 border-white">
              <span className="text-3xl md:text-4xl filter drop-shadow">👑</span>
            </div>
            {/* Cute side accents */}
            <motion.div
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1 -right-2 text-rose-500"
            >
              <Heart className="w-6 h-6 fill-rose-500" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-1 -left-2 text-pink-400"
            >
              <Sparkles className="w-6 h-6 fill-pink-400" />
            </motion.div>
          </motion.div>

          {/* Welcome Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-slate-800 mb-2 leading-tight">
              {birthdayConfig.welcome.heading}
            </h1>
            <p className="font-script text-2xl md:text-3xl text-rose-600 mb-6 font-bold">
              {birthdayConfig.welcome.subheading}
            </p>
          </motion.div>

          {/* Welcome Narrative Paragraphs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto"
          >
            {birthdayConfig.welcome.paragraphs.map((p, idx) => (
              <p 
                key={idx} 
                className={idx === birthdayConfig.welcome.paragraphs.length - 1 ? "font-medium text-rose-800 italic" : ""}
              >
                {p}
              </p>
            ))}
          </motion.div>

          {/* Romantic Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <RomanticButton
              onClick={onNext}
              size="lg"
              className="shadow-xl"
            >
              {birthdayConfig.welcome.buttonText}
            </RomanticButton>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

