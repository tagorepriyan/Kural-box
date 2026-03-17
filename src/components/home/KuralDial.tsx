"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function KuralDial() {
  const [targetNumber, setTargetNumber] = useState<string>("0001");
  const [isSpinning, setIsSpinning] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const router = useRouter();

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setLeverPulled(true);
    
    // Auto release lever visually
    setTimeout(() => setLeverPulled(false), 300);

    const randomKural = Math.floor(Math.random() * 1330) + 1;
    const newTarget = randomKural.toString().padStart(4, "0");
    setTargetNumber(newTarget);

    // After animation (approx 3.2s max), navigate
    setTimeout(() => {
      setIsSpinning(false); // Snap back to standard index invisibly
      router.push(`/kural/${randomKural}`);
    }, 3500);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-12 relative">
      <div className="text-center relative z-10">
        <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mb-2 font-tamil tracking-wide drop-shadow-md">சுழல் சக்கரம்</h3>
        <p className="text-sm text-muted-foreground font-medium">Pull the lever to discover a Kural</p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Main Machine Casing */}
        <div className="relative z-10 bg-stone-900 dark:bg-black/90 p-6 sm:p-10 rounded-2xl border-[6px] border-amber-900/50 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          {/* Screws/Rivets */}
          <Screw className="top-4 left-4 -rotate-45" />
          <Screw className="top-4 right-4 rotate-12" />
          <Screw className="bottom-4 left-4 rotate-45" />
          <Screw className="bottom-4 right-4 -rotate-12" />

          {/* The Scroller Outer Casing */}
          <div className="relative mt-2 p-4 bg-gradient-to-b from-amber-800 via-amber-600 to-amber-900 rounded-lg shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.3)] border border-amber-950">
            {/* Deep Inner Cutout */}
            <div className="flex gap-1 p-2 bg-stone-950 rounded shadow-[inset_0_15px_25px_rgba(0,0,0,1)] border-t border-b border-black group relative overflow-hidden h-[100px] sm:h-[120px] items-center">
              {targetNumber.split("").map((digit, i) => (
                <DigitColumn 
                  key={i} 
                  targetDigit={digit}
                  colIndex={i}
                  isSpinning={isSpinning}
                />
              ))}
              
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none mix-blend-screen rounded-t"></div>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-600/80 shadow-[0_0_2px_rgba(220,38,38,0.8)] pointer-events-none mix-blend-screen"></div>
            </div>
          </div>
        </div>

        {/* The Physical Lever Mechanism */}
        <div className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 z-0 hidden md:block">
          <div className="w-12 h-24 bg-gradient-to-r from-stone-800 to-stone-950 rounded-r-3xl border-y-4 border-r-4 border-amber-950 shadow-[5px_0_15px_rgba(0,0,0,0.5)] flex items-center px-1 z-0 relative">
            <div className="w-8 h-8 rounded-full bg-zinc-800 shadow-[inset_0_2px_5px_rgba(0,0,0,1)] border border-amber-900/50 absolute top-1/2 -translate-y-1/2 left-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-zinc-950"></div>
            </div>

            <motion.div 
              className="absolute top-1/2 left-4 h-40 w-4 cursor-grab active:cursor-grabbing flex flex-col items-center justify-end z-10"
              style={{ originY: 1, originX: 0.5, y: "-100%" }}
              animate={{ rotate: leverPulled ? 55 : -15 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, mass: 1.5 }}
              onClick={spin}
            >
              <div className="w-4 h-full bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-400 shadow-[2px_0_5px_rgba(0,0,0,0.5)] border border-zinc-500 rounded-t-full relative z-10"></div>
              
              <motion.div 
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tl from-red-900 via-red-600 to-red-400 rounded-full shadow-[inset_-3px_-5px_15px_rgba(0,0,0,0.7),2px_5px_15px_rgba(0,0,0,0.6)] border-2 border-red-950 z-20 absolute -top-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute top-2 left-2 w-4 h-2 rounded-full bg-white/50 rotate-[-40deg] blur-[1px]"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={spin}
        disabled={isSpinning}
        className="mt-6 px-8 py-3 bg-amber-700/20 text-amber-500/80 font-bold uppercase tracking-widest text-sm rounded-full border border-amber-900/30 hover:bg-amber-700/40 hover:text-amber-400 transition-all active:scale-95 shadow-sm md:hidden"
      >
        {isSpinning ? "Selecting..." : "Spin the Dial"}
      </button>
    </div>
  );
}

function Screw({ className }: { className?: string }) {
  return (
    <div className={`absolute w-3 h-3 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-700 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),1px_1px_2px_rgba(0,0,0,0.8)] border border-black/50 before:content-[''] before:w-full before:h-0.5 before:bg-zinc-800 before:absolute before:top-1/2 before:-translate-y-1/2 ${className}`}></div>
  );
}

function DigitColumn({ 
  targetDigit, 
  colIndex,
  isSpinning
}: { 
  targetDigit: string, 
  colIndex: number,
  isSpinning: boolean
}) {
  const target = parseInt(targetDigit);
  
  // Create a slot machine reel effect
  const baseSequence = colIndex === 0 ? [0, 1] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const loops = 3 + colIndex * 2; // Further columns spin longer
  const sequence = Array.from({ length: loops }, () => baseSequence).flat().concat(baseSequence);
  
  const targetIndex = loops * baseSequence.length + baseSequence.indexOf(target);

  return (
    <div 
      className="relative w-14 sm:w-16 h-[100px] sm:h-[120px] bg-stone-200 dark:bg-stone-300 rounded-[2px] overflow-hidden"
      style={{
        boxShadow: "inset 1px 0 3px rgba(0,0,0,0.6), inset -1px 0 3px rgba(0,0,0,0.6), inset 0 25px 20px -10px rgba(0,0,0,0.8), inset 0 -25px 20px -10px rgba(0,0,0,0.8)"
      }}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] opacity-20 pointer-events-none mix-blend-multiply z-10"></div>

      <div className="absolute top-[50%] w-full" style={{ marginTop: "-40px" }}>
        <motion.div
          className="w-full flex flex-col items-center"
          initial={{ y: -(target * 80) }}
          animate={{ 
            y: isSpinning ? -(targetIndex * 80) : -(target * 80)
          }}
          transition={{
              duration: isSpinning ? 1.5 + colIndex * 0.4 : 0, 
              ease: [0.15, 0.85, 0.25, 1] // Custom ease-out for realistic stopping friction
          }}
        >
          {sequence.map((num, i) => (
            <div key={i} className="flex items-center justify-center w-full h-[80px] text-[2.75rem] sm:text-6xl font-black font-mono text-zinc-900 tracking-tighter mix-blend-multiply opacity-90">
              {num}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
