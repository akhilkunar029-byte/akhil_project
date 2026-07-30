import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { coupleNames, media } from '../config/weddingData';
import FloatingPetals from './FloatingPetals';

// Animated arch SVG
const ArchDecoration = ({ isDark }) => (
  <svg viewBox="0 0 400 200" className="w-full max-w-lg" fill="none">
    {/* Main arch */}
    <path
      d="M20 180 Q20 20 200 20 Q380 20 380 180"
      stroke={isDark ? '#d4af37' : '#e8a0a0'}
      strokeWidth="2"
      fill="none"
      opacity="0.6"
      strokeDasharray="4 6"
    />
    {/* Inner arch */}
    <path
      d="M50 180 Q50 50 200 50 Q350 50 350 180"
      stroke={isDark ? '#d4af37' : '#c9a97a'}
      strokeWidth="1"
      fill="none"
      opacity="0.3"
      strokeDasharray="2 8"
    />
    {/* Floral nodes on arch */}
    {[
      { cx: 200, cy: 20 },
      { cx: 110, cy: 60 },
      { cx: 290, cy: 60 },
      { cx: 45, cy: 130 },
      { cx: 355, cy: 130 },
    ].map((pos, i) => (
      <g key={i}>
        <circle cx={pos.cx} cy={pos.cy} r="6" fill={isDark ? '#d4af37' : '#e8a0a0'} opacity="0.7" />
        <circle cx={pos.cx} cy={pos.cy} r="3" fill={isDark ? '#fff8dc' : '#fff'} opacity="0.9" />
      </g>
    ))}
    {/* Side leaves */}
    <path d="M20 180 Q5 120 25 80" stroke={isDark ? '#d4af37' : '#e8a0a0'} strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M380 180 Q395 120 375 80" stroke={isDark ? '#d4af37' : '#e8a0a0'} strokeWidth="1.5" fill="none" opacity="0.4" />
  </svg>
);

