"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Shuffle } from "lucide-react";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(query);
    if (!isNaN(num) && num >= 1 && num <= 1330) {
      router.push(`/kural/${num}`);
    } else {
      // Small feedback for invalid numbers
      alert("Please enter a valid Kural number between 1 and 1330.");
    }
  };

  const handleRandom = () => {
    const randomNum = Math.floor(Math.random() * 1330) + 1;
    router.push(`/kural/${randomNum}`);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="number"
          min="1"
          max="1330"
          className="block w-full pl-12 pr-4 py-4 bg-card border-2 border-border rounded-2xl text-lg shadow-sm focus:ring-0 focus:border-primary transition-all outline-none text-card-foreground placeholder:text-muted-foreground"
          placeholder="Enter Kural number (1-1330)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          suppressHydrationWarning
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity active:scale-95"
            suppressHydrationWarning
          >
            Go
          </button>
        </div>
      </form>

      <div className="flex justify-center">
        <button
          onClick={handleRandom}
          className="flex items-center space-x-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:opacity-90 transition-all font-medium active:scale-95 shadow-sm"
          suppressHydrationWarning
        >
          <Shuffle className="w-5 h-5" />
          <span>Random Kural</span>
        </button>
      </div>
    </div>
  );
}
