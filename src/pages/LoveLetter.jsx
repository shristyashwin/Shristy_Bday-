import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Eye, Lock, Key } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';
import confetti from 'canvas-confetti';

export default function LoveLetter({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedTextLength, setDisplayedTextLength] = useState(0);
  const [showFullImmediately, setShowFullImmediately] = useState(false);
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  const fullLetterText = birthdayConfig.letters.mainLetter.paragraphs.join("\n\n");

  // Typewriter effect when main envelope is opened
  useEffect(() => {
    if (!isOpen || showFullImmediately) {
      if (showFullImmediately) {
        setDisplayedTextLength(fullLetterText.length);
      }
      return;
    }

    const interval = setInterval(() => {
      setDisplayedTextLength((prev) => {
        if (prev >= fullLetterText.length) {
          clearInterval(interval);
          return fullLetterText.length;
        }
        return prev + 2; // speed: 2 characters per step
      });
    }, 25);

    return () => clearInterval(interval);
  }, [isOpen, showFullImmediately, fullLetterText.length]);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#ffe4e6']
    });
  };

  const handleOpenSecretLetter = () => {
    setIsSecretOpen(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#b76e79', '#f43f5e', '#ffd700']
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 z-10">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Header Before Open */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-rose-200 text-rose-700 text-xs font-semibold mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Handwritten From The Heart</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
              {birthdayConfig.letters.envelopeHeading}
            </h1>
            <p className="text-xs md:text-sm text-rose-600 mt-1">
              {birthdayConfig.letters.envelopeInstruction}
            </p>
          </motion.div>
        )}

        {/* The Closed Envelope View */}
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenEnvelope}
            className="cursor-pointer group relative w-72 h-48 md:w-80 md:h-52 bg-gradient-to-tr from-rose-200 via-pink-100 to-rose-300 rounded-3xl shadow-2xl border-2 border-white/80 flex items-center justify-center p-4 overflow-hidden select-none"
          >
            {/* Envelope Flap visual */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-rose-300 to-rose-200/40 clip-path-triangle opacity-70 group-hover:opacity-90 transition-opacity" />

            {/* Glowing Wax Seal */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 via-red-600 to-rose-700 shadow-xl shadow-rose-900/30 flex flex-col items-center justify-center text-white border-2 border-rose-300/60 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 fill-white/90 text-white drop-shadow" />
              <span className="text-[9px] uppercase tracking-wider font-serif mt-0.5 opacity-90">Open</span>
            </div>

            {/* Subtle floating sparkles */}
            <Sparkles className="w-5 h-5 text-rose-400 absolute top-4 left-4 animate-pulse" />
            <Sparkles className="w-5 h-5 text-rose-400 absolute bottom-4 right-4 animate-pulse delay-300" />
          </motion.div>
        ) : (
          /* Unfolded Main Love Letter */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full vintage-letter rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-rose-200/90 relative"
          >
            {/* Top letter action bar */}
            <div className="flex items-center justify-between border-b border-rose-200/70 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <span className="font-serif font-bold text-rose-900 text-base md:text-lg">
                  {birthdayConfig.letters.mainLetter.salutation}
                </span>
              </div>

              {!showFullImmediately && displayedTextLength < fullLetterText.length && (
                <button
                  onClick={() => setShowFullImmediately(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-semibold rounded-full transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Show full letter</span>
                </button>
              )}
            </div>

            {/* Opening greeting */}
            <h2 className="font-script text-3xl md:text-4xl text-rose-700 font-bold mb-6">
              {birthdayConfig.letters.mainLetter.opening}
            </h2>

            {/* Letter Body */}
            <div className="font-handwriting text-xl md:text-2xl text-slate-800 leading-relaxed space-y-4 whitespace-pre-line tracking-wide">
              {showFullImmediately ? (
                fullLetterText
              ) : (
                <>
                  {fullLetterText.slice(0, displayedTextLength)}
                  {displayedTextLength < fullLetterText.length && (
                    <span className="inline-block w-1.5 h-5 bg-rose-500 ml-1 animate-pulse" />
                  )}
                </>
              )}
            </div>

            {/* Sign-off */}
            <div className="mt-8 pt-4 border-t border-rose-200/60 flex flex-col items-end">
              <p className="font-script text-2xl md:text-3xl text-rose-700 font-bold">
                {birthdayConfig.letters.mainLetter.signature}
              </p>
            </div>

            {/* ======================================================= */}
            {/* SECRET LETTER TEASER / MINI ENVELOPE AT THE BOTTOM     */}
            {/* ======================================================= */}
            <div className="mt-10 pt-6 border-t-2 border-dashed border-rose-200 flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenSecretLetter}
                className="group relative px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-100 to-rose-200 hover:from-rose-200 hover:to-pink-200 border border-rose-300 shadow-md flex items-center gap-3 text-rose-800 cursor-pointer transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                  <Heart className="w-4 h-4 fill-white animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">
                    A Hidden Note
                  </span>
                  <span className="text-sm font-medium">
                    {birthdayConfig.letters.secretLetter.teaserPrompt}
                  </span>
                </div>
              </motion.button>
            </div>

            {/* Main Next Page Button */}
            <div className="mt-10 flex justify-center">
              <RomanticButton
                onClick={onNext}
                size="lg"
                className="shadow-xl"
              >
                {birthdayConfig.letters.buttonText}
              </RomanticButton>
            </div>
          </motion.div>
        )}

        {/* SECRET LETTER MODAL / UNFOLDED EXPERIENCE */}
        <AnimatePresence>
          {isSecretOpen && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
              onClick={() => setIsSecretOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotateX: 20 }}
                transition={{ type: "spring", damping: 22, stiffness: 260 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg secret-letter rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-rose-300/80 relative overflow-hidden"
              >
                {/* Decorative secret watermark */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-300/60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center">
                      <Key className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-widest">
                      Confidential & Only For You
                    </span>
                  </div>
                  <button
                    onClick={() => setIsSecretOpen(false)}
                    className="text-xs px-2.5 py-1 rounded-full bg-rose-200/80 hover:bg-rose-300 text-rose-800 font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>

                <h3 className="font-script text-2xl md:text-3xl text-rose-800 font-bold mb-4">
                  {birthdayConfig.letters.secretLetter.title}
                </h3>

                <div className="font-handwriting text-xl md:text-2xl text-slate-800 leading-relaxed space-y-4 tracking-wide">
                  {birthdayConfig.letters.secretLetter.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-rose-300/50 flex justify-end">
                  <span className="font-script text-xl text-rose-700 font-bold">
                    Forever & Always, Yours ❤️
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

