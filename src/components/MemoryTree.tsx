import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const lanternsData = [
  { id: 1, top: '35%', left: '20%', msg: "A memory of laughter that echoes forever." },
  { id: 2, top: '35%', left: '80%', msg: "The quiet moments where everything felt right." },
  { id: 3, top: '20%', left: '30%', msg: "Remember no matter how many times you fall you have to stand up" },
  { id: 4, top: '20%', left: '70%', msg: "The Way you say 'Sam oi' and 'ehh sam' is my fav" },
  { id: 5, top: '15%', left: '50%', msg: "No matter how many times u become angry or sad i'll  always make u calm and happy" },
  { id: 6, top: '45%', left: '15%', msg: "The warmth of knowing you're never alone." },
  { id: 7, top: '45%', left: '85%', msg: "Remember when we first met." },
];

const petals = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 10 + Math.random() * 15,
  scale: 0.3 + Math.random() * 0.6
}));

export function MemoryTree() {
  const [openedLanterns, setOpenedLanterns] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (openedLanterns.length === lanternsData.length && !isComplete) {
      setTimeout(() => setIsComplete(true), 1500);
    }
  }, [openedLanterns, isComplete]);

  const handleLanternClick = (id: number, message: string) => {
    if (!openedLanterns.includes(id)) {
      setOpenedLanterns(prev => [...prev, id]);
    }
    setActiveMessage(message);
  };

  return (
    <section className="relative w-full min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#030712] via-[#081b29] to-[#020b14]">
      
      {/* Moonlight Beams */}
      <div className="absolute top-[-20%] left-[-10%] w-[150%] h-[300px] bg-gradient-to-r from-transparent via-cyan-100/5 to-transparent rotate-[35deg] blur-3xl pointer-events-none" />
      <div className="absolute top-[10%] right-[-20%] w-[150%] h-[400px] bg-gradient-to-r from-transparent via-blue-200/5 to-transparent rotate-[-40deg] blur-3xl pointer-events-none" />

      {/* Atmospheric Mist */}
      <motion.div 
        className="absolute bottom-0 left-0 w-[200%] h-[40vh] bg-gradient-to-t from-emerald-900/10 via-blue-900/5 to-transparent blur-3xl pointer-events-none z-0"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Fireflies */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: isComplete ? 80 : 30 }).map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute bg-yellow-200 rounded-full shadow-[0_0_8px_#fef08a]"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -40, 40, 0],
              x: [0, 30, -30, 0],
              opacity: isComplete ? [0.6, 1, 0.6] : [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: (isComplete ? 2 : 4) + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Falling Petals (Increases on Complete) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {petals.slice(0, isComplete ? petals.length : 10).map(petal => (
          <motion.div
            key={`petal-${petal.id}`}
            className="absolute w-3 h-4 bg-pink-300/60 rounded-t-full rounded-bl-full shadow-[0_0_5px_rgba(244,114,182,0.4)]"
            style={{ left: `${petal.left}%`, scale: petal.scale }}
            initial={{ top: "-10vh", rotate: 0 }}
            animate={{ 
              top: "120vh", 
              left: [`${petal.left}%`, `${petal.left - 15}%`, `${petal.left + 10}%`],
              rotate: [0, 180, 360] 
            }}
            transition={{
              top: { duration: isComplete ? petal.duration * 0.5 : petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" },
              left: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </div>

      <div className="relative z-20 text-center mb-4 pointer-events-none">
        <h2 className="text-4xl md:text-6xl font-serif text-blue-50 mb-4 text-glow drop-shadow-[0_0_20px_rgba(219,234,254,0.3)]">
          The Memory Tree
        </h2>
        <p className="text-blue-200/60 text-lg font-light tracking-widest">
          Every light holds a story
        </p>
      </div>

      {/* The Magical Tree Container */}
      <div className="relative w-[95vw] max-w-[900px] aspect-square mx-auto mt-4 z-20">
        
        {/* Tree SVG Artwork */}
        <svg viewBox="0 0 1000 1000" className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor={isComplete ? "#fef08a" : "#1e293b"} className="transition-colors duration-[3s]" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
            <filter id="glowTree">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glowTrunk">
              <feGaussianBlur stdDeviation={isComplete ? "15" : "0"} result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Core glow */}
          <circle cx="500" cy="400" r="350" fill={isComplete ? "rgba(253,224,71,0.15)" : "rgba(244,114,182,0.05)"} filter="blur(50px)" className="transition-colors duration-1000" />

          {/* Main Trunk */}
          <path d="M 450 1000 Q 480 600 500 500 Q 520 600 550 1000 Z" fill="url(#trunkGrad)" filter="url(#glowTrunk)" />
          
          {/* Roots */}
          <path d="M 450 1000 Q 300 950 150 1000" stroke="url(#trunkGrad)" strokeWidth="30" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 550 1000 Q 700 950 850 1000" stroke="url(#trunkGrad)" strokeWidth="30" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 480 1000 Q 350 1050 200 1050" stroke="url(#trunkGrad)" strokeWidth="15" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 520 1000 Q 650 1050 800 1050" stroke="url(#trunkGrad)" strokeWidth="15" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />

          {/* Branches */}
          <path d="M 500 600 Q 350 450 200 350" stroke="url(#trunkGrad)" strokeWidth="25" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 500 600 Q 650 450 800 350" stroke="url(#trunkGrad)" strokeWidth="25" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 500 500 Q 350 300 300 200" stroke="url(#trunkGrad)" strokeWidth="20" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 500 500 Q 650 300 700 200" stroke="url(#trunkGrad)" strokeWidth="20" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 500 450 Q 500 250 500 150" stroke="url(#trunkGrad)" strokeWidth="18" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 350 450 Q 250 500 150 450" stroke="url(#trunkGrad)" strokeWidth="15" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />
          <path d="M 650 450 Q 750 500 850 450" stroke="url(#trunkGrad)" strokeWidth="15" strokeLinecap="round" fill="none" filter="url(#glowTrunk)" />

          {/* Cinematic Foliage Clusters */}
          {[
            {cx: 200, cy: 350, r: 140},
            {cx: 800, cy: 350, r: 140},
            {cx: 300, cy: 200, r: 160},
            {cx: 700, cy: 200, r: 160},
            {cx: 500, cy: 150, r: 180},
            {cx: 350, cy: 300, r: 150},
            {cx: 650, cy: 300, r: 150},
            {cx: 150, cy: 450, r: 110},
            {cx: 850, cy: 450, r: 110},
            {cx: 500, cy: 350, r: 200},
          ].map((c, i) => (
            <g key={i}>
              <circle cx={c.cx} cy={c.cy} r={c.r + 30} fill={isComplete ? "rgba(253,224,71,0.1)" : "rgba(244,114,182,0.15)"} filter="blur(25px)" className="transition-colors duration-[3s]" />
              <circle cx={c.cx} cy={c.cy} r={c.r} fill="url(#leafGrad)" filter="url(#glowTree)" opacity="0.85" />
              <circle cx={c.cx - 20} cy={c.cy - 20} r={c.r * 0.5} fill="#fbcfe8" opacity="0.3" filter="blur(15px)" />
            </g>
          ))}
        </svg>

        {/* Hanging Lanterns */}
        {lanternsData.map((lantern) => {
          const isOpened = openedLanterns.includes(lantern.id);
          
          return (
            <div key={lantern.id} className="absolute" style={{ top: lantern.top, left: lantern.left }}>
              <motion.div 
                className="relative flex flex-col items-center cursor-pointer group origin-top -translate-x-1/2"
                animate={{ rotate: [-6, 6, -6] }}
                transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => handleLanternClick(lantern.id, lantern.msg)}
              >
                {/* String */}
                <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-yellow-700/80 to-yellow-500/80" />
                
                {/* Lantern Body */}
                <div className="relative w-6 h-8 md:w-8 md:h-10 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-sm shadow-[0_0_15px_rgba(251,191,36,0.6)] group-hover:shadow-[0_0_25px_rgba(251,191,36,1)] transition-all">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 md:w-10 h-1 bg-amber-900 rounded-sm shadow-md" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 md:w-10 h-1 bg-amber-900 rounded-sm shadow-md" />
                  
                  {/* Internal Glow */}
                  <div className={`absolute inset-1 rounded-sm bg-yellow-100 blur-[2px] transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-30'}`} />
                </div>
                
                {/* Massive Glow when opened */}
                <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`} />

                {/* Sparkle Burst on Click */}
                <AnimatePresence>
                  {isOpened && (
                    <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none">
                      {Array.from({length: 8}).map((_, i) => (
                        <motion.div
                          key={`sparkle-${lantern.id}-${i}`}
                          className="absolute w-1.5 h-1.5 bg-yellow-100 rounded-full shadow-[0_0_10px_#fef08a]"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                          animate={{ 
                            x: (Math.random() - 0.5) * 150, 
                            y: (Math.random() - 0.5) * 150,
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                          }}
                          transition={{ duration: 1.5, delay: Math.random() * 0.3, ease: "easeOut" }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Grand Finale Message */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 2 }}
            className="relative z-30 text-center mt-4 px-4 pb-10 pointer-events-none"
          >
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 text-glow drop-shadow-[0_0_20px_rgba(253,230,138,0.6)]">
              "Every memory, every wish, every light in this tree<br className="hidden md:block"/> was placed here for you."
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassmorphism Message Modal */}
      <AnimatePresence>
        {activeMessage && !isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setActiveMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full p-10 rounded-[30px] text-center border border-amber-200/30 shadow-[0_30px_60px_rgba(251,191,36,0.15)] bg-white/10 backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

              <button 
                onClick={() => setActiveMessage(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
              
              <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
                <Sparkles className="text-amber-200 w-8 h-8 relative z-10" strokeWidth={1.5} />
              </div>
              
              <p className="text-2xl font-serif text-amber-50 mb-2 leading-relaxed text-glow drop-shadow-md">
                "{activeMessage}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
