import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, Ruler } from "lucide-react";

export default function LandSurveying() {
  const faqs = [
    {
      question: "What equipment do you use for land surveying?",
      answer: "Our surveyors use professional-grade electronic total stations for angular and distance measurement, dual-frequency GPS/GNSS receivers for geodetic positioning, and digital levels for precise height measurement. All instruments are regularly calibrated to manufacturer specifications and traceable to national measurement standards. Survey data is processed using industry-standard software including AutoCAD Civil 3D, and results are provided in DWG, DXF, or PDF format as required."
    },
    {
      question: "What is a topographical survey and when do I need one?",
      answer: "A topographical survey captures the shape, elevation, and features of a piece of land — including contour lines, spot heights, existing structures, trees, fences, services, and drainage features. Architects and engineers use topographical survey data as the base plan for all design work. You will need a topographical survey at the earliest stage of any development project before design work begins, and whenever accurate ground level information is required for drainage, cut and fill calculations, or building positioning."
    },
    {
      question: "How accurate is your construction setting out?",
      answer: "Our construction setting out is typically accurate to within 2–5mm, depending on the method used and the precision requirements of the project. For standard residential and commercial construction, this level of accuracy is more than sufficient to ensure structural elements are built in exactly the correct positions. For complex structures requiring extreme precision, we can employ specialised equipment and techniques to achieve sub-millimetre accuracy."
    },
    {
      question: "Can you resolve a boundary dispute with your surveying services?",
      answer: "We can prepare a formal boundary survey based on title deeds, survey records, and physical evidence, which will clearly establish the correct legal position of your property boundaries. A survey report prepared by a registered surveyor carries legal weight and is often the most effective way to resolve boundary uncertainties or disputes. We recommend engaging legal advice alongside a boundary survey if a formal dispute is in progress."
    },
    {
      question: "How long does a topographical survey take?",
      answer: "The time required for a topographical survey depends on the size and complexity of the site, the level of detail required, and accessibility conditions. A typical residential plot of 500–2,000 sqm can be surveyed in half a day, with processed plans delivered within 2–3 working days. A larger commercial site of 1–5 hectares may require 1–2 days of fieldwork with plans delivered within 5–7 working days. We always confirm timeframes at the quotation stage."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Land Surveying Services | Site Survey, Topographical & Construction Setting Out",
    description: "Professional land surveying services including site surveying, topographical surveys, boundary surveys, and construction setting out. Precision measurements for accurate planning and construction.",
    canonical: "/services/land-surveying",
    keywords: "land surveying, site survey, topographical survey, boundary survey, construction setting out, land survey services, site surveying contractor",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/land-surveying#service",
          name: "Land Surveying",
          serviceType: "Surveying Services",
          description: "Professional land surveying services including site surveying, topographical surveys, boundary surveys, and construction setting out.",
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
          <img loading="lazy" src="https://images.unsplash.com/photo-1582621404618-fc4b2e4dfc9d?w=1600&h=800&fit=crop&auto=format" alt="Land surveyor using total station equipment on a construction site" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Land Surveying Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Precision Measurements That <span className="text-accent">Guide Every Build</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Accurate, reliable land surveying forms the foundation of every successful construction project. Our qualified surveyors use cutting-edge instruments to deliver precise site data that informs every structural and planning decision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0">
                Request Survey Quote <ArrowRight size={18} />
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
              Qualified Land Surveying for Construction and Development
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                Accurate land surveying is the invisible framework upon which every successful construction project is built. Without precise survey data, even the most brilliantly designed structure can suffer from misaligned boundaries, incorrect site levels, construction errors, and costly legal disputes. Our land surveying division provides the precision measurements and spatial data that planners, architects, engineers, and contractors rely on from the earliest stages of a project through to final completion.
              </p>
              <p>
                Our team of qualified land surveyors is equipped with modern total stations, GPS/GNSS systems, and digital data processing software that delivers results accurate to within millimetres. We conduct all survey types required across the development lifecycle — from initial site surveys and topographical mapping through to boundary demarcation and precision construction setting out.
              </p>
              <p>
                Whether you are a landowner seeking to understand your boundary extents, an architect requiring an accurate topographical base plan, or a contractor needing precise setting out of foundations, columns, and gridlines, our surveyors provide the reliable spatial data you need — delivered promptly in digital formats compatible with standard CAD and GIS platforms.
              </p>
            </div>
          </div>
          <div className="relative">
            <img loading="lazy" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop&auto=format" alt="Surveyor checking instrument readings on a large development site" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
            <div className="absolute top-8 -right-6 bg-accent text-primary px-6 py-5 rounded-xl shadow-xl hidden md:block">
              <span className="text-3xl font-black block">±2mm</span>
              <span className="text-xs font-bold uppercase tracking-wide">Survey Accuracy</span>
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
                title: "Site Surveying",
                desc: "Comprehensive measurement and mapping of existing site conditions, including boundary lines, existing structures, natural features, and infrastructure for planning and design purposes."
              },
              {
                title: "Topographical Survey",
                desc: "Detailed elevation and contour mapping of land surfaces, providing architects and engineers with accurate three-dimensional terrain data for design and drainage planning."
              },
              {
                title: "Boundary Survey",
                desc: "Precise demarcation and pegging of property boundaries in accordance with title documents and survey records, resolving boundary disputes and confirming ownership extents."
              },
              {
                title: "Construction Setting Out",
                desc: "Precise transference of design drawings onto the physical site, establishing column positions, floor levels, wall alignments, and foundation centres to ensure accurate construction."
              },
              {
                title: "As-Built Survey",
                desc: "Post-construction survey documenting the actual positions and levels of completed construction elements, producing as-built drawings for client records and regulatory compliance."
              },
              {
                title: "Volume & Quantity Surveys",
                desc: "Measurement of earthworks cut and fill volumes, stockpile quantities, and construction progress quantities to support cost management and contract administration."
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
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Surveying Process</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Project Brief & Control Establishment", desc: "We review project requirements and establish a network of permanent survey control points — benchmarks and reference markers — from which all subsequent survey work is referenced." },
                { title: "Field Survey", desc: "Qualified surveyors conduct systematic field measurements using calibrated total stations, GPS equipment, and levels, capturing all required spatial data with rigorous accuracy checks." },
                { title: "Data Processing & Plan Production", desc: "Raw survey data is processed using specialist software to produce digital survey plans, CAD files, and topographical models delivered in the client's preferred format." },
                { title: "Setting Out & Verification", desc: "For construction projects, we carry out precise setting out on site and return for verification checks at key construction stages to confirm ongoing accuracy." }
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=600&fit=crop&auto=format')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Start Your Project with Accurate Survey Data</h2>
          <p className="text-white/80 text-lg mb-10">Precise surveying from the beginning saves time, money, and disputes throughout your project. Contact our surveying team to discuss your requirements and receive a prompt quotation.</p>
          <Link to="/contact" className="bg-accent text-primary font-black px-10 py-5 rounded text-lg hover:bg-yellow-400 transition-colors inline-block shadow-xl">
            Request Survey Quote
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
