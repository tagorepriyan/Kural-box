"use client";

import Link from "next/link";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <BookOpen className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-tamil text-xl font-bold text-foreground">Kural Box</span>
        </Link>
        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
