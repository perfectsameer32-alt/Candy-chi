import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const flowersData = [
  { id: 1, top: '25%', left: '15%', message: "Your kindness makes the world a brighter place." },
  { id: 2, top: '45%', left: '80%', message: "Every dream you have is a seed waiting to bloom." },
  { id: 3, top: '65%', left: '25%', message: "You have a magical way of bringing joy to everyone." },
  { id: 4, top: '30%', left: '60%', message: "Your smile is more beautiful than any garden." },
  { id: 5, top: '75%', left: '70%', message: "Believe in yourself as much as we believe in you." },
  { id: 6, top: '50%', left: '45%', message: "Your friendship is a treasure that grows every day." },
  { id: 7, top: '80%', left: '10%', message: "You are stronger and braver than you know." },
  { id: 8, top: '15%', left: '85%', message: "Never let anyone dull your magical sparkle." },
];

const grassBlades = Array.from({length: 30}).map((_, i) => ({
  id: i,
  left: i * 3.3 + Math.random() * 2,
  height: 8 + Math.random() * 15,
  delay: Math.random() * 3,
  duration: 4 + Math.random() * 4,
  opacity: 0.4 + Math.random() * 0.6
}));

const petals = Array.from({length: 8}).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 15 + Math.random() * 15,
  scale: 0.3 + Math.random() * 0.5
}));

