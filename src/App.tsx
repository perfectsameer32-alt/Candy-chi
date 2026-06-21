import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioPlayer } from '@/components/AudioPlayer';
import { WelcomeSky } from '@/components/WelcomeSky';
import { GardenOfWishes } from '@/components/GardenOfWishes';
import { StarConstellation } from '@/components/StarConstellation';
import { DreamGallery } from '@/components/DreamGallery';
import { MemoryTree } from '@/components/MemoryTree';

function App() {
  // Hardcoded photo URL. Place your image as 'photo.jpg' inside the 'public' folder.
  const photoUrl = "/photo.jpg"; 
  
  // Ref for the first content section after the welcome screen
  const gardenRef = useRef<HTMLDivElement>(null);

  const handleBeginJourney = () => {
    gardenRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-pink-500/30">
      <AnimatePresence mode="wait">
        <motion.div
          key="journey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <AudioPlayer />
          
          <WelcomeSky photoUrl={photoUrl} onBegin={handleBeginJourney} />
          
          <div ref={gardenRef}>
            <GardenOfWishes />
          </div>
          
          <DreamGallery photoUrl={photoUrl} />
          
          <MemoryTree />

          <StarConstellation photoUrl={photoUrl} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default App;
