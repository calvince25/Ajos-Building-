import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, CheckCircle, MapPin, Layers, Play, HardHat, Building2, ShieldCheck, TrendingUp } from "lucide-react";

export default function CommercialConstruction({ serviceData }: { serviceData?: any }) {
  const faqs = [
    {
      question: "What types of commercial construction projects do you handle?",
      answer: "We specialize in a wide range of commercial construction projects including office towers, retail complexes, mixed-use developments, corporate headquarters, and hospitality venues. Our team is equipped to handle everything from ground-up new construction to complex structural additions."
    },
    {
      question: "How do you ensure commercial projects are delivered on time?",
      answer: "We utilize advanced CPM (Critical Path Method) scheduling, dedicated on-site project managers, and integrated supply chain logistics. By maintaining tight control over procurement and sub-trades, we proactively mitigate delays and ensure your project hits every milestone."
    },
    {
      question: "Do you offer design-build services for commercial developments?",
      answer: "Yes, our vertically integrated model includes in-house architectural and structural engineering teams. This design-build approach streamlines communication, reduces overall costs, and accelerates the project timeline by allowing design and construction phases to overlap."
    },
    {
      question: "What safety protocols do you implement on commercial job sites?",
      answer: "Safety is our paramount concern. All site supervisors are OSHA 30-hour certified, and we mandate daily safety briefings, regular third-party audits, and strict adherence to our zero-incident culture protocols."
    },
    {
      question: "How do you manage budgets and prevent cost overruns?",
      answer: "We offer transparent, fixed-price contracts after a thorough pre-construction feasibility and cost-estimation phase. Our real-time cost tracking dashboards keep stakeholders informed, ensuring complete financial transparency and cost certainty."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Commercial Construction Services | Office & Retail Builds",
    description: "Expert commercial construction services specializing in office towers, retail complexes, and mixed-use developments. ISO 9001 certified with on-time delivery guarantees.",
    canonical: "/services/commercial-construction",
    keywords: "commercial construction, office tower construction, retail complex builders, commercial contractor, mixed-use development, commercial building services",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/commercial-construction#service",
          name: "Commercial Construction",
          serviceType: "Commercial Building",
          description: "End-to-end commercial construction services for office towers, retail complexes, and mixed-use developments, delivered on time and within budget.",
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

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-40 lg:pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={serviceData?.hero_image_url || "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=1600&h=800&fit=crop&auto=format"} 
            alt="Commercial construction site with cranes" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Commercial Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Defining the Modern Skyline with <span className="text-accent">Precision</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              From towering corporate headquarters to expansive retail centers, our commercial construction services deliver unmatched quality, uncompromising safety, and absolute cost certainty.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0">
                Request a Proposal <ArrowRight size={18} />
              </Link>
              <a href="#overview" className="bg-white/10 text-white font-bold border border-white/20 px-8 py-4 rounded hover:bg-white/20 transition-colors inline-flex items-center gap-2">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Comprehensive Commercial Construction Solutions
            </h2>
            <div className="prose prose-lg text-muted-foreground">
              <p>
                In the fast-paced world of commercial real estate, time is money. BuildForce Construction & Engineering understands that delays are unacceptable and quality cannot be compromised. Our commercial construction division is tailored to meet the rigorous demands of developers, investors, and corporate clients who expect excellence at every phase of the build.
              </p>
              <p>
                Whether you are developing a state-of-the-art office tower, a sprawling retail complex, or a high-density mixed-use facility, our team brings decades of structural engineering expertise and site management acumen to the table. We don't just build structures; we build assets that appreciate in value and stand the test of time.
              </p>
              <p>
                By employing a vertically integrated model, we maintain control over every variable. From the initial architectural blueprints and structural load calculations to procurement, permitting, and final finishing, BuildForce serves as your single point of accountability. This streamlined approach minimizes risk, accelerates project timelines, and ensures complete alignment with your strategic vision.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              loading="lazy" 
              src={serviceData?.content_image_url || "https://images.unsplash.com/photo-1541888081-344400e26b1c?w=800&h=1000&fit=crop&auto=format"} 
              alt="Engineers reviewing commercial building plans" 
              className="rounded-2xl shadow-2xl object-cover w-full h-[350px] sm:h-[500px] lg:h-[600px]"
            />
            <div className="absolute -bottom-8 -left-8 bg-card p-8 rounded-xl shadow-xl max-w-sm hidden md:block border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                  <Building2 size={28} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-black text-primary text-xl">150+</h3>
                  <p className="text-sm text-muted-foreground font-semibold">Commercial Projects</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Successfully delivered on-time and within budget across the United States.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries & Expertise */}
      <section className="py-14 sm:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Commercial Expertise
            </h2>
            <p className="text-muted-foreground text-lg">
              We possess specialized knowledge across diverse commercial sectors, ensuring compliance with industry-specific regulations and operational requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Office Towers & Corporate HQs",
                desc: "Creating inspiring, energy-efficient workspaces designed for the modern workforce. We integrate smart building technologies and sustainable materials."
              },
              {
                title: "Retail Centers & Malls",
                desc: "Building high-traffic, visually striking retail environments that attract consumers and maximize lease value for property developers."
              },
              {
                title: "Mixed-Use Developments",
                desc: "Seamlessly blending residential, commercial, and recreational spaces into cohesive, vibrant urban communities."
              },
              {
                title: "Hospitality & Hotels",
                desc: "Delivering luxury and comfort through meticulous finishing, acoustical engineering, and guest-centric design implementation."
              },
              {
                title: "Healthcare Facilities",
                desc: "Constructing OSHPD-compliant clinics and medical offices with specialized HVAC, electrical, and structural requirements."
              },
              {
                title: "Educational Institutions",
                desc: "Building safe, durable, and technologically advanced learning environments for schools, colleges, and universities."
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

      {/* The BuildForce Process */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              The Commercial Build Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A systematic, transparent approach from concept to completion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border z-0" />
            {[
              {
                step: "01",
                title: "Pre-Construction & Feasibility",
                desc: "Rigorous site analysis, zoning checks, value engineering, and detailed cost estimations to ensure project viability."
              },
              {
                step: "02",
                title: "Design & Permitting",
                desc: "In-house architects finalize blueprints while our expeditors navigate local municipalities to secure all necessary permits swiftly."
              },
              {
                step: "03",
                title: "Construction & Site Management",
                desc: "Execution phase utilizing strict CPM scheduling, daily safety briefings, and real-time client reporting via our portal."
              },
              {
                step: "04",
                title: "Handover & Commissioning",
                desc: "Comprehensive testing of all building systems, final walkthroughs, and delivery of warranties and as-built documentation."
              }
            ].map((phase, idx) => (
              <div key={idx} className="relative z-10 pt-4 md:pt-0">
                <div className="w-12 h-12 bg-accent text-primary font-black rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-background">
                  {phase.step}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{phase.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Value Prop */}
      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=600&fit=crop&auto=format')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Break Ground on Your Commercial Project?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Partner with a construction firm that values your time and investment. Contact our commercial division today for a comprehensive site evaluation and proposal.
          </p>
          <Link to="/contact" className="bg-accent text-primary font-black px-10 py-5 rounded text-lg hover:bg-yellow-400 transition-colors inline-block shadow-xl">
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">Common inquiries regarding our commercial construction services.</p>
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
