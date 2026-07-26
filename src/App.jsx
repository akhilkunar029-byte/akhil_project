import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

import { getTheme, themes } from './config/weddingConfig';
import EnvelopeSeal from './components/EnvelopeSeal';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import ScratchCard from './components/ScratchCard';
import PhotoAlbum from './components/PhotoAlbum';
import CountdownTimer from './components/CountdownTimer';
import Timeline from './components/Timeline';
import VenueSection from './components/VenueSection';
import GiftRegistry from './components/GiftRegistry';

import './index.css';

// Navigation items
const NAV_ITEMS = [
  { href: '#hero', label: 'Home' },
  { href: '#scratch-card', label: 'Date' },
  { href: '#album', label: 'Album' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#timeline', label: 'Program' },
  { href: '#venue', label: 'Venue' },
];

function NavBar({ theme, isDark, onThemeToggle, opened }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!opened) return null;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3
        ${isDark
          ? 'bg-slate-950/80 border-b border-yellow-900/20 backdrop-blur-xl'
          : 'bg-white/70 border-b border-rose-100 backdrop-blur-xl'
        }
        shadow-sm
      `}
    >
      {/* Logo */}
      <a href="#hero" className={`font-playfair text-lg font-bold ${isDark ? 'text-yellow-200' : 'text-rose-800'}`}>
        A♡S
      </a>

      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`font-montserrat text-xs font-medium tracking-wider uppercase transition-colors
              ${isDark ? 'text-slate-400 hover:text-yellow-300' : 'text-rose-400 hover:text-rose-700'}
            `}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors
            ${isDark
              ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
              : 'bg-rose-50 text-rose-400 hover:bg-rose-100'
            }
          `}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Mobile menu */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`sm:hidden w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1.5
            ${isDark ? 'text-slate-400' : 'text-rose-400'}
          `}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 transition-all ${isDark ? 'bg-slate-400' : 'bg-rose-400'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 transition-all ${isDark ? 'bg-slate-400' : 'bg-rose-400'} ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 transition-all ${isDark ? 'bg-slate-400' : 'bg-rose-400'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className={`absolute top-full left-0 right-0 flex flex-col py-3
              ${isDark ? 'bg-slate-950/95 border-b border-yellow-900/20' : 'bg-white/95 border-b border-rose-100'}
              backdrop-blur-xl overflow-hidden
            `}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-3 font-montserrat text-sm font-medium tracking-wide
                  ${isDark ? 'text-slate-300 hover:text-yellow-300 hover:bg-slate-900' : 'text-rose-600 hover:text-rose-800 hover:bg-rose-50'}
                  transition-colors
                `}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [themeName, setThemeName] = useState('lightPastel');
  const theme = themes[themeName];
  const isDark = themeName === 'darkLuxury';

  const toggleTheme = () => setThemeName((t) => t === 'lightPastel' ? 'darkLuxury' : 'lightPastel');

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-rose-50'}`}>
      {/* Envelope landing (blocks view until opened) */}
      <EnvelopeSeal theme={theme} onOpen={() => setOpened(true)} />

      {/* Floating music player (always visible) */}
      <MusicPlayer theme={theme} autoPlay={opened} />

      {/* Navigation bar */}
      <NavBar theme={theme} isDark={isDark} onThemeToggle={toggleTheme} opened={opened} />

      {/* Main invitation content */}
      <AnimatePresence>
        {opened && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HeroSection theme={theme} />
            <ScratchCard theme={theme} />
            <PhotoAlbum theme={theme} />
            <CountdownTimer theme={theme} />
            <Timeline theme={theme} />
            <VenueSection theme={theme} />
            <GiftRegistry theme={theme} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
