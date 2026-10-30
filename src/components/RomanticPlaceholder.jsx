import React from 'react';
import { Heart, Image as ImageIcon } from 'lucide-react';

export default function RomanticPlaceholder({ 
  title = "Our Precious Memory", 
  subtitle = "Drop your photo in public/assets/photos/",
  aspectRatio = "aspect-square",
  className = "" 
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-tr from-pink-100 via-rose-50 to-pink-200 border-2 border-dashed border-rose-300 flex flex-col items-center justify-center p-6 text-center select-none shadow-inner group ${aspectRatio} ${className}`}>
      {/* Decorative ambient background hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Heart className="absolute top-3 left-4 w-6 h-6 text-rose-400 animate-pulse" />
        <Heart className="absolute bottom-4 right-4 w-8 h-8 text-rose-500 animate-bounce" />
        <Heart className="absolute top-1/2 left-3 w-4 h-4 text-pink-400" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 mb-3 rounded-full bg-white/80 shadow-md flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:text-rose-600 transition-all duration-300">
          <Heart className="w-8 h-8 fill-rose-400/30 text-rose-500" />
        </div>
        <p className="font-serif font-semibold text-rose-800 text-base md:text-lg mb-1">{title}</p>
        <p className="text-xs md:text-sm text-rose-500/80 font-sans max-w-[200px] leading-tight">{subtitle}</p>
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-white/70 rounded-full text-[11px] font-medium text-rose-600 shadow-sm border border-rose-200/60">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Upload your photograph</span>
        </div>
      </div>
    </div>
  );
}

