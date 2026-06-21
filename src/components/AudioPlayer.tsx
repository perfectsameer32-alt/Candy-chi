import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Place your audio file as 'audio.mp3' inside the 'public' folder.
  const audioSrc = "/audio.mp3";

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const hasStartedAutoplay = useRef(false);

  useEffect(() => {
    if (audioRef.current && !hasStartedAutoplay.current) {
      audioRef.current.volume = 0.3;
      
      const tryPlay = () => {
        if (audioRef.current && !hasStartedAutoplay.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            hasStartedAutoplay.current = true;
            // Once played successfully, remove the event listeners
            document.removeEventListener('click', tryPlay);
            document.removeEventListener('touchstart', tryPlay);
            document.removeEventListener('keydown', tryPlay);
          }).catch((err) => {
            console.log('Autoplay prevented by browser. Waiting for interaction.', err);
          });
        }
      };

      // Try playing immediately
      tryPlay();

      // If blocked, wait for the first user interaction anywhere on the screen
      if (!hasStartedAutoplay.current) {
        document.addEventListener('click', tryPlay);
        document.addEventListener('touchstart', tryPlay);
        document.addEventListener('keydown', tryPlay);
      }

      return () => {
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('touchstart', tryPlay);
        document.removeEventListener('keydown', tryPlay);
      };
    }
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50">
      <audio ref={audioRef} src={audioSrc} loop />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="p-3 rounded-full glass-card text-white/80 hover:text-white transition-colors"
        title="Toggle Background Music"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>
    </div>
  );
}
