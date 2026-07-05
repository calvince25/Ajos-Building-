import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, HardHat } from "lucide-react";

export default function MasonryBuildingMaterials({ serviceData }: { serviceData?: any }) {
  const faqs = [
    {
      question: "What types of concrete blocks do you produce?",
      answer: "We produce a comprehensive range of concrete blocks including standard hollow blocks (150mm, 200mm), solid blocks for high-load applications, half blocks, and custom-dimension blocks as required by structural specifications. All blocks are produced from quality aggregate mixes, cured to achieve the required compressive strength, and can be produced in standard grey or with coloured pigment for architectural applications. We also produce interlocking blocks and paving blocks on request."
    },
    {
      question: "What is the difference between clay bricks and concrete blocks?",
      answer: "Clay bricks are fired in kilns at high temperatures, producing a dense, weather-resistant product with natural colour variation prized for aesthetic applications. They offer excellent durability, low maintenance, and a traditional appearance. Concrete blocks are manufactured from cement, aggregate, and water, offering greater dimensional consistency, easier production in custom sizes, and cost efficiency for larger structural applications. The choice between the two depends on structural requirements, aesthetic preferences, cost, and local availability."
    },
    {
      question: "Do you supply building materials to projects you are not constructing?",
      answer: "Yes. We supply concrete blocks, clay bricks, and dressed building stone to other contractors and self-build projects. Our materials are available for direct collection from our production facility or can be delivered to site within our service area. Minimum order quantities apply for delivery, and we can accommodate orders for both small residential projects and large commercial developments."
    },
    {
      question: "What structural standards do your masonry materials meet?",
      answer: "All our concrete blocks and clay bricks are produced to meet applicable national and international masonry material standards, including compressive strength requirements for the relevant block class. We maintain quality control records and can provide material test certificates confirming compliance upon request. Our masonry construction also follows relevant structural design codes and is executed by artisans with formal masonry training."
    },
    {
      question: "Can you match stone or brick for a restoration project?",
      answer: "Yes. Matching existing materials for restoration and renovation is a speciality of our team. For brick matching, we assess the original brick's dimensions, colour, texture, and compressive strength to produce a matching clay brick. For stone, our stone dressing team can work with original quarry sources or find the closest available alternative to blend seamlessly with existing heritage masonry. We regularly work on historic buildings and understand the importance of material authenticity in conservation projects."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Masonry & Building Materials | Concrete Blocks, Clay Bricks & Stone Works",
    description: "Expert masonry construction and building materials supply including concrete block production, clay brick production, stone dressing, and masonry works. Durable, precision-crafted for lasting structures.",
    canonical: "/services/masonry-building-materials",
    keywords: "masonry services, concrete block production, clay brick production, stone dressing, masonry construction, building stone supply, masonry contractor, brick laying",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/masonry-building-materials#service",
          name: "Masonry & Building Materials",
          serviceType: "Masonry Services",
          description: "Expert masonry construction and building materials supply including concrete block production, clay brick production, stone dressing, and masonry works.",
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
          <img loading="lazy" src={serviceData?.hero_image_url || "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=1600&h=800&fit=crop&auto=format"} alt="Skilled mason laying precision concrete blocks for a structural wall" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Masonry Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              The Foundation of Every Great Structure is <span className="text-accent">Master Masonry</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              From in-house concrete block and clay brick production to skilled stone dressing and structural masonry construction, we supply both the materials and the expertise to build structures that endure for generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0">
                Get Masonry Quote <ArrowRight size={18} />
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
              Complete Masonry Solutions — From Production to Construction
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                Masonry is among the oldest and most enduring forms of construction, combining simple raw materials with skilled craft to produce structures of remarkable strength, thermal mass, and longevity. Our masonry and building materials division provides a vertically integrated service that encompasses the production of essential building materials alongside expert masonry construction — giving our clients quality assurance from the block yard to the finished wall.
              </p>
              <p>
                We operate our own concrete block production facility, manufacturing hollow and solid blocks to standard and custom specifications. Our clay brick production delivers consistent, high-strength bricks for residential and commercial applications. Our stone dressing team works with natural quarry stone to produce precision-cut building stone for structural and decorative applications. All materials are produced under quality control protocols and tested to meet applicable standards.
              </p>
              <p>
                Our masonry construction team translates these materials into finished structures — foundations, load-bearing walls, boundary walls, retaining walls, paving, and architectural masonry features. With skilled artisans and a thorough understanding of structural requirements, we deliver masonry work that is precise, durable, and built to the specification every time.
              </p>
            </div>
          </div>
          <div className="relative">
            <img loading="lazy" src={serviceData?.content_image_url || "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=1000&fit=crop&auto=format"} alt="Masons constructing a precision stone boundary wall" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
            <div className="absolute top-8 -right-6 bg-accent text-primary px-6 py-5 rounded-xl shadow-xl hidden md:block">
              <span className="text-3xl font-black block">50K+</span>
              <span className="text-xs font-bold uppercase tracking-wide">Blocks Produced Monthly</span>
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
                title: "Concrete Block Production",
                desc: "In-house manufacturing of hollow and solid concrete blocks to standard and custom dimensions, meeting structural requirements for residential, commercial, and industrial construction."
              },
              {
                title: "Clay Brick Production",
                desc: "Production of high-strength clay bricks using quality raw materials, kiln-fired to consistent colour and dimensional tolerances for use in walling and facing applications."
              },
              {
                title: "Stone Dressing",
                desc: "Precision cutting and dressing of natural quarry stone for use in structural walling, cladding, paving, and decorative masonry applications, maintaining natural character with refined finish."
              },
              {
                title: "Masonry Construction",
                desc: "Expert construction of load-bearing walls, foundations, retaining walls, boundary walls, and architectural masonry features using blocks, bricks, and dressed stone."
              },
              {
                title: "Building Stone Supply",
                desc: "Supply of quality building stone — quarried, sorted, and delivered to site in the quantities and specifications required for any scale of masonry construction."
              },
              {
                title: "Masonry Repairs & Restoration",
                desc: "Assessment and repair of deteriorating masonry structures, including repointing, crack injection, wall tie replacement, and matching of heritage materials."
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
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Masonry Process</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Material Assessment & Specification", desc: "We assess project requirements and specify the most appropriate masonry materials based on structural loads, environmental exposure, and aesthetic intent." },
                { title: "Material Production or Procurement", desc: "Blocks, bricks, or stone are produced in-house or sourced from certified suppliers, with every batch quality-tested before delivery to site." },
                { title: "Structural Masonry Construction", desc: "Our experienced masons execute all masonry works to structural drawings, with quality inspections at foundation, first lift, and completion stages." },
                { title: "Curing, Inspection & Handover", desc: "Completed masonry is allowed appropriate curing time, inspected against specification, and handed over with full material test certificates and warranties." }
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=600&fit=crop&auto=format')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Build Stronger with Professional Masonry Services</h2>
          <p className="text-white/80 text-lg mb-10">From block and brick supply to complete masonry construction, our team is ready to support your project from the ground up. Request a consultation today.</p>
          <Link to="/contact" className="bg-accent text-primary font-black px-10 py-5 rounded text-lg hover:bg-yellow-400 transition-colors inline-block shadow-xl">
            Get Masonry Quote
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
