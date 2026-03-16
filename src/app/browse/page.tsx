import kuralData from "@/data/kurals.json";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";

export default function BrowsePage() {
  // Group kurals by section and then by chapter
  const structure: Record<string, Record<string, number[]>> = {};

  kuralData.forEach((k) => {
    if (!structure[k.section]) {
      structure[k.section] = {};
    }
    if (!structure[k.section][k.chapter]) {
      structure[k.section][k.chapter] = [];
    }
    structure[k.section][k.chapter].push(k.kural_number);
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-full text-primary">
          <Layers className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-foreground font-tamil tracking-wide">
            பிரிவுகள்
          </h1>
          <p className="text-muted-foreground font-medium">Browse by Sections & Chapters</p>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(structure).map(([section, chapters]) => (
          <div key={section} className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-bold font-tamil text-primary mb-6 border-b border-border/50 pb-4">
              {section}
            </h2>
            <div className="space-y-4">
              {Object.entries(chapters).map(([chapter, kurals]) => (
                <div key={chapter} className="bg-muted/50 rounded-2xl p-4 border border-border/50">
                  <h3 className="text-xl font-bold font-tamil text-foreground mb-4 opacity-90">
                    {chapter}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {kurals.map((num) => (
                      <Link
                        key={num}
                        href={`/kural/${num}`}
                        className="flex items-center justify-center min-w-[3rem] px-3 py-2 bg-background hover:bg-primary hover:text-primary-foreground text-foreground border border-border rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-sm group"
                      >
                        {num}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
