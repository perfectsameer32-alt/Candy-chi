import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Moon, X, Sparkles } from 'lucide-react';

interface StarConstellationProps {
  photoUrl?: string;
}

const starsData = [
  { id: 1, initX: 10, initY: 20, targetX: 50, targetY: 25, msg: "Your smile brightens the darkest nights." },
  { id: 2, initX: 30, initY: 15, targetX: 65, targetY: 15, msg: "Your kindness is your greatest strength." },
  { id: 3, initX: 45, initY: 30, targetX: 85, targetY: 20, msg: "The world is better with you in it." },
  { id: 4, initX: 80, initY: 10, targetX: 95, targetY: 40, msg: "You inspire everyone around you." },
  { id: 5, initX: 90, initY: 40, targetX: 80, targetY: 65, msg: "You have a heart of pure gold." },
  { id: 6, initX: 70, initY: 70, targetX: 65, targetY: 80, msg: "Never stop chasing your dreams." },
  { id: 7, initX: 50, initY: 85, targetX: 50, targetY: 95, msg: "You are capable of amazing things." },
  { id: 8, initX: 30, initY: 75, targetX: 35, targetY: 80, msg: "Your laugh is contagious." },
  { id: 9, initX: 15, initY: 60, targetX: 20, targetY: 65, msg: "You bring warmth to everyone." },
  { id: 10, initX: 5, initY: 35, targetX: 5, targetY: 40, msg: "You are wonderfully unique." },
  { id: 11, initX: 25, initY: 45, targetX: 15, targetY: 20, msg: "You deserve all the happiness." },
  { id: 12, initX: 40, initY: 55, targetX: 35, targetY: 15, msg: "You are truly loved and appreciated." },
];

const secretStar = {
  id: 13, initX: 85, initY: 85, targetX: 85, targetY: 85, msg: "You found the secret star! Never lose your sense of wonder."
};

const playChime = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200 + Math.random() * 400, ctx.currentTime + 1);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

