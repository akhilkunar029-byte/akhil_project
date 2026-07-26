import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Phone, Navigation, Copy, Check, Sparkles } from 'lucide-react';
import { venue } from '../config/weddingData';
import FloatingPetals from './FloatingPetals';

export default function VenueSection({ theme }) {
  const isDark = theme?.name?.includes('Dark');
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venue.name}, ${venue.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="venue"
      className={`relative py-20 px-4 overflow-hidden
        ${isDark ? 'bg-gradient-to-b from-indigo-950 to-slate-900' : 'bg-gradient-to-b from-pink-50 to-amber-50'}
      `}
    >
      <FloatingPetals count={8} isDark={isDark} />

      {/* Ambient glow */}
      <div className={`absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20
        ${isDark ? 'bg-indigo-700' : 'bg-rose-200'}
      `}/>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className={`font-cormorant text-sm tracking-[0.4em] uppercase mb-2 flex items-center justify-center gap-2 ${isDark ? 'text-yellow-300' : 'text-rose-500'}`}>
            <Sparkles size={14} />
            Where We Celebrate
            <Sparkles size={14} />
          </p>
          <h2 className={`font-cinzel text-3xl sm:text-4xl font-bold tracking-wide ${isDark ? 'shimmer-text-dark gold-text-glow' : 'shimmer-text'}`}>
            Venue &amp; Location
          </h2>
        </motion.div>

        {/* Venue card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`rounded-3xl p-8 flex flex-col gap-6 relative transition-all duration-300 shadow-2xl
            ${isDark
              ? 'bg-slate-900/90 border border-yellow-600/40 hover:border-yellow-400 shadow-black/60'
              : 'bg-white/95 border border-rose-200 hover:border-rose-300 shadow-rose-100/70'
            }
          `}
        >
          {/* Venue icon */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 rounded-full ${isDark ? 'bg-yellow-400/40' : 'bg-rose-400/40'}`}
              />
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 shadow-md
                ${isDark ? 'bg-yellow-900/40 border border-yellow-500/50' : 'bg-rose-50 border border-rose-200'}
              `}>
                <MapPin size={26} className={isDark ? 'text-yellow-300' : 'text-rose-500'} />
              </div>
            </div>
            <div>
              <h3 className={`font-playfair text-2xl font-bold ${isDark ? 'text-yellow-100' : 'text-rose-900'}`}>
                {venue.name}
              </h3>
              <p className={`font-montserrat text-xs font-bold uppercase tracking-wider ${isDark ? 'text-yellow-400' : 'text-amber-700'}`}>
                ✦ Main Wedding Venue ✦
              </p>
            </div>
          </div>

          <div className={`h-px ${isDark ? 'bg-yellow-900/40' : 'bg-rose-100'}`} />

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Navigation size={18} className={`mt-1 flex-shrink-0 ${isDark ? 'text-yellow-400' : 'text-rose-500'}`} />
              <div>
                <p className={`font-montserrat text-base font-bold leading-relaxed ${isDark ? 'text-slate-100' : 'text-rose-900'}`}>
                  {venue.address}
                </p>
                <p className={`font-montserrat text-xs font-semibold mt-1 ${isDark ? 'text-slate-400' : 'text-rose-500'}`}>
                  Landmark: {venue.landmark}
                </p>
              </div>
            </div>
            {venue.phone && (
              <div className="flex items-center gap-3">
                <Phone size={18} className={`flex-shrink-0 ${isDark ? 'text-yellow-400' : 'text-rose-500'}`} />
                <p className={`font-montserrat text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-rose-800'}`}>
                  {venue.phone}
                </p>
              </div>
            )}
          </div>

          {/* Copy Address + Get Directions buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <motion.button
              onClick={handleCopyAddress}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-montserrat text-xs font-bold tracking-wide transition-all duration-200 border cursor-pointer
                ${isDark
                  ? 'border-yellow-600/50 text-yellow-300 bg-yellow-900/20 hover:bg-yellow-900/40'
                  : 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100'
                }
              `}
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              {copied ? 'Address Copied!' : 'Copy Address'}
            </motion.button>

            <motion.a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-montserrat text-xs font-bold tracking-wide transition-all duration-200 shadow-lg cursor-pointer
                ${isDark
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 hover:from-yellow-400 hover:to-amber-500'
                  : 'bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600'
                }
              `}
            >
              <ExternalLink size={16} />
              Open Google Maps
            </motion.a>
          </div>

          {/* Decorative quote */}
          <p className={`font-cormorant text-base italic text-center mt-1 ${isDark ? 'text-yellow-400/80' : 'text-rose-500/80'}`}>
            &quot;Where two hearts become one story&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
