import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Sparkles } from 'lucide-react';
import { weddingDate } from '../config/weddingData';
import FloatingPetals from './FloatingPetals';

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function FlipUnit({ value, label, isDark }) {
  const prev = useRef(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 400);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="flex flex-col items-center gap-2 cursor-pointer"
    >
      <div className={`relative w-20 sm:w-24 h-20 sm:h-24 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300
        ${isDark
          ? 'bg-gradient-to-b from-slate-800 to-slate-900 border border-yellow-500/50 shadow-xl shadow-yellow-900/20 hover:border-yellow-400 hover:shadow-yellow-500/30'
          : 'bg-gradient-to-b from-white to-rose-50 border border-rose-200 shadow-xl shadow-rose-200/50 hover:border-rose-400'
        }
      `}>
        {/* Separator line */}
        <div className={`absolute left-0 right-0 top-1/2 h-px ${isDark ? 'bg-slate-700' : 'bg-rose-100'}`} />
        <motion.span
          key={value}
          animate={flip ? { y: [0, -10, 10, 0], opacity: [1, 0, 0, 1] } : {}}
          transition={{ duration: 0.35 }}
          className={`font-playfair text-4xl sm:text-5xl font-bold relative z-10
            ${isDark ? 'text-yellow-300 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]' : 'text-rose-800'}
          `}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
        {/* Subtle shine sweep */}
        <div className={`absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none`} />
      </div>
      <span className={`font-montserrat text-xs tracking-widest uppercase font-semibold
        ${isDark ? 'text-yellow-400' : 'text-rose-500'}
      `}>
        {label}
      </span>
    </motion.div>
  );
}

function MiniCalendar({ date, isDark }) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = date.toLocaleString('en-IN', { month: 'long' });
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`rounded-2xl p-5 w-full max-w-xs transition-all duration-300
        ${isDark
          ? 'bg-slate-900/90 border border-yellow-600/50 shadow-2xl shadow-black/60'
          : 'bg-white/95 border border-rose-200 shadow-2xl shadow-rose-200/50'
        }
      `}
    >
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-playfair text-lg font-bold ${isDark ? 'text-yellow-200' : 'text-rose-800'}`}>
          {monthName} {year}
        </h3>
        <span className={`text-xl ${isDark ? 'text-yellow-400' : 'text-rose-400'}`}>📅</span>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((d) => (
          <span key={d} className={`text-center text-xs font-montserrat font-bold ${isDark ? 'text-slate-400' : 'text-rose-400'}`}>
            {d}
          </span>
        ))}
      </div>
      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <div key={i} className="aspect-square flex items-center justify-center cal-day">
            {d ? (
              d === day ? (
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    boxShadow: isDark
                      ? ['0 0 0px 0px rgba(212,175,55,0)', '0 0 16px 6px rgba(212,175,55,0.7)', '0 0 0px 0px rgba(212,175,55,0)']
                      : ['0 0 0px 0px rgba(232,160,160,0)', '0 0 16px 6px rgba(232,160,160,0.8)', '0 0 0px 0px rgba(232,160,160,0)'],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center relative cursor-pointer
                    ${isDark
                      ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-slate-950 font-bold'
                      : 'bg-gradient-to-br from-rose-400 to-pink-500 text-white font-bold'
                    }
                  `}
                >
                  <span className="text-xs font-playfair font-extrabold">{d}</span>
                  {/* Heart above */}
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <Heart
                      size={12}
                      fill={isDark ? '#d4af37' : '#f43f5e'}
                      className={isDark ? 'text-yellow-300' : 'text-rose-500'}
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <span className={`text-xs w-7 h-7 flex items-center justify-center rounded-full transition-colors cursor-pointer
                  ${isDark
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-yellow-300'
                    : 'text-rose-600 hover:bg-rose-100 hover:text-rose-800'
                  }
                `}>
                  {d}
                </span>
              )
            ) : null}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CountdownTimer({ theme }) {
  const timeLeft = useCountdown(weddingDate);
  const isDark = theme?.name?.includes('Dark');

  return (
    <section
      id="countdown"
      className={`relative py-20 px-4 flex flex-col items-center gap-12 overflow-hidden
        ${isDark ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-gradient-to-b from-amber-50 to-rose-50'}
      `}
    >
      <FloatingPetals count={10} isDark={isDark} />

      {/* Ambient glows */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30
        ${isDark ? 'bg-indigo-800' : 'bg-rose-100'}
      `}/>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center relative z-10"
      >
        <p className={`font-cormorant text-sm tracking-[0.4em] uppercase mb-2 flex items-center justify-center gap-2 ${isDark ? 'text-yellow-300' : 'text-rose-500'}`}>
          <Sparkles size={14} />
          The Big Day
          <Sparkles size={14} />
        </p>
        <h2 className={`font-playfair text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-rose-900'}`}>
          Counting Down To Forever
        </h2>
      </motion.div>

      {/* Countdown tiles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 sm:gap-6 relative z-10"
      >
        <FlipUnit value={timeLeft.days} label="Days" isDark={isDark} />
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className={`self-center font-playfair text-3xl font-bold mt-[-20px] ${isDark ? 'text-yellow-400' : 'text-rose-400'}`}>:</motion.div>
        <FlipUnit value={timeLeft.hours} label="Hours" isDark={isDark} />
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className={`self-center font-playfair text-3xl font-bold mt-[-20px] ${isDark ? 'text-yellow-400' : 'text-rose-400'}`}>:</motion.div>
        <FlipUnit value={timeLeft.minutes} label="Minutes" isDark={isDark} />
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className={`self-center font-playfair text-3xl font-bold mt-[-20px] ${isDark ? 'text-yellow-400' : 'text-rose-400'}`}>:</motion.div>
        <FlipUnit value={timeLeft.seconds} label="Seconds" isDark={isDark} />
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col items-center gap-4 relative z-10"
      >
        <p className={`font-cormorant text-lg italic ${isDark ? 'text-yellow-300' : 'text-rose-600'}`}>
          ✦ Highlighted below — our auspicious wedding date ✦
        </p>
        <MiniCalendar date={weddingDate} isDark={isDark} />
      </motion.div>
    </section>
  );
}

