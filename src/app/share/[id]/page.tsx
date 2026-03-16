import kuralData from "@/data/kurals.json";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const kural = kuralData.find((k) => k.kural_number === id);

  if (!kural) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      
      {/* Action Bar */}
      <div className="w-full max-w-[500px] flex justify-between items-center mb-6">
        <Link href={`/kural/${id}`} className="text-muted-foreground hover:text-foreground font-medium text-sm">
          ← Back
        </Link>
        <button 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-sm text-sm"
          onClick={() => {
            // In a real app we'd use html-to-image here
            alert("Screenshot this card to share with friends!");
          }}
        >
          Take Screenshot
        </button>
      </div>

      {/* The Shareable Card - Forced Palm Leaf Aesthetic */}
      <div 
        className="w-full max-w-[500px] aspect-square relative shadow-2xl rounded-sm overflow-hidden p-8 sm:p-12 flex flex-col justify-between"
        style={{
          backgroundColor: "#d4c39c", // Palm leaf background
          color: "#4a3e2a", // Dark brown ink
          backgroundImage: "repeating-linear-gradient(transparent, transparent 39px, rgba(74, 62, 42, 0.1) 40px)",
          border: "12px solid #8c6a46", // Darker wood frame
        }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-50">
          <BookOpen className="w-12 h-12" color="#8c6a46" />
        </div>
        
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1" style={{ color: "#8c6a46" }}>
            Tirukkural {kural.kural_number}
          </p>
          <p className="text-[0.65rem] font-bold uppercase tracking-widest opacity-60">
            {kural.section} • {kural.chapter}
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center my-4">
          <h2 
            className="text-2xl sm:text-3xl font-tamil leading-loose font-extrabold" 
            style={{ whiteSpace: "pre-wrap", textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.1)" }}
          >
            {kural.tamil_text}
          </h2>
        </div>

        <div className="mt-4 pt-4 border-t opacity-90" style={{ borderColor: "rgba(74, 62, 42, 0.2)" }}>
          <p className="text-sm font-semibold italic leading-relaxed">
            "{kural.english_translation}"
          </p>
          <div className="mt-4 text-xs font-bold tracking-widest uppercase opacity-50 text-right">
            kuralbox.app
          </div>
        </div>
      </div>
      
    </div>
  );
}
