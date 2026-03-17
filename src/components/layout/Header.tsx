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
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">Browse</Link>
            <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">Learn</Link>
            <Link href="/saved" className="text-muted-foreground hover:text-foreground transition-colors">Saved</Link>
            <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">Profile</Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