export function StarConstellation({ photoUrl }: StarConstellationProps) {
  const [clickedStars, setClickedStars] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [secretFound, setSecretFound] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    // Only check the main 12 stars for completion
    const mainStarsClicked = starsData.every(s => clickedStars.includes(s.id));
    if (mainStarsClicked && !isComplete) {
      setTimeout(() => setIsComplete(true), 1500); // Wait a moment before transformation
      setTimeout(() => setShowPhoto(true), 6000);  // Photo appears after heart forms
      setTimeout(() => setShowFinalText(true), 9000); // Final text appears after photo
    }
  }, [clickedStars, isComplete]);

  const handleStarClick = (id: number, msg: string) => {
    if (!clickedStars.includes(id)) {
      setClickedStars(prev => [...prev, id]);
      playChime();
    }
    
    if (id === 13) {
      setSecretFound(true);
      // Extra sparkly chime for secret
      setTimeout(playChime, 100);
      setTimeout(playChime, 300);
    }
    
    setActiveMessage(msg);
  };

  const getStarPos = (star: typeof starsData[0]) => {
    if (isComplete) {
      return { x: star.targetX, y: star.targetY };
    }
    return { x: star.initX, y: star.initY };
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-24 flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#050510] via-[#0a0a2a] to-[#1a0a2a]">
      
      {/* Background Moon */}
      <motion.div 
        className="absolute top-20 right-20 w-48 h-48 rounded-full bg-yellow-100/10 shadow-[0_0_100px_rgba(255,255,200,0.2)] mix-blend-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <Moon className="w-full h-full text-yellow-100/30" strokeWidth={0.5} />
      </motion.div>

      {/* Tiny background stars (Optimized Count) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute bg-white rounded-full will-change-transform"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 2 }).map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${-10}%`,
            }}
            animate={{
              x: ['0vw', '120vw'],
              y: ['0vh', '40vh'],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 5 + Math.random() * 10,
              repeatDelay: 5 + Math.random() * 15,
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-r from-white to-transparent transform -translate-x-full origin-right" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 h-full flex flex-col flex-1">
        <AnimatePresence>
          {!isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 text-glow">
                Candy's Constellation
              </h2>
              <p className="text-blue-200/80 text-lg max-w-2xl mx-auto font-light">
                "Every star holds a little piece of light."
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex-1 min-h-[70vh] w-full mt-8">
          
          {/* Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            {starsData.map((star, idx) => {
              const nextIdx = (idx + 1) % starsData.length;
              const nextStar = starsData[nextIdx];
              
              const isConnected = isComplete || (clickedStars.includes(star.id) && clickedStars.includes(nextStar.id));
              
              const pos1 = getStarPos(star);
              const pos2 = getStarPos(nextStar);
              
              return (
                <motion.line
                  key={`line-${star.id}`}
                  x1={`${pos1.x}%`}
                  y1={`${pos1.y}%`}
                  x2={`${pos2.x}%`}
                  y2={`${pos2.y}%`}
                  stroke={isComplete ? "rgba(250, 204, 21, 0.8)" : "rgba(147, 197, 253, 0.4)"}
                  strokeWidth={isComplete ? "4" : "2"}
                  style={{ filter: isComplete ? "drop-shadow(0 0 12px rgba(250,204,21,0.8))" : "drop-shadow(0 0 8px rgba(147,197,253,0.5))" }}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: isConnected ? 1 : 0,
                    x1: `${pos1.x}%`,
                    y1: `${pos1.y}%`,
                    x2: `${pos2.x}%`,
                    y2: `${pos2.y}%`,
                  }}
                  transition={{ 
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    x1: { duration: 3, ease: "easeInOut" },
                    y1: { duration: 3, ease: "easeInOut" },
                    x2: { duration: 3, ease: "easeInOut" },
                    y2: { duration: 3, ease: "easeInOut" },
                  }}
                />
              );
            })}
          </svg>

          {/* Interactive Stars */}
          {[...starsData, secretStar].map((star) => {
            const isClicked = clickedStars.includes(star.id);
            const isSecret = star.id === 13;
            const pos = getStarPos(star);
            
            // Hide secret star slightly before complete, hide it completely when complete
            if (isSecret && isComplete) return null;

            return (
              <motion.div
                key={star.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 ${isSecret && !isClicked ? 'opacity-20 hover:opacity-100 cursor-help' : 'cursor-pointer'}`}
                animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: isSecret && !isClicked ? 0.2 : 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: star.id * 0.1,
                  left: { duration: 3, ease: "easeInOut" },
                  top: { duration: 3, ease: "easeInOut" }
                }}
                onClick={() => handleStarClick(star.id, star.msg)}
              >
                <motion.div
                  animate={{
                    scale: isClicked || isComplete ? [1, 1.2, 1] : [1, 1.1, 1],
                    opacity: isClicked || isComplete ? 1 : [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-500 
                    ${isComplete ? 'bg-yellow-400/40 shadow-[0_0_30px_rgba(250,204,21,0.8)]' : 
                      isClicked ? 'bg-blue-400/40 shadow-[0_0_20px_rgba(147,197,253,0.8)]' : 
                      'bg-white/10 hover:bg-white/30'}`}
                >
                  <Star 
                    className={`transition-colors duration-500 filter ${isComplete ? 'text-yellow-200 fill-yellow-200 drop-shadow-[0_0_10px_rgba(250,204,21,1)]' : isClicked ? 'text-white fill-white' : 'text-blue-100 fill-blue-100'}`} 
                    size={24} 
                  />
                </motion.div>
                
                {/* Ping animation behind unclicked stars */}
                {!isClicked && !isSecret && (
                  <div className="absolute inset-[-5px] rounded-full bg-blue-300/30 animate-ping" />
                )}
                
                {secretFound && isSecret && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-yellow-400 rounded-full"
                  />
                )}
              </motion.div>
            );
          })}

          {/* Grand Finale Photo Fade-in */}
          <AnimatePresence>
            {showPhoto && photoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-yellow-200/50 box-glow shadow-[0_0_60px_rgba(250,204,21,0.6)]">
                  <img src={photoUrl} alt="Her" className="w-full h-full object-cover filter brightness-110" />
                </div>
                
                {/* Falling Petals Effect around photo */}
                <div className="absolute inset-[-100px] pointer-events-none">
                   {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={`finale-petal-${i}`}
                        className="absolute w-3 h-3 bg-pink-300 rounded-full blur-[1px] will-change-transform"
                        initial={{ 
                          x: 0, y: 0, 
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{ 
                          x: (Math.random() - 0.5) * 400,
                          y: (Math.random() - 0.5) * 400,
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0]
                        }}
                        transition={{
                          duration: 4 + Math.random() * 3,
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                      />
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Text Sequence */}
        <AnimatePresence>
          {showFinalText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              className="relative z-30 text-center mt-12 mb-12"
            >
              <h3 className="text-2xl md:text-4xl font-serif text-yellow-100 mb-6 text-glow drop-shadow-md">
                "Among millions of stars, some shine brighter than the rest."
              </h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 3 }}
                className="text-xl md:text-2xl text-pink-100 font-light drop-shadow-sm"
              >
                "This little constellation was made especially for you."
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glassmorphism Message Modal */}
      <AnimatePresence>
        {activeMessage && !isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setActiveMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-md w-full p-8 rounded-3xl relative text-center border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
            >
              <button 
                onClick={() => setActiveMessage(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg" />
                <Sparkles className="text-blue-300 w-8 h-8 relative z-10" />
              </div>
              
              <p className="text-2xl font-serif text-blue-50 mb-2 leading-relaxed text-glow">
                "{activeMessage}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
