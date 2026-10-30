import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Smile, Flame, Infinity as InfinityIcon } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';

export default function RelationshipTimeline({ onNext }) {
  // Mapping icons purely for decorative vector symbols (NO IMAGES whatsoever!)
  const getMilestoneIcon = (iconName) => {
    switch (iconName) {
      case 'sparkles': return <Sparkles className="w-5 h-5" />;
      case 'heart': return <Heart className="w-5 h-5 fill-current" />;
      case 'star': return <Star className="w-5 h-5 fill-current" />;
      case 'smile': return <Smile className="w-5 h-5" />;
      case 'flame': return <Flame className="w-5 h-5 fill-current" />;
      case 'infinity': return <InfinityIcon className="w-5 h-5" />;
      default: return <Heart className="w-5 h-5 fill-current" />;
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 md:px-8 z-10">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-xl"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-rose-200 text-rose-700 text-xs md:text-sm font-semibold mb-3 shadow-sm backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Our Chapters Together</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            {birthdayConfig.timeline.heading}
          </h1>
          <p className="font-script text-2xl md:text-3xl text-rose-600 font-bold">
            {birthdayConfig.timeline.subheading}
          </p>
        </motion.div>

        {/* The Vertical Timeline (Strictly Text, Typography, SVG Markers, & CSS!) */}
        <div className="relative w-full max-w-2xl">
          {/* Central glowing vertical connecting line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-500 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.4)]" />

          <div className="space-y-12">
            {birthdayConfig.timeline.milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  } flex-row`}
                >
                  {/* Heart Marker Center Anchor */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.25, rotate: 15 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 p-1 shadow-lg shadow-rose-400/50 flex items-center justify-center text-white border-2 border-white cursor-pointer"
                    >
                      {getMilestoneIcon(item.icon)}
                    </motion.div>
                  </div>

                  {/* Milestone Card Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-10 text-left' : 'md:pr-10 md:text-right text-left'}`}>
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="glass-panel-romantic rounded-3xl p-6 shadow-xl border border-rose-200/80 group"
                    >
                      {/* Badge / Date Header */}
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-wider uppercase">
                          {item.tag}
                        </span>
                        <span className="text-xs font-serif italic text-rose-500 font-semibold">
                          {item.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg md:text-xl font-bold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors">
                        {item.title}
                      </h3>

                      {/* Romantic Message */}
                      <p className="text-sm md:text-base text-slate-700 leading-relaxed font-sans">
                        "{item.message}"
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing Message and Next Action */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-lg glass-panel-romantic rounded-3xl p-8 shadow-xl border border-rose-200"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
          </div>
          <p className="font-serif italic text-lg text-rose-900 mb-6 font-medium">
            "{birthdayConfig.timeline.closingMessage}"
          </p>

          <RomanticButton
            onClick={onNext}
            size="lg"
            className="shadow-xl"
          >
            {birthdayConfig.timeline.buttonText}
          </RomanticButton>
        </motion.div>
      </div>
    </div>
  );
}

