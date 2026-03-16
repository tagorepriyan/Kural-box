"use client";

import { User, Trophy, BarChart3, Settings, BookOpen } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border flex items-center gap-6">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tamil Scholar</h1>
          <p className="text-muted-foreground">Joined March 2026</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-medium bg-accent text-accent-foreground w-max px-3 py-1 rounded-full">
            <Trophy className="w-4 h-4" />
            Beginner Level
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-6 border border-border text-center">
          <BookOpen className="w-6 h-6 text-primary mx-auto mb-2 opacity-80" />
          <h3 className="text-3xl font-extrabold text-foreground mb-1">0</h3>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Kurals Read</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border text-center">
          <BarChart3 className="w-6 h-6 text-secondary mx-auto mb-2 opacity-80" />
          <h3 className="text-3xl font-extrabold text-foreground mb-1">0</h3>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Quiz Score</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border text-center col-span-2 md:col-span-1">
          <Trophy className="w-6 h-6 text-accent mx-auto mb-2 opacity-80" />
          <h3 className="text-3xl font-extrabold text-foreground mb-1">0</h3>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Global Rank</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm">
        <div className="p-4 border-b border-border/50 bg-muted/30">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-2">Account Options</h2>
        </div>
        <div className="divide-y divide-border/50">
          {[
            { label: "Edit Profile", icon: User },
            { label: "Learning Preferences", icon: BookOpen },
            { label: "General Settings", icon: Settings },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors text-left group">
              <div className="flex items-center gap-4">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-semibold text-foreground">{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
