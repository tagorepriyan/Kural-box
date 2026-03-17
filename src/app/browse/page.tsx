"use client";

import { useMemo, useState } from "react";
import kuralData from "@/data/kurals.json";
import Link from "next/link";
import { Layers, ChevronDown, BookMarked, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChapterData {
  chapter: string;
  translation: string;
  kurals: number[];
}

interface SectionData {
  section: string;
  translation: string;
  chapters: Record<string, ChapterData>;
}

export default function BrowsePage() {
  // Process the taxonomy from the JSON payload
  const structure = useMemo(() => {
    const data: Record<string, SectionData> = {};
    kuralData.forEach((k) => {
      if (!data[k.section]) {
        data[k.section] = { 
          section: k.section, 
          translation: k.section_translation || "", 
          chapters: {} 
        };
      }
      if (!data[k.section].chapters[k.chapter]) {
        data[k.section].chapters[k.chapter] = {
          chapter: k.chapter,
          translation: k.chapter_translation || "",
          kurals: []
        };
      }
      data[k.section].chapters[k.chapter].kurals.push(k.kural_number);
    });
    return data;
  }, []);

  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleChapter = (chapterName: string) => {
    setExpandedChapter(prev => prev === chapterName ? null : chapterName);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 bg-card p-8 rounded-3xl shadow-sm border border-border">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary shadow-inner">
            <Layers className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground font-tamil tracking-wide mb-1">
              பிரிவுகள்
            </h1>
            <p className="text-muted-foreground font-medium text-lg">Browse by Sections & Chapters</p>
          </div>
        </div>
      </div>

      {/* Modern Search Bar */}
      <div className="mb-12 relative group z-10">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none group-focus-within:text-primary text-muted-foreground transition-colors">
          <Search className="h-6 w-6" />
        </div>
        <input
          type="text"
          placeholder="Search for chapters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-card border-2 border-border/60 hover:border-primary/50 focus:border-primary rounded-3xl shadow-sm text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 text-lg transition-all placeholder:text-muted-foreground/50 font-medium"
        />
      </div>

      <div className="space-y-12">
        {Object.values(structure).map((sec, secIdx) => {
          
          // Filter matching chapters
          const filteredChapters = Object.values(sec.chapters).filter(chap => 
            chap.chapter.toLowerCase().includes(searchQuery.toLowerCase()) || 
            chap.translation.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Hide completely if no chapters match
          if (filteredChapters.length === 0) return null;

          return (
            <div key={sec.section} className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center gap-4 border-b border-border/50 pb-4 pl-2">
                <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-bold font-tamil text-foreground">
                    {sec.section}
                  </h2>
                  <p className="text-sm text-primary font-semibold uppercase tracking-widest mt-1">
                    {sec.translation}
                  </p>
                </div>
              </div>

              {/* Chapters Grid / List */}
              <div className="grid grid-cols-1 gap-4">
                {filteredChapters.map((chap, chapIdx) => {
                  const isExpanded = expandedChapter === chap.chapter;

                  return (
                    <motion.div 
                      key={chap.chapter}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(chapIdx * 0.02, 0.3) }}
                      className={`bg-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isExpanded 
                          ? "border-primary shadow-md ring-1 ring-primary/20" 
                          : "border-border shadow-sm hover:border-primary/50 hover:shadow-md cursor-pointer"
                      }`}
                    >
                      {/* Accordion Header */}
                      <div 
                        onClick={() => toggleChapter(chap.chapter)}
                        className="px-6 py-5 flex items-center justify-between group select-none"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-xl transition-colors ${isExpanded ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}>
                            <BookMarked className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold font-tamil text-foreground group-hover:text-primary transition-colors">
                              {chap.chapter}
                            </h3>
                            <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors mt-0.5">
                              {chap.translation}
                            </p>
                          </div>
                        </div>
                        <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180 text-primary" : "text-muted-foreground"}`}>
                          <ChevronDown className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Accordion Body */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 pt-2 border-t border-border/50 bg-muted/20">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                                Select a Kural
                              </p>
                              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                                {chap.kurals.map((num) => (
                                  <Link
                                    key={num}
                                    href={`/kural/${num}`}
                                    className="flex items-center justify-center aspect-square bg-background border border-border rounded-xl text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                  >
                                    {num}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
