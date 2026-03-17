import { SearchBox } from "@/components/home/SearchBox";
import { KuralDial } from "@/components/home/KuralDial";
import { BookEntranceAnimation } from "@/components/home/BookEntranceAnimation";
import { AdBanner } from "@/components/shared/AdBanner";
import { MascotGuide } from "@/components/shared/MascotGuide";
import { BookOpen, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <BookEntranceAnimation>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4 sm:px-6 lg:px-8">
        <MascotGuide 
          message="Vanakam! I am Thiruvalluvar. Search for a Kural by number, or use the dial to discover ancient wisdom."
          position="bottom-right"
          autoHideDuration={10000}
        />
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
        <div className="w-full relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-center lg:items-start lg:max-w-5xl mx-auto">
          <div className="w-full lg:flex-1 space-y-8">
            <SearchBox />
            
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Discover ancient Tamil wisdom</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end">
            <KuralDial />
          </div>
        </div>

        <div className="mt-12 w-full max-w-2xl mx-auto">
          <AdBanner />
        </div>

        {/* Background Decorative Elements */}
        <div className="fixed top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 mix-blend-multiply pointer-events-none"></div>
        <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10 mix-blend-multiply pointer-events-none"></div>
      </div>
    </BookEntranceAnimation>
  );
}
