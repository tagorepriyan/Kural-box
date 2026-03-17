"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Shuffle, Mic, MicOff, Delete } from "lucide-react";
import { motion } from "framer-motion";

// Add global typings for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const router = useRouter();
  
  const recognitionRef = useRef<any>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    // Determine if audio can even be played (needs user interaction first)
    // We will fail silently if not.
    setAudioEnabled(true);
    
    // Initialize SpeechRecognition if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US'; // Can be expanded to ta-IN
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        // Extract numbers from something like "Kural forty five" or "Kural 45"
        const match = transcript.match(/\d+/);
        if (match) {
          const num = parseInt(match[0]);
          if (num >= 1 && num <= 1330) {
            setQuery(num.toString());
            // Optional: Auto navigate on voice success
            router.push(`/kural/${num}`);
          } else {
             triggerError();
             alert(`Recognized number: ${num}. Please specify a number between 1 and 1330.`);
          }
        } else {
          // Fallback UI indication
          triggerError();
          alert(`Could not detect a number in: "${transcript}". Please say "Kural 45"`);
        }
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [router]);

  // Keyboard support for physical typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        handleSearch(e as unknown as React.FormEvent);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [query]);

  const triggerHaptic = (ms: number = 30) => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
       window.navigator.vibrate(ms);
    }
  };

  const playClick = () => {
    if (audioEnabled) {
      try {
        const pop = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
        pop.volume = 0.1; // Extremely quiet/basic simulated click to avoid cors tracking/loading
        pop.play().catch(() => {});
      } catch (e) {
        // fail silently
      }
    }
    triggerHaptic(20);
  };

  const playClunk = () => {
     if (audioEnabled) {
      try {
        const pop = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
        pop.volume = 0.3; // Simulated click
        pop.play().catch(() => {});
      } catch (e) {
        // fail silently
      }
    }
    triggerHaptic(80);
  }

  const triggerError = () => {
    setErrorShake(true);
    triggerHaptic([50, 50, 50]); // Error vibration pattern
    setTimeout(() => setErrorShake(false), 500);
  };

  const handleDigit = (digit: string) => {
    playClick();
    if (query.length < 4) {
      const newQuery = query + digit;
      if (parseInt(newQuery) > 1330) {
        triggerError();
      } else {
        setQuery(newQuery);
      }
    } else {
      triggerError(); // Max 4 digits
    }
  };

  const handleBackspace = () => {
    playClick();
    setQuery(prev => prev.slice(0, -1));
  };

  const toggleListen = () => {
    playClick();
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error("Microphone access denied or not supported.", err);
      }
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    playClunk();

    const num = parseInt(query);
    if (!isNaN(num) && num >= 1 && num <= 1330) {
      router.push(`/kural/${num}`);
    } else {
      triggerError();
    }
  };

  const handleRandom = () => {
    playClick();
    const randomNum = Math.floor(Math.random() * 1330) + 1;
    router.push(`/kural/${randomNum}`);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center mt-12 mb-20 relative z-20">
      
      {/* The Physical Dial Pad Machine Body */}
      <div className="w-full bg-[#1c1814] border-[8px] border-[#3e2c1c] p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.9),inset_0_4px_20px_rgba(0,0,0,1)] relative overflow-hidden">
        
        {/* Brass Screws in Corners */}
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-sm border border-black transform rotate-45">
          <div className="absolute inset-0 m-auto w-full h-[1px] bg-black/60"></div>
        </div>
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-sm border border-black transform -rotate-12">
          <div className="absolute inset-0 m-auto w-full h-[1px] bg-black/60"></div>
        </div>
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-sm border border-black transform rotate-90">
          <div className="absolute inset-0 m-auto w-full h-[1px] bg-black/60"></div>
        </div>
        <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 shadow-sm border border-black transform -rotate-45">
          <div className="absolute inset-0 m-auto w-full h-[1px] bg-black/60"></div>
        </div>

        {/* The Digital Readout Screen (Nixie Tube Style) */}
        <div className="p-2 bg-[#4a3525] rounded-xl mb-8 shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <motion.div 
            className="w-full h-24 bg-[#0a0500] border-[4px] border-stone-900 rounded-lg shadow-[inset_0_15px_30px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden"
            animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Internal Glow Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,100,0,0.25)_0%,_transparent_70%)] pointer-events-none"></div>
            
            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-80 pointer-events-none"></div>
            
            <div className="relative flex space-x-3 font-mono text-5xl sm:text-6xl font-black">
               {/* The Unlit Ghost Digits Background */}
               <div className="absolute inset-0 flex space-x-3 text-[#ff5f1f] opacity-20 select-none drop-shadow-[0_0_2px_rgba(100,0,0,0.8)] tracking-widest z-0">
                  8888
               </div>
               
               {/* The Actual Lit Digits */}
               <div className="relative text-[#ffccaa] drop-shadow-[0_0_15px_rgba(255,100,0,1),_0_0_30px_rgba(255,100,0,0.6)] tracking-widest z-10 transition-all font-bold">
                 {query.length === 0 ? (
                    <span className="opacity-0">1234</span> // Invisible spacer
                 ) : (
                    <span>
                      {"".padStart(4 - query.length, '\u00A0')}
                      {query}
                    </span>
                 )}
               </div>
            </div>
          </motion.div>
        </div>

        {/* The Number Pad Grid (Typewriter Style) */}
        <div className="grid grid-cols-3 gap-x-5 gap-y-6 mb-6 relative z-10 w-[90%] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <DialButton key={num} onClick={() => handleDigit(num.toString())}>
              {num}
            </DialButton>
          ))}
          
          {/* Bottom Row */}
          <DialButton className="text-red-400" onClick={handleBackspace}>
            <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
          </DialButton>
          
          <DialButton onClick={() => handleDigit('0')}>
            0
          </DialButton>

          <DialButton 
            className={isListening ? "text-red-500 animate-pulse" : "text-[#d4b996]"} 
            onClick={toggleListen}
          >
            {isListening ? <Mic className="w-5 h-5 sm:w-6 sm:h-6" /> : <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />}
          </DialButton>
        </div>

        {/* Action Button */}
        <div className="w-[90%] mx-auto mt-8 relative z-10">
          <motion.button
            whileTap={{ scale: 0.95, y: 4, boxShadow: "0_2px_0_#451a03,inset_0_2px_4px_rgba(0,0,0,0.8)" }}
            onClick={() => handleSearch()}
            className="w-full py-5 bg-gradient-to-b from-amber-700 to-amber-900 border-[3px] border-amber-950 rounded-xl shadow-[0_8px_0_#451a03,0_15px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] text-amber-100 font-bold text-xl uppercase tracking-[0.2em] active:translate-y-[6px] transition-all flex items-center justify-center gap-3"
          >
             <Search className="w-5 h-5 opacity-80" />
             Read Kural
          </motion.button>
        </div>
      </div>

      {/* Random Kural Standalone */}
      <div className="mt-6 mb-8">
        <button
          onClick={handleRandom}
          className="flex items-center space-x-2 px-6 py-3 text-amber-600/60 hover:text-amber-500 transition-all font-medium active:scale-95 uppercase tracking-[0.2em] text-xs"
          suppressHydrationWarning
        >
          <Shuffle className="w-3 h-3" />
          <span>I'm Feeling Lucky</span>
        </button>
      </div>
    </div>
  );
}

// Reusable antique button sub-component - Typewriter Style
function DialButton({ children, onClick, className = "" }: { children: React.ReactNode, onClick: () => void, className?: string }) {
  return (
    <div className="relative flex justify-center items-center">
      {/* Outer physical well for the key */}
      <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-black rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,1)] opacity-60 translate-y-2 blur-[1px]"></div>
      
      {/* The actual key stem and cap */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.92, y: 6, boxShadow: "0_0px_0_#0a0a0a,0_2px_4px_rgba(0,0,0,0.8),inset_0_2px_8px_rgba(0,0,0,0.8)" }}
        onClick={onClick}
        className={`relative z-10 w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] flex items-center justify-center bg-gradient-to-b from-[#3a3530] via-[#2a2520] to-[#1a1510] rounded-full border-2 border-stone-800 shadow-[0_6px_0_#0a0a0a,0_10px_15px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.15)] text-2xl font-black font-serif text-[#e4dbcc] ${className}`}
        style={{ textShadow: "0 -1px 1px rgba(0,0,0,0.8)" }}
      >
        {children}
      </motion.button>
    </div>
  );
}
