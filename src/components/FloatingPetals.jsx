import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PETAL_TYPES = ['🌸', '🌷', '✿', '❀', '✨', '🌹', '🌺', '💖'];

export default function FloatingPetals({ count = 14, isDark }) {
  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      char: PETAL_TYPES[i % PETAL_TYPES.length],
      left: `${Math.random() * 92 + 4}%`,
      size: Math.random() * 1.2 + 0.8, // 0.8rem to 2.0rem
      duration: Math.random() * 8 + 8, // 8s to 16s
      delay: Math.random() * 6,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
      xOffset: Math.random() * 80 - 40,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            y: '-10vh',
            x: 0,
            opacity: 0,
            rotate: item.rotateStart,
          }}
          animate={{
            y: '110vh',
            x: [0, item.xOffset, -item.xOffset, 0],
            opacity: [0, 0.8, 0.8, 0],
            rotate: item.rotateEnd,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: item.left,
            fontSize: `${item.size}rem`,
            filter: isDark ? 'drop-shadow(0 0 6px rgba(212,175,55,0.4))' : 'drop-shadow(0 0 6px rgba(232,160,160,0.5))',
          }}
          className="select-none"
        >
          {item.char}
        </motion.div>
      ))}
    </div>
  );
}
