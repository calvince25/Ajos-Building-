import React from "react";
import { getFAQSchema } from "./SEO";
import { Helmet } from "react-helmet-async";

export interface StructuredFAQProps {
  faqs: { question: string; answer: string }[];
  injectSchema?: boolean;
}

/**
 * StructuredFAQ component optimized for AI Search Engines.
 * Uses <details> and <summary> or <dl> for clear Q&A sections and optionally injects JSON-LD.
 */
export default function StructuredFAQ({ faqs, injectSchema = true }: StructuredFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = injectSchema ? getFAQSchema(faqs) : null;

  return (
    <section id="faq-section" className="my-12">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      <h2 className="text-2xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Frequently Asked Questions
      </h2>
      <dl className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card p-5 rounded-lg border border-border shadow-sm">
            <dt className="font-bold text-lg text-primary mb-2">{faq.question}</dt>
            <dd className="text-muted-foreground text-sm leading-relaxed m-0">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
