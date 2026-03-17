"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, BookOpen } from "lucide-react";

export function BookEntranceAnimation({ children }: { children: React.ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Ensure the animation only plays once per session
    const hasSeenAnimation = sessionStorage.getItem("kuralbox_entrance");
    if (hasSeenAnimation) {
      setShowAnimation(false);
    } else {
      const timer = setTimeout(() => {
        setShowAnimation(false);
        sessionStorage.setItem("kuralbox_entrance", "true");
      }, 3500); 
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 overflow-hidden perspective-[2500px]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          >
            {/* Ambient Background Magic Aura */}
            <motion.div 
              className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-700/20 via-zinc-950 to-zinc-950"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Glowing Center Dust */}
            <motion.div
              className="absolute z-0 w-[50vw] h-[50vh] bg-amber-500/10 blur-[120px] rounded-full mix-blend-screen"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* The Spine / Background Binding */}
            <div className="absolute w-[80px] sm:w-[120px] h-[75vh] max-h-[900px] bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 rounded-lg shadow-[0_0_50px_rgba(0,0,0,1)] flex items-center justify-center border-x border-amber-800/50 z-0">
               <div className="w-[2px] h-[95%] bg-black/60 mx-auto shadow-[inset_1px_0_2px_rgba(255,255,255,0.1)]"></div>
            </div>

            {/* Left Cover Flap */}
            <motion.div
              className="absolute w-[40vw] max-w-[500px] h-[75vh] max-h-[900px] origin-right right-1/2 z-10 rounded-l-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.9),_20px_0_50px_rgba(0,0,0,0.8)] border-[6px] border-amber-950/80"
              style={{
                backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
                backgroundColor: "#e3cda4",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateY: 0, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: -150, opacity: 1, scale: 1 }}
              transition={{ 
                rotateY: { duration: 2.2, delay: 0.8, ease: [0.34, 1.1, 0.64, 1] },
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 }
              }}
            >
              {/* Cover Detailing */}
              <div className="absolute inset-4 border border-amber-900/40 rounded-xl flex items-center justify-center">
                 <div className="absolute top-8 left-8 w-4 h-4 rounded-full border border-amber-900/50 bg-amber-900/10" />
                 <div className="absolute bottom-8 left-8 w-4 h-4 rounded-full border border-amber-900/50 bg-amber-900/10" />
                 
                 <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-amber-950/80 drop-shadow-sm tracking-widest font-tamil scale-x-110 ml-8 opacity-90 mix-blend-multiply" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.3)" }}>
                   திரு
                 </h1>
              </div>
            </motion.div>
            
            {/* Right Cover Flap */}
            <motion.div
              className="absolute w-[40vw] max-w-[500px] h-[75vh] max-h-[900px] origin-left left-1/2 z-10 rounded-r-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.9),_-20px_0_50px_rgba(0,0,0,0.8)] border-[6px] border-amber-950/80"
              style={{
                 backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
                 backgroundColor: "#e3cda4",
                 backfaceVisibility: "hidden",
                 transformStyle: "preserve-3d",
              }}
              initial={{ rotateY: 0, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 150, opacity: 1, scale: 1 }}
              transition={{ 
                rotateY: { duration: 2.2, delay: 0.8, ease: [0.34, 1.1, 0.64, 1] },
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 }
              }}
            >
              {/* Cover Detailing */}
              <div className="absolute inset-4 border border-amber-900/40 rounded-xl flex items-center justify-center">
                 <div className="absolute top-8 right-8 w-4 h-4 rounded-full border border-amber-900/50 bg-amber-900/10" />
                 <div className="absolute bottom-8 right-8 w-4 h-4 rounded-full border border-amber-900/50 bg-amber-900/10" />

                 <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-amber-950/80 drop-shadow-sm tracking-widest font-tamil scale-x-110 -ml-12 opacity-90 mix-blend-multiply" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.3)" }}>
                   க்குறள்
                 </h1>
              </div>
            </motion.div>

            {/* Title Fade Up Sequence Behind the Book */}
            <motion.div
              className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
              transition={{ times: [0, 0.2, 0.8, 1], duration: 2.5, delay: 1 }}
            >
               <BookOpen className="w-16 h-16 sm:w-24 sm:h-24 text-amber-400 mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
               <div className="font-serif text-3xl sm:text-5xl tracking-[0.3em] font-light text-amber-100/90 drop-shadow-md">
                 KURAL BOX
               </div>
               <div className="mt-4 flex items-center gap-2 text-amber-500/60 text-sm tracking-widest uppercase">
                 <Sparkles className="w-3 h-3" />
                 <span>Discover the wisdom</span>
                 <Sparkles className="w-3 h-3" />
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* The Actual Page Content */}
      <motion.div
        initial={showAnimation ? { opacity: 0, scale: 0.95, filter: "blur(20px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, delay: showAnimation ? 2.8 : 0, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
