import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import RomanticPlaceholder from './RomanticPlaceholder';

export default function PhotoLightbox({
  isOpen,
  onClose,
  photos = [],
  currentIndex = 0,
  onIndexChange,
}) {
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen || !photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrev = (e) => {
    e?.stopPropagation();
    onIndexChange((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    onIndexChange((currentIndex + 1) % photos.length);
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md select-none"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all focus:outline-none"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous button */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all focus:outline-none backdrop-blur-sm"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all focus:outline-none backdrop-blur-sm"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Modal content container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-rose-200/50"
        >
          {/* Main Photo Area */}
          <div className="relative flex-1 bg-pink-50 flex items-center justify-center overflow-hidden min-h-[320px] max-h-[70vh]">
            {!imageErrors[currentPhoto.id] ? (
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption || "Romantic memory"}
                onError={() => handleImageError(currentPhoto.id)}
                className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center p-6">
                <RomanticPlaceholder
                  title={currentPhoto.dateBadge || "Special Memory"}
                  subtitle={currentPhoto.caption}
                  aspectRatio="aspect-auto h-full w-full"
                />
              </div>
            )}
          </div>

          {/* Caption & Metadata Bar */}
          <div className="p-4 md:p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-3 border-t border-rose-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                {currentPhoto.dateBadge || `Photo ${currentIndex + 1} of ${photos.length}`}
              </span>
              <p className="font-serif text-base md:text-lg text-slate-800 italic">
                "{currentPhoto.caption}"
              </p>
            </div>

            <div className="text-xs text-rose-500 font-medium">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

