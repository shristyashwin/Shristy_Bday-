import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown, RotateCcw, Stars } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';
import RomanticPlaceholder from '../components/RomanticPlaceholder';
import confetti from 'canvas-confetti';

export default function BirthdayFinale({ onReplay }) {
  const canvasRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  // Periodic celebratory confetti bursts
  useEffect(() => {
    // Initial big burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffd700', '#ffffff', '#c084fc']
    });

    const interval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.5 + 0.2 },
        colors: ['#f43f5e', '#fb7185', '#ffd700', '#ffffff']
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // High performance Canvas Fireworks Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = [];
    const fireworks = [];
    const colors = [
      '#f43f5e', '#fb7185', '#fda4af', '#ffd700', '#f59e0b',
      '#ec4899', '#d946ef', '#a855f7', '#ffffff'
    ];

    class Firework {
      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.targetY = Math.random() * (height * 0.45) + (height * 0.1);
        this.speed = Math.random() * 3 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.exploded = false;
      }

      update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
          this.explode();
        }
      }

      explode() {
        this.exploded = true;
        const particleCount = Math.floor(Math.random() * 35 + 40);
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.gravity = 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    let lastSpawn = 0;

    const render = (time) => {
      // Clear with slight trail for motion blur
      ctx.fillStyle = 'rgba(255, 245, 247, 0.2)';
      ctx.fillRect(0, 0, width, height);

      if (time - lastSpawn > 700) {
        fireworks.push(new Firework());
        lastSpawn = time;
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();
        if (fireworks[i].exploded) {
          fireworks.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 md:px-8 z-10 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 border border-amber-300 text-amber-900 font-bold text-xs sm:text-sm shadow-lg mb-6"
        >
          <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
          <span>The Grand Birthday Celebration</span>
          <Sparkles className="w-4 h-4 text-amber-600" />
        </motion.div>

        {/* ======================================================== */}
        {/* SHRISTY'S PHOTOGRAPH DISPLAY (PROMINENT GLOWING FRAME)   */}
        {/* ======================================================== */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative mb-8 group"
        >
          {/* Glowing Aura Rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 blur-2xl opacity-60 animate-pulse scale-110" />
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-rose-300/80 animate-[spin_30s_linear_infinite]" />

          {/* Photograph Container */}
          <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-2 bg-gradient-to-tr from-rose-400 via-amber-300 to-pink-500 shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center">
            {!imageError ? (
              <img
                src={birthdayConfig.finale.imagePath}
                alt={birthdayConfig.recipient.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <RomanticPlaceholder
                title={birthdayConfig.finale.imagePlaceholderCaption}
                subtitle="Place photo at public/assets/photos/shristy-final.jpg"
                aspectRatio="w-full h-full rounded-full"
              />
            )}
          </div>

          {/* Decorative Floating Hearts Around Photo */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute -top-2 -right-2 z-20 w-11 h-11 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-white"
          >
            <Heart className="w-6 h-6 fill-white" />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, -12, 12, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-2 -left-2 z-20 w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg border-2 border-white"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>

        {/* Main Birthday Greeting Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-panel-romantic rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-rose-200/90 w-full mb-8 relative"
        >
          {/* Main Heading */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight tracking-tight">
            {birthdayConfig.finale.mainHeading}
          </h1>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-slate-700 text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-xl mx-auto mb-8">
            {birthdayConfig.finale.paragraphs.map((p, index) => (
              <p
                key={index}
                className={
                  index === birthdayConfig.finale.paragraphs.length - 1
                    ? "font-script text-3xl sm:text-4xl text-rose-600 font-bold mt-4"
                    : ""
                }
              >
                {p}
              </p>
            ))}
          </div>

          {/* Final Signature */}
          <div className="pt-6 border-t border-rose-200/70 flex flex-col items-center">
            <span className="font-script text-2xl sm:text-3xl text-rose-700 font-bold mb-1">
              {birthdayConfig.finale.signature}
            </span>
            <div className="flex items-center gap-2 text-rose-500 mt-1">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span className="text-xs uppercase tracking-widest font-semibold">
                Forever & Always
              </span>
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
          </div>
        </motion.div>

        {/* Replay Button to Restart Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <RomanticButton
            onClick={onReplay}
            size="lg"
            variant="secondary"
            icon={RotateCcw}
            className="border-2 border-rose-300 shadow-xl hover:border-rose-400"
          >
            {birthdayConfig.finale.replayButtonText}
          </RomanticButton>
        </motion.div>
      </div>
    </div>
  );
}

