"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";

export function BookEntranceAnimation({ children }: { children: React.ReactNode }) {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Check session storage so it only plays once per session
    const hasSeenAnimation = sessionStorage.getItem("kuralbox_entrance");
    if (hasSeenAnimation) {
      setShowAnimation(false);
    } else {
      const timer = setTimeout(() => {
        setShowAnimation(false);
        sessionStorage.setItem("kuralbox_entrance", "true");
      }, 3000); // 3 seconds total animation time
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            {/* Left Page */}
            <motion.div
              className="absolute w-1/2 h-full bg-card border-r border-border drop-shadow-2xl flex items-center justify-end pr-8 sm:pr-16 lg:pr-32 origin-left left-0"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -110 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              <h1 className="text-4xl sm:text-7xl font-tamil text-primary font-bold opacity-80" style={{ transform: "rotateY(-180deg)", backfaceVisibility: "hidden" }}>திரு</h1>
            </motion.div>
            
            {/* Right Page */}
            <motion.div
              className="absolute w-1/2 h-full bg-card border-l border-border drop-shadow-2xl flex items-center justify-start pl-8 sm:pl-16 lg:pl-32 origin-right right-0"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 110 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
              style={{ transformPerspective: 1200 }}
            >
               <h1 className="text-4xl sm:text-7xl font-tamil text-primary font-bold opacity-80" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>க்குறள்</h1>
            </motion.div>

            {/* Spine Context */}
            <motion.div 
              className="absolute w-16 h-full bg-border flex items-center justify-center"
              initial={{ opacity: 1, scaleX: 1 }}
              animate={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <BookOpen className="w-8 h-8 text-primary shadow-sm" />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
      
      {/* The Actual Page Content */}
      <motion.div
        initial={showAnimation ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: showAnimation ? 2 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