// Floating ornament
const Ornament = ({ char, delay, isDark }) => (
  <motion.span
    animate={{ y: [0, -12, 0], rotate: [-8, 8, -8] }}
    transition={{ duration: 3.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    className={`text-2xl select-none ${isDark ? 'text-yellow-400/80 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'text-rose-400/80'}`}
  >
    {char}
  </motion.span>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function HeroSection({ theme }) {
  const isDark = theme?.name?.includes('Dark');

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20
        ${isDark ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900' : 'bg-gradient-to-b from-rose-50 via-amber-50 to-pink-50'}
      `}
    >
      {/* Floating Petals background animation */}
      <FloatingPetals count={16} isDark={isDark} />

      {/* Background ambient circles */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none
        ${isDark ? 'bg-indigo-900/30' : 'bg-rose-200/20'}`}
      />
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none
        ${isDark ? 'bg-yellow-900/20' : 'bg-amber-200/20'}`}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-2xl"
      >
        {/* Floating ornaments row */}
        <motion.div variants={itemVariants} className="flex gap-6 items-center">
          <Ornament char="✦" delay={0} isDark={isDark} />
          <Ornament char="❀" delay={0.3} isDark={isDark} />
          <Ornament char="✦" delay={0.6} isDark={isDark} />
        </motion.div>

        {/* Arch SVG */}
        <motion.div variants={itemVariants} className="w-full max-w-sm sm:max-w-lg -mb-12 relative">
          <ArchDecoration isDark={isDark} />
          {/* "You're Invited" overlaid on arch top */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className={`font-cormorant text-sm sm:text-base tracking-[0.5em] uppercase px-4 flex items-center gap-2
              ${isDark ? 'text-yellow-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]' : 'text-rose-500'}`}
            >
              <Sparkles size={14} className={isDark ? 'text-yellow-400' : 'text-rose-400'} />
              You&apos;re Invited
              <Sparkles size={14} className={isDark ? 'text-yellow-400' : 'text-rose-400'} />
            </span>
          </motion.div>
        </motion.div>

        {/* ── Couple Photo with 3D Float Hover ── */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 1.5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative cursor-pointer"
        >
          {/* Rotating outer decorative glow ring */}
          <div className="absolute -inset-3 rounded-full opacity-60 pointer-events-none rotate-glow overflow-hidden">
            <div className={`w-full h-full rounded-full bg-gradient-to-tr ${isDark ? 'from-yellow-500 via-indigo-600 to-yellow-300' : 'from-rose-400 via-amber-300 to-pink-500'} blur-md`} />
          </div>

          {/* Outer glow ring */}
          <motion.div
            animate={{
              boxShadow: isDark
                ? ['0 0 0px 0px rgba(212,175,55,0)', '0 0 45px 15px rgba(212,175,55,0.45)', '0 0 0px 0px rgba(212,175,55,0)']
                : ['0 0 0px 0px rgba(232,160,160,0)', '0 0 45px 15px rgba(232,160,160,0.55)', '0 0 0px 0px rgba(232,160,160,0)'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 relative z-10
              ${ isDark ? 'border-yellow-500/80' : 'border-rose-300' }
            `}
          >
            <img
              src={media.couplePhoto}
              alt={`${coupleNames.bride} and ${coupleNames.groom}`}
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
            />
          </motion.div>
          {/* Heart badge */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className={`absolute -bottom-2 -right-2 w-13 h-13 rounded-full flex items-center justify-center shadow-xl z-20
              ${ isDark ? 'bg-gradient-to-br from-yellow-400 to-amber-600' : 'bg-gradient-to-br from-rose-400 to-pink-500' }
            `}
          >
            <Heart size={22} fill="white" className="text-white drop-shadow" />
          </motion.div>
        </motion.div>

        {/* Couple names — hero with Shimmer */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-1 my-2">
          <h1 className={`font-cinzel text-4xl sm:text-6xl font-extrabold tracking-wider uppercase text-center
            ${isDark ? 'shimmer-text-dark gold-text-glow' : 'shimmer-text drop-shadow'}
          `}>
            {coupleNames.bride}
          </h1>
          <div className="flex items-center gap-4 my-2">
            <div className={`h-px w-20 ${isDark ? 'bg-gradient-to-r from-transparent via-yellow-500 to-transparent' : 'bg-gradient-to-r from-transparent via-rose-600 to-transparent'}`} />
            <motion.span
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className={`font-script text-5xl sm:text-6xl font-bold ${isDark ? 'text-yellow-300' : 'text-rose-800'}`}
            >
              &
            </motion.span>
            <div className={`h-px w-20 ${isDark ? 'bg-gradient-to-r from-transparent via-yellow-500 to-transparent' : 'bg-gradient-to-r from-transparent via-rose-600 to-transparent'}`} />
          </div>
          <h1 className={`font-cinzel text-4xl sm:text-6xl font-extrabold tracking-wider uppercase text-center
            ${isDark ? 'shimmer-text-dark gold-text-glow' : 'shimmer-text drop-shadow'}
          `}>
            {coupleNames.groom}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className={`font-cormorant text-xl sm:text-2xl font-bold italic leading-relaxed text-center px-4
            ${isDark ? 'text-yellow-200' : 'text-rose-900'}
          `}
        >
          &quot;A Celebration of Two Hearts — A New Chapter Begins&quot;
        </motion.p>

        {/* Parent names */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className={`flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm font-montserrat font-bold tracking-wide text-center px-6 py-3 rounded-2xl transition-all duration-300
            ${isDark
              ? 'text-yellow-100 bg-slate-900/80 border border-yellow-900/50 shadow-lg shadow-black/40 hover:border-yellow-600/70'
              : 'text-rose-950 bg-white/90 border border-rose-200 shadow-md hover:shadow-lg'
            }
          `}
        >
          <span className="whitespace-pre-line">{coupleNames.brideParents}</span>
          <span className="hidden sm:block opacity-60 text-amber-400">◆</span>
          <span className="whitespace-pre-line">{coupleNames.groomParents}</span>
        </motion.div>

        {/* Hashtag */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-2 px-6 py-2 rounded-full border font-montserrat text-sm font-semibold tracking-wider cursor-pointer transition-all duration-300
            ${isDark
              ? 'border-yellow-600/60 text-yellow-300 bg-yellow-900/20 hover:bg-yellow-900/40 shadow-lg shadow-yellow-900/20'
              : 'border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100 shadow-md'
            }
          `}
        >
          {coupleNames.hashtag}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-8 flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            const el = document.getElementById('scratch-card');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className={`text-xs font-montserrat tracking-widest uppercase font-semibold ${isDark ? 'text-yellow-400/80' : 'text-rose-400'}`}>
            Scroll to explore
          </span>
          <div className={`w-px h-10 ${isDark ? 'bg-gradient-to-b from-yellow-500 to-transparent' : 'bg-gradient-to-b from-rose-400 to-transparent'}`} />
        </motion.div>
      </motion.div>

      {/* Corner ornaments */}
      <div className={`absolute top-6 left-6 font-cormorant text-4xl select-none ${isDark ? 'text-yellow-700/50' : 'text-rose-300/70'}`}>❧</div>
      <div className={`absolute top-6 right-6 font-cormorant text-4xl select-none ${isDark ? 'text-yellow-700/50' : 'text-rose-300/70'}`}>❧</div>
      <div className={`absolute bottom-6 left-6 font-cormorant text-4xl select-none rotate-180 ${isDark ? 'text-yellow-700/50' : 'text-rose-300/70'}`}>❧</div>
      <div className={`absolute bottom-6 right-6 font-cormorant text-4xl select-none rotate-180 ${isDark ? 'text-yellow-700/50' : 'text-rose-300/70'}`}>❧</div>
    </section>
  );
}

