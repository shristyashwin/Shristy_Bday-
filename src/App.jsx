import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global Components
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';

// Pages
import LoveLock from './pages/LoveLock';
import Welcome from './pages/Welcome';
import HeartGame from './pages/HeartGame';
import LovePuzzle from './pages/LovePuzzle';
import LoveLetter from './pages/LoveLetter';
import RelationshipTimeline from './pages/RelationshipTimeline';
import MemoryGallery from './pages/MemoryGallery';
import Promises from './pages/Promises';
import BirthdayCake from './pages/BirthdayCake';
import BirthdayFinale from './pages/BirthdayFinale';

export default function App() {
  // Page 1 is the locked screen
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, 10));
  };

  const restartJourney = () => {
    setCurrentPage(1);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -15, scale: 0.98 },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-100/70 via-pink-50 to-rose-50 text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">
      {/* Background Floating Hearts Particle System (Disabled on Page 3 to avoid confusing with game hearts) */}
      {currentPage !== 3 && <FloatingHearts count={16} />}

      {/* Persistent Music Player (Kept at root, never restarts across pages) */}
      <MusicPlayer />

      {/* Top Subtle Journey Progress Indicator (Visible from Page 2 to 9) */}
      {currentPage > 1 && currentPage < 10 && (
        <header 
          aria-label="Surprise progress"
          className="fixed top-4 left-4 z-40"
        >
          <div className="glass-panel px-3.5 py-1.5 rounded-full shadow-md border border-white/70 flex items-center gap-2 text-xs font-semibold text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>Surprise {currentPage - 1} of 9</span>
          </div>
        </header>
      )}

      {/* Main Pages with AnimatePresence */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentPage === 1 && (
            <motion.section
              key="page-1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="Unlock Your Surprise"
            >
              <LoveLock onUnlock={nextPage} />
            </motion.section>
          )}

          {currentPage === 2 && (
            <motion.section
              key="page-2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="Welcome Jannnnuuu"
            >
              <Welcome onNext={nextPage} />
            </motion.section>
          )}

          {currentPage === 3 && (
            <motion.section
              key="page-3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="Collect My Hearts"
            >
              <HeartGame onNext={nextPage} />
            </motion.section>
          )}

          {currentPage === 4 && (
            <motion.section
              key="page-4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="The Love Puzzle"
            >
              <LovePuzzle onNext={nextPage} />
            </motion.section>
          )}

          {currentPage === 5 && (
            <motion.section
              key="page-5"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="Our Little Love Letter"
            >
              <LoveLetter onNext={nextPage} />
            </motion.section>
          )}

          {currentPage === 6 && (
            <motion.section
              key="page-6"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="Relationship Timeline"
            >
              <RelationshipTimeline onNext={nextPage} />
            </motion.section>
          )}

          {currentPage === 7 && (
            <motion.section
              key="page-7"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="Our Little Memory Lane"
            >
              <MemoryGallery onNext={nextPage} />
            </motion.section>
          )}

          {currentPage === 8 && (
            <motion.section
              key="page-8"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="Three Promises For You"
            >
              <Promises onNext={nextPage} />
            </motion.section>
          )}

          {currentPage === 9 && (
            <motion.section
              key="page-9"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="The Birthday Cake"
            >
              <BirthdayCake onNext={nextPage} />
            </motion.section>
          )}

          {currentPage === 10 && (
            <motion.section
              key="page-10"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              aria-label="Grand Birthday Finale"
            >
              <BirthdayFinale onReplay={restartJourney} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

