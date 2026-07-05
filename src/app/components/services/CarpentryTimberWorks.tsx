import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, HardHat } from "lucide-react";

export default function CarpentryTimberWorks({ serviceData }: { serviceData?: any }) {
  const faqs = [
    {
      question: "What timber species do you work with?",
      answer: "We work with a wide range of timber species selected to suit each application. For structural framing, we use treated pine and engineered lumber. For interior joinery and custom woodwork, we commonly use hardwoods including oak, mahogany, teak, and meranti, as well as premium softwoods such as cedar and pine. We can source specialty timbers on request and will advise on the most appropriate species for your specific climate, use, and aesthetic requirements."
    },
    {
      question: "Do you fabricate custom doors and windows off-site?",
      answer: "Yes. Custom timber doors and windows are fabricated in our workshop to precise measurements before delivery and installation on site. This workshop-first approach ensures accuracy, reduces on-site time, minimises disruption, and allows for thorough quality inspection before any element is fitted. For standard-sized openings, we also supply and install from a range of pre-manufactured quality timber door and window products."
    },
    {
      question: "How do you protect outdoor timber from weathering?",
      answer: "Outdoor timber requires appropriate species selection and protective treatment. We specify naturally durable or preservative-treated timber for all external applications. Protective finishes — including exterior-grade stains, oils, paints, or clear UV-resistant lacquers — are applied to prevent moisture ingress, UV degradation, and biological attack. We advise clients on appropriate maintenance intervals to maximise the life of their outdoor timber elements."
    },
    {
      question: "Can you match existing joinery styles in a renovation?",
      answer: "Yes. We regularly replicate existing joinery profiles, moulding patterns, and timber species to match original or heritage woodwork in renovation projects. Our carpenters are experienced in producing custom-milled profiles and can match most traditional joinery styles. We work from drawings, samples, or site measurements to ensure a seamless match between old and new work."
    },
    {
      question: "What is the difference between joinery and carpentry?",
      answer: "Carpentry refers to the on-site work of cutting, fitting, and assembling timber components — framing, structural work, and site-installed elements. Joinery typically refers to the workshop manufacture of timber components such as doors, windows, stairs, and fitted furniture, which are then installed on site. Our team covers both disciplines, providing a complete timber service from structural framing through to the finest interior joinery details."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Carpentry & Timber Works | Wooden Doors, Windows, Framing & Custom Joinery",
    description: "Expert carpentry and timber works services including wooden window and door installation, timber framing, custom woodwork, and interior joinery. Precision craftsmanship using quality timber for lasting results.",
    canonical: "/services/carpentry-timber-works",
    keywords: "carpentry services, timber works, wooden door installation, wooden window installation, timber framing, custom woodwork, interior joinery, carpentry contractor",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/carpentry-timber-works#service",
          name: "Carpentry & Timber Works",
          serviceType: "Carpentry Services",
          description: "Expert carpentry and timber works services including wooden window and door installation, timber framing, custom woodwork, and interior joinery.",
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
          <img loading="lazy" src={serviceData?.hero_image_url || "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&h=800&fit=crop&auto=format"} alt="Master carpenter crafting custom timber joinery in a workshop" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Carpentry & Timber Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Crafted in Timber, Built to <span className="text-accent">Last Generations</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              From structural timber framing to bespoke interior joinery, our carpenters combine time-honoured craftsmanship with modern precision to deliver woodwork that enhances every building it graces.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0">
                Request Carpentry Quote <ArrowRight size={18} />
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
              Skilled Timber Craftsmanship for Every Project
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                Timber is one of the most versatile and enduring building materials in the world, and skilled carpentry is what transforms raw timber into functional, beautiful structures that define the character of a building. Our carpentry and timber works division brings together experienced craftspeople who take genuine pride in their work — from the accuracy of a timber frame to the smoothness of a hand-fitted door.
              </p>
              <p>
                We provide the full spectrum of carpentry services across residential, commercial, and industrial projects. This includes structural timber framing for buildings of all scales, the installation of wooden windows and doors with precision fitting and weatherproofing, custom woodwork and cabinetry designed to exact client specifications, and interior joinery including staircases, skirting boards, architraves, and built-in furniture.
              </p>
              <p>
                Every timber project we undertake begins with careful material selection, ensuring the correct species, treatment, and grade for the intended application and environmental conditions. We work with sustainably sourced timber where possible and apply appropriate treatments, sealants, and finishes to protect the wood against moisture, pests, and UV exposure, ensuring your investment lasts for decades.
              </p>
            </div>
          </div>
          <div className="relative">
            <img loading="lazy" src={serviceData?.content_image_url || "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&h=1000&fit=crop&auto=format"} alt="Carpenter installing a custom wooden door frame on a residential property" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
            <div className="absolute top-8 -right-6 bg-accent text-primary px-6 py-5 rounded-xl shadow-xl hidden md:block">
              <span className="text-3xl font-black block">20+</span>
              <span className="text-xs font-bold uppercase tracking-wide">Years Timber Expertise</span>
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
                title: "Wooden Window Installation",
                desc: "Supply and precision installation of timber-framed windows, including proper weatherproofing, sealants, and hardware fitting for lasting performance."
              },
              {
                title: "Wooden Door Installation",
                desc: "Expert installation of interior and exterior wooden doors, from standard residential units to custom hardwood entrance doors, with correct frame preparation and hardware."
              },
              {
                title: "Timber Framing",
                desc: "Structural timber framing for residential and light commercial buildings, executed with precision and compliant with all relevant structural and load requirements."
              },
              {
                title: "Custom Woodwork",
                desc: "Bespoke timber creations including feature walls, custom cabinetry, shelving, and decorative elements designed and built to exact client specifications."
              },
              {
                title: "Interior Joinery",
                desc: "High-quality interior joinery works including staircases, skirtings, architraves, window boards, and built-in furniture using premium hardwoods and softwoods."
              },
              {
                title: "Timber Treatment & Finishing",
                desc: "Specialist timber treatment, staining, oiling, and lacquering services to protect and enhance the natural beauty of wood in any environment."
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
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Carpentry Process</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Design & Material Selection", desc: "We collaborate with clients to define requirements, select timber species and grades, and agree on joinery specifications before any work begins." },
                { title: "Workshop Fabrication", desc: "Custom elements are precision-fabricated in our workshop using industry-standard tools and quality control processes before delivery to site." },
                { title: "On-Site Installation", desc: "Our skilled carpenters install all elements with precision, ensuring correct fit, alignment, and weatherproofing across every detail." },
                { title: "Finishing & Handover", desc: "Applied finishes, hardware, and seals are inspected and signed off. Full care and maintenance guidance is provided at handover." }
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&h=600&fit=crop&auto=format')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Bring Timber Craftsmanship to Your Project?</h2>
          <p className="text-white/80 text-lg mb-10">Contact our carpentry team to discuss your requirements, from a single custom door to a complete timber framing and joinery package.</p>
          <Link to="/contact" className="bg-accent text-primary font-black px-10 py-5 rounded text-lg hover:bg-yellow-400 transition-colors inline-block shadow-xl">
            Request Carpentry Quote
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
