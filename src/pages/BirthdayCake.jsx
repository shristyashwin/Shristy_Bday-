import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Mic, MicOff, Wind, UtensilsCrossed } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';
import confetti from 'canvas-confetti';

export default function BirthdayCake({ onNext }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const [knifeCutting, setKnifeCutting] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animFrameRef = useRef(null);

  // Check microphone support on mount
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setMicSupported(true);
    }
    return () => stopListening();
  }, []);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    stopListening();

    // Large celebration confetti
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#ffd700', '#c084fc', '#ffffff']
    });
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // When blow sound detected (high volume threshold)
        if (average > 65) {
          handleBlowCandles();
        } else {
          animFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };

      checkVolume();
    } catch (err) {
      console.warn("Microphone access declined or unavailable:", err);
      setIsListeningMic(false);
    }
  };

  const stopListening = () => {
    setIsListeningMic(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
    }
  };

  const handleCutCake = () => {
    if (cakeCut || knifeCutting) return;
    setKnifeCutting(true);

    setTimeout(() => {
      setCakeCut(true);
      setKnifeCutting(false);

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700']
      });
    }, 1200);
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 md:px-8 z-10 select-none flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200 text-rose-700 text-xs md:text-sm font-semibold mb-3 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Birthday Ceremony</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            {birthdayConfig.cake.heading}
          </h1>
          <p className="text-sm md:text-base text-rose-600 max-w-md mx-auto">
            {birthdayConfig.cake.subheading}
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* INTERACTIVE MULTI-TIER BIRTHDAY CAKE ILLUSTRATION       */}
        {/* ======================================================== */}
        <div className="relative w-72 sm:w-84 md:w-96 h-80 flex flex-col items-center justify-end mb-8">
          {/* Animated Knife during cutting */}
          <AnimatePresence>
            {knifeCutting && (
              <motion.div
                initial={{ opacity: 0, x: 60, y: -80, rotate: -35 }}
                animate={{ opacity: 1, x: 0, y: 20, rotate: 10 }}
                exit={{ opacity: 0, x: -40, y: -40 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute z-40 top-16"
              >
                <div className="text-5xl filter drop-shadow-xl transform -scale-x-100">
                  🔪
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle Flames & Sticks (Top Tier) */}
          <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] z-30">
            {[0, 1, 2].map((candleIndex) => (
              <div key={candleIndex} className="flex flex-col items-center">
                {/* Candle Flame / Smoke */}
                {!candlesBlown ? (
                  <motion.div
                    animate={{
                      scaleY: [1, 1.2, 0.9, 1.15, 1],
                      scaleX: [1, 0.9, 1.08, 0.95, 1],
                      rotate: [-2, 2, -1, 3, 0],
                    }}
                    transition={{
                      duration: 1 + candleIndex * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-400 to-white shadow-[0_0_15px_rgba(251,191,36,0.9)] transform -translate-y-1"
                  />
                ) : (
                  /* Gentle rising smoke puffs */
                  <motion.div
                    initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                    animate={{ opacity: 0, y: -25, scale: 1.4 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: candleIndex * 0.3 }}
                    className="w-3 h-3 rounded-full bg-slate-400/40 blur-xs mb-1"
                  />
                )}

                {/* Candle Wick & Stick */}
                <div className="w-1 h-2 bg-slate-700" />
                <div className="w-3 h-10 rounded-t-sm bg-gradient-to-b from-rose-200 via-pink-300 to-rose-400 border border-white/60 shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Tier */}
          <div className="relative z-20 w-44 sm:w-48 h-18 bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 rounded-t-2xl border-2 border-white/80 shadow-md flex items-center justify-center overflow-hidden">
            {/* Frosting Drips */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-b-xl flex justify-around px-2">
              <span className="w-2.5 h-3 bg-white rounded-b-full shadow-xs"></span>
              <span className="w-3 h-4 bg-white rounded-b-full shadow-xs"></span>
              <span className="w-2.5 h-3.5 bg-white rounded-b-full shadow-xs"></span>
              <span className="w-3 h-4 bg-white rounded-b-full shadow-xs"></span>
              <span className="w-2.5 h-3 bg-white rounded-b-full shadow-xs"></span>
            </div>
            {/* Decorative pearls */}
            <div className="flex gap-2 text-rose-500">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
            </div>
          </div>

          {/* Bottom Tier (With separated slice if cut!) */}
          <div className="relative z-10 w-64 sm:w-72 h-24 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-400 rounded-t-3xl border-2 border-white/90 shadow-xl flex items-center justify-between px-6 overflow-hidden">
            {/* Frosting Drips */}
            <div className="absolute top-0 inset-x-0 h-5 bg-white/95 rounded-b-2xl flex justify-around px-4">
              <span className="w-3.5 h-4 bg-white rounded-b-full shadow-xs"></span>
              <span className="w-4 h-5 bg-white rounded-b-full shadow-xs"></span>
              <span className="w-3 h-4.5 bg-white rounded-b-full shadow-xs"></span>
              <span className="w-4 h-5 bg-white rounded-b-full shadow-xs"></span>
              <span className="w-3.5 h-4 bg-white rounded-b-full shadow-xs"></span>
            </div>

            {/* If cut, show a separated piece */}
            <div className="w-full flex items-center justify-between pt-2">
              <span className="font-script text-xl sm:text-2xl text-white font-bold drop-shadow">
                Shristy
              </span>
              {cakeCut ? (
                <motion.div
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ x: 25, rotate: 8 }}
                  className="px-3 py-1 bg-white/90 rounded-xl text-rose-600 text-xs font-bold shadow-md flex items-center gap-1"
                >
                  <span>🍰 First Bite!</span>
                </motion.div>
              ) : (
                <Heart className="w-5 h-5 fill-white text-white drop-shadow" />
              )}
            </div>
          </div>

          {/* Golden Cake Stand */}
          <div className="w-72 sm:w-80 h-4 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 rounded-full shadow-lg border border-white/80" />
          <div className="w-36 h-4 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 rounded-b-xl shadow-md" />
        </div>

        {/* ======================================================== */}
        {/* INTERACTION CONTROLS: BLOW CANDLES & CUT CAKE            */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center gap-4">
          {!candlesBlown ? (
            <div className="flex flex-col items-center gap-3">
              <RomanticButton
                onClick={handleBlowCandles}
                size="lg"
                icon={Wind}
                className="shadow-xl"
              >
                {birthdayConfig.cake.blowButtonText}
              </RomanticButton>

              {/* Optional Microphone Blow Detection */}
              {micSupported && (
                <button
                  onClick={isListeningMic ? stopListening : startListening}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-xs font-medium text-rose-700 border border-rose-200 shadow-sm transition-all"
                >
                  {isListeningMic ? (
                    <>
                      <Mic className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                      <span>Listening for your blow... (blow near mic)</span>
                    </>
                  ) : (
                    <>
                      <MicOff className="w-3.5 h-3.5 text-slate-500" />
                      <span>Enable mic to blow candles</span>
                    </>
                  )}
                </button>
              )}
            </div>
          ) : !cakeCut ? (
            /* Next Step: Cut the Cake */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="p-3 bg-rose-100/80 rounded-2xl text-xs md:text-sm font-semibold text-rose-800 border border-rose-200">
                ✨ The candles are out and your wish is floating to heaven! Now let's cut the cake! ✨
              </div>

              <RomanticButton
                onClick={handleCutCake}
                disabled={knifeCutting}
                size="lg"
                icon={UtensilsCrossed}
                className="shadow-xl"
              >
                {knifeCutting ? "Cutting with love... 🍰" : birthdayConfig.cake.cutButtonText}
              </RomanticButton>
            </motion.div>
          ) : (
            /* Birthday Blessing & Transition to Grand Finale */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-lg glass-panel-romantic rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-400/40 mb-3">
                <Heart className="w-7 h-7 fill-white" />
              </div>

              <p className="font-serif italic text-base sm:text-lg text-slate-800 whitespace-pre-line leading-relaxed mb-6 font-medium">
                "{birthdayConfig.cake.birthdayMessage}"
              </p>

              <RomanticButton
                onClick={onNext}
                size="lg"
                className="shadow-xl"
              >
                {birthdayConfig.cake.buttonText}
              </RomanticButton>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

