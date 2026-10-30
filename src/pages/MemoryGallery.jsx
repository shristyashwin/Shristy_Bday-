import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles, Maximize2 } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';
import PhotoLightbox from '../components/PhotoLightbox';
import RomanticPlaceholder from '../components/RomanticPlaceholder';

export default function MemoryGallery({ onNext }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const photos = birthdayConfig.gallery.photos;

  const handleOpenPhoto = (index) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 md:px-8 z-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-xl"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200 text-rose-700 text-xs md:text-sm font-semibold mb-3 shadow-sm backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5 text-rose-500" />
            <span>Our Cherished Gallery</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            {birthdayConfig.gallery.heading}
          </h1>
          <p className="font-script text-2xl md:text-3xl text-rose-600 font-bold">
            {birthdayConfig.gallery.subheading}
          </p>
        </motion.div>

        {/* 6-Photo Responsive Grid (Polaroid / Scrapbook style) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {photos.map((photo, index) => {
            const hasError = imageErrors[photo.id];
            // Slight vintage tilt for realistic polaroid effect
            const rotationAngles = [-1.5, 1.2, -2, 1.8, -1.2, 2.2];
            const tilt = rotationAngles[index % rotationAngles.length];

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
                style={{ rotate: `${tilt}deg` }}
                onClick={() => handleOpenPhoto(index)}
                className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl hover:shadow-2xl hover:shadow-rose-300/30 border border-rose-100 transition-all cursor-pointer flex flex-col justify-between group select-none"
              >
                {/* Photo Container */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-rose-50 border border-rose-100/60 flex items-center justify-center">
                  {!hasError ? (
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      onError={() => handleImageError(photo.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <RomanticPlaceholder
                      title={photo.dateBadge}
                      subtitle={photo.caption}
                      aspectRatio="aspect-[4/3] w-full"
                    />
                  )}

                  {/* Expand badge icon overlay */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Date Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-medium text-white flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                    <span>{photo.dateBadge}</span>
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="mt-4 px-2 text-center">
                  <p className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug group-hover:text-rose-600 transition-colors">
                    "{photo.caption}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Message and Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-lg glass-panel-romantic rounded-3xl p-8 shadow-xl border border-rose-200"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-rose-500" />
          </div>
          <p className="font-serif italic text-lg text-rose-900 mb-6 font-medium">
            "{birthdayConfig.gallery.closingMessage}"
          </p>

          <RomanticButton
            onClick={onNext}
            size="lg"
            className="shadow-xl"
          >
            {birthdayConfig.gallery.buttonText}
          </RomanticButton>
        </motion.div>

        {/* Lightbox Modal */}
        <PhotoLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          photos={photos}
          currentIndex={selectedPhotoIndex}
          onIndexChange={setSelectedPhotoIndex}
        />
      </div>
    </div>
  );
}

