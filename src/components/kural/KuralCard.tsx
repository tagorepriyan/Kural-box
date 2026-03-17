"use client";

import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { Play, Pause, Bookmark, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export interface Kural {
  kural_number: number;
  tamil_text: string;
  english_translation: string;
  tamil_explanation: string;
  section: string;
  chapter: string;
  audio_start: number;
  audio_end: number;
  transliteration: string;
  english_couplet: string;
  english_explanation: string;
  chapter_translation: string;
  section_translation: string;
  commentary_sp: string;
  commentary_mk: string;
}

export function KuralCard({ kural }: { kural: Kural }) {
  const { bookmarks, toggleBookmark, openAudioPlayer, audioPlayer } = useAppStore();
  const [commentator, setCommentator] = useState<"mv" | "sp" | "mk">("mv");
  
  const isBookmarked = bookmarks.includes(kural.kural_number);
  const isPlaying = audioPlayer.isOpen && audioPlayer.currentKural === kural.kural_number;

  const handlePlay = () => {
    openAudioPlayer(kural.kural_number);
  };

  const currentCommentary = 
    commentator === "mv" ? kural.tamil_explanation :
    commentator === "sp" ? kural.commentary_sp : kural.commentary_mk;

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
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">{kural.section} <span className="text-muted-foreground/50 mx-1">•</span> {kural.section_translation}</p>
          <p className="text-sm text-foreground font-medium">{kural.chapter} <span className="text-muted-foreground ml-1">({kural.chapter_translation})</span></p>
        </div>
        <div className="bg-background rounded-full px-4 py-1 border border-border shadow-sm">
          <span className="text-sm font-bold text-foreground">Kural {kural.kural_number}</span>
        </div>
      </div>

      {/* Main Kural Text (Tamil & Transliteration) */}
      <div className="p-6 sm:p-8 pb-6 border-b border-border/50 overflow-x-auto">
        <div className="flex flex-col mb-6 space-y-6">
          <h2 className="font-tamil text-foreground leading-loose tracking-wide w-full flex flex-col gap-2">
            {(kural.tamil_text || "").split('\n').map((line, index) => (
              <span key={index} className="text-lg sm:text-xl md:text-2xl whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
          <div className="w-full flex flex-col gap-1.5">
            {(kural.transliteration || "").split('\n').map((line, index) => (
              <span key={index} className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium italic whitespace-nowrap">
                {line}
              </span>
            ))}
          </div>
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
      <div className="p-6 sm:p-8 space-y-8 bg-background">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Tamil Meaning</h3>
            <div className="flex items-center gap-2 bg-muted p-1 rounded-full w-fit">
              <button onClick={() => setCommentator("mv")} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${commentator === "mv" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}>M.V</button>
              <button onClick={() => setCommentator("sp")} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${commentator === "sp" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}>S.P</button>
              <button onClick={() => setCommentator("mk")} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${commentator === "mk" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}>M.K</button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.p 
              key={commentator}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-lg text-foreground font-tamil leading-relaxed"
            >
              {currentCommentary}
            </motion.p>
          </AnimatePresence>
        </div>
        
        <div className="pt-6 border-t border-border/50">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">English Translation</h3>
          <p className="text-[1.05rem] text-foreground leading-relaxed mb-4">
            {kural.english_translation}
          </p>
          <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              "{kural.english_couplet}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
