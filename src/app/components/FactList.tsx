import React from "react";
import { CheckCircle } from "lucide-react";

export interface FactListProps {
  title?: string;
  facts: string[];
}

/**
 * FactList component optimized for AI Search Engines.
 * Uses bulleted lists for "Structured Facts" to improve retrieval optimization.
 */
export default function FactList({ title = "Key Takeaways", facts }: FactListProps) {
  if (!facts || facts.length === 0) return null;

  return (
    <aside className="bg-muted p-6 rounded-xl mb-8 border border-border" aria-label="Key Facts">
      <h3 className="font-black text-primary text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <CheckCircle className="text-accent" size={20} />
        {title}
      </h3>
      <ul className="space-y-3 m-0 p-0 list-none">
        {facts.map((fact, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
            <span className="leading-relaxed">{fact}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