export function GardenOfWishes() {
  const [bloomedFlowers, setBloomedFlowers] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (bloomedFlowers.length === flowersData.length && !isComplete) {
      setTimeout(() => setIsComplete(true), 2000);
    }
  }, [bloomedFlowers, isComplete]);

  const handleFlowerClick = (id: number, message: string) => {
    if (!bloomedFlowers.includes(id)) {
      setBloomedFlowers(prev => [...prev, id]);
    }
    setActiveMessage(message);
  };

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#020513] via-[#0a1128] to-[#0d1f35] transform-gpu">
      
      {/* The Great Illumination (Grand Finale Lighting) */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-900/0 via-indigo-900/0 to-cyan-900/0 pointer-events-none z-0"
        animate={{ 
          opacity: isComplete ? 1 : 0,
          background: isComplete 
            ? "radial-gradient(circle at 50% 80%, rgba(14,165,233,0.3) 0%, rgba(30,58,138,0.1) 60%, rgba(2,5,19,0) 100%)" 
            : "radial-gradient(circle at 50% 80%, rgba(14,165,233,0) 0%, rgba(30,58,138,0) 60%, rgba(2,5,19,0) 100%)"
        }}
        transition={{ duration: 5 }}
      />

      {/* Moon */}
      <motion.div 
        className="absolute top-[10%] right-[15%] w-32 h-32 rounded-full bg-blue-50/80 shadow-[0_0_80px_rgba(219,234,254,0.6)] mix-blend-screen"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-indigo-900/10 blur-[4px] mix-blend-overlay" />
      </motion.div>

      {/* Mist Layers */}
      <motion.div 
        className="absolute bottom-0 w-[200vw] h-[40vh] bg-gradient-to-t from-indigo-900/40 to-transparent blur-3xl pointer-events-none z-0 will-change-transform"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-[10vh] w-[200vw] h-[30vh] bg-gradient-to-t from-cyan-900/20 to-transparent blur-2xl pointer-events-none z-0 will-change-transform"
        animate={{ x: [-1000, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {/* Grand Finale Magical Tree */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 5, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] md:w-[50vw] h-[70vh] pointer-events-none z-0 opacity-40 flex items-end justify-center"
          >
            <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_0_30px_rgba(125,211,252,0.8)]">
              <path d="M200 500 C 180 400 190 250 200 150 C 210 250 220 400 200 500" fill="url(#treeGradient)" />
              <path d="M200 350 Q 150 280 100 200" stroke="url(#treeGradient)" strokeWidth="8" fill="none" />
              <path d="M200 300 Q 250 230 300 150" stroke="url(#treeGradient)" strokeWidth="6" fill="none" />
              <path d="M150 280 Q 120 220 80 160" stroke="url(#treeGradient)" strokeWidth="4" fill="none" />
              <path d="M250 230 Q 280 180 320 120" stroke="url(#treeGradient)" strokeWidth="4" fill="none" />
              
              <circle cx="200" cy="150" r="120" fill="rgba(186, 230, 253, 0.1)" filter="blur(20px)" />
              <circle cx="100" cy="200" r="80" fill="rgba(125, 211, 252, 0.1)" filter="blur(15px)" />
              <circle cx="300" cy="150" r="90" fill="rgba(56, 189, 248, 0.1)" filter="blur(15px)" />
              
              <defs>
                <linearGradient id="treeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cherry Blossoms (Optimized Count) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {petals.map(petal => (
          <motion.div
            key={`garden-petal-${petal.id}`}
            className="absolute w-3 h-4 bg-pink-200/40 rounded-t-full rounded-bl-full shadow-[0_0_5px_rgba(255,192,203,0.3)] will-change-transform"
            style={{ left: `${petal.left}%`, scale: petal.scale }}
            initial={{ top: "-10vh", rotate: 0 }}
            animate={{ 
              top: "120vh", 
              left: [`${petal.left}%`, `${petal.left - 15}%`, `${petal.left + 10}%`],
              rotate: [0, 180, 360] 
            }}
            transition={{
              top: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" },
              left: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </div>

      {/* Fireflies (Optimized Count) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: isComplete ? 30 : 15 }).map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute bg-yellow-300 rounded-full box-glow will-change-transform"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 30, 0],
              x: [0, 20, -20, 0],
              opacity: isComplete ? [0.4, 1, 0.4] : [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: (isComplete ? 2 : 4) + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 h-full flex flex-col flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 pt-10"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-blue-100 mb-4 text-glow drop-shadow-[0_0_15px_rgba(219,234,254,0.5)]">
            Garden of Wishes
          </h2>
          <p className="text-blue-200/80 text-lg md:text-2xl max-w-2xl mx-auto font-light tracking-wide">
            Find the hidden buds and watch them bloom.
          </p>
        </motion.div>

        <div className="relative flex-1 w-full min-h-[60vh]">
          {flowersData.map((flower) => {
            const isBloomed = bloomedFlowers.includes(flower.id);
            return (
              <motion.div
                key={flower.id}
                className="absolute cursor-pointer group"
                style={{ top: flower.top, left: flower.left }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: flower.id * 0.15, ease: "easeOut" }}
                onClick={() => handleFlowerClick(flower.id, flower.message)}
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" className="drop-shadow-[0_0_10px_rgba(244,114,182,0.4)]">
                    <defs>
                      <linearGradient id={`petalGrad-${flower.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isComplete ? "#fef08a" : "#fdf4ff"} />
                        <stop offset="100%" stopColor={isComplete ? "#f59e0b" : "#f472b6"} />
                      </linearGradient>
                      <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>
                    <g style={{ transformOrigin: '50px 50px' }}>
                      {/* Back Petals */}
                      {[0, 60, 120, 180, 240, 300].map(rot => (
                        <motion.path
                          key={`back-${rot}`}
                          d="M50 50 C 35 30 40 10 50 5 C 60 10 65 30 50 50"
                          fill={`url(#petalGrad-${flower.id})`}
                          style={{ transformOrigin: '50px 50px' }}
                          initial={{ rotate: rot, scale: 0.2 }}
                          animate={{ scale: isBloomed ? 1 : 0.2 }}
                          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} // Springy cinematic feel
                        />
                      ))}
                      {/* Front Petals */}
                      {[30, 90, 150, 210, 270, 330].map(rot => (
                        <motion.path
                          key={`front-${rot}`}
                          d="M50 50 C 40 35 45 15 50 10 C 55 15 60 35 50 50"
                          fill={`url(#petalGrad-${flower.id})`}
                          style={{ transformOrigin: '50px 50px' }}
                          initial={{ rotate: rot, scale: 0.2 }}
                          animate={{ scale: isBloomed ? 0.8 : 0.2 }}
                          transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                      ))}
                      {/* Glowing Core */}
                      <motion.circle 
                        cx="50" cy="50" r="8" fill="url(#glowGrad)" 
                        initial={{ scale: 0.5, opacity: 0.5 }}
                        animate={{ 
                          scale: isBloomed ? [1, 1.2, 1] : 0.5, 
                          opacity: isBloomed ? [0.8, 1, 0.8] : 0.5,
                          filter: isBloomed ? "blur(2px)" : "blur(0px)"
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </g>
                  </svg>
                  
                  {/* Subtle hovering indicator for unbloomed */}
                  {!isBloomed && (
                    <div className="absolute inset-[-10px] border border-white/20 rounded-full animate-ping pointer-events-none" />
                  )}

                  {/* Sparkle Burst on Bloom */}
                  <AnimatePresence>
                    {isBloomed && (
                      <motion.div className="absolute inset-0 pointer-events-none">
                        {Array.from({length: 8}).map((_, i) => (
                          <motion.div
                            key={`burst-${flower.id}-${i}`}
                            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full shadow-[0_0_10px_#fde047]"
                            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                            animate={{ 
                              x: (Math.random() - 0.5) * 150, 
                              y: (Math.random() - 0.5) * 150,
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0]
                            }}
                            transition={{ duration: 2, delay: Math.random() * 0.5, ease: "easeOut" }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Grand Finale Message */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3, delay: 2 }}
              className="relative z-30 text-center pb-20"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 text-glow drop-shadow-[0_0_15px_rgba(253,230,138,0.8)]">
                "Every flower in this garden carries a wish for you."
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Parallax Grass at the Bottom */}
      <div className="absolute bottom-0 w-full h-[20vh] flex items-end pointer-events-none z-30 overflow-hidden">
        {grassBlades.map(g => (
          <motion.div 
            key={`grass-${g.id}`}
            className="absolute bottom-[-10px] w-1.5 rounded-t-full origin-bottom will-change-transform"
            style={{ 
              left: `${g.left}%`, 
              height: `${g.height}vh`,
              background: `linear-gradient(to top, #022c22, rgba(4, 47, 46, ${g.opacity}))`,
              filter: `blur(${g.height > 18 ? 2 : 0}px)`,
              zIndex: g.height > 18 ? 40 : 30
            }}
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: g.duration, delay: g.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Premium Message Modal */}
      <AnimatePresence>
        {activeMessage && !isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4"
            onClick={() => setActiveMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full p-10 rounded-[40px] text-center border border-pink-300/30 shadow-[0_30px_60px_rgba(244,114,182,0.15)] bg-white/5 backdrop-blur-3xl overflow-hidden"
            >
              {/* Modal atmospheric glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-blue-500/10 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />

              <button 
                onClick={() => setActiveMessage(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={28} strokeWidth={1.5} />
              </button>
              
              <div className="w-20 h-20 mx-auto mb-8 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl animate-pulse" />
                <Sparkles className="text-pink-300 w-10 h-10 relative z-10" strokeWidth={1.5} />
              </div>
              
              <p className="text-2xl md:text-3xl font-serif text-pink-50 mb-4 leading-relaxed text-glow drop-shadow-md">
                "{activeMessage}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
