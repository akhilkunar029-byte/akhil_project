import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { coupleNames } from '../config/weddingData';

// Floral SVG decoration
const FloralCorner = ({ className, flip }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    fill="none"
  >
    <g opacity="0.6">
      <path d="M10 110 Q30 60 70 30 Q90 20 110 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="30" r="6" fill="currentColor" opacity="0.5" />
      <circle cx="45" cy="60" r="4" fill="currentColor" opacity="0.4" />
      <circle cx="90" cy="15" r="3" fill="currentColor" opacity="0.35" />
      <path d="M60 40 Q55 30 65 32 Q70 42 60 40Z" fill="currentColor" opacity="0.5" />
      <path d="M40 65 Q35 55 45 57 Q50 67 40 65Z" fill="currentColor" opacity="0.4" />
      <path d="M80 22 Q75 12 85 14 Q90 24 80 22Z" fill="currentColor" opacity="0.35" />
      {/* Small dots */}
      <circle cx="25" cy="85" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="55" cy="47" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="100" cy="8" r="2" fill="currentColor" opacity="0.3" />
    </g>
  </svg>
);

export default function EnvelopeSeal({ theme, onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle | opening | done
  const isDark = theme?.name?.includes('Dark');

  const handleSealClick = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    // After envelope animation completes, call onOpen
    setTimeout(() => {
      setPhase('done');
      onOpen();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="envelope"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden
            ${isDark ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900' : 'bg-gradient-to-br from-rose-50 via-amber-50 to-pink-100'}
          `}
        >
          {/* Ambient petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute text-2xl select-none pointer-events-none`}
              initial={{ y: -40, x: Math.random() * 100 - 50 + '%', opacity: 0 }}
              animate={{ y: '110vh', opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: 6 + Math.random() * 4,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ left: `${10 + i * 10}%` }}
            >
              {['🌸', '🌷', '✿', '❀', '🌹', '🌺', '💮', '⚘'][i]}
            </motion.div>
          ))}

          {/* Floral corners */}
          <FloralCorner
            className={`absolute top-0 left-0 w-32 h-32 ${isDark ? 'text-yellow-600' : 'text-rose-300'}`}
          />
          <FloralCorner
            className={`absolute top-0 right-0 w-32 h-32 ${isDark ? 'text-yellow-600' : 'text-rose-300'}`}
            flip
          />
          <FloralCorner
            className={`absolute bottom-0 left-0 w-32 h-32 ${isDark ? 'text-yellow-600' : 'text-rose-300'} rotate-90`}
          />
          <FloralCorner
            className={`absolute bottom-0 right-0 w-32 h-32 ${isDark ? 'text-yellow-600' : 'text-rose-300'} rotate-180`}
          />

          {/* Envelope body */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Envelope card */}
            <motion.div
              className={`relative w-80 sm:w-96 rounded-2xl overflow-visible shadow-2xl
                ${isDark ? 'bg-slate-900 border border-yellow-900/50' : 'bg-white/90 border border-rose-100'}
              `}
              animate={phase === 'opening' ? { scale: [1, 1.02, 1], rotate: [0, -1, 1, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              {/* Envelope flap top - splits open */}
              <motion.div
                className={`absolute -top-px left-0 right-0 h-32 origin-top overflow-hidden rounded-t-2xl z-10`}
                initial={{ scaleY: 1 }}
                animate={phase === 'opening' ? { scaleY: 0, opacity: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              >
                {/* Flap shape - triangle */}
                <div className={`absolute inset-0 flex items-start justify-center`}>
                  <div
                    className={`w-full`}
                    style={{
                      height: '100%',
                      background: isDark
                        ? 'linear-gradient(160deg, #1e1b4b 0%, #312e81 100%)'
                        : 'linear-gradient(160deg, #fce7f3 0%, #fff1f2 100%)',
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}
                  />
                </div>
              </motion.div>

              {/* Card body */}
              <div
                className={`relative flex flex-col items-center justify-center py-14 px-8 gap-4 rounded-2xl
                  ${isDark ? 'bg-gradient-to-b from-slate-900 to-indigo-950' : 'bg-gradient-to-b from-pink-50 to-rose-50'}
                `}
              >
                {/* Inner envelope lines */}
                <div className={`absolute inset-4 rounded-xl border ${isDark ? 'border-yellow-900/30' : 'border-rose-100'} pointer-events-none`} />
                <div className={`absolute inset-8 rounded-lg border ${isDark ? 'border-yellow-900/20' : 'border-pink-100/70'} pointer-events-none`} />

                {/* Pre-open content */}
                <AnimatePresence>
                  {phase !== 'opening' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <p className={`font-cormorant text-xs sm:text-sm tracking-[0.4em] uppercase ${isDark ? 'text-yellow-400/80' : 'text-rose-500/80'}`}>
                        You are cordially invited to celebrate
                      </p>
                      <h1 className={`font-cinzel text-2xl sm:text-3xl font-bold text-center tracking-wide ${isDark ? 'gold-text-gradient' : 'text-rose-900'}`}>
                        {coupleNames.groom} <span className="font-script text-3xl sm:text-4xl text-rose-500 font-normal">&</span> {coupleNames.bride}
                      </h1>
                      <p className={`font-script text-2xl sm:text-3xl text-center ${isDark ? 'text-yellow-300' : 'text-rose-600'}`}>
                        Wedding Invitation
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Opening state */}
                {phase === 'opening' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    >
                      <Heart
                        size={48}
                        fill={isDark ? '#d4af37' : '#e8a0a0'}
                        className={isDark ? 'text-yellow-400' : 'text-rose-400'}
                      />
                    </motion.div>
                    <p className={`font-cormorant text-xl italic ${isDark ? 'text-yellow-300' : 'text-rose-500'}`}>
                      Opening…
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Wax Seal button */}
            <motion.button
              onClick={handleSealClick}
              disabled={phase !== 'idle'}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1
                cursor-pointer border-4 font-montserrat text-xs font-semibold tracking-widest
                uppercase transition-all duration-300 select-none
                ${isDark
                  ? 'bg-gradient-to-br from-yellow-600 to-yellow-400 border-yellow-300 text-slate-900 seal-pulse-dark'
                  : 'bg-gradient-to-br from-amber-400 to-rose-400 border-amber-100 text-white seal-pulse'
                }
              `}
              aria-label="Open the wedding invitation"
            >
              {/* Wax seal texture rings */}
              <div className="absolute inset-2 rounded-full border border-white/30" />
              <div className="absolute inset-4 rounded-full border border-white/20" />
              <Heart size={28} fill="white" className="text-white drop-shadow" />
              <span className="text-[9px] text-center leading-tight mt-1 drop-shadow">
                Tap to<br/>Open
              </span>
            </motion.button>

            {/* Hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: 4, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className={`font-cormorant text-base italic ${isDark ? 'text-yellow-400/60' : 'text-rose-400/60'}`}
            >
              ✦ Touch the seal to unveil ✦
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
