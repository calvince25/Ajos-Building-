import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, CheckCircle, Truck, Layers, ShieldCheck, TrendingUp, MapPin, Zap } from "lucide-react";

export default function CivilEarthworks({ serviceData }: { serviceData?: any }) {
  const faqs = [
    {
      question: "What civil and earthworks services does Titan Construction provide?",
      answer: "Our civil and earthworks division covers the complete range of site preparation and civil construction services, including site clearing and demolition, bulk earthworks and excavation, engineered fill and compaction, grading and surface drainage, stormwater management systems, underground utility installation, road base construction, and concrete flatwork. We operate our own fleet of heavy earthmoving equipment, giving us control over scheduling and cost."
    },
    {
      question: "Can Titan Construction act as the prime contractor for road construction?",
      answer: "Yes. We hold the necessary licenses and bonding to act as a prime contractor on state and municipal road construction projects. We have delivered intersection improvements, collector road extensions, access roads for industrial developments, and private estate roadway networks. Our civil engineers produce all required traffic engineering documentation and coordinate closely with DOT representatives throughout construction."
    },
    {
      question: "How do you manage site drainage and stormwater on large earthworks projects?",
      answer: "Drainage design is integral to every earthworks project we undertake. Our civil engineers design site grading plans that direct stormwater away from structures and toward engineered stormwater management systems, including retention ponds, infiltration basins, bioswales, and underground detention systems. We comply with local MS4 permit requirements and EPA stormwater construction general permits."
    },
    {
      question: "Do you perform geotechnical investigations before earthworks begin?",
      answer: "We coordinate with licensed geotechnical engineers on every significant earthworks project to understand soil bearing capacity, groundwater conditions, expansive soil risks, and compaction requirements. This information is critical for designing earthworks programs that achieve the required subgrade conditions for future construction without costly over-excavation or fill import."
    },
    {
      question: "Can you handle utility trenching and underground infrastructure installation?",
      answer: "Yes. Our crews are experienced in open-cut trenching and trenchless installation methods (horizontal directional drilling) for water mains, sewer mains, gas lines, electrical conduits, and telecommunications infrastructure. We coordinate closely with utility providers and local authorities to manage outages, maintain service continuity, and complete utility works with minimum disruption to surrounding properties."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Civil & Earthworks | Site Prep, Cabro Pavements, Landscaping & Drainage",
    description: "Professional civil, earthworks, and external works services including site preparation, excavation, cabro pavements, walkways, driveways, landscaping, boundary walls, and drainage systems. Delivered with precision and safety.",
    canonical: "/services/civil-earthworks",
    keywords: "civil construction, earthworks contractor, site preparation, excavation, cabro pavements, walkways, driveways, landscaping, boundary walls, drainage works, road construction, land clearing",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://titanconstructions.co.ke/services/civil-earthworks#service",
          name: "Civil & Earthworks",
          serviceType: "Civil Construction and Earthworks",
          description: "Site preparation, bulk excavation, engineered grading, stormwater management, and road construction services for commercial, industrial, and residential development projects.",
          provider: { "@type": "Organization", name: "Titan Constructions Ltd", url: "https://titanconstructions.co.ke" },
          areaServed: "US"
        },
        getFAQSchema(faqs)
      ]
    }
  };

  const equipment = [
    { name: "Excavators", desc: "200–350-tonne class hydraulic excavators for bulk earthmoving on large sites" },
    { name: "Bulldozers", desc: "Laser-guided tracked bulldozers for precision cut-and-fill grading operations" },
    { name: "Compaction Equipment", desc: "Vibratory rollers and plate compactors for engineered fill specification compliance" },
    { name: "Scrapers & Graders", desc: "Motor graders and self-loading scrapers for efficient topsoil stripping and subgrade preparation" },
    { name: "Trenching Machines", desc: "Continuous chain trenchers for utility installation in cohesive soils" },
    { name: "HDD Equipment", desc: "Horizontal directional drilling rigs for trenchless utility crossings beneath roads and waterways" }
  ];

  return (
    <main className="bg-background">
      <SEO {...seoConfig} />

      {/* Hero */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-40 lg:pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" src={serviceData?.hero_image_url || "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?w=1600&h=800&fit=crop&auto=format"} alt="Heavy civil earthworks machinery grading a large site" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Civil & Earthworks Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Building the Foundation <span className="text-accent">Every Project Stands On</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Great structures demand perfect site conditions. Our civil and earthworks team transforms raw land into construction-ready, code-compliant building platforms — precisely, safely, and on schedule.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0">
                Request Site Assessment <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="bg-white/10 text-white font-bold border border-white/20 px-8 py-4 rounded hover:bg-white/20 transition-colors inline-block">
                View Civil Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <img loading="lazy" src={serviceData?.content_image_url || "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=900&fit=crop&auto=format"} alt="Civil engineers reviewing site grading plans in the field" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
            <div className="absolute -bottom-8 -right-8 bg-accent text-primary p-8 rounded-xl shadow-xl hidden md:block text-center">
              <span className="text-3xl font-black block">500+</span>
              <span className="text-sm font-bold">Sites Prepared</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Civil Construction That Shapes the Land Before the Build Begins
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                Every successful construction project begins long before the structural frame goes up. The quality of site preparation, earthwork execution, and civil infrastructure installation determines whether the building above will perform as designed for its full service life — or become a source of chronic, costly problems. Titan Construction's civil and earthworks division understands this fundamental truth, which is why we bring the same engineering rigor and quality discipline to site work as we do to the structures that sit on top of it.
              </p>
              <p>
                We operate our own fleet of modern heavy earthmoving equipment, including excavators, bulldozers, compaction equipment, scrapers, and graders. This self-perform capability gives us direct control over schedules, eliminates subcontractor delays, and allows us to respond rapidly to changing site conditions without disrupting the broader project program. Our civil engineers and equipment operators work as a coordinated team, executing GPS-guided earthworks programs to achieve specified grades and tolerances with exceptional accuracy.
              </p>
              <p>
                Beyond bulk earthworks, our civil division provides comprehensive underground utility installation, stormwater management system construction, road base and asphalt paving, erosion and sediment control, and environmental compliance monitoring. For development projects, we often serve as both the civil contractor and the site superintendent, coordinating all earthworks and civil activities as part of the broader project delivery team.
              </p>
              <p>
                Our civil engineers design and build NPDES-compliant stormwater management systems, engineered retaining structures, and site drainage networks that meet local utility authority standards and long-term performance requirements. We collaborate closely with geotechnical consultants to develop earthworks specifications that account for local soil conditions, seasonal moisture variations, and the long-term settlement behavior of engineered fills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-14 sm:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Civil & Earthworks Services</h2>
            <p className="text-muted-foreground">End-to-end site works delivered with precision engineering and heavy equipment we own and operate.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "Bulk Excavation & Earthworks", desc: "Mass cut-and-fill earthworks, rock breaking, bulk material haulage, and engineered fill compaction to specified tolerances and density requirements." },
              { icon: Layers, title: "Grading & Subgrade Preparation", desc: "Precision laser-guided grading to achieve design surface levels for pavements, slabs, landscaping, and drainage infrastructure." },
              { icon: MapPin, title: "Site Clearing & Demolition", desc: "Vegetation clearing, tree removal, demolition of existing structures, and contaminated soil management ahead of site development." },
              { icon: ShieldCheck, title: "Stormwater & Drainage Works", desc: "Design and construction of stormwater detention, bioretention, swales, culverts, underground drainage networks, and drainage channels compliant with standards." },
              { icon: Zap, title: "Underground Utility Installation", desc: "Water, sewer, gas, electrical, and communications utility installation using open-cut and trenchless HDD construction methods." },
              { icon: TrendingUp, title: "Road Construction & Paving", desc: "Road base preparation, asphaltic concrete paving, concrete curb and gutter, and pavement marking for private and public roadway projects." }
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

      {/* External Works & Landscaping */}
      <section className="py-14 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-6 h-0.5 bg-accent" />
              <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>External Works & Landscaping</p>
              <span className="w-6 h-0.5 bg-accent" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Pavements, Driveways & Landscaping</h2>
            <p className="text-muted-foreground">
              From cabro-paved courts and concrete driveways to manicured landscaping and boundary walls, our external works team transforms the spaces around every building into functional, attractive environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cabro Pavements",
                desc: "Supply and installation of interlocking concrete block paving (cabro) for courtyards, parking areas, access roads, and public plazas. Durable, attractive, and maintainable for high-traffic environments."
              },
              {
                title: "Walkways & Pedestrian Paths",
                desc: "Design and construction of pedestrian walkways using cabro blocks, concrete, natural stone, or gravel, with proper gradient and drainage profiles for accessibility and durability."
              },
              {
                title: "Driveways",
                desc: "Construction of residential and commercial driveways in concrete, asphalt, cabro block, and gravel with engineered base courses for long-term load-bearing performance."
              },
              {
                title: "Landscaping",
                desc: "Professional landscaping services including topsoil preparation, turfing, planting, garden bed formation, irrigation installation, and maintenance for residential estates and commercial properties."
              },
              {
                title: "Boundary Walls",
                desc: "Design and construction of perimeter boundary walls in block, brick, stone, or precast concrete, including capping, plastering, and integration with gate and access control systems."
              },
              {
                title: "Drainage Works",
                desc: "Surface and sub-surface drainage installation including open channels, culverts, French drains, and kerb and gutter systems to effectively manage stormwater and protect property."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-background border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Fleet */}
      <section className="py-14 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Heavy Equipment Fleet</h2>
            <p className="text-white/60 max-w-2xl mx-auto">We own and operate our machinery — no equipment rental delays, no third-party scheduling conflicts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 hover:border-accent/50 p-6 rounded-xl transition-all">
                <h3 className="text-white font-black text-base mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[{ val: "12M+", label: "Cubic Metres Earthworks" }, { val: "500+", label: "Sites Prepared" }, { val: "85km+", label: "Roads Constructed" }, { val: "28yrs", label: "Civil Experience" }].map((s, idx) => (
              <div key={idx} className="py-8">
                <span className="text-4xl font-black text-accent block mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.val}</span>
                <span className="text-muted-foreground text-sm font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Site is Ready to Be Transformed</h2>
          <p className="text-primary/80 text-lg mb-10">Share your site address and project scope and our civil engineering team will provide a preliminary earthworks proposal within 48 hours.</p>
          <Link to="/contact" className="bg-primary text-white font-black px-10 py-5 rounded text-lg hover:bg-primary/85 transition-colors inline-flex items-center gap-2 shadow-xl">
            Get a Civil Works Estimate <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Civil & Earthworks FAQs</h2>
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
              { title: "Masonry & Building Materials", link: "/services/masonry-building-materials", desc: "Concrete blocks, boundary wall construction and masonry works." },
              { title: "Land Surveying", link: "/services/land-surveying", desc: "Site surveys and setting out before earthworks begin." },
              { title: "Construction Project Management", link: "/services/construction-project-management", desc: "Site supervision and coordination for civil works projects." }
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
