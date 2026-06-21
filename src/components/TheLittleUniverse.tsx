import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TheLittleUniverseProps {
  photoUrl: string;
}

export function TheLittleUniverse({ photoUrl }: TheLittleUniverseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  // Generate heart shape coordinates
  const heartStars = Array.from({ length: 40 }).map((_, i) => {
    const t = (i / 40) * Math.PI * 2;
    // Heart curve equations
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    
    return {
      id: i,
      x: x * 8, // Scale up
      y: y * 8,
      startX: (Math.random() - 0.5) * 1000,
      startY: (Math.random() - 0.5) * 1000,
      delay: Math.random() * 2,
    };
  });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a0a2a] via-black to-black" />
      
      {/* Ambient floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={`space-star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
        {/* Heart Constellation and Photo */}
        <div className="relative w-80 h-80 flex items-center justify-center mb-16">
          {/* The Stars gathering */}
          {heartStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute w-2 h-2 bg-pink-200 rounded-full box-glow"
              initial={{ x: star.startX, y: star.startY, opacity: 0 }}
              animate={isInView ? { x: star.x, y: star.y, opacity: 1 } : {}}
              transition={{ duration: 2.5, delay: star.delay, ease: "easeOut" }}
            />
          ))}

          {/* Central Photo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 2, delay: 3, ease: "easeOut" }}
            className="absolute z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-pink-200/50 box-glow"
          >
            <img src={photoUrl} alt="Her" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-pink-500/20 mix-blend-overlay" />
          </motion.div>

          {/* Magical Bloom */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: [0, 1.5, 1], opacity: [0, 1, 0.6] } : {}}
            transition={{ duration: 3, delay: 3 }}
            className="absolute z-0 w-64 h-64 bg-pink-500/30 rounded-full blur-2xl"
          />
        </div>

        {/* Messages */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 4.5 }}
            className="text-2xl md:text-3xl font-serif text-white mb-4 text-glow"
          >
            "Every universe has millions of stars."
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 6.5 }}
            className="text-3xl md:text-5xl font-serif text-pink-200 text-glow"
          >
            "This one was created especially for you."
          </motion.p>
        </div>
      </div>
    </section>
  );
}
