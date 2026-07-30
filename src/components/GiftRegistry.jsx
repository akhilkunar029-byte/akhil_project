import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Share2, Heart, Sparkles } from 'lucide-react';
import { giftRegistry, coupleNames, socialLinks, media } from '../config/weddingData';
import FloatingPetals from './FloatingPetals';

export default function GiftRegistry({ theme }) {
  const isDark = theme?.name?.includes('Dark');

  return (
    <section
      id="gift"
      className={`relative py-20 px-4 overflow-hidden
        ${isDark ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-gradient-to-b from-pink-50 to-rose-100'}
      `}
    >
      <FloatingPetals count={8} isDark={isDark} />

      {/* Ambient glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-15
        ${isDark ? 'bg-yellow-900' : 'bg-rose-200'}
      `}/>

      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10 relative z-10">
        {/* Gift note card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`relative w-full rounded-3xl p-9 text-center overflow-hidden transition-all duration-300 cursor-pointer
            ${isDark
              ? 'bg-slate-900/90 border border-yellow-600/40 hover:border-yellow-400 shadow-2xl shadow-black/60'
              : 'bg-white/95 border border-rose-200 hover:border-rose-300 shadow-2xl shadow-rose-200/60'
            }
          `}
        >
          {/* Decorative top dots */}
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-2 pt-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-yellow-500/60' : 'bg-rose-300'}`} />
            ))}
          </div>

          {/* Icon with float animation */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, -8, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex justify-center mb-5"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg
              ${isDark ? 'bg-yellow-900/40 border border-yellow-500/40' : 'bg-rose-50 border border-rose-200'}
            `}>
              <Gift size={30} className={isDark ? 'text-yellow-300' : 'text-rose-500'} />
            </div>
          </motion.div>

          {/* Quote */}
          <blockquote className={`font-playfair text-2xl sm:text-3xl font-bold leading-snug mb-4
            ${isDark ? 'text-yellow-100' : 'text-rose-900'}
          `}>
            &quot;{giftRegistry.message}&quot;
          </blockquote>

          <p className={`font-cormorant text-lg italic mb-6 ${isDark ? 'text-yellow-300/90' : 'text-rose-600'}`}>
            {giftRegistry.subMessage}
          </p>

          <div className={`h-px w-24 mx-auto mb-6 ${isDark ? 'bg-yellow-600/40' : 'bg-rose-200'}`} />

          <p className={`font-montserrat text-sm font-bold ${isDark ? 'text-yellow-300' : 'text-rose-700'}`}>
            — With love, {coupleNames.bride} &amp; {coupleNames.groom}
          </p>

          {/* Registry link */}
          {giftRegistry.registryUrl && (
            <motion.a
              href={giftRegistry.registryUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat text-sm font-semibold tracking-wide shadow-md
                ${isDark
                  ? 'bg-yellow-600/30 border border-yellow-500/50 text-yellow-300 hover:bg-yellow-600/40'
                  : 'bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100'
                }
                transition-all duration-200
              `}
            >
              <Gift size={16} />
              {giftRegistry.registryLabel}
            </motion.a>
          )}
        </motion.div>

        {/* Couple photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative cursor-pointer"
        >
          <div className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4
            ${isDark ? 'border-yellow-500/70 shadow-2xl shadow-yellow-900/40' : 'border-rose-300 shadow-2xl shadow-rose-200/70'}
          `}>
            <img
              src={media.couplePhoto}
              alt={`${coupleNames.bride} and ${coupleNames.groom}`}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent`} />
          </div>
          {/* Heart badge */}
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`absolute -bottom-3 -right-3 w-14 h-14 rounded-full flex items-center justify-center shadow-lg
              ${isDark ? 'bg-gradient-to-br from-yellow-400 to-amber-600 shadow-yellow-900/40' : 'bg-gradient-to-br from-rose-400 to-pink-500 shadow-rose-300/50'}
            `}
          >
            <Heart size={24} fill="white" className="text-white drop-shadow" />
          </motion.div>
        </motion.div>

        {/* Social & hashtag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center gap-3"
        >
          <p className={`font-cormorant text-xl font-bold italic ${isDark ? 'text-yellow-300' : 'text-rose-700'}`}>
            Share your memories with us
          </p>
          <div className="flex items-center gap-4">
            <motion.a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 8 }}
              className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md
                ${isDark ? 'bg-yellow-900/40 text-yellow-300 hover:bg-yellow-900/60 border border-yellow-600/40' : 'bg-rose-100 text-rose-600 hover:bg-rose-200 border border-rose-200'}
                transition-colors
              `}
            >
              <Share2 size={18} />
            </motion.a>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`font-montserrat text-sm font-bold ${isDark ? 'text-yellow-300' : 'text-rose-700'}`}
            >
              {socialLinks.hashtag}
            </motion.span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className={`text-center pt-8 border-t w-full
            ${isDark ? 'border-yellow-900/40' : 'border-rose-200'}
          `}
        >
          <p className={`font-cormorant text-3xl font-extrabold ${isDark ? 'shimmer-text-dark gold-text-glow' : 'shimmer-text'}`}>
            {coupleNames.displayName}
          </p>
          <p className={`font-montserrat text-xs tracking-widest uppercase mt-2 font-semibold ${isDark ? 'text-yellow-400/80' : 'text-rose-400'}`}>
            Forever &amp; Always ✦ August 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}

