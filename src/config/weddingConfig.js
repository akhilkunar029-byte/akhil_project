// ============================================================
// weddingConfig.js — Theme Configuration
// Switch `activeTheme` between 'lightPastel' | 'darkLuxury'
// ============================================================

export const activeTheme = 'lightPastel'; // 'lightPastel' | 'darkLuxury'

export const themes = {
  lightPastel: {
    name: 'Light Pastel / Royal Rose Gold',
    // Backgrounds
    bgPrimary: 'from-amber-50/80 via-rose-50 to-pink-100/50',
    bgCard: 'bg-white/85',
    bgOverlay: 'bg-rose-50/95',
    // Hero envelope
    envelopeBg: 'from-amber-100 via-rose-100 to-pink-100',
    sealColor: '#d4af37',
    sealGlow: 'rgba(212,175,55,0.6)',
    // Text
    textPrimary: '#2d1b1b',
    textSecondary: '#7a5c5c',
    textAccent: '#c9a97a',
    textHeading: '#3b1f1f',
    // Accent / Gold
    accentGold: '#d4af37',
    accentRose: '#e8a0a0',
    accentPink: '#f3c5d5',
    // Border & shadow
    borderColor: 'border-amber-200/60',
    shadowColor: 'shadow-rose-200/50',
    // Countdown tiles
    countdownBg: 'bg-white/80',
    countdownBorder: 'border-amber-200/70',
    // Timeline
    timelineAccent: '#d4af37',
    // Buttons
    btnPrimary: 'bg-gradient-to-r from-amber-500 via-rose-400 to-amber-500 text-white shadow-lg shadow-amber-200/50',
    btnSecondary: 'border border-amber-300 text-amber-700',
    // Calendar
    calHeart: '#e8a0a0',
    // Classes (Tailwind)
    bgGradient: 'bg-gradient-to-br from-amber-50/80 via-rose-50 to-pink-100/50',
    cardClass: 'bg-white/85 backdrop-blur-md border border-amber-200/40 shadow-xl shadow-amber-100/30',
    headingClass: 'font-cinzel text-rose-950',
    bodyClass: 'font-montserrat text-rose-900/80',
    goldText: 'gold-text-gradient',
    sealBg: 'from-amber-400 to-rose-400',
  },
  darkLuxury: {
    name: 'Dark Luxury / Royal Velvet & Gold',
    // Backgrounds
    bgPrimary: 'from-slate-950 via-indigo-950 to-slate-950',
    bgCard: 'bg-slate-900/85',
    bgOverlay: 'bg-slate-950/98',
    // Hero envelope
    envelopeBg: 'from-slate-950 via-indigo-950 to-slate-950',
    sealColor: '#fcf6ba',
    sealGlow: 'rgba(252,246,186,0.7)',
    // Text
    textPrimary: '#f8f5ee',
    textSecondary: '#c8b6df',
    textAccent: '#fcf6ba',
    textHeading: '#ffffff',
    // Accent / Gold
    accentGold: '#fcf6ba',
    accentRose: '#c084fc',
    accentPink: '#e879f9',
    // Border & shadow
    borderColor: 'border-yellow-600/30',
    shadowColor: 'shadow-yellow-900/40',
    // Countdown tiles
    countdownBg: 'bg-slate-900/90',
    countdownBorder: 'border-yellow-600/40',
    // Timeline
    timelineAccent: '#fcf6ba',
    // Buttons
    btnPrimary: 'bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 text-slate-950 font-bold shadow-xl shadow-yellow-900/40',
    btnSecondary: 'border border-yellow-500/50 text-yellow-300',
    // Calendar
    calHeart: '#fcf6ba',
    // Classes (Tailwind)
    bgGradient: 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950',
    cardClass: 'bg-slate-900/85 backdrop-blur-md border border-yellow-600/30 shadow-2xl shadow-black/80',
    headingClass: 'font-cinzel text-yellow-100',
    bodyClass: 'font-montserrat text-slate-300',
    goldText: 'gold-text-gradient gold-text-glow',
    sealBg: 'from-yellow-600 via-amber-400 to-yellow-600',
  },
};

export const getTheme = () => themes[activeTheme];
