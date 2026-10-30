import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Music, ChevronDown, ChevronUp, Disc } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export default function MusicPlayer({ autoPlayAttempted = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);

  // Initialize audio settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, []);

  // Attempt play on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current && !isPlaying && !hasError) {
        setHasInteracted(true);
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Audio autoplay waiting for explicit play action:", err);
          });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted, isPlaying, hasError]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.warn("Unable to play audio. Check if file exists:", err);
          setHasError(true);
        });
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.muted = newMuted;
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setHasError(false);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newRatio = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = newRatio * duration;
    setProgress(newRatio * 100);
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <aside 
      aria-label="Romantic Music Player"
      className="fixed top-4 right-4 z-50 flex flex-col items-end"
    >
      <audio
        ref={audioRef}
        src={birthdayConfig.music.audioPath}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={() => setHasError(true)}
      />

      {/* Main floating controller */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel rounded-full p-1.5 shadow-xl border border-white/60 flex items-center gap-2 hover:shadow-rose-400/20 transition-all select-none"
      >
        {/* Spinning Vinyl / Music Disc */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md group focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="flex items-center justify-center"
          >
            {isPlaying ? (
              <Disc className="w-6 h-6 text-white drop-shadow" />
            ) : (
              <Music className="w-5 h-5 text-white/90" />
            )}
          </motion.div>

          {/* Miniature play/pause overlay on hover */}
          <span className="absolute inset-0 rounded-full bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </span>
        </button>

        {/* Mini Equalizer animation & Title preview */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="hidden sm:flex flex-col cursor-pointer px-2 max-w-[120px]"
        >
          <span className="text-xs font-semibold text-rose-800 truncate leading-tight">
            {birthdayConfig.music.title}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-2"></span>
                <span className="w-1 bg-pink-500 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_0.1s] h-3"></span>
                <span className="w-1 bg-rose-400 rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.2s] h-1.5"></span>
                <span className="w-1 bg-rose-600 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.15s] h-2.5"></span>
              </div>
            ) : (
              <span className="text-[10px] text-rose-500/70 font-medium">Paused</span>
            )}
            <span className="text-[10px] text-slate-500 font-mono">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Quick Mute Toggle */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          className="w-8 h-8 rounded-full flex items-center justify-center text-rose-600 hover:bg-rose-100/60 transition-colors focus:outline-none"
        >
          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Expand / Collapse Details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse music details" : "Expand music controls"}
          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none mr-1"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </motion.div>

      {/* Expanded Controls Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-panel-romantic rounded-2xl p-4 mt-2 shadow-2xl border border-rose-200/80 w-64 text-slate-800"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-rose-500" />
                Background Melody
              </span>
              <span className="text-[11px] font-mono text-rose-700">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Clickable Progress Bar */}
            <div
              onClick={handleSeek}
              className="w-full bg-rose-200/60 h-2 rounded-full cursor-pointer overflow-hidden mb-3 relative group"
            >
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 mb-2">
              <button 
                onClick={toggleMute}
                aria-label="Toggle mute"
                className="text-rose-600 hover:text-rose-800"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
                className="w-full accent-rose-500 h-1.5 bg-rose-200/60 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] font-mono text-rose-700 w-6 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

            {/* Notice if user hasn't added music yet */}
            {hasError && (
              <p className="text-[11px] text-rose-600 bg-rose-50/90 rounded-lg p-2 border border-rose-200 mt-2 text-center leading-tight">
                Add your romantic song at <code className="font-mono text-[10px] text-rose-700 font-bold">public/assets/music/birthday-music.mp3</code>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

