"use client";

import { useState, useEffect } from "react";
import kuralData from "@/data/kurals.json";
import { CheckCircle2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export function DailyChallenge() {
  const [mounted, setMounted] = useState(false);
  const [dailyKuralIndex, setDailyKuralIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    // Generate a pseudo-random index based on the current date
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    // A simple hash function to pick a stable kural for today
    const kuralIndex = (seed * 16807) % kuralData.length;
    
    setDailyKuralIndex(kuralIndex);
    setMounted(true);
  }, []);

  const completeChallenge = () => {
    setHasCompleted(true);
  };

  if (!mounted) {
    return <div className="h-64 animate-pulse bg-card rounded-3xl border border-border"></div>;
  }

  const kural = kuralData[dailyKuralIndex];
  const lines = kural.tamil_text.split("\n");

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none -mt-10 -mr-10"></div>
      
      <div className="mb-8 text-center space-y-2 relative z-10">
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-2">
           Today's Challenge
        </h3>
        <p className="text-xs text-muted-foreground">Kural {kural.kural_number}</p>
      </div>

      <div className="space-y-4 mb-10 text-center font-tamil text-2xl md:text-3xl leading-loose font-bold text-foreground">
        {lines.map((line, idx) => (
          <div key={idx} className="min-h-[3rem]">
            {line}
          </div>
        ))}
      </div>

      <div className="bg-muted p-6 rounded-2xl border border-border/50 text-center mb-8">
        <p className="text-foreground font-medium mb-3">Does this Kural belong to the "{kural.section}" section?</p>
        {!hasCompleted ? (
           <div className="flex justify-center gap-4 mt-6">
             <button onClick={completeChallenge} className="px-6 py-3 rounded-xl border border-border hover:bg-green-500/10 hover:border-green-500 hover:text-green-600 font-bold transition-all text-sm uppercase tracking-wide">
               Yes, True
             </button>
             <button onClick={completeChallenge} className="px-6 py-3 rounded-xl border border-border hover:bg-red-500/10 hover:border-red-500 hover:text-red-600 font-bold transition-all text-sm uppercase tracking-wide">
               No, False
             </button>
           </div>
        ) : (
           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-2 mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/30">
             <CheckCircle2 className="w-8 h-8 text-green-500" />
             <p className="font-bold text-green-700 dark:text-green-400">Challenge Completed +10 pts!</p>
             <p className="text-sm text-foreground/70 mt-2">Come back tomorrow for a new Kural.</p>
           </motion.div>
        )}
      </div>

      <div className="pt-6 border-t border-border flex flex-col items-center justify-center gap-4">
        <div className="flex-1 text-center">
           <p className="text-sm font-semibold text-foreground italic mb-1">Meaning:</p>
           <p className="text-sm text-muted-foreground max-w-md mx-auto">{kural.english_translation}</p>
        </div>
      </div>
    </div>
  );
}
