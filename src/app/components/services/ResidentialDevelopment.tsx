import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, CheckCircle, Hammer, Home, Users, Star, MapPin } from "lucide-react";

export default function ResidentialDevelopment() {
  const faqs = [
    {
      question: "What types of residential projects do you build?",
      answer: "We build custom luxury homes, mid-range single-family residences, townhouse communities, low-rise apartment buildings, and full residential estate developments. Our portfolio spans from modest three-bedroom homes to 50-unit apartment blocks and gated estate communities of over 100 units."
    },
    {
      question: "Can I be involved in the design of my custom home?",
      answer: "Absolutely. Our principal architect and design team work closely with private clients through a structured design consultation process. You will have input at every stage, from initial concept sketching and floor plan iteration to material selection, fixture specification, and interior layout approval."
    },
    {
      question: "How long does it take to build a custom home?",
      answer: "Construction timelines vary with complexity, size, and local permitting. A standard custom home (2,500–4,000 sq ft) typically takes 9–14 months from permit issuance to certificate of occupancy. Large custom estates or multi-unit blocks may take 12–24 months."
    },
    {
      question: "What warranty do you provide on new residential construction?",
      answer: "We offer a comprehensive 1-year builder's warranty covering workmanship defects, a 2-year warranty on mechanical, electrical, and plumbing systems, and a 10-year structural warranty on the foundation and load-bearing framework — aligning with standard industry practice."
    },
    {
      question: "Do you work with first-time property developers on residential subdivisions?",
      answer: "Yes. We regularly partner with first-time residential developers and offer pre-development consulting services including site selection analysis, zoning due diligence, cost modeling, and phasing strategy to help new developers successfully plan and execute their first community."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Residential Construction | Custom Homes, Apartments & Estate Communities",
    description: "Bespoke residential construction services for custom homes, apartment buildings, and estate developments. Quality craftsmanship, transparent pricing, and on-time delivery guaranteed.",
    canonical: "/services/residential-development",
    keywords: "residential construction, custom home builder, apartment construction, estate development, residential contractor, luxury home builder, custom home construction",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/residential-development#service",
          name: "Residential Development",
          serviceType: "Residential Building Construction",
          description: "Custom homes, apartment buildings, and residential estate communities built with precision craftsmanship and transparent cost-certainty guarantees.",
          provider: { "@type": "Organization", name: "BuildForce Construction & Engineering", url: "https://buildforce.com" },
          areaServed: "US"
        },
        getFAQSchema(faqs)
      ]
    }
  };

  const testimonials = [
    { name: "James & Linda Forsythe", text: "BuildForce turned our dream home into reality. The attention to every structural detail, from the foundation through to the roofline, was extraordinary. Our forever home was delivered on time and on budget.", rating: 5 },
    { name: "Northgate Communities LLC", text: "As a first-time residential developer, we relied heavily on BuildForce's expertise. They guided us through every phase of our 48-unit townhouse project with remarkable professionalism.", rating: 5 }
  ];

  return (
    <main className="bg-background">
      <SEO {...seoConfig} />

      {/* Hero */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-40 lg:pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" src="https://images.unsplash.com/photo-1601074231509-dce351c05199?w=1600&h=800&fit=crop&auto=format" alt="Beautiful custom residential home exterior" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Residential Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Where Families Make <span className="text-accent">Memories for Life</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              We craft custom homes, apartment communities, and residential estates with the same structural precision and safety focus we bring to our largest commercial projects — because your home deserves nothing less.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0">
                Start Your Home Build <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="bg-white/10 text-white font-bold border border-white/20 px-8 py-4 rounded hover:bg-white/20 transition-colors inline-block">
                View Homes Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <img loading="lazy" src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=900&fit=crop&auto=format" alt="Construction crew framing a custom home" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
            <div className="absolute top-8 -right-6 bg-accent text-primary px-6 py-5 rounded-xl shadow-xl hidden md:block">
              <span className="text-3xl font-black block">94%</span>
              <span className="text-xs font-bold uppercase tracking-wide">Client Referral Rate</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Residential Construction That Reflects Your Vision
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                A home is the most personal structure a builder will ever create. At BuildForce, we understand that residential construction is not simply about erecting walls and rooflines — it is about crafting the environment where families build their lives, celebrate milestones, and create generational memories. Every decision, from the soil bearing capacity assessment to the direction a window faces, matters profoundly.
              </p>
              <p>
                Our residential division handles everything from single custom homes for private clients to large-scale residential developments of 50 to 200+ units for property developers. Whether you are a private homeowner with a clear architectural vision or a first-time developer seeking expert guidance to bring a community to life, BuildForce provides the experience, resources, and collaborative approach to make it happen.
              </p>
              <p>
                What separates BuildForce from volume builders is our unwillingness to compromise on the details that matter most. We use premium structural materials, employ licensed tradespeople across every discipline, and conduct rigorous independent quality inspections at each phase of construction. Our clients consistently report that they would not hesitate to build with us again.
              </p>
              <p>
                From foundation engineering and framing to roofing systems, insulation, windows, and final finishing, our team integrates every building trade under a single, accountable project management structure. You receive transparent weekly progress reports, real-time budget tracking, and a dedicated project manager who answers your calls personally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-14 sm:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>What We Build</h2>
            <p className="text-muted-foreground">From single-family dream homes to large residential communities — each project is a reflection of our craftsmanship.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Home, title: "Custom Luxury Homes", desc: "Bespoke single-family residences with premium materials, custom millwork, and architecturally distinct designs." },
              { icon: Hammer, title: "Apartment Buildings", desc: "Efficient multi-unit residential blocks from 10 to 200 units designed for liveability, durability, and investor returns." },
              { icon: Users, title: "Estate Communities", desc: "Master-planned residential communities with shared amenities, landscaping, and HOA-managed common areas." },
              { icon: MapPin, title: "Townhouse Complexes", desc: "Attached and semi-detached townhouse developments offering the appeal of private homes with shared infrastructure savings." }
            ].map((item, idx) => (
              <div key={idx} className="bg-card border border-border p-7 rounded-xl hover:shadow-md transition-shadow text-center">
                <div className="w-14 h-14 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-5">
                  <item.icon size={26} className="text-accent" />
                </div>
                <h3 className="font-black text-primary text-base mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Custom Home Process */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>The Custom Home Process</h2>
            <p className="text-muted-foreground max-w-2xl">A structured journey from your first conversation to the moment you receive your keys.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "Phase 1", title: "Discovery & Design", steps: ["Vision consultation & site selection", "Architectural concept and floor plan development", "Material selection and specification", "Engineering review and structural calculations", "Permit application and council approvals"] },
              { step: "Phase 2", title: "Construction & Monitoring", steps: ["Foundation and structural framing", "Roofing, external cladding, and waterproofing", "Mechanical, electrical, and plumbing rough-in", "Insulation and drywall installation", "Weekly progress reports and client walkthroughs"] },
              { step: "Phase 3", title: "Finishing & Handover", steps: ["Cabinetry, tiling, and interior finishes", "Fixture and appliance installation", "Landscaping and exterior finishing", "Final inspection and punch-list resolution", "Keys handover, warranty documentation, and as-builts"] }
            ].map((phase, idx) => (
              <div key={idx} className="bg-card border border-border p-8 rounded-xl">
                <span className="bg-accent text-primary text-xs font-black px-3 py-1 rounded uppercase tracking-wide">{phase.step}</span>
                <h3 className="text-xl font-black text-primary mt-4 mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{phase.title}</h3>
                <ul className="space-y-3">
                  {phase.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>What Our Residential Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-xl">
                <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}</div>
                <p className="text-white/80 italic leading-relaxed mb-6">"{t.text}"</p>
                <span className="text-accent font-bold text-sm">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Dream Home Starts With a Conversation</h2>
          <p className="text-primary/80 text-lg mb-10">Tell us about your residential project and our team will contact you within one business day to arrange a free consultation.</p>
          <Link to="/contact" className="bg-primary text-white font-black px-10 py-5 rounded text-lg hover:bg-primary/85 transition-colors inline-flex items-center gap-2 shadow-xl">
            Book a Free Consultation <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Residential Construction FAQs</h2>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black text-primary mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Renovation & Retrofit", link: "/services/renovation-retrofit", desc: "Transform existing residential buildings with structural upgrades." },
              { title: "Architectural & Engineering", link: "/services/architectural-engineering", desc: "In-house design services tailored for your residential vision." },
              { title: "Civil & Earthworks", link: "/services/civil-earthworks", desc: "Site preparation, drainage, and land grading for new estates." }
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
