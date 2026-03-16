import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { GlobalAudioPlayer } from "../audio/GlobalAudioPlayer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 md:pb-20 pt-6">
        {children}
      </main>
      <GlobalAudioPlayer />
      <BottomNav />
    </div>
  );
}
