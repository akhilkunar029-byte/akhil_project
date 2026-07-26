import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { albumPhotos, coupleNames } from '../config/weddingData';
import FloatingPetals from './FloatingPetals';

export default function PhotoAlbum({ theme }) {
  const isDark = theme?.name?.includes('Dark');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openLightbox = (index) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev === 0 ? albumPhotos.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev === albumPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="album"
      className={`relative py-20 px-4 overflow-hidden
        ${isDark ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900' : 'bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50'}
      `}
    >
      <FloatingPetals count={10} isDark={isDark} />

      {/* Background ambient glow */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20
        ${isDark ? 'bg-yellow-600' : 'bg-rose-300'}
      `}/>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className={`font-cormorant text-sm tracking-[0.4em] uppercase mb-2 flex items-center justify-center gap-2 ${isDark ? 'text-yellow-300' : 'text-rose-500'}`}>
            <Sparkles size={14} />
            Our Moments
            <Sparkles size={14} />
          </p>
          <h2 className={`font-cinzel text-3xl sm:text-4xl font-bold tracking-wide ${isDark ? 'shimmer-text-dark gold-text-glow' : 'shimmer-text'}`}>
            Precious Memories
          </h2>
          <p className={`font-montserrat text-sm mt-3 ${isDark ? 'text-slate-300' : 'text-rose-700'}`}>
            A glimpse into our journey of love &amp; togetherness
          </p>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {albumPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => openLightbox(index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-300
                ${isDark
                  ? 'bg-slate-900/90 border border-yellow-600/40 hover:border-yellow-400 hover:shadow-yellow-500/20'
                  : 'bg-white/95 border border-rose-200 hover:border-rose-300 hover:shadow-rose-200/60'
                }
              `}
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top-right heart badge */}
                <div className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-110
                  ${isDark ? 'bg-slate-950/70 border border-yellow-500/50 text-yellow-300' : 'bg-white/80 border border-rose-200 text-rose-500'}
                `}>
                  <Heart size={16} fill="currentColor" />
                </div>

                {/* Expand icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md transform scale-75 group-hover:scale-100 transition-transform duration-300
                    ${isDark ? 'bg-yellow-500 text-slate-950' : 'bg-rose-500 text-white'}
                  `}>
                    <Maximize2 size={20} />
                  </div>
                </div>

                {/* Caption info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-playfair text-lg font-bold text-white leading-tight drop-shadow-md">
                    {photo.title}
                  </h3>
                  <p className="font-montserrat text-xs text-yellow-300 font-medium mt-0.5 drop-shadow">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Close photo preview"
            >
              <X size={24} />
            </button>

            {/* Left Arrow */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image & Caption Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden border-2 shadow-2xl flex flex-col items-center
                ${isDark ? 'bg-slate-950 border-yellow-500/60 shadow-yellow-500/20' : 'bg-slate-900 border-rose-300 shadow-rose-500/20'}
              `}
            >
              <div className="relative overflow-hidden max-h-[70vh] flex items-center justify-center bg-black/40 w-full">
                <img
                  src={albumPhotos[selectedPhotoIndex].url}
                  alt={albumPhotos[selectedPhotoIndex].title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="py-4 px-6 text-center w-full bg-slate-950/90 border-t border-white/10">
                <h3 className="font-playfair text-xl font-bold text-white">
                  {albumPhotos[selectedPhotoIndex].title}
                </h3>
                <p className="font-montserrat text-xs text-yellow-300 font-medium mt-1">
                  {albumPhotos[selectedPhotoIndex].subtitle} • {coupleNames.displayName}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
