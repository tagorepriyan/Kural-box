"use client";

import { useAppStore } from "@/store/useAppStore";
import kuralData from "@/data/kurals.json";
import { KuralCard } from "@/components/kural/KuralCard";
import { Bookmark, Inbox } from "lucide-react";
import { useEffect, useState } from "react";

export default function SavedPage() {
  const { bookmarks } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const savedKurals = kuralData.filter((k) => bookmarks.includes(k.kural_number));

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Bookmark className="w-8 h-8" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-wide">Saved</h1>
            <p className="text-muted-foreground font-medium">Your bookmarked Kurals</p>
          </div>
        </div>
        <div className="bg-muted px-4 py-1.5 rounded-full text-sm font-bold text-foreground">
          {savedKurals.length} Items
        </div>
      </div>

      {savedKurals.length > 0 ? (
        <div className="space-y-8 flex flex-col items-center">
          {savedKurals.map((kural) => (
            <KuralCard key={kural.kural_number} kural={kural} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-3xl border border-dashed border-border mt-12">
          <Inbox className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-xl font-bold text-foreground mb-2">No Saved Kurals</h2>
          <p className="text-muted-foreground w-full max-w-sm">
            When you find a Kural you want to remember, click the bookmark icon to save it here.
          </p>
        </div>
      )}
    </div>
  );
}
