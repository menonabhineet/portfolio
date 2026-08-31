"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://countapi.mileshilliard.com/api/v1/hit/menonabhineet_portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.value === "number") {
          setViews(data.value);
        }
      })
      .catch((err) => console.error("Error fetching views:", err));
  }, []);

  if (views === null) return null;

  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.05] shadow-inner transition-all hover:border-teal-500/30"
      title="Total Website Views"
    >
      <Eye size={14} className="text-teal-400" />
      <span className="text-xs font-mono font-medium text-slate-300">
        {views.toLocaleString()} <span className="text-slate-500">views</span>
      </span>
    </div>
  );
}
