import { useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame, useTransform, AnimatePresence } from 'framer-motion';

interface DreamGalleryProps {
  photoUrl?: string;
}

const orbitItems = [
  { id: 1, type: 'polaroid', msg: 'The best people leave a little light wherever they go.' },
  { id: 2, type: 'glass', msg: 'Every journey becomes better when shared with good people.' },
  { id: 3, type: 'watercolor', msg: 'kindness is quiet superpowerful and you have plenty of it.' },
  { id: 4, type: 'sketch', msg: 'some moments do not need colors to be beautiful' },
  { id: 5, type: 'cinematic', msg: 'A smile can brighten a room. yours brightens memories.' }
];

const petals = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 15 + Math.random() * 20,
  scale: 0.3 + Math.random() * 0.6
}));

const bgLanterns = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 15,
  duration: 20 + Math.random() * 30,
  scale: 0.2 + Math.random() * 0.3
}));

export function DreamGallery({ photoUrl }: DreamGalleryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBloomed, setIsBloomed] = useState(false);

  // Global Mouse Parallax
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { damping: 40, stiffness: 100 });
  const smoothTiltY = useSpring(tiltY, { damping: 40, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 15;
    const y = (clientY / window.innerHeight - 0.5) * -15;
    tiltX.set(y);
    tiltY.set(x);
  };

  // Orbital Time System
  const time = useMotionValue(0);
  useAnimationFrame((_t, delta) => {
    if (!isHovered) {
      time.set(time.get() + delta * 0.015);
    }
  });

  const parentRotationZ = useTransform(time, (v: number) => v % 360);

  return (
    <section 
      className="relative w-full min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0b2e] via-[#2a1142] to-[#120822] transform-gpu"
      onMouseMove={handleMouseMove}
      style={{ perspective: 1200 }}
    >
      {/* Soft Fog Layers */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/30 via-indigo-900/10 to-transparent pointer-events-none will-change-transform"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Twinkling Particles (Reduced Count) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full will-change-transform"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.1,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Distant Background Lanterns (Reduced Count) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {bgLanterns.map((lantern) => (
          <motion.div
            key={`lantern-${lantern.id}`}
            className="absolute w-4 h-6 bg-orange-400 rounded-md shadow-[0_0_15px_#f97316] opacity-30 blur-[2px] will-change-transform"
            style={{ left: `${lantern.left}%`, scale: lantern.scale }}
            initial={{ bottom: "-10vh", rotate: -5 }}
            animate={{ 
              bottom: "120vh", 
              rotate: [5, -5, 5],
              x: [0, 20, -20, 0]
            }}
            transition={{
              bottom: { duration: lantern.duration, repeat: Infinity, delay: lantern.delay, ease: "linear" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}
      </div>

      {/* Drifting Cherry Blossoms (Reduced Count) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {petals.map(petal => (
          <motion.div
            key={`petal-${petal.id}`}
            className="absolute w-4 h-5 bg-pink-300/40 rounded-t-full rounded-bl-full shadow-[0_0_5px_rgba(244,114,182,0.3)] will-change-transform"
            style={{ left: `${petal.left}%`, scale: petal.scale }}
            initial={{ top: "-10vh", rotate: 0 }}
            animate={{ 
              top: "120vh", 
              left: [`${petal.left}%`, `${petal.left - 10}%`, `${petal.left + 5}%`],
              rotate: [0, 180, 360] 
            }}
            transition={{
              top: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" },
              left: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "easeInOut" },
              rotate: { duration: 7, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="relative z-20 text-center mb-10 pt-10 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-indigo-200 mb-4 text-glow drop-shadow-[0_0_15px_rgba(244,114,182,0.4)]">
          Dream Gallery
        </h2>
        <p className="text-pink-200/70 text-lg font-light tracking-widest drop-shadow-sm">
          A kaleidoscope of beautiful memories
        </p>
      </div>

      {/* 3D Scene Container */}
      <motion.div 
        className="relative w-full h-[600px] flex items-center justify-center pointer-events-auto"
        style={{ rotateX: smoothTiltX, rotateY: smoothTiltY, transformStyle: 'preserve-3d' }}
      >
        {/* Orbital System */}
        <div 
          className="absolute top-1/2 left-1/2 w-0 h-0" 
          style={{ transform: 'translate(-50%, -50%) rotateX(65deg)', transformStyle: 'preserve-3d' }}
        >
          {/* Glowing orbital ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] pointer-events-none" />

          {/* Rotating Wrapper */}
          <motion.div 
            className="absolute inset-0"
            style={{ rotateZ: parentRotationZ, transformStyle: 'preserve-3d' }}
          >
            {orbitItems.map((item, i) => {
              const angle = (i / orbitItems.length) * 360;
              const radiusClass = "translate-x-[175px] md:translate-x-[250px]";
              
              return (
                <OrbitPhoto 
                  key={item.id}
                  item={item}
                  angle={angle}
                  time={time}
                  radiusClass={radiusClass}
                  photoUrl={photoUrl}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                />
              );
            })}
          </motion.div>

          {/* Center Photo */}
          <div className="absolute top-0 left-0" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div 
              style={{ transform: 'translate(-50%, -50%) rotateX(-65deg)', transformStyle: 'preserve-3d' }}
              className="relative z-50 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsBloomed(true)}
            >
              {/* Premium Glass Frame */}
              <div className="w-40 h-52 md:w-56 md:h-72 bg-white/10 backdrop-blur-2xl border border-white/40 p-3 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_50px_rgba(244,114,182,0.4)] transition-all duration-500 relative">
                <div className="w-full h-full overflow-hidden rounded-xl relative">
                  <img src={photoUrl || '/api/placeholder/400/500'} alt="Centerpiece" className="w-full h-full object-cover filter contrast-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Center Glow */}
                <div className="absolute inset-[-10px] bg-pink-400/20 rounded-3xl blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Bloom Explosion Particles */}
            <AnimatePresence>
              {isBloomed && (
                <div className="absolute inset-0 pointer-events-none z-[100]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-65deg)' }}>
                  {Array.from({length: 60}).map((_, i) => (
                    <motion.div
                      key={`bloom-${i}`}
                      className={`absolute w-4 h-4 ${i % 2 === 0 ? 'bg-pink-300 rounded-t-full rounded-bl-full shadow-[0_0_10px_#f9a8d4]' : 'bg-yellow-200 rounded-full shadow-[0_0_15px_#fde047]'}`}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                      animate={{ 
                          x: (Math.random() - 0.5) * 1000, 
                          y: (Math.random() - 0.5) * 1000,
                          scale: [0, Math.random() * 2 + 1, 0],
                          opacity: [1, 1, 0],
                          rotate: Math.random() * 720
                      }}
                      transition={{ duration: 3 + Math.random() * 3, ease: "easeOut" }}
                    />
                  ))}
                  
                  {/* Glowing shockwave */}
                  <motion.div 
                    className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-pink-400/50 shadow-[0_0_50px_#f472b6]"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 1000, height: 1000, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bloom Quote Overlay */}
      <AnimatePresence>
        {isBloomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute inset-0 z-[150] pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
              className="text-center px-4"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200 mb-6 drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]">
                "Some memories glow forever."
              </h3>
              <p className="text-pink-100/90 text-lg md:text-xl font-light tracking-widest">
                A gallery of dreams built just for you.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Sub-component for rendering the artistic styles
function OrbitPhoto({ item, angle, time, radiusClass, photoUrl, onHoverStart, onHoverEnd }: any) {
  const childRotationZ = useTransform(time, (v: number) => -(v % 360) - angle);
  
  const renderCard = () => {
    switch(item.type) {
      case 'polaroid':
        return (
          <div className="w-28 h-36 md:w-36 md:h-44 bg-[#fdfbf7] p-2 pb-8 shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-neutral-200 rotate-[-4deg] group-hover:rotate-0 transition-all duration-500 relative">
            <div className="w-full h-full overflow-hidden border border-neutral-300">
              <img src={photoUrl || '/api/placeholder/400/500'} className="w-full h-full object-cover sepia-[0.5] contrast-[1.1] brightness-[0.9] saturate-[0.8]" alt="Polaroid" />
            </div>
            <p className="absolute bottom-1 left-0 w-full text-center font-serif text-amber-900/60 text-[10px] md:text-xs italic tracking-widest">
              a moment
            </p>
          </div>
        );
      
      case 'glass':
        return (
          <div className="w-28 h-36 md:w-36 md:h-48 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-500 relative">
            <div className="w-full h-full overflow-hidden rounded-lg">
              <img src={photoUrl || '/api/placeholder/400/500'} className="w-full h-full object-cover saturate-[1.2] brightness-[1.1]" alt="Glass" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        );

      case 'watercolor':
        return (
          <div className="w-32 h-32 md:w-40 md:h-40 bg-[#faf8f5] p-1 shadow-[0_15px_30px_rgba(0,0,0,0.4)] rotate-[3deg] group-hover:rotate-0 transition-all duration-500 relative">
            <div className="w-full h-full overflow-hidden relative border border-neutral-200/50">
              <img src={photoUrl || '/api/placeholder/400/500'} className="w-full h-full object-cover saturate-[1.8] contrast-[1.1] brightness-[1.15] blur-[0.5px]" alt="Watercolor" />
              {/* Soft edge vignette mask */}
              <div className="absolute inset-0 shadow-[inset_0_0_20px_white] pointer-events-none opacity-80 mix-blend-overlay" />
              {/* Watercolor paper texture simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:4px_4px] pointer-events-none mix-blend-multiply opacity-20" />
            </div>
          </div>
        );

      case 'sketch':
        return (
          <div className="w-28 h-36 md:w-32 md:h-44 bg-[#f0f0f0] p-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-neutral-300 rotate-[-2deg] group-hover:rotate-0 transition-all duration-500 relative">
            <div className="w-full h-full overflow-hidden relative border border-neutral-400">
              <img src={photoUrl || '/api/placeholder/400/500'} className="w-full h-full object-cover grayscale contrast-[1.5] brightness-[1.2]" alt="Sketch" />
              {/* Pencil hatching texture overlay */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_3px)] pointer-events-none mix-blend-multiply opacity-40" />
            </div>
          </div>
        );

      case 'cinematic':
        return (
          <div className="w-36 h-28 md:w-48 md:h-32 bg-[#050505] p-0.5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_50px_rgba(244,114,182,0.4)] transition-all duration-500 rounded-sm relative">
            <div className="w-full h-full overflow-hidden relative rounded-sm">
              <img src={photoUrl || '/api/placeholder/400/500'} className="w-full h-full object-cover saturate-[1.3] brightness-[1.1] contrast-[1.2]" alt="Cinematic" />
              {/* Cinematic letterbox */}
              <div className="absolute top-0 w-full h-3 bg-black/90 backdrop-blur-sm" />
              <div className="absolute bottom-0 w-full h-3 bg-black/90 backdrop-blur-sm" />
              {/* Soft bokeh overlays */}
              <div className="absolute top-2 left-2 w-10 h-10 bg-pink-500/30 rounded-full blur-md mix-blend-screen pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-16 h-16 bg-amber-500/20 rounded-full blur-lg mix-blend-screen pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-cyan-400/20 rounded-full blur-md mix-blend-screen pointer-events-none" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="absolute top-0 left-0"
      style={{ 
        transform: `translate(-50%, -50%) rotateZ(${angle}deg)`, 
        transformStyle: 'preserve-3d' 
      }}
    >
      <div className={`absolute top-0 left-0 ${radiusClass}`} style={{ transformStyle: 'preserve-3d' }}>
        <motion.div style={{ rotateZ: childRotationZ, transformStyle: 'preserve-3d' }}>
          <motion.div 
            style={{ transform: 'rotateX(-65deg)', transformStyle: 'preserve-3d' }}
            whileHover={{ scale: 1.15, z: 60 }} 
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            className="group relative cursor-pointer"
          >
            {/* The uniquely styled card */}
            {renderCard()}

            {/* Hover Message */}
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[200%] opacity-0 group-hover:opacity-100 group-hover:bottom-[-40px] transition-all duration-500 pointer-events-none text-center z-50">
              <p className="text-white font-serif text-sm md:text-base drop-shadow-md bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                {item.msg}
              </p>
            </div>
            
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
