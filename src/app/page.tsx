import { SearchBox } from "@/components/home/SearchBox";
import { BookOpen, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center w-full max-w-3xl mx-auto mb-12 space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
          <BookOpen className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-tamil">
          திருக்குறள்
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-muted-foreground mt-4">
          Tirukkural
        </p>
        <p className="max-w-xl mx-auto text-base text-muted-foreground leading-relaxed mt-6">
          Explore the timeless wisdom of Thiruvalluvar. Listen, learn, and immerse yourself in the classic Tamil text.
        </p>
      </div>

      {/* Main Interactive Area */}
      <div className="w-full relative z-10">
        <SearchBox />
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Discover ancient Tamil wisdom</span>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 mix-blend-multiply pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10 mix-blend-multiply pointer-events-none"></div>
    </div>
  );
}
