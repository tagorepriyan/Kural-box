"use client";

import { useState, useEffect } from "react";
import kuralData from "@/data/kurals.json";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function QuizMode() {
  const [mounted, setMounted] = useState(false);
  const [currentKuralIndex, setCurrentKuralIndex] = useState(0);
  const [missingLineIndex, setMissingLineIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const kuralIndex = Math.floor(Math.random() * kuralData.length);
    const lineIndex = Math.floor(Math.random() * 2);
    setCurrentKuralIndex(kuralIndex);
    setMissingLineIndex(lineIndex);
    
    // Initial generation
    generateOptions(kuralIndex, lineIndex);
    setMounted(true);
  }, []);

  function generateOptions(kIdx: number, lIdx: number) {
    const kural = kuralData[kIdx];
    const missingLineTxt = kural.tamil_text.split("\n")[lIdx].trim();

    const newOptions = new Set<string>();
    newOptions.add(missingLineTxt);
    
    while (newOptions.size < 4) {
      const randomKural = kuralData[Math.floor(Math.random() * kuralData.length)];
      const randomLines = randomKural.tamil_text.split("\n");
      // Safety check in case of malformed data
      if (randomLines.length > 0) {
        const randomLine = randomLines[Math.floor(Math.random() * Math.min(2, randomLines.length))].trim();
        if (!newOptions.has(randomLine) && randomLine !== missingLineTxt) {
          newOptions.add(randomLine);
        }
      }
    }
    
    // Shuffle options
    setOptions(Array.from(newOptions).sort(() => Math.random() - 0.5));
  }

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    const nextKural = Math.floor(Math.random() * kuralData.length);
    const nextLine = Math.floor(Math.random() * 2);
    setCurrentKuralIndex(nextKural);
    setMissingLineIndex(nextLine);
    generateOptions(nextKural, nextLine);
  };

  const checkAnswer = (answer: string) => {
    if (selectedAnswer !== null) return;
    const currentK = kuralData[currentKuralIndex];
    const missingLineTxt = currentK.tamil_text.split("\n")[missingLineIndex].trim();
    setSelectedAnswer(answer);
    setIsCorrect(answer === missingLineTxt);
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center w-full space-y-6">
          <div className="w-32 h-4 bg-muted rounded-full"></div>
          <div className="w-48 h-6 bg-muted rounded-full"></div>
          <div className="w-full max-w-sm h-12 bg-muted rounded-xl mt-8"></div>
          <div className="w-full h-16 bg-muted rounded-2xl"></div>
          <div className="w-full h-16 bg-muted rounded-2xl"></div>
          <div className="w-full h-16 bg-muted rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const currentKural = kuralData[currentKuralIndex];
  const lines = currentKural.tamil_text.split("\n");
  const missingLineText = lines[missingLineIndex].trim();

  return (
    <div className="w-full max-w-2xl mx-auto bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border">
      <div className="mb-8 text-center space-y-2">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Fill the missing line
        </h3>
        <p className="text-xs text-muted-foreground">Kural {currentKural.kural_number}</p>
      </div>

      <div className="space-y-4 mb-10 text-center font-tamil text-2xl md:text-3xl leading-loose font-bold text-foreground">
        {lines.map((line, idx) => (
          <div key={idx} className="min-h-[3rem]">
            {idx === missingLineIndex ? (
              <span className="inline-block border-b-2 border-dashed border-primary/50 text-muted-foreground px-4 py-1 bg-muted/30 rounded">
                {selectedAnswer ? selectedAnswer : "_______________________"}
              </span>
            ) : (
              <span>{line}</span>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3 font-tamil">
        <AnimatePresence>
          {options.map((option, idx) => {
            let stateClass = "border-border hover:border-primary/50 text-foreground bg-background";
            
            if (selectedAnswer) {
              if (option === missingLineText) {
                stateClass = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
              } else if (option === selectedAnswer) {
                stateClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
              } else {
                stateClass = "border-border/50 text-muted-foreground opacity-50 bg-background";
              }
            }

            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => checkAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-lg font-medium shadow-sm flex items-center justify-between ${stateClass}`}
              >
                <span>{option}</span>
                {selectedAnswer && option === missingLineText && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {selectedAnswer === option && option !== missingLineText && <XCircle className="w-5 h-5 text-red-500" />}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {selectedAnswer !== null && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex-1">
             <p className="text-sm font-semibold text-foreground italic mb-1">Meaning:</p>
             <p className="text-sm text-muted-foreground">{currentKural.english_translation}</p>
          </div>
          
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 active:scale-95 transition-all font-bold whitespace-nowrap shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            Next Kural
          </button>
        </motion.div>
      )}
    </div>
  );
}
