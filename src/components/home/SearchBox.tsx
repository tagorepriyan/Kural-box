"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Shuffle, Mic, MicOff } from "lucide-react";

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
  const router = useRouter();
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
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
            router.push(`/kural/${num}`);
          } else {
             alert(`Recognized number: ${num}. Please specify a number between 1 and 1330.`);
          }
        } else {
          // Fallback UI indication
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

  const toggleListen = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(query);
    if (!isNaN(num) && num >= 1 && num <= 1330) {
      router.push(`/kural/${num}`);
    } else {
      alert("Please enter a valid Kural number between 1 and 1330.");
    }
  };

  const handleRandom = () => {
    const randomNum = Math.floor(Math.random() * 1330) + 1;
    router.push(`/kural/${randomNum}`);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="number"
          min="1"
          max="1330"
          className="block w-full pl-12 pr-28 py-4 bg-card border-2 border-border rounded-2xl text-lg shadow-sm focus:ring-0 focus:border-primary transition-all outline-none text-card-foreground placeholder:text-muted-foreground"
          placeholder="Enter Kural number (1-1330)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          suppressHydrationWarning
        />
        
        {/* Voice & Submit Buttons Area */}
        <div className="absolute inset-y-0 right-2 flex items-center space-x-1">
          <button
            type="button"
            onClick={toggleListen}
            className={`p-2 rounded-xl transition-colors ${
              isListening ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rotate-pulse" : "text-muted-foreground hover:bg-muted"
            }`}
            title="Voice Search (Say 'Kural 45')"
          >
            {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity active:scale-95"
            suppressHydrationWarning
          >
            Go
          </button>
        </div>
      </form>

      <div className="flex justify-center">
        <button
          onClick={handleRandom}
          className="flex items-center space-x-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:opacity-90 transition-all font-medium active:scale-95 shadow-sm"
          suppressHydrationWarning
        >
          <Shuffle className="w-5 h-5" />
          <span>Random Kural</span>
        </button>
      </div>
    </div>
  );
}
