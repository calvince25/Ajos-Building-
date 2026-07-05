import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, CheckCircle, Layers } from "lucide-react";

export default function InteriorExteriorFinishes() {
  const faqs = [
    {
      question: "What types of tiles do you install?",
      answer: "We install a full range of tile types including ceramic, porcelain, glazed, unglazed, and natural stone tiles such as marble, travertine, and granite. We work with both standard and large-format tiles and can advise on the most suitable tile for each application based on foot traffic, moisture exposure, and aesthetic requirements."
    },
    {
      question: "How long does exterior painting last?",
      answer: "The longevity of an exterior paint job depends on surface preparation quality, paint system selected, and environmental conditions. Using premium two-coat or three-coat exterior coating systems with correct primer application, our exterior painting typically lasts 7–10 years in normal climatic conditions before requiring recoating. We provide a written application warranty on all exterior painting projects."
    },
    {
      question: "Do you provide waterproofing for flat roofs?",
      answer: "Yes. We install a range of waterproofing systems suited for flat and low-pitch roofs, including torch-on bituminous membranes, cold-applied liquid membranes, and elastomeric sheet systems. Our waterproofing specialists assess the roof deck condition, drainage design, and exposure level to recommend the most appropriate and durable system for your application."
    },
    {
      question: "Can you match existing tile or paint colours for renovation projects?",
      answer: "Absolutely. We regularly undertake renovation finishing work that requires matching existing specifications. For tiles, we work with suppliers to locate matching products or help design complementary blends. For paint, we use colour-matching technology to replicate existing wall colours precisely, ensuring seamless transitions across new and existing surfaces."
    },
    {
      question: "What surface preparation is required before tiling?",
      answer: "Proper substrate preparation is critical for long-lasting tile installation. We ensure surfaces are structurally sound, clean, dry, and level to within 3mm over a 3-metre span. Where required, we apply cement screeds, tile adhesion primers, or floor-levelling compounds to achieve the correct base. Skipping surface preparation is the leading cause of tile failure — we never cut corners here."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Interior & Exterior Finishes | Tiling, Painting & Waterproofing Services",
    description: "Professional interior and exterior finishing services including floor tiling, wall tiling, interior and exterior painting, and waterproofing. Quality craftsmanship with durable, long-lasting results.",
    canonical: "/services/interior-exterior-finishes",
    keywords: "floor tiling, wall tiling, interior painting, exterior painting, waterproofing, building finishes, tiling contractor, painting services, sealing services",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/interior-exterior-finishes#service",
          name: "Interior & Exterior Finishes",
          serviceType: "Finishing Services",
          description: "Professional interior and exterior finishing services including floor tiling, wall tiling, interior and exterior painting, and waterproofing.",
          provider: {
            "@type": "Organization",
            name: "BuildForce Construction & Engineering",
            url: "https://buildforce.com"
          },
          areaServed: "US"
        },
        getFAQSchema(faqs)
      ]
    }
  };

  return (
    <main className="bg-background">
      <SEO {...seoConfig} />

      {/* Hero */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-40 lg:pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=800&fit=crop&auto=format" alt="Professional tiling and painting finishes on a modern building interior" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Finishes Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Every Surface Finished to <span className="text-accent">Perfection</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              From precision floor and wall tiling to interior and exterior painting and comprehensive waterproofing systems, we deliver finishes that combine aesthetic excellence with long-term structural protection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0">
                Get a Finishes Quote <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="bg-white/10 text-white font-bold border border-white/20 px-8 py-4 rounded hover:bg-white/20 transition-colors inline-block">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Comprehensive Finishing Services for Every Surface
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                The finishing stage of any construction project is where quality is most visible and where lasting impressions are made. Our interior and exterior finishes division brings together skilled craftspeople, premium materials, and rigorous quality control to ensure every surface of your building — from floors to facades — reflects the highest standards of workmanship.
              </p>
              <p>
                We offer a complete range of finishing services including floor and wall tiling in ceramic, porcelain, and natural stone; interior and exterior painting with premium coating systems; and specialist waterproofing and sealing for wet areas, rooftops, basements, and external walls. Each service is coordinated to integrate seamlessly with the broader construction schedule, avoiding costly rework and delays.
              </p>
              <p>
                Whether you are finishing a single residential bathroom, completing the facade of a commercial building, or waterproofing an industrial facility, our team applies the same level of attention to detail. We source materials from certified suppliers, follow manufacturer application protocols, and conduct thorough post-application inspections to confirm that every finish will perform as designed for years to come.
              </p>
            </div>
          </div>
          <div className="relative">
            <img loading="lazy" src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=1000&fit=crop&auto=format" alt="Tiler applying tiles to a residential wall" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
            <div className="absolute top-8 -right-6 bg-accent text-primary px-6 py-5 rounded-xl shadow-xl hidden md:block">
              <span className="text-3xl font-black block">98%</span>
              <span className="text-xs font-bold uppercase tracking-wide">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-services Grid */}
      <section className="py-14 sm:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Floor Tiling",
                desc: "Precision installation of ceramic, porcelain, and natural stone floor tiles across residential, commercial, and industrial spaces, with proper substrate preparation and grouting."
              },
              {
                title: "Wall Tiling",
                desc: "Expert wall tile installation for bathrooms, kitchens, and feature walls, using industry-standard adhesives and ensuring perfectly level, long-lasting results."
              },
              {
                title: "Interior Painting",
                desc: "Professional interior painting services using premium, low-VOC paints across living spaces, offices, and commercial interiors, with full surface preparation."
              },
              {
                title: "Exterior Painting",
                desc: "Weather-resistant exterior paint systems for building facades, boundary walls, and external features, applied by certified painters for durability in all climates."
              },
              {
                title: "Waterproofing & Sealing",
                desc: "Specialist waterproofing for wet areas, flat roofs, basements, and external walls, using tested membrane systems to prevent water ingress and structural damage."
              },
              {
                title: "Surface Preparation & Repair",
                desc: "Comprehensive substrate preparation including plastering, screeding, crack repair, and surface levelling to ensure perfect adhesion and a flawless finish."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-card p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border">
                <h3 className="text-xl font-bold text-primary mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Finishing Process</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Surface Assessment", desc: "We inspect all surfaces to identify cracks, moisture issues, or irregularities that must be resolved before any finish material is applied." },
                { title: "Material Selection & Preparation", desc: "Our team assists in selecting the right materials for each surface type and use case, then prepares substrates to the required standard." },
                { title: "Skilled Application", desc: "Certified tradespeople apply all finishes using industry best practice techniques, manufacturer guidelines, and stringent quality checks at each stage." },
                { title: "Inspection & Handover", desc: "A thorough final inspection ensures no defects, with full documentation of materials used, specifications applied, and warranty information provided." }
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-12 h-12 bg-accent text-primary font-black rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-background">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&h=600&fit=crop&auto=format')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Transform Your Building's Surfaces?</h2>
          <p className="text-white/80 text-lg mb-10">Partner with our finishes team to achieve a result that will stand the test of time. Contact us for a comprehensive quote tailored to your specific scope.</p>
          <Link to="/contact" className="bg-accent text-primary font-black px-10 py-5 rounded text-lg hover:bg-yellow-400 transition-colors inline-block shadow-xl">
            Get a Finishes Quote
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border border-border p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-primary mb-3">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
