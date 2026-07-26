import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Heart, User, Mail, Users, MessageSquare, ChevronDown, Loader2 } from 'lucide-react';
import { coupleNames, rsvpConfig } from '../config/weddingData';

const ATTENDANCE_OPTIONS = [
  { value: 'attending', label: '🎉 Joyfully Attending', icon: '✅' },
  { value: 'declining', label: '😔 Regretfully Declining', icon: '❌' },
];

const initialForm = {
  name: '',
  email: '',
  attendance: '',
  guests: 1,
  message: '',
};

export default function RSVPForm({ theme }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isDark = theme?.name?.includes('Dark');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Please enter a valid email';
    if (!form.attendance) errs.attendance = 'Please select your attendance';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field) => `
    w-full px-4 py-3 rounded-xl font-montserrat text-sm outline-none transition-all duration-200 form-input
    ${isDark
      ? `bg-slate-800 border ${errors[field] ? 'border-red-500' : 'border-slate-700'} text-white placeholder-slate-500 focus:border-yellow-600`
      : `bg-rose-50/50 border ${errors[field] ? 'border-red-400' : 'border-rose-100'} text-rose-900 placeholder-rose-300 focus:border-rose-400`
    }
  `;

  const labelClass = `font-montserrat text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-yellow-400/80' : 'text-rose-500'}`;

  return (
    <section
      id="rsvp"
      className={`relative py-20 px-4 overflow-hidden
        ${isDark ? 'bg-gradient-to-b from-slate-900 to-indigo-950' : 'bg-gradient-to-b from-amber-50 to-pink-50'}
      `}
    >
      {/* Ambient decoration */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-10
        ${isDark ? 'bg-indigo-600' : 'bg-rose-300'}
      `}/>

      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className={`font-cormorant text-sm tracking-[0.4em] uppercase mb-2 ${isDark ? 'text-yellow-400/60' : 'text-rose-400/70'}`}>
            ✦ Your Presence Matters ✦
          </p>
          <h2 className={`font-playfair text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-rose-900'}`}>
            RSVP & Wishes
          </h2>
          <p className={`font-montserrat text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-rose-400/70'}`}>
            Kindly respond by {rsvpConfig.deadline}
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`relative rounded-3xl p-7 sm:p-9
            ${isDark
              ? 'bg-slate-900/90 border border-yellow-900/40 shadow-2xl shadow-black/50'
              : 'bg-white/90 border border-rose-100 shadow-2xl shadow-rose-100/50'
            }
          `}
        >
          {/* Gold top accent */}
          <div className={`absolute top-0 left-6 right-6 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-yellow-700/60 to-transparent' : 'bg-gradient-to-r from-transparent via-rose-200 to-transparent'}`} />

          <AnimatePresence mode="wait">
            {/* Submitted state */}
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex flex-col items-center gap-6 py-8 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -5, 0] }}
                  transition={{ duration: 0.8 }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center
                    ${isDark ? 'bg-yellow-900/30' : 'bg-rose-50'}
                  `}
                >
                  <Heart size={40} fill={isDark ? '#d4af37' : '#e8a0a0'} className={isDark ? 'text-yellow-400' : 'text-rose-400'} />
                </motion.div>
                <div>
                  <h3 className={`font-playfair text-2xl font-bold mb-2 ${isDark ? 'text-yellow-100' : 'text-rose-800'}`}>
                    Thank You, {form.name.split(' ')[0]}! 🎉
                  </h3>
                  <p className={`font-montserrat text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-rose-400/80'}`}>
                    {form.attendance === 'attending'
                      ? `We're overjoyed you'll be joining us! Your presence will make our day complete. 💕`
                      : `We'll miss you dearly, but we're grateful for your warm wishes. You'll be in our hearts! 🌸`
                    }
                  </p>
                </div>
                {form.message && (
                  <div className={`w-full rounded-xl p-4 ${isDark ? 'bg-slate-800 border border-yellow-900/30' : 'bg-rose-50 border border-rose-100'}`}>
                    <p className={`font-cormorant text-base italic ${isDark ? 'text-yellow-200/80' : 'text-rose-600'}`}>
                      "{form.message}"
                    </p>
                  </div>
                )}
                <p className={`font-montserrat text-xs ${isDark ? 'text-slate-500' : 'text-rose-300'}`}>
                  — {coupleNames.groom} & {coupleNames.bride}
                </p>
              </motion.div>
            ) : (
              /* Form */
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                noValidate
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>
                    <User size={10} className="inline mr-1" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-red-400 text-xs font-montserrat">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>
                    <Mail size={10} className="inline mr-1" /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="text-red-400 text-xs font-montserrat">{errors.email}</p>}
                </div>

                {/* Attendance */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Will You Be Attending?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {ATTENDANCE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm({ ...form, attendance: opt.value })}
                        className={`py-3 px-4 rounded-xl font-montserrat text-xs font-semibold transition-all duration-200 border
                          ${form.attendance === opt.value
                            ? isDark
                              ? 'bg-yellow-700/30 border-yellow-500 text-yellow-300'
                              : 'bg-rose-100 border-rose-400 text-rose-700'
                            : isDark
                              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                              : 'bg-rose-50/50 border-rose-100 text-rose-400 hover:border-rose-200'
                          }
                        `}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.attendance && <p className="text-red-400 text-xs font-montserrat">{errors.attendance}</p>}
                </div>

                {/* Number of guests (only if attending) */}
                {form.attendance === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label className={labelClass}>
                      <Users size={10} className="inline mr-1" /> Number of Guests
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors
                          ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'}
                        `}
                      >
                        −
                      </button>
                      <span className={`font-playfair text-2xl font-bold w-8 text-center ${isDark ? 'text-yellow-200' : 'text-rose-800'}`}>
                        {form.guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, guests: Math.min(rsvpConfig.maxGuestsPerRsvp, f.guests + 1) }))}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors
                          ${isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'}
                        `}
                      >
                        +
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Blessing message */}
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>
                    <MessageSquare size={10} className="inline mr-1" /> Personal Blessing / Message
                  </label>
                  <textarea
                    placeholder="Write your heartfelt wishes for the couple…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className={inputClass('message') + ' resize-none'}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl font-montserrat text-sm font-semibold tracking-wide mt-2 transition-all duration-200
                    ${isDark
                      ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-slate-900 hover:from-yellow-500 hover:to-yellow-300 shadow-lg shadow-yellow-900/30'
                      : 'bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600 shadow-lg shadow-rose-200'
                    }
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {loading
                    ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
                    : <><Heart size={16} /> Send RSVP & Wishes</>
                  }
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
