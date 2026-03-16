import kuralData from "@/data/kurals.json";
import { KuralCard } from "@/components/kural/KuralCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// For App Router params type definition in Next.js 15
export default async function KuralPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const kural = kuralData.find((k) => k.kural_number === id);

  if (!kural) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-6 px-4">
      <div className="w-full max-w-2xl mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Search
        </Link>
      </div>
      
      <KuralCard kural={kural} />
    </div>
  );
}
