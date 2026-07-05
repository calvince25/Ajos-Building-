import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, CheckCircle, Wrench, ShieldCheck, Layers, TrendingUp, Star, Award } from "lucide-react";

export default function RenovationRetrofit({ serviceData }: { serviceData?: any }) {
  const faqs = [
    {
      question: "Do you perform structural assessments before starting a renovation?",
      answer: "Yes. Every renovation and retrofit project begins with a thorough structural assessment conducted by our licensed engineers. This assessment identifies load-bearing walls, foundation conditions, concealed damage, and latent defects that must be addressed before cosmetic work begins. We never start a renovation without a clear picture of what is behind the walls."
    },
    {
      question: "How do you manage renovation projects in occupied buildings?",
      answer: "We have extensive experience undertaking phased renovations in occupied commercial and residential buildings. Our team works closely with building management to create construction sequencing plans that minimize disruption to occupants, including nighttime and weekend shifts, temporary wall partitions, and air-quality management during demolition."
    },
    {
      question: "What is the difference between a renovation and a retrofit?",
      answer: "A renovation typically refers to aesthetic and functional upgrades — new finishes, layouts, or updated building systems. A retrofit is more structural in nature, addressing code compliance, seismic strengthening, energy performance upgrades, or adapting a building for a different use. BuildForce is equally capable in both, often combining renovation and retrofit scope on the same project."
    },
    {
      question: "Can you renovate buildings to meet current seismic or energy codes?",
      answer: "Absolutely. Our structural engineers specialize in seismic retrofits including shear wall additions, moment frame installation, and base isolation systems. Our mechanical and energy teams can upgrade building envelopes, HVAC systems, and lighting to achieve significant energy efficiency improvements and meet ASHRAE and local energy code requirements."
    },
    {
      question: "How long does a typical commercial renovation take?",
      answer: "Commercial renovation timelines vary greatly depending on scope. A small interior fit-out for a retail unit may take 4–8 weeks. A full floor renovation in an occupied office building may take 3–6 months. A full façade re-clad and floor-to-ceiling interior renovation on a multi-storey building can take 12–24 months. We always provide detailed phasing schedules at the proposal stage."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Renovation & Retrofit Services | Structural Upgrades & Façade Renovation",
    description: "Expert building renovation and structural retrofit services for commercial and residential properties. From façade re-clads to seismic upgrades and complete interior overhauls — on time and within budget.",
    canonical: "/services/renovation-retrofit",
    keywords: "building renovation, structural retrofit, façade renovation, commercial renovation, interior fit-out, seismic retrofit, building upgrade, renovation contractor",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/renovation-retrofit#service",
          name: "Renovation & Retrofit",
          serviceType: "Building Renovation and Structural Retrofit",
          description: "Comprehensive renovation and structural retrofit services transforming existing buildings through structural upgrades, façade renovations, and full interior overhauls.",
          provider: { "@type": "Organization", name: "BuildForce Construction & Engineering", url: "https://buildforce.com" },
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
          <img loading="lazy" src={serviceData?.hero_image_url || "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1600&h=800&fit=crop&auto=format"} alt="Building renovation in progress" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Renovation & Retrofit Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Transform Aging Structures into <span className="text-accent">High-Performance Assets</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Whether it's a façade that no longer reflects your brand or a structure that needs seismic strengthening, BuildForce delivers renovations that add decades of productive life to your most valuable assets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0">
                Get a Renovation Quote <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="bg-white/10 text-white font-bold border border-white/20 px-8 py-4 rounded hover:bg-white/20 transition-colors inline-block">
                View Completed Renovations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Renovation & Retrofit Specialists with Engineering at Our Core
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                Not every great building needs to be demolished and replaced. In many cases, the most sustainable, cost-effective, and commercially intelligent decision is to transform, upgrade, and reposition an existing structure. BuildForce's renovation and retrofit division brings licensed structural engineering, architectural design, and experienced site execution together to breathe new life into older buildings while maintaining operational continuity wherever possible.
              </p>
              <p>
                Our renovation services cover the full spectrum, from cosmetic interior upgrades and complete lobby transformations to structural interventions that bring buildings into compliance with modern seismic codes. We work on commercial office buildings, retail properties, residential apartment blocks, industrial facilities, and heritage-listed structures that require a particularly sensitive and skilled approach.
              </p>
              <p>
                What distinguishes BuildForce in the renovation market is our insistence on structural integrity first. Before any cosmetic work begins, our licensed structural engineers assess the condition of the existing frame, foundations, and load-bearing systems. This approach protects our clients from costly mid-project surprises and ensures that every renovation we deliver is not just beautiful, but structurally sound for decades to come.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {["Full & Partial Scope", "Occupied Building Works", "Heritage Structure Experience", "Seismic Code Compliance", "Energy Performance Upgrades", "Façade & Exterior Overhauls"].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img loading="lazy" src={serviceData?.content_image_url || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=900&fit=crop&auto=format"} alt="Renovated commercial building exterior with modern facade" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-14 sm:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Renovation & Retrofit Services</h2>
            <p className="text-muted-foreground">Expert intervention across every type of existing building challenge.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Structural Retrofits & Seismic Upgrades", desc: "Adding shear walls, moment frames, or base isolation systems to bring older buildings up to current seismic force-resisting standards and code compliance." },
              { icon: Award, title: "Façade & Cladding Replacement", desc: "Removing dated or deteriorating exterior cladding and replacing with modern curtain-wall systems, masonry veneers, or high-performance composite panels." },
              { icon: Wrench, title: "Interior Fit-Out & Office Renovations", desc: "Complete interior demolition and reconstruction for commercial tenancies, including new partition layouts, ceiling systems, and mechanical and electrical modifications." },
              { icon: ShieldCheck, title: "Fire & Life Safety Upgrades", desc: "Installing or upgrading fire suppression, detection, emergency lighting, and egress systems to current NFPA and IBC standards in existing structures." },
              { icon: TrendingUp, title: "MEP Systems Replacement", desc: "Full replacement of aged or inadequate mechanical, electrical, and plumbing systems with modern, energy-efficient technologies that reduce operational costs." },
              { icon: Star, title: "Adaptive Reuse Projects", desc: "Transforming obsolete industrial buildings, retail centers, or warehouses into residential lofts, creative office space, or mixed-use developments with structural and architectural ingenuity." }
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border p-7 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/15 rounded-lg flex items-center justify-center mb-5">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-black text-primary mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Renovate vs Rebuild */}
      <section className="py-14 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Why Choose Renovation Over Rebuilding?</h2>
              <div className="space-y-5 text-white/70 leading-relaxed text-sm">
                <p>
                  The decision to renovate or rebuild involves a complex calculus of cost, disruption, embodied carbon, permitting risk, and timeline. In many cases, renovation is the overwhelmingly superior choice — delivering 60–75% of the asset performance of a new building at 40–60% of the cost.
                </p>
                <p>
                  From a sustainability perspective, renovation preserves the embodied energy locked in the existing structure and dramatically reduces construction waste. Many municipalities now incentivize adaptive reuse and deep retrofits through expedited permitting, tax credits, and density bonuses.
                </p>
                <p>
                  BuildForce conducts a rigorous cost-benefit analysis for every renovation inquiry, giving you an honest, engineer-led assessment of whether renovation or reconstruction better serves your long-term goals. We are not financially motivated to push you toward a new build — our reputation depends on giving you the right advice.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[{ val: "40–60%", label: "Cost Saving vs. Rebuild" }, { val: "70%", label: "Less Construction Waste" }, { val: "3× Faster", label: "Permitting Timeline" }, { val: "30yr+", label: "Added Asset Lifespan" }].map((s, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-7 rounded-xl text-center">
                  <span className="text-3xl font-black text-accent block mb-2">{s.val}</span>
                  <span className="text-white/60 text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Revitalize Your Building?</h2>
          <p className="text-primary/80 text-lg mb-10">Contact our renovation specialists for a preliminary assessment and proposal tailored to your project scope.</p>
          <Link to="/contact" className="bg-primary text-white font-black px-10 py-5 rounded text-lg hover:bg-primary/85 transition-colors inline-flex items-center gap-2 shadow-xl">
            Request a Renovation Proposal <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Renovation & Retrofit FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border border-border p-6 rounded-xl">
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
