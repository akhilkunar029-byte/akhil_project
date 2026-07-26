import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { events } from '../config/weddingData';
import FloatingPetals from './FloatingPetals';

export default function Timeline({ theme }) {
  const isDark = theme?.name?.includes('Dark');

  return (
    <section
      id="timeline"
      className={`relative py-20 px-4 overflow-hidden
        ${isDark ? 'bg-gradient-to-b from-slate-950 to-indigo-950' : 'bg-gradient-to-b from-rose-50 to-pink-50'}
      `}
    >
      <FloatingPetals count={8} isDark={isDark} />

      {/* Animated Timeline Center Beam */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 pointer-events-none overflow-hidden">
        <div className={`w-full h-full ${isDark ? 'bg-yellow-900/30' : 'bg-rose-200/50'}`} />
        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className={`w-full h-40 ${isDark ? 'bg-gradient-to-b from-transparent via-yellow-400 to-transparent' : 'bg-gradient-to-b from-transparent via-rose-500 to-transparent'}`}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className={`font-cormorant text-sm tracking-[0.4em] uppercase mb-2 flex items-center justify-center gap-2 ${isDark ? 'text-yellow-300' : 'text-rose-500'}`}>
            <Sparkles size={14} />
            Our Celebration
            <Sparkles size={14} />
          </p>
          <h2 className={`font-cinzel text-3xl sm:text-4xl font-bold tracking-wide ${isDark ? 'shimmer-text-dark gold-text-glow' : 'shimmer-text'}`}>
            Wedding Program
          </h2>
          <p className={`font-montserrat text-sm mt-3 ${isDark ? 'text-slate-300' : 'text-rose-600'}`}>
            Reception & Muhurtam — two sacred moments to celebrate
          </p>
        </motion.div>

        {/* Timeline events */}
        <div className="relative flex flex-col gap-0">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative flex items-center gap-4 sm:gap-8 mb-10
                  ${isLeft ? 'flex-row' : 'flex-row-reverse'}
                `}
              >
                {/* Event card with 3D tilt hover */}
                <motion.div
                  whileHover={{ scale: 1.04, y: -4, rotate: isLeft ? 1 : -1 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                  className={`flex-1 rounded-2xl p-5 sm:p-6 relative group cursor-pointer
                    ${isDark
                      ? 'bg-slate-900/90 border border-yellow-600/40 hover:border-yellow-400 shadow-2xl shadow-black/50'
                      : 'bg-white/95 border border-rose-200 hover:border-rose-400 shadow-2xl shadow-rose-100/60'
                    }
                    transition-all duration-300
                  `}
                >
                  {/* Gradient top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${event.color}`} />

                  <div className="flex items-start gap-4">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      className="text-3xl mt-0.5 select-none block"
                    >
                      {event.icon}
                    </motion.span>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-playfair text-xl font-bold leading-tight mb-1
                        ${isDark ? 'text-yellow-100 group-hover:text-yellow-300' : 'text-rose-800 group-hover:text-rose-900'}
                        transition-colors
                      `}>
                        {event.name}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                        <span className={`font-montserrat text-xs font-bold
                          ${isDark ? 'text-yellow-300' : 'text-amber-700'}
                        `}>
                          📅 {event.date}
                        </span>
                        {event.time && (
                          <span className={`font-montserrat text-xs font-bold
                            ${isDark ? 'text-yellow-400/90' : 'text-rose-600'}
                          `}>
                            🕐 {event.time}
                          </span>
                        )}
                      </div>
                      <p className={`font-montserrat text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-rose-700'}`}>
                        {event.description}
                      </p>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                        ${isDark ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700/40' : 'bg-rose-50 text-rose-600 border border-rose-200'}
                      `}>
                        📍 {event.venue}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Center glowing node */}
                <div className="relative flex-shrink-0 z-10">
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 180 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    animate={{
                      boxShadow: isDark
                        ? ['0 0 0px 0px rgba(212,175,55,0)', '0 0 20px 8px rgba(212,175,55,0.6)', '0 0 0px 0px rgba(212,175,55,0)']
                        : ['0 0 0px 0px rgba(232,160,160,0)', '0 0 20px 8px rgba(232,160,160,0.7)', '0 0 0px 0px rgba(232,160,160,0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 cursor-pointer
                      ${isDark
                        ? 'bg-slate-950 border-yellow-400 text-yellow-300'
                        : 'bg-white border-rose-400 text-rose-500'
                      }
                    `}
                  >
                    <span className="text-lg">{event.icon}</span>
                  </motion.div>
                </div>

                {/* Spacer for alternating side */}
                <div className="flex-1 hidden sm:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

