"use client";

import { useAppStore } from "@/store/useAppStore";
import { X, ExternalLink } from "lucide-react";
import { useState } from "react";

export function AdBanner() {
  const { user } = useAppStore();
  const [isVisible, setIsVisible] = useState(true);

  // If the user has a premium account (mocked by existence of user right now), don't show ads
  if (user || !isVisible) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-muted/30 border border-border/50 rounded-xl p-4 relative group">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 text-muted-foreground hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Close Ad"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
          <span className="font-tamil font-bold text-accent">விளம்பரம்</span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Sponsored</p>
          <h4 className="font-medium text-foreground text-sm">Learn Spoken Tamil in 30 Days!</h4>
          <p className="text-xs text-muted-foreground line-clamp-1">Join 50,000+ students mastering the oldest language.</p>
        </div>
        <button className="flex items-center gap-1 px-4 py-2 bg-background border border-border rounded-lg text-xs font-medium hover:bg-muted transition-colors whitespace-nowrap">
          Learn More <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
