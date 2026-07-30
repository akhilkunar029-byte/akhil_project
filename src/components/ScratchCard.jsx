import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { coupleNames, weddingDate, media } from '../config/weddingData';
import FloatingPetals from './FloatingPetals';

const SCRATCH_COLOR = '#c9a97a'; // gold overlay
const SCRATCH_COLOR_DARK = '#1e1b4b';
const REVEAL_THRESHOLD = 0.6; // 60%

export default function ScratchCard({ theme }) {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [confettiFired, setConfettiFired] = useState(false);
  const [hint, setHint] = useState(true);
  const isDark = theme?.name?.includes('Dark');

  const W = 340;
  const H = 220;

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Gold/luxury overlay
    const grad = ctx.createLinearGradient(0, 0, W, H);
    if (isDark) {
      grad.addColorStop(0, '#1a1740');
      grad.addColorStop(0.5, '#312e81');
      grad.addColorStop(1, '#1a1740');
    } else {
      grad.addColorStop(0, '#d4a056');
      grad.addColorStop(0.3, '#f0cc88');
      grad.addColorStop(0.6, '#c9a97a');
      grad.addColorStop(1, '#b8873f');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Add "scratch here" text
    ctx.font = 'bold 16px Montserrat, sans-serif';
    ctx.fillStyle = isDark ? 'rgba(212,175,55,0.85)' : 'rgba(255,255,255,0.9)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦  Scratch to Reveal  ✦', W / 2, H / 2 - 10);
    ctx.font = '12px Montserrat, sans-serif';
    ctx.fillStyle = isDark ? 'rgba(212,175,55,0.65)' : 'rgba(255,255,255,0.7)';
    ctx.fillText('Our Wedding Date', W / 2, H / 2 + 14);

    // Sparkle dots
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.6)';
      ctx.fill();
    }
  }, [isDark]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = useCallback((e) => {
    if (!isScratching || revealed) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPos(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Calculate revealed %
    const imageData = ctx.getImageData(0, 0, W, H);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const progress = transparent / (W * H);
    setScratchProgress(progress);
    setHint(false);

    if (progress >= REVEAL_THRESHOLD && !confettiFired) {
      setConfettiFired(true);
      fireConfetti();
      // Fully clear after threshold
      setTimeout(() => {
        ctx.clearRect(0, 0, W, H);
        setRevealed(true);
      }, 600);
    }
  }, [isScratching, revealed, confettiFired]);

  const fireConfetti = () => {
    const count = 200;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    confetti({ ...defaults, particleCount: Math.floor(count * 0.25), origin: { x: randomInRange(0.3, 0.5), y: 0.4 }, colors: ['#c9a97a', '#e8a0a0', '#f3c5d5', '#d4af37'] });
    confetti({ ...defaults, particleCount: Math.floor(count * 0.25), origin: { x: randomInRange(0.5, 0.7), y: 0.4 }, colors: ['#c9a97a', '#e8a0a0', '#f3c5d5', '#d4af37'] });
    confetti({ ...defaults, particleCount: Math.floor(count * 0.25), origin: { x: randomInRange(0.1, 0.4), y: 0.5 }, colors: ['#fbbf24', '#f472b6', '#a78bfa'] });
    confetti({ ...defaults, particleCount: Math.floor(count * 0.25), origin: { x: randomInRange(0.6, 0.9), y: 0.5 }, colors: ['#fbbf24', '#f472b6', '#a78bfa'] });
  };

  const dateStr = weddingDate.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <section
      id="scratch-card"
      className={`relative py-20 px-4 flex flex-col items-center gap-10 overflow-hidden
        ${isDark ? 'bg-gradient-to-b from-slate-900 to-indigo-950' : 'bg-gradient-to-b from-pink-50 to-amber-50'}
      `}
    >
      <FloatingPetals count={8} isDark={isDark} />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center relative z-10"
      >
        <p className={`font-cormorant text-sm tracking-[0.4em] uppercase mb-2 flex items-center justify-center gap-2 ${isDark ? 'text-yellow-300' : 'text-rose-500'}`}>
          <Sparkles size={14} />
          A Secret Awaits
          <Sparkles size={14} />
        </p>
        <h2 className={`font-playfair text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-rose-900'}`}>
          Scratch to Reveal Our Date
        </h2>
        <p className={`font-montserrat text-sm mt-2 ${isDark ? 'text-slate-300' : 'text-rose-600'}`}>
          Rub the golden card to uncover our wedding date
        </p>
      </motion.div>

      {/* Scratch card container with 3D Tilt */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`relative rounded-3xl overflow-hidden shadow-2xl z-10 cursor-crosshair
          ${isDark ? 'shadow-black/70 border-2 border-yellow-500/40' : 'shadow-rose-200/80 border-2 border-rose-300'}
        `}
        style={{ width: W, height: H, maxWidth: '100%' }}
      >
        {/* Reveal layer (underneath) — hands photo fills entire card */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: W, height: H }}
        >
          {/* Full bleed hands/mehndi photo */}
          <img
            src={media.scratchRevealPhoto}
            alt="Mehndi hands"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          {/* Date info on top */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-1 text-center px-4">
            <motion.div
              animate={revealed ? { scale: [0.8, 1.3, 1], rotate: [0, 15, -10, 0] } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-3xl">💍</span>
            </motion.div>
            <p className="font-cormorant text-xs tracking-widest uppercase text-yellow-300 font-semibold">
              Our Muhurtam
            </p>
            <p className="font-playfair text-xl font-bold text-white leading-tight drop-shadow-lg">
              {dateStr}
            </p>
            <p className="font-montserrat text-sm text-yellow-300 font-bold drop-shadow">
              4:10 AM · Auspicious Muhurtam
            </p>
            <div className="h-px w-20 my-1 bg-white/40" />
            <p className="font-montserrat text-xs text-white/90 font-medium">
              {coupleNames.bride} weds {coupleNames.groom}
            </p>
          </div>
        </div>

        {/* Scratch overlay canvas */}
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="scratch-canvas relative z-10 block w-full"
          style={{ touchAction: 'none', display: revealed ? 'none' : 'block' }}
          onMouseDown={() => setIsScratching(true)}
          onMouseMove={scratch}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onTouchStart={(e) => { e.preventDefault(); setIsScratching(true); }}
          onTouchMove={scratch}
          onTouchEnd={() => setIsScratching(false)}
        />

        {/* Hint overlay */}
        <AnimatePresence>
          {hint && !revealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-3 left-0 right-0 flex justify-center z-20 pointer-events-none"
            >
              <span className={`text-xs font-montserrat px-4 py-1.5 rounded-full font-semibold shadow-lg animate-pulse
                ${isDark ? 'bg-yellow-900/80 text-yellow-200 border border-yellow-500/50' : 'bg-white/90 text-rose-600 border border-rose-200'}
              `}>
                ✦ Touch & Scratch Here ✦
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress bar */}
      {!revealed && scratchProgress > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-64 flex flex-col items-center gap-1 z-10"
        >
          <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-rose-100'}`}>
            <motion.div
              className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-yellow-500 to-amber-400' : 'bg-gradient-to-r from-rose-400 to-pink-500'}`}
              animate={{ width: `${Math.min(scratchProgress / REVEAL_THRESHOLD * 100, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className={`text-xs font-montserrat font-semibold ${isDark ? 'text-yellow-400' : 'text-rose-500'}`}>
            {Math.round(Math.min(scratchProgress / REVEAL_THRESHOLD * 100, 100))}% scratched
          </p>
        </motion.div>
      )}

      {/* Revealed state sparkles */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex items-center gap-2 z-10"
          >
            <Sparkles size={20} className={isDark ? 'text-yellow-400' : 'text-rose-500'} />
            <p className={`font-cormorant text-xl font-bold italic ${isDark ? 'text-yellow-300' : 'text-rose-700'}`}>
              Mark your calendars — it&apos;s official! 🎉
            </p>
            <Sparkles size={20} className={isDark ? 'text-yellow-400' : 'text-rose-500'} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

