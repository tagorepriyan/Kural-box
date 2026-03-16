"use client";

import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { Play, Pause, Bookmark, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export interface Kural {
  kural_number: number;
  tamil_text: string;
  english_translation: string;
  tamil_explanation: string;
  section: string;
  chapter: string;
  audio_start: number;
  audio_end: number;
}

export function KuralCard({ kural }: { kural: Kural }) {
  const { bookmarks, toggleBookmark, openAudioPlayer, audioPlayer } = useAppStore();
  
  const isBookmarked = bookmarks.includes(kural.kural_number);
  const isPlaying = audioPlayer.isOpen && audioPlayer.currentKural === kural.kural_number;

  const handlePlay = () => {
    openAudioPlayer(kural.kural_number);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl bg-card rounded-3xl shadow-lg border border-border overflow-hidden"
    >
      {/* Header Info */}
      <div className="bg-muted px-6 py-4 flex justify-between items-center border-b border-border">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">{kural.section}</p>
          <p className="text-sm text-muted-foreground">{kural.chapter}</p>
        </div>
        <div className="bg-background rounded-full px-4 py-1 border border-border shadow-sm">
          <span className="text-sm font-bold text-foreground">Kural {kural.kural_number}</span>
        </div>
      </div>

      {/* Main Kural Text (Tamil) */}
      <div className="p-8 pb-6 border-b border-border/50">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl sm:text-3xl font-tamil text-foreground leading-loose tracking-wide w-full" style={{ whiteSpace: "pre-wrap" }}>
            {kural.tamil_text}
          </h2>
        </div>
        
        {/* Interactive Controls */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePlay}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-sm ${
              isPlaying
                ? "bg-accent text-accent-foreground"
                : "bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
            <span>{isPlaying ? "Playing..." : "Listen"}</span>
          </button>
          
          <button
            onClick={() => toggleBookmark(kural.kural_number)}
            className="p-3 bg-muted rounded-full text-foreground hover:bg-black/5 transition-colors"
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          
          <Link 
            href={`/share/${kural.kural_number}`}
            className="p-3 bg-muted rounded-full text-foreground hover:bg-black/5 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Meanings */}
      <div className="p-6 sm:p-8 space-y-6 bg-background">
        <div>
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Tamil Meaning</h3>
          <p className="text-lg text-foreground font-tamil leading-relaxed">
            {kural.tamil_explanation}
          </p>
        </div>
        
        <div className="pt-6 border-t border-border/50">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">English Translation</h3>
          <p className="text-[1.05rem] text-foreground leading-relaxed">
            {kural.english_translation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
