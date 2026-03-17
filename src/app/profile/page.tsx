"use client";

import { useAppStore } from "@/store/useAppStore";
import { User, LogOut, Settings, Bookmark, CheckCircle2, Crown, LogIn } from "lucide-react";

export default function ProfilePage() {
  const { user, login, logout, bookmarks = [] } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Header Profile Area */}
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        {user ? (
          <>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-muted border-4 border-background flex-shrink-0 relative shadow-sm overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center sm:text-left z-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs font-bold text-accent justify-center w-fit mx-auto sm:mx-0">
                  <Crown className="w-3.5 h-3.5" />
                  Free Tier
                </span>
              </div>
              <p className="text-muted-foreground mb-6">{user.email}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-muted text-foreground rounded-full hover:bg-black/5 transition-colors font-medium text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full text-center py-8 z-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Kural Box</h1>
            <p className="text-muted-foreground mb-8">Sign in to save progress and participate in global leaderboards.</p>
            <button 
              onClick={login}
              className="flex items-center justify-center space-x-2 px-8 py-4 mx-auto bg-primary text-primary-foreground rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md font-bold"
            >
              <LogIn className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </div>
        )}
      </div>

      {user && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-3xl p-6 border border-border text-center">
              <Bookmark className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-foreground mb-1">{bookmarks?.length || 0}</p>
              <p className="text-sm font-medium text-muted-foreground">Saved Kurals</p>
            </div>
            
            <div className="bg-card rounded-3xl p-6 border border-border text-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-foreground mb-1">12</p>
              <p className="text-sm font-medium text-muted-foreground">Quizzes Passed</p>
            </div>
            
            <div className="bg-card rounded-3xl p-6 border border-border text-center">
              <User className="w-6 h-6 text-blue-500 mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-foreground mb-1">#4,281</p>
              <p className="text-sm font-medium text-muted-foreground">Global Rank</p>
            </div>
            
            <div className="bg-card rounded-3xl p-6 border border-border text-center">
              <Settings className="w-6 h-6 text-secondary mx-auto mb-3 transform rotate-45" />
              <p className="text-3xl font-extrabold text-foreground mb-1">0</p>
              <p className="text-sm font-medium text-muted-foreground">Playlists</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent/5 to-transparent border border-accent/20 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Crown className="w-5 h-5 text-accent" />
                Upgrade to Premium
              </h3>
              <p className="text-muted-foreground text-sm max-w-md">Remove all ads, unlock AI explanations, and get access to exclusive narrations and educational tracks.</p>
            </div>
            <button className="whitespace-nowrap px-8 py-3 bg-accent text-background rounded-full font-bold hover:opacity-90 active:scale-95 transition-all shadow-md">
              Unlock the Box
            </button>
          </div>
        </>
      )}
    </div>
  );
}
