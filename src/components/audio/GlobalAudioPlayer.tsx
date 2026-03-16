"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { X, Play, Pause, Volume2 } from "lucide-react";
import kuralData from "@/data/kurals.json";

export function GlobalAudioPlayer() {
  const { audioPlayer, closeAudioPlayer } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentKuralData = kuralData.find((k) => k.kural_number === audioPlayer.currentKural);

  useEffect(() => {
    if (audioPlayer.isOpen && audioPlayer.currentKural && currentKuralData) {
      if (audioRef.current) {
        // Mock logic for seeking safely with a timeout to ensure audio is loaded
        const playAudio = async () => {
          if (!audioRef.current) return;
          try {
            audioRef.current.currentTime = currentKuralData.audio_start;
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (e) {
            console.error("Audio playback failed", e);
            setIsPlaying(false);
          }
        };
        playAudio();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [audioPlayer.isOpen, audioPlayer.currentKural, currentKuralData]);

  const handleTimeUpdate = () => {
    if (!audioRef.current || !currentKuralData) return;
    
    const { currentTime } = audioRef.current;
    
    // Auto-stop logic
    if (currentTime >= currentKuralData.audio_end) {
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(100);
      // Don't auto-close, let user decide
      return;
    }

    // Calculate progress percentage within the segment
    const duration = currentKuralData.audio_end - currentKuralData.audio_start;
    const currentProgress = currentTime - currentKuralData.audio_start;
    setProgress(Math.max(0, Math.min(100, (currentProgress / duration) * 100)));
  };

  const togglePlay = () => {
    if (audioRef.current && currentKuralData) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Restart segment if it ended
        if (progress >= 100) {
            audioRef.current.currentTime = currentKuralData.audio_start;
        }
        audioRef.current.play().catch(e => console.error(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!audioPlayer.isOpen || !audioPlayer.currentKural) return null;

  return (
    <div className="fixed bottom-[64px] md:bottom-0 left-0 w-full bg-card border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 p-4 animate-in slide-in-from-bottom-5 fade-in duration-300">
      {/* Mock Audio Source - will need to be replaced by the single audio file */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-3 w-1/4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-primary" />
          </div>
          <div className="truncate">
            <p className="text-sm font-bold text-foreground">Kural {audioPlayer.currentKural}</p>
            <p className="text-xs text-muted-foreground truncate">{currentKuralData?.chapter}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
            </button>
          </div>

          <div className="w-full max-w-md h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="w-1/4 flex justify-end">
          <button 
            onClick={closeAudioPlayer}
            className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
