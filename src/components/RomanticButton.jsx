import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function RomanticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon = Heart,
  showIcon = true,
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2.5 font-medium rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 select-none cursor-pointer";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base md:text-lg",
    lg: "px-8 py-3.5 text-lg md:text-xl font-semibold",
  };

  const variants = {
    primary: "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 text-white shadow-rose-400/40 hover:shadow-rose-500/60 hover:shadow-xl focus:ring-rose-300 border border-white/20",
    secondary: "bg-white/85 hover:bg-white text-rose-600 hover:text-rose-700 shadow-pink-200/50 hover:shadow-md focus:ring-rose-200 border border-rose-200 backdrop-blur-md",
    gold: "bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-white shadow-amber-300/40 hover:shadow-amber-400/60 hover:shadow-xl focus:ring-amber-200 border border-white/30",
    subtle: "bg-rose-100/70 hover:bg-rose-200/80 text-rose-700 focus:ring-rose-200 border border-rose-200/50",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.04, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed filter grayscale-[30%]' : ''} ${className}`}
      {...props}
    >
      {showIcon && Icon && (
        <motion.span
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className="w-5 h-5 fill-current" />
        </motion.span>
      )}
      <span>{children}</span>
    </motion.button>
  );
}

