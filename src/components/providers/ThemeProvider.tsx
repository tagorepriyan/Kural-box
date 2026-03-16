"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    // Remove all previous data-theme and data-theme variants
    root.removeAttribute("data-theme");
    
    if (theme !== "default") {
      root.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  // Before hydration, render children invisibly to avoid Flash Of Unstyled Theme (FOUT)
  // Actually, we can just render them directly. The server output will be "default" theme colors.
  
  return <>{children}</>;
}
