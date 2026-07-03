import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, CheckCircle, Ruler, Layers, Award, Star, Users, TrendingUp } from "lucide-react";

export default function ArchitecturalEngineering() {
  const faqs = [
    {
      question: "What does your in-house architectural team provide?",
      answer: "Our in-house architectural team offers concept design, schematic design, design development, construction documentation, and architectural project administration. We work across commercial, industrial, residential, and mixed-use sectors. Clients benefit from working directly with their design team — no third-party handoffs, no communication gaps."
    },
    {
      question: "Do your structural engineers collaborate with external architects?",
      answer: "Yes. While our in-house team is highly capable, we regularly partner with boutique design firms, corporate architecture practices, and international design studios as their structural and civil engineering consultant. We provide sealed structural drawings, peer review services, and site observation for third-party architectural contracts."
    },
    {
      question: "Can you help with code compliance and permit preparation?",
      answer: "Absolutely. Our architectural and engineering team produces fully code-compliant construction documentation ready for building permit submission. We are familiar with IBC, local municipal amendments, ADA/accessibility requirements, and fire-code integration. Our in-house permit expeditors maintain relationships with local plan-check departments, accelerating approval timelines."
    },
    {
      question: "Do you use Building Information Modeling (BIM)?",
      answer: "BIM is standard practice on all BuildForce projects above $1M. Our Revit-proficient team produces integrated architectural, structural, and MEP models that coordinate all building systems in three dimensions before construction begins. This clash detection process eliminates costly field changes and improves construction accuracy."
    },
    {
      question: "What is the cost of architectural and engineering services?",
      answer: "Fees for architectural and engineering services are typically calculated as a percentage of total construction cost, ranging from 6–14% depending on project complexity and scope of services. For smaller standalone consultancy engagements, we offer hourly rates. Contact us for a tailored fee proposal for your specific project."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Architectural & Engineering Services | Building Plans, Design & Structural Engineering",
    description: "Comprehensive architectural design and structural engineering services including building plans, architectural drawings, roof design, construction documentation, and design consultancy. BIM-proficient, code-compliant, and design-build ready.",
    canonical: "/services/architectural-engineering",
    keywords: "architectural services, structural engineering, building plans, architectural drawings, roof design, construction documentation, design consultation, design-build, BIM modeling",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/architectural-engineering#service",
          name: "Architectural & Engineering Services",
          serviceType: "Architectural Design and Structural Engineering Consultancy",
          description: "Full-scope architectural design and structural engineering services from initial concept through permit-ready construction documentation, utilizing BIM and integrated design-build delivery.",
          provider: { "@type": "Organization", name: "BuildForce Construction & Engineering", url: "https://buildforce.com" },
          areaServed: "US"
        },
        getFAQSchema(faqs)
      ]
    }
  };

  const team = [
    { name: "Sofia Almeida", role: "Principal Architect", cred: "AIA, LEED AP", expertise: "Commercial & Mixed-Use", img: "https://images.unsplash.com/photo-1716037991590-c975184b37df?w=300&h=380&fit=crop&auto=format" },
    { name: "Dr. Priya Nair", role: "Lead Structural Engineer", cred: "PE, SE, PhD (Structural)", expertise: "Complex Frame Analysis", img: "https://images.unsplash.com/photo-1774600166818-e554a4d4c376?w=300&h=380&fit=crop&auto=format" }
  ];

  return (
    <main className="bg-background">
      <SEO {...seoConfig} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=800&fit=crop&auto=format" alt="Architects reviewing building blueprints and 3D models" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Architecture & Engineering</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Design That <span className="text-accent">Performs</span> as Well as It Looks
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Our in-house architects and structural engineers collaborate from day one to create buildings that are architecturally inspired, structurally uncompromising, and practically constructible on budget.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-8 py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
                Request a Design Consultation <ArrowRight size={18} />
              </Link>
              <Link to="/team" className="bg-white/10 text-white font-bold border border-white/20 px-8 py-4 rounded hover:bg-white/20 transition-colors inline-block">
                Meet the Design Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Where Architecture Meets Structural Intelligence
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                Great buildings are the product of a deeply collaborative relationship between architectural vision and structural engineering pragmatism. When these disciplines operate in silos — passing drawings over the wall from architect to engineer — the result is often a design that is beautiful in concept but expensive or difficult to build, requiring costly redesigns before construction can begin.
              </p>
              <p>
                BuildForce eliminates this inefficiency by housing our architectural and structural engineering teams under one roof, working collaboratively from the earliest concept sketches. Our principal architect and lead structural engineer sit in the same design sessions, debate structural systems in real time, and produce integrated documentation that reflects both aesthetic intent and engineering reality. The result is a set of construction documents that contractors can actually build to — on budget and on schedule.
              </p>
              <p>
                Our architectural capabilities span the full project lifecycle, from early feasibility and master planning through schematic design, design development, construction documentation, and construction administration. Our structural engineering team provides comprehensive analysis and design for concrete, steel, timber, and masonry structural systems, including complex long-span structures, high-rise lateral force systems, and specialized industrial structures.
              </p>
              <p>
                We are BIM-first in our design process, producing fully coordinated 3D building information models that integrate architectural, structural, and building services data. This eliminates clash conflicts before they reach the site, reduces RFIs, and enables accurate cost modeling at every stage. For clients adopting integrated project delivery (IPD) or design-build procurement, our integrated team is uniquely positioned to deliver.
              </p>
            </div>
          </div>
          <div className="relative">
            <img loading="lazy" src="https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=900&fit=crop&auto=format" alt="Architectural blueprints and structural engineering drawings" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
            <div className="absolute -bottom-8 -left-8 bg-accent text-primary p-6 rounded-xl shadow-xl hidden md:block">
              <span className="text-3xl font-black block">BIM</span>
              <span className="text-xs font-bold uppercase tracking-wide">Standard on All Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Services */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Design & Engineering Services</h2>
            <p className="text-muted-foreground">Integrated capabilities from concept to sealed documentation and beyond.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-8 rounded-xl">
              <h3 className="text-xl font-black text-primary mb-5 flex items-center gap-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <Ruler className="text-accent" size={24} /> Architectural Design Services
              </h3>
              <ul className="space-y-3">
                {["Concept Development & Feasibility Studies", "Master Planning & Site Analysis", "Schematic Design & Design Development", "Construction Documentation (CD Set)", "Interior Architecture & Space Planning", "Sustainable Design & LEED Certification", "Permitting Support & Code Compliance", "Architectural Project Administration (APA)"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border p-8 rounded-xl">
              <h3 className="text-xl font-black text-primary mb-5 flex items-center gap-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <Layers className="text-accent" size={24} /> Structural Engineering Services
              </h3>
              <ul className="space-y-3">
                {["Structural Concept & Systems Selection", "Detailed Structural Analysis & Design", "Concrete, Steel, Timber & Masonry Systems", "Foundation Engineering & Geotechnical Review", "Seismic Design & Lateral Force Analysis", "Peer Review & Third-Party Structural Checking", "Construction Phase Observation & Review", "Special Inspections Coordination"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural & Design Sub-Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-6 h-0.5 bg-accent" />
              <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Architectural & Design Services</p>
              <span className="w-6 h-0.5 bg-accent" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Building Plans, Roof Design & Design Consultation</h2>
            <p className="text-muted-foreground">
              From the first sketch of a floor plan to the submission-ready architectural drawings and specialist roof design — our design team delivers every document your project requires.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Building Plans & Design",
                desc: "Comprehensive building plan development for residential, commercial, and industrial projects — from initial concept floor plans through to full planning submission drawings, incorporating spatial flow, regulatory compliance, and client requirements."
              },
              {
                title: "Architectural Drawings",
                desc: "Production of complete sets of architectural drawings including floor plans, elevations, sections, and detail drawings, prepared to the level of detail required for permit submission and contractor instruction."
              },
              {
                title: "Roof Design",
                desc: "Specialist roof design services covering pitched, flat, curved, and green roof systems. We coordinate architectural form, structural requirements, drainage design, and material specification to deliver roofs that are watertight, energy-efficient, and aesthetically considered."
              },
              {
                title: "Construction Documentation",
                desc: "Preparation of full construction documentation packages including architectural, structural, and services drawings, schedules, and specifications ready for tender and construction. Our document sets are coordinated, consistent, and buildable."
              },
              {
                title: "Design Consultation",
                desc: "Independent design consultation for clients at any stage of a project. Whether you need a second opinion on a structural system, advice on material selection, code compliance review, or design guidance for a self-managed project, our architects and engineers are available on an hourly or retainer basis."
              },
              {
                title: "3D Modelling & BIM",
                desc: "Full Building Information Modelling (BIM) services using Revit, producing coordinated 3D models that integrate architecture, structure, and building services. Clash detection, 4D scheduling, and quantity take-off capabilities available as required."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Leads */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Lead Design Professionals</h2>
            <p className="text-muted-foreground max-w-xl">Your project will be led by some of the most experienced design professionals in the industry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((m, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col md:flex-row items-center shadow-sm">
                <img loading="lazy" src={m.img} alt={m.name} className="w-full md:w-48 h-60 md:h-full object-cover object-top flex-shrink-0" />
                <div className="p-7">
                  <h3 className="text-xl font-black text-primary mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{m.name}</h3>
                  <p className="text-accent font-bold text-sm mb-1">{m.role}</p>
                  <p className="text-muted-foreground text-xs mb-3">{m.cred}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">Specialist expertise in <strong className="text-foreground">{m.expertise}</strong>, with a track record of delivering technically complex and architecturally innovative projects across the United States.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/team" className="text-accent font-bold text-sm flex items-center gap-1 justify-center hover:gap-2 transition-all">Meet the Full Team <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1600&h=600&fit=crop&auto=format')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Bring Your Concept to Life with Expert Design</h2>
          <p className="text-white/80 text-lg mb-10">Whether you have a napkin sketch or a detailed brief, our design team will help you develop it into a buildable, beautiful, and code-compliant structure.</p>
          <Link to="/contact" className="bg-accent text-primary font-black px-10 py-5 rounded text-lg hover:bg-yellow-400 transition-colors inline-block shadow-xl">
            Start Your Design Project
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Architectural & Engineering FAQs</h2>
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
              { title: "Commercial Construction", link: "/services/commercial-construction", desc: "Execute your architectural vision with our construction team." },
              { title: "Land Surveying", link: "/services/land-surveying", desc: "Site surveys and topographical data for accurate design." },
              { title: "Construction Project Management", link: "/services/construction-project-management", desc: "Expert project coordination from design to handover." }
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
