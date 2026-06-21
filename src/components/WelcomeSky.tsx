import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

interface WelcomeSkyProps {
  photoUrl: string;
  onBegin: () => void;
}

// 3 Layers of Lanterns for Parallax Depth
const createLanterns = (count: number, scaleRange: [number, number], durationRange: [number, number], blur: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${blur}-${i}`,
    left: Math.random() * 100,
    delay: Math.random() * 5 + 1,
    duration: durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]),
    scale: scaleRange[0] + Math.random() * (scaleRange[1] - scaleRange[0]),
    blur
  }));
};

const bgLanterns = createLanterns(10, [0.15, 0.3], [30, 45], 4);
const midLanterns = createLanterns(8, [0.4, 0.6], [20, 30], 1);
const fgLanterns = createLanterns(6, [0.8, 1.2], [10, 18], 0);

const allLanterns = [...bgLanterns, ...midLanterns, ...fgLanterns];

const petals = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 15 + Math.random() * 15,
  scale: 0.3 + Math.random() * 0.6,
  blur: Math.random() > 0.5 ? 2 : 0
}));

export function WelcomeSky({ photoUrl, onBegin }: WelcomeSkyProps) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax tilt values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { damping: 30, stiffness: 100 });
  const smoothTiltY = useSpring(tiltY, { damping: 30, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    
    // Smooth 3D tilt
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20; // gentle 10 deg tilt
    const y = (clientY / window.innerHeight - 0.5) * -20;
    tiltX.set(y);
    tiltY.set(x);

    // Occasional sparkle trail
    if (Math.random() > 0.85) {
      const id = Date.now() + Math.random();
      setSparkles(prev => [...prev.slice(-15), { id, x: clientX, y: clientY }]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== id));
      }, 800);
    }
  };

  const handleBeginClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onBegin();
    }, 1800);
  };

  const titleText = "A Journey Through Candy's World".split("");
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 4 }
    }
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#7da7d9] via-[#fbc193] to-[#f49a88]"
      onMouseMove={handleMouseMove}
      style={{ perspective: 1200 }}
    >
      {/* 1. Initial Dark Overlay (Cinematic Entrance) */}
      <motion.div 
        className="absolute inset-0 bg-[#0a0a0f] z-[60] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Atmospheric Sun Rays & Fog */}
      <motion.div 
        className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 w-[150vw] h-[100vh] bg-[conic-gradient(from_0deg_at_50%_100%,rgba(255,255,255,0)_0deg,rgba(255,220,130,0.15)_20deg,rgba(255,255,255,0)_40deg)] rounded-full blur-[60px] pointer-events-none mix-blend-overlay"
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute bottom-[10vh] w-full h-[50vh] bg-gradient-to-t from-orange-200/40 to-transparent blur-3xl pointer-events-none" />

      {/* Gentle Clouds */}
      <motion.div 
        className="absolute top-[20%] left-[10%] w-[40vw] h-[10vh] bg-white/20 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-[30%] right-[10%] w-[50vw] h-[15vh] bg-white/10 rounded-full blur-3xl"
        animate={{ x: [0, -150, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cherry Blossom Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        {petals.map(petal => (
          <motion.div
            key={`petal-${petal.id}`}
            className="absolute w-3 h-4 bg-pink-200/60 rounded-t-full rounded-bl-full shadow-[0_0_5px_rgba(255,192,203,0.5)]"
            style={{ left: `${petal.left}%`, scale: petal.scale, filter: `blur(${petal.blur}px)` }}
            initial={{ top: "-10vh", rotate: 0 }}
            animate={{ 
              top: "120vh", 
              left: [`${petal.left}%`, `${petal.left - 10}%`, `${petal.left + 5}%`],
              rotate: [0, 180, 360] 
            }}
            transition={{
              top: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" },
              left: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </div>

      {/* Main Lanterns */}
      {allLanterns.map((lantern) => (
        <motion.div
          key={`lantern-${lantern.id}`}
          className="absolute flex flex-col items-center justify-center opacity-95"
          style={{ 
            left: `${lantern.left}%`, 
            scale: lantern.scale,
            filter: `blur(${lantern.blur}px)`,
            zIndex: lantern.blur === 0 ? 30 : lantern.blur === 1 ? 15 : 5
          }}
          initial={{ bottom: "-20vh", opacity: 0, rotate: -3 }}
          animate={{ 
            bottom: isTransitioning ? "150vh" : "120vh", 
            opacity: isTransitioning ? 0 : [0, 1, 1, 0],
            rotate: [3, -3, 3, -3, 3],
            x: [0, 15, -15, 0] // Gentle wind sway
          }}
          transition={{
            bottom: { duration: isTransitioning ? 1.5 : lantern.duration, ease: isTransitioning ? "easeIn" : "linear", repeat: isTransitioning ? 0 : Infinity, delay: isTransitioning ? 0 : lantern.delay },
            opacity: { duration: isTransitioning ? 1.5 : lantern.duration, repeat: isTransitioning ? 0 : Infinity, delay: isTransitioning ? 0 : lantern.delay },
            rotate: { duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 12 + Math.random() * 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Lantern Body */}
          <div className="relative w-10 h-14 bg-gradient-to-b from-amber-300 via-orange-400 to-red-500 rounded-t-xl rounded-b-lg shadow-[0_0_40px_rgba(249,115,22,0.8)] border border-orange-200/40">
            {/* Bright core flame */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-100 rounded-full blur-[3px] shadow-[0_0_15px_#fef08a]" />
          </div>
          
          {/* Occasional emitting spark */}
          {lantern.blur === 0 && (
            <motion.div 
              className="absolute -bottom-2 w-1 h-1 bg-yellow-200 rounded-full"
              animate={{ y: [0, 20], opacity: [1, 0], scale: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: Math.random() * 5 }}
            />
          )}
        </motion.div>
      ))}

      {/* Water Reflection Section */}
      <div className="absolute bottom-0 left-0 w-full h-[25vh] overflow-hidden z-20">
        <svg className="hidden">
          <filter id="water-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.1" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* Ocean Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-300/30 via-sky-700/50 to-blue-950/90 backdrop-blur-md border-t border-white/30" />
        
        {/* Soft Water Ripples */}
        <motion.div className="absolute top-0 w-[200%] h-3 bg-amber-100/30 rounded-full blur-[2px]" animate={{ x: [0, -500] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute top-4 w-[200%] h-4 bg-orange-200/20 rounded-full blur-[4px]" animate={{ x: [-500, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute top-10 w-[200%] h-8 bg-cyan-400/10 rounded-full blur-[8px]" animate={{ x: [0, -800] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} />

        {/* Reflected Lanterns with distortion */}
        <div className="absolute inset-0" style={{ filter: "url(#water-distortion)" }}>
          {allLanterns.map((lantern) => (
            <motion.div
              key={`reflection-${lantern.id}`}
              className="absolute flex items-start justify-center"
              style={{ 
                left: `${lantern.left}%`, 
                scale: lantern.scale,
                filter: `blur(${lantern.blur + 6}px)`,
              }}
              initial={{ bottom: "50vh", opacity: 0 }}
              animate={{ 
                bottom: isTransitioning ? "-100vh" : "-70vh", 
                opacity: isTransitioning ? 0 : [0, 0.3, 0.3, 0],
                x: [0, 15, -15, 0] // Mirror sway
              }}
              transition={{
                bottom: { duration: isTransitioning ? 1.5 : lantern.duration, ease: isTransitioning ? "easeIn" : "linear", repeat: isTransitioning ? 0 : Infinity, delay: isTransitioning ? 0 : lantern.delay },
                opacity: { duration: isTransitioning ? 1.5 : lantern.duration, repeat: isTransitioning ? 0 : Infinity, delay: isTransitioning ? 0 : lantern.delay },
                x: { duration: 12 + Math.random() * 6, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="w-10 h-14 bg-gradient-to-t from-amber-300 via-orange-400 to-red-500 rounded-b-xl rounded-t-lg shadow-[0_0_30px_#f97316]" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/80 pointer-events-none" />
      </div>

      {/* Main Content Sequence */}
      <div className="relative z-40 flex flex-col items-center text-center px-4 w-full max-w-5xl pt-[8vh] pointer-events-none">
        
        {/* Parallax Photo Frame */}
        <motion.div
          style={{ rotateX: smoothTiltX, rotateY: smoothTiltY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, delay: 2, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like spring
          className="mb-12 relative group pointer-events-auto"
        >
          {/* Breathing Glassmorphism Backing */}
          <motion.div 
            className="absolute inset-[-25px] bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Main Image */}
          <div className="w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-[4px] border-white/40 relative z-10 shadow-[0_0_50px_rgba(255,237,74,0.4)]">
            <img src={photoUrl} alt="Her" className="w-full h-full object-cover filter brightness-105 contrast-105" />
          </div>
          
          {/* Elegant Double Ring */}
          <motion.div 
            className="absolute inset-[-12px] rounded-full border border-amber-200/50 z-20 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[-20px] rounded-full border-[0.5px] border-white/40 border-dashed z-20 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          {/* Warm Golden Halo */}
          <div className="absolute inset-0 bg-yellow-200/10 rounded-full blur-2xl pointer-events-none" />

          {/* Tiny orbiting sparkles */}
          <motion.div 
            className="absolute top-[-15px] left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white] z-30"
            animate={{ rotate: 360, transformOrigin: "0px 160px" }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-[-15px] right-1/2 w-1.5 h-1.5 bg-amber-200 rounded-full shadow-[0_0_8px_#fde047] z-30"
            animate={{ rotate: -360, transformOrigin: "0px -160px" }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Premium Animated Title */}
        <motion.h1 
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif mb-6 leading-tight whitespace-nowrap"
        >
          {titleText.map((char, i) => (
            <motion.span 
              key={i} 
              variants={letterVariants} 
              className={`inline-block text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-white to-amber-200 drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] ${char === " " ? "w-3 md:w-5" : ""}`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Elegant Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 6.5, ease: "easeOut" }}
          className="text-lg md:text-2xl text-amber-50/80 mb-16 font-light tracking-[0.15em] drop-shadow-sm"
        >
          A small universe made especially for you.
        </motion.p>

        {/* Premium Glassmorphism Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 8, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleBeginClick}
          className="group pointer-events-auto relative px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-amber-200/50 rounded-full backdrop-blur-2xl text-white font-serif tracking-widest text-sm transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center gap-3 overflow-visible"
        >
          <span className="relative z-10 uppercase text-amber-50/90 group-hover:text-white transition-colors duration-300 drop-shadow-sm">
            Begin the Journey
          </span>
          <ChevronDown className="relative z-10 text-amber-50/80 group-hover:text-amber-200 group-hover:translate-y-1 transition-all duration-300" size={18} />
          
          {/* Button Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-amber-200/10 to-amber-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-md" />
          
          {/* Hover Particles */}
          <div className="absolute inset-[-20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <Sparkles className="absolute top-2 left-6 text-amber-200 w-3 h-3 animate-pulse" />
            <Sparkles className="absolute bottom-2 right-6 text-white w-2 h-2 animate-bounce" />
          </div>
        </motion.button>
      </div>

      {/* Sparkle Cursor Trail */}
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0.8, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0, y: -15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none z-[100]"
          style={{ left: s.x, top: s.y }}
        />
      ))}


    </section>
  );
}
