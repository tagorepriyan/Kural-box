import { Brain, Trophy, Gamepad2, Layers } from "lucide-react";
import { QuizMode } from "@/components/learn/QuizMode";
import { MascotGuide } from "@/components/shared/MascotGuide";

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12">
      <MascotGuide 
        message="Welcome to the Learning Center! Try taking a quiz to test your memory of the Thirukkural."
        position="bottom-right"
        autoHideDuration={8000}
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Learning Center</h1>
        <p className="text-muted-foreground w-full max-w-lg mx-auto">
          Test your knowledge, memorize Kurals, and compete on the global leaderboard.
        </p>
      </div>

      {/* Active Interactive Section */}
      <section>
        <QuizMode />
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-border">
        
        {/* Daily Challenge */}
        <div className="group bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden text-center sm:text-left">
          <Trophy className="w-12 h-12 text-primary mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold text-foreground mb-2">Daily Challenge</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Learn a new Kural every day and take a quick quiz to earn points.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Start Challenge
          </div>
        </div>

        {/* Quiz Mode */}
        <div className="group bg-card border border-border rounded-3xl p-6 sm:p-8 hover:shadow-md transition-all cursor-pointer text-center sm:text-left">
          <Gamepad2 className="w-10 h-10 text-secondary mb-4 mx-auto sm:mx-0 group-hover:rotate-12 transition-transform" />
          <h2 className="text-xl font-bold text-foreground mb-2">Quiz Mode</h2>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            Fill missing lines, choose correct meanings, and arrange words.
          </p>
          <div className="mt-6 inline-flex items-center text-sm font-semibold text-foreground border border-border px-4 py-2 rounded-full">
            Play Topics
          </div>
        </div>

        {/* Memorization */}
        <div className="group bg-card border border-border rounded-3xl p-6 sm:p-8 hover:shadow-md transition-all cursor-pointer text-center sm:text-left">
          <Brain className="w-10 h-10 text-accent mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold text-foreground mb-2">Memorization</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Practice mode for reciting Kurals line by line.
          </p>
        </div>

        {/* School Mode */}
        <div className="group bg-card border border-border rounded-3xl p-6 sm:p-8 hover:shadow-md transition-all cursor-pointer text-center sm:text-left opacity-70">
          <Layers className="w-10 h-10 text-muted-foreground mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold text-foreground mb-2">School Platform</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Teacher dashboards, assignments, and class leaderboards.
          </p>
          <div className="mt-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground border border-border inline-block px-2 py-1 rounded">
            Coming Soon
          </div>
        </div>

      </div>
    </div>
  );
}
