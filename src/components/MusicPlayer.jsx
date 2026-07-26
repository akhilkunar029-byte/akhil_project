import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Volume2 } from 'lucide-react';
import { media } from '../config/weddingData';

const START_TIME = 14; // Start background music from 14th second

export default function MusicPlayer({ theme, autoPlay }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const startPlayback = () => {
    if (audioRef.current && !playing) {
      audioRef.current.volume = 0.5;
      if (audioRef.current.currentTime < START_TIME) {
        audioRef.current.currentTime = START_TIME;
      }
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch((err) => console.log('Audio play catch:', err));
    }
  };

  // 1. Trigger when autoPlay prop becomes true
  useEffect(() => {
    if (autoPlay) {
      startPlayback();
    }
  }, [autoPlay]);

  // 2. Global user interaction listener to bypass browser autoplay blocks
  useEffect(() => {
    const handleFirstUserGesture = () => {
      if (!playing && audioRef.current) {
        audioRef.current.volume = 0.5;
        if (audioRef.current.currentTime < START_TIME) {
          audioRef.current.currentTime = START_TIME;
        }
        audioRef.current.play()
          .then(() => {
            setPlaying(true);
            window.removeEventListener('click', handleFirstUserGesture);
            window.removeEventListener('touchstart', handleFirstUserGesture);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstUserGesture);
    window.addEventListener('touchstart', handleFirstUserGesture);

    return () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
    };
  }, [playing]);

  const toggle = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.volume = 0.5;
      if (audioRef.current.currentTime < START_TIME) {
        audioRef.current.currentTime = START_TIME;
      }
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch((err) => console.log('Audio toggle err:', err));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.currentTime < START_TIME) {
      audioRef.current.currentTime = START_TIME;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && playing && audioRef.current.currentTime < START_TIME) {
      audioRef.current.currentTime = START_TIME;
    }
  };

  const isDark = theme?.name?.includes('Dark');

  if (!media.backgroundMusic) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      <audio
        ref={audioRef}
        src={media.backgroundMusic}
        loop
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />

      <motion.button
        initial={{ opacity: 0, scale: 0, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
        onClick={toggle}
        className={`
          relative w-12 h-12 rounded-full flex items-center justify-center
          shadow-2xl border transition-all duration-300 cursor-pointer
          ${isDark
            ? 'bg-slate-900/90 border-yellow-500 text-yellow-300 hover:border-yellow-400'
            : 'bg-white/95 border-rose-300 text-rose-600 hover:border-rose-400'
          }
        `}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {/* Ripple ring when playing */}
        {playing && (
          <>
            <span className={`absolute inset-0 rounded-full ${isDark ? 'bg-yellow-500/30' : 'bg-rose-400/30'} animate-ping`} />
            <span className={`absolute inset-[-4px] rounded-full border ${isDark ? 'border-yellow-500/50' : 'border-rose-400/50'} glow-ring`} />
          </>
        )}
        {playing
          ? <Pause size={20} />
          : <Music size={20} className="float-note" />
        }
      </motion.button>

      {/* Pulse hint when not playing */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
            className={`text-xs font-montserrat font-semibold px-3 py-1 rounded-full whitespace-nowrap cursor-pointer shadow-md
              ${isDark ? 'bg-yellow-500 text-slate-950' : 'bg-rose-500 text-white'}
              animate-pulse
            `}
          >
            🎵 Tap for Background Music
          </motion.div>
        )}
      </AnimatePresence>

      {/* Equalizer bars when playing */}
      {playing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-end gap-[3px] h-5"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ height: ['6px', '18px', '8px', '16px', '6px'] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
              className={`w-[3px] rounded-full ${isDark ? 'bg-yellow-400' : 'bg-rose-500'}`}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
