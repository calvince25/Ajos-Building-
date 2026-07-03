import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, CheckCircle, HardHat, Truck, ShieldCheck, TrendingUp, Layers, Zap } from "lucide-react";

export default function IndustrialInfrastructure() {
  const faqs = [
    {
      question: "What kinds of industrial construction projects does BuildForce handle?",
      answer: "BuildForce delivers a full spectrum of industrial projects including warehouses, distribution centers, manufacturing plants, logistics hubs, petrochemical facilities, cold-storage buildings, and heavy-industrial structures requiring specialized foundations and structural systems."
    },
    {
      question: "Can you manage infrastructure and public works projects?",
      answer: "Yes. Our civil-infrastructure division handles bridges, highway intersections, stormwater systems, utility corridors, rail infrastructure, and municipal facilities. We are licensed as a prime contractor for federal, state, and local government projects."
    },
    {
      question: "How do you handle hazardous-material environments?",
      answer: "Our crews are trained to HAZWOPER standards for industrial environments involving chemicals, petroleum products, or hazardous waste. We work closely with environmental engineers to maintain OSHA and EPA compliance throughout every phase of construction."
    },
    {
      question: "What is your largest completed industrial project to date?",
      answer: "Our largest single contract was a $68M integrated logistics campus consisting of three warehouse buildings totalling 1.1 million sq ft, a vehicle marshalling yard, and a dedicated rail spur, completed 45 days ahead of schedule in Houston, TX."
    },
    {
      question: "Do you provide design-build services for industrial developments?",
      answer: "Absolutely. Our in-house structural engineers and industrial architects collaborate to develop designs optimized for operational workflow, load-bearing requirements, fire suppression, and future expansion. Design-build consistently reduces costs and compresses timelines for industrial clients."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Industrial & Infrastructure Construction | Warehouses, Bridges & Plants",
    description: "Expert industrial construction services for warehouses, factories, bridges, and public infrastructure. Design-build delivery with proven on-time performance on projects from $1M to $100M+.",
    canonical: "/services/industrial-infrastructure",
    keywords: "industrial construction, warehouse construction, manufacturing plant builder, infrastructure contractor, bridge construction, logistics facility, heavy industrial construction",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/industrial-infrastructure#service",
          name: "Industrial & Infrastructure Construction",
          serviceType: "Industrial Building & Civil Infrastructure",
          description: "Full-cycle industrial construction services encompassing warehouses, factories, bridges, and critical infrastructure, delivered on schedule with design-build efficiency.",
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
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" src="https://images.unsplash.com/photo-1527335988388-b40ee248d80c?w=1600&h=800&fit=crop&auto=format" alt="Industrial construction site with heavy machinery" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Industrial Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Heavy-Duty Construction for <span className="text-accent">Demanding Environments</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              From million-square-foot logistics hubs to complex bridge infrastructure, BuildForce delivers engineered solutions that power industry and connect communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-8 py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
                Get a Project Estimate <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="bg-white/10 text-white font-bold border border-white/20 px-8 py-4 rounded hover:bg-white/20 transition-colors inline-flex items-center gap-2">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img loading="lazy" src="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&h=900&fit=crop&auto=format" alt="Large industrial warehouse interior" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
              <div className="absolute -bottom-8 -right-8 bg-accent p-8 rounded-xl shadow-xl text-primary hidden md:block">
                <span className="text-4xl font-black block" style={{ fontFamily: "'Montserrat', sans-serif" }}>$2.1B+</span>
                <span className="font-bold text-sm">Industrial Value Delivered</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Industrial Construction Built for Performance and Longevity
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Modern industrial facilities are not simply buildings — they are highly engineered machines. The structural integrity of a distribution center's floor slab must withstand thousands of forklift passes daily. A manufacturing plant's roof must accommodate heavy crane rails. A water treatment facility must resist chemical corrosion for decades. BuildForce brings the engineering depth to get these details right, every single time.
                </p>
                <p>
                  Our industrial construction division has delivered over 80 warehouse and logistics projects, 15 manufacturing facilities, and more than 25 public infrastructure contracts. We work with fortune 500 logistics companies, heavy manufacturers, government agencies, and private developers who demand precision and cannot afford costly construction errors.
                </p>
                <p>
                  We apply lean construction principles across all industrial projects, reducing waste, accelerating cycle times, and maintaining meticulous quality standards from groundbreaking to ribbon-cutting. Our in-house BIM (Building Information Modeling) team creates detailed 3D models before a single beam is placed, eliminating costly field conflicts and improving coordination among mechanical, electrical, and structural trades.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {["HAZWOPER-Trained Crews", "Heavy-Load Structural Systems", "Design-Build Infrastructure", "LEED & Sustainability Ready", "40+ Million Sq Ft Built", "Government Contract Certified"].map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Industrial & Infrastructure Services
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">Specialized capabilities across the full industrial and infrastructure construction spectrum.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Warehouses & Distribution Centers", desc: "Cross-dock facilities, high-bay storage, refrigerated logistics, and e-commerce fulfillment centers engineered for modern supply chains.", icon: Truck },
              { title: "Manufacturing Plants", desc: "Heavy structural systems, specialized process piping, crane runways, and industrial utility infrastructure for complex manufacturing operations.", icon: HardHat },
              { title: "Bridges & Civil Structures", desc: "Highway bridges, pedestrian bridges, box culverts, retaining walls, and traffic interchanges built to AASHTO and FHWA standards.", icon: Layers },
              { title: "Energy & Utility Infrastructure", desc: "Substations, power generation facilities, pumping stations, and water treatment plants that serve communities and industries reliably.", icon: Zap },
              { title: "Petrochemical Facilities", desc: "Containment structures, tank farms, piping racks, and process buildings designed to meet strict API and OSHA process safety standards.", icon: ShieldCheck },
              { title: "Public & Civic Infrastructure", desc: "Government buildings, transit terminals, municipal depots, and public amenities delivered through competitive bidding and direct-award contracts.", icon: TrendingUp },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all p-7 rounded-xl group">
                <div className="w-12 h-12 bg-accent/15 group-hover:bg-accent/30 rounded-lg flex items-center justify-center mb-5 transition-colors">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-white font-black text-lg mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-bold text-sm uppercase tracking-widest">Featured Project</span>
              <h2 className="text-3xl font-black text-primary mt-2 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Meridian Business Park — Houston, TX</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A landmark 540,000 sq ft multi-tenant industrial park delivered for a major logistics REIT client. The Meridian Business Park project required simultaneous construction of three separate warehouse buildings, shared truck courts, a dedicated rail access spur, and all associated site utilities. Completed in 18 months — two weeks ahead of schedule — and delivered at $18M total contract value. LEED Silver certified.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[{ label: "Contract Value", val: "$18M" }, { label: "Total Sq Ft", val: "540,000" }, { label: "Timeline", val: "18 Months" }].map(s => (
                  <div key={s.label} className="bg-card border border-border rounded-lg p-4 text-center">
                    <span className="text-2xl font-black text-accent block" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.val}</span>
                    <span className="text-xs text-muted-foreground mt-1 block">{s.label}</span>
                  </div>
                ))}
              </div>
              <Link to="/projects" className="text-accent font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>
            <img loading="lazy" src="https://images.unsplash.com/photo-1515263487990-61b07816b324?w=700&h=500&fit=crop&auto=format" alt="Meridian Business Park industrial construction" className="rounded-2xl shadow-xl object-cover w-full h-96" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Let's Engineer Your Next Industrial Project
          </h2>
          <p className="text-primary/80 text-lg mb-10">
            Our industrial division is ready to tackle your most complex construction challenges. Share your project scope and receive a preliminary proposal within 5 business days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-primary text-white font-black px-10 py-4 rounded hover:bg-primary/85 transition-colors inline-flex items-center gap-2">
              Request a Quote <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="bg-white text-primary font-bold px-10 py-4 rounded hover:bg-white/90 transition-colors inline-block">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Industrial Construction FAQs
            </h2>
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

      {/* Related Services */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-black text-primary mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Civil & Earthworks", link: "/services/civil-earthworks", desc: "Site preparation, grading, and drainage for industrial sites." },
              { title: "Commercial Construction", link: "/services/commercial-construction", desc: "Large-scale commercial buildings and corporate facilities." },
              { title: "Architectural & Engineering", link: "/services/architectural-engineering", desc: "In-house design team for industrial planning and layout." }
            ].map(s => (
              <Link key={s.link} to={s.link} className="bg-card border border-border p-6 rounded-xl hover:shadow-md transition-shadow no-underline block">
                <h3 className="text-base font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{s.desc}</p>
                <span className="text-accent text-sm font-bold flex items-center gap-1">Learn More <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
