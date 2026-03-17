"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface MascotProps {
  message: string;
  position?: "bottom-right" | "bottom-left";
  autoHideDuration?: number; // ms
}

export function MascotGuide({ 
  message, 
  position = "bottom-right",
  autoHideDuration 
}: MascotProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Stagger the entrance slightly for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && autoHideDuration) {
      const timer = setTimeout(() => setIsVisible(false), autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDuration]);

  const positionClasses = position === "bottom-right" 
    ? "right-4 sm:right-8 bottom-24 sm:bottom-8" 
    : "left-4 sm:left-8 bottom-24 sm:bottom-8";
    
  // Using DiceBear to generate a placeholder avatar that looks scholarly/historical
  const mascotAvatar = "https://api.dicebear.com/7.x/notionists/svg?seed=ValluvarMascot&backgroundColor=c05621";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`fixed z-40 flex flex-col items-end gap-3 max-w-[280px] sm:max-w-xs ${positionClasses}`}
        >
          {/* Speech Bubble */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`bg-card text-card-foreground p-4 rounded-2xl shadow-xl border border-border relative ${
              position === "bottom-right" ? "rounded-br-sm" : "rounded-bl-sm"
            }`}
          >
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute -top-2 -right-2 bg-muted text-muted-foreground hover:text-foreground rounded-full p-1 shadow-sm border border-border"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex gap-2">
              <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <p className="text-sm font-medium leading-relaxed">{message}</p>
            </div>
          </motion.div>

          {/* Mascot Image */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-background shadow-lg bg-primary overflow-hidden relative cursor-pointer hover:scale-105 transition-transform">
            <img src={mascotAvatar} alt="Thiruvalluvar Guide" className="w-full h-full object-cover" />
            
            {/* Notification Dot */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-background flex items-center justify-center animate-bounce">
              <MessageCircle className="w-2 h-2 text-white" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
