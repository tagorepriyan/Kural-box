"use client";

import { useAppStore, ThemeType } from "@/store/useAppStore";
import { Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const THEMES: { id: ThemeType; label: string }[] = [
  { id: "default", label: "Classic Light" },
  { id: "palm-leaf", label: "Palm Leaf Script" },
  { id: "ancient-book", label: "Ancient Book" },
  { id: "temple-stone", label: "Temple Stone" },
  { id: "wooden-box", label: "Wooden Kural Box" },
  { id: "night-manuscript", label: "Night Manuscript" },
];

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useAppStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
        aria-label="Switch Theme"
      >
        <Palette className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 border border-border rounded-md" role="menu" aria-orientation="vertical">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-muted font-medium transition-colors ${
                  theme === t.id ? "bg-muted text-primary" : ""
                }`}
                role="menuitem"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
