"use client";

import { useState, useEffect } from "react";
import kuralData from "@/data/kurals.json";
import { RefreshCw, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MemorizationMode() {
  const [mounted, setMounted] = useState(false);
  const [currentKuralIndex, setCurrentKuralIndex] = useState(0);
  const [revealedLines, setRevealedLines] = useState<number[]>([]);
  const [showMeaning, setShowMeaning] = useState(false);

  useEffect(() => {
    pickRandomKural();
    setMounted(true);
  }, []);

  const pickRandomKural = () => {
    const kuralIndex = Math.floor(Math.random() * kuralData.length);
    setCurrentKuralIndex(kuralIndex);
    setRevealedLines([]);
    setShowMeaning(false);
  };

  const toggleLine = (idx: number) => {
    setRevealedLines((prev) => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const revealAll = () => {
    const currentKural = kuralData[currentKuralIndex];
    const lineCount = currentKural.tamil_text.split("\n").length;
    setRevealedLines(Array.from({ length: lineCount }, (_, i) => i));
    setShowMeaning(true);
  };

  if (!mounted) {
    return <div className="h-64 animate-pulse bg-card rounded-3xl border border-border"></div>;
  }

  const kural = kuralData[currentKuralIndex];
  const lines = kural.tamil_text.split("\n");
  const isFullyRevealed = revealedLines.length === lines.length;

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border">
      <div className="mb-8 text-center space-y-2">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
           Memorization Practice
        </h3>
        <p className="text-xs text-muted-foreground">Kural {kural.kural_number} • {kural.chapter}</p>
      </div>

      {/* English Hint / Translation */}
      <div className="bg-muted p-5 rounded-xl border border-border flex flex-col gap-2 mb-8 relative group">
         <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowMeaning(!showMeaning)}>
            <p className="font-semibold text-foreground text-sm uppercase tracking-wide">English Meaning (Hint)</p>
            {showMeaning ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
         </div>
         <AnimatePresence>
            {showMeaning && (
               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="text-foreground text-[1.1rem] leading-relaxed pt-2">
                    {kural.english_translation}
                  </p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div className="space-y-4 mb-10 text-center font-tamil text-xl md:text-2xl leading-loose font-bold text-foreground">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Tap a line to reveal or hide the Tamil text</p>
        
        {lines.map((line, idx) => {
          const isRevealed = revealedLines.includes(idx);
          return (
            <div 
              key={idx} 
              onClick={() => toggleLine(idx)}
              className={`min-h-[3.5rem] p-3 rounded-2xl cursor-pointer transition-all border-2 mx-auto sm:w-[90%] flex items-center justify-center select-none ${
                 isRevealed 
                 ? "bg-background border-border shadow-sm" 
                 : "bg-muted border-dashed border-primary/30 hover:border-primary/60 hover:bg-muted/80"
              }`}
            >
              {isRevealed ? (
                 <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-foreground">
                    {line}
                 </motion.span>
              ) : (
                 <span className="text-muted-foreground/40 italic font-sans text-sm tracking-widest">
                    [ HIDDEN LINE ]
                 </span>
              )}
            </div>
          );
        })}
      </div>

      <motion.div 
        className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <button
          onClick={revealAll}
          disabled={isFullyRevealed}
          className="w-full sm:w-auto px-6 py-3 font-bold text-sm text-foreground bg-muted border border-border rounded-xl hover:bg-background transition-all disabled:opacity-50"
        >
          Reveal Entire Kural
        </button>
        
        <button
          onClick={pickRandomKural}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 active:scale-95 transition-all font-bold shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          Next Kural
        </button>
      </motion.div>
    </div>
  );
}
