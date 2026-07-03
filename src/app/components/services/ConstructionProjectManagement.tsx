import React from "react";
import { Link } from "react-router";
import SEO, { SEOProps, getFAQSchema } from "../SEO";
import { ArrowRight, ClipboardList } from "lucide-react";

export default function ConstructionProjectManagement() {
  const faqs = [
    {
      question: "What does a construction project manager do?",
      answer: "A construction project manager is responsible for planning, coordinating, and overseeing all aspects of a construction project to ensure it is completed on time, within budget, and to the required quality standards. Their role encompasses developing and maintaining the construction programme, coordinating all sub-trades and suppliers, managing the project budget and variations, monitoring and reporting on quality and safety compliance, communicating progress to the client, managing sub-contracts, and resolving technical and logistical challenges as they arise."
    },
    {
      question: "What is the difference between a site supervisor and a project manager?",
      answer: "A site supervisor (or foreman) is responsible for the day-to-day physical execution of work on site — directing workers, coordinating material deliveries, enforcing safety rules, and maintaining the daily workflow. A project manager operates at a higher level, managing the overall project programme, budget, client relationship, contract administration, and strategic decision-making. On larger projects, both roles work together, with the site supervisor reporting to the project manager. On smaller projects, one person may perform both functions."
    },
    {
      question: "How do you manage construction material procurement and prevent shortages?",
      answer: "Our material management process begins at the pre-construction stage with a full material take-off and procurement schedule aligned to the construction programme. We identify long-lead items early, place orders in advance, and maintain a rolling four-week lookahead that flags material requirements before they become urgent. We work with reliable, pre-qualified suppliers and maintain alternative supplier relationships as contingencies. On site, our store keepers conduct daily inventory checks and issue early warnings of any stock that is approaching depletion."
    },
    {
      question: "What reporting do clients receive during the construction phase?",
      answer: "Our clients receive weekly written progress reports covering construction programme status, percentage completion, upcoming activities for the following two weeks, any risks or issues identified and their resolution plans, a budget summary showing actual expenditure against the approved cost plan, and a safety and quality status update. For larger projects, we also provide monthly executive summaries and cash flow forecasts. All reports are delivered in a clear, non-technical format accessible to both developer clients and technical stakeholders."
    },
    {
      question: "Can you take over project management mid-construction?",
      answer: "Yes. We regularly step in to rescue projects that have encountered problems — schedule overruns, contractor failures, budget blowouts, or management gaps. Our team conducts a rapid diagnostic assessment of the project status, programme, budget, and quality situation, then develops a recovery plan to bring the project back on track. We have successfully turned around troubled construction projects across all sectors, and our intervention has consistently delivered better outcomes than clients anticipated at the time of our engagement."
    }
  ];

  const seoConfig: SEOProps = {
    title: "Construction Project Management | Site Supervision, Scheduling & Quality Assurance",
    description: "Professional construction project management services including site supervision, material management, store keeping, site record keeping, scheduling, quality assurance, and project coordination. Ensuring every project is delivered on time, within budget, and to specification.",
    canonical: "/services/construction-project-management",
    keywords: "construction project management, site supervision, foreman services, material management, construction scheduling, quality assurance, project coordination, site management",
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://buildforce.com/services/construction-project-management#service",
          name: "Construction Project Management",
          serviceType: "Construction Project Management Services",
          description: "Professional construction project management services including site supervision, material management, store keeping, site record keeping, scheduling, quality assurance, and project coordination.",
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
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=800&fit=crop&auto=format" alt="Construction project manager reviewing site plans with foreman on an active building site" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-accent" />
              <span className="text-accent font-bold tracking-widest uppercase text-sm">Project Management Division</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Delivering Projects <span className="text-accent">On Time, On Budget, Every Time</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Expert construction project management — from site supervision and material management to scheduling, quality assurance, and full project coordination — ensuring every aspect of your build is executed with precision and accountability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-primary font-black px-8 py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2">
                Start a Project Discussion <ArrowRight size={18} />
              </Link>
              <Link to="/projects" className="bg-white/10 text-white font-bold border border-white/20 px-8 py-4 rounded hover:bg-white/20 transition-colors inline-block">
                View Our Portfolio
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
              End-to-End Construction Management for Complex Projects
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                Effective construction project management is the discipline that transforms an architectural vision into a completed building without the chaos of uncontrolled costs, schedule drift, and quality failures. At BuildForce, our project management division provides the structured oversight, proactive coordination, and experienced leadership that keeps every project running with precision — from the first shovel in the ground to the final handover inspection.
              </p>
              <p>
                Our project management services cover every dimension of site operations. Our experienced site supervisors and foremen maintain daily control over works, workforce, and sub-trades. Our material managers ensure the right materials are available at the right time, preventing costly delays from supply chain disruptions. Our store keepers maintain accurate inventory records and prevent material losses and theft on site. Our document controllers maintain the full paper trail of site instructions, variations, and compliance records throughout the project lifecycle.
              </p>
              <p>
                We apply industry-proven project management methodologies including Critical Path Method scheduling, earned value analysis, and rigorous risk management to give clients absolute confidence that their project will be delivered to specification, within the agreed budget, and on the promised date. Our project managers are qualified professionals with track records spanning residential, commercial, industrial, and infrastructure projects across a full range of budgets and complexities.
              </p>
            </div>
          </div>
          <div className="relative">
            <img loading="lazy" src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=1000&fit=crop&auto=format" alt="Project manager reviewing construction schedule and quality reports on site" className="rounded-2xl shadow-2xl object-cover w-full h-[580px]" />
            <div className="absolute top-8 -right-6 bg-accent text-primary px-6 py-5 rounded-xl shadow-xl hidden md:block">
              <span className="text-3xl font-black block">350+</span>
              <span className="text-xs font-bold uppercase tracking-wide">Projects Managed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-services Grid */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Site Supervision (Foreman)",
                desc: "Experienced, qualified site supervisors and foremen who maintain daily control of construction activities, coordinate trades, enforce safety, and drive quality on site."
              },
              {
                title: "Material Management",
                desc: "Strategic planning and management of material procurement, delivery scheduling, and site storage to ensure continuous supply without wastage, theft, or costly stockpiling."
              },
              {
                title: "Store Keeping",
                desc: "Disciplined management of on-site material stores including receiving, issuing, recording, and reconciling all materials to prevent losses and maintain accurate project cost tracking."
              },
              {
                title: "Site Record Keeping",
                desc: "Comprehensive maintenance of all site records including daily diaries, inspection checklists, variation orders, RFIs, and compliance documentation throughout the project lifecycle."
              },
              {
                title: "Construction Scheduling",
                desc: "Development and maintenance of detailed construction programmes using Critical Path Method and bar chart scheduling, with regular progress monitoring and schedule recovery planning."
              },
              {
                title: "Quality Assurance",
                desc: "Systematic quality management including inspection and test plans, hold points, defect identification, resolution tracking, and close-out reporting at every construction stage."
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Management Approach</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Project Mobilisation", desc: "We establish the project management framework — site setup, programme baselines, communication protocols, and reporting structures — before construction activities commence." },
                { title: "Active Site Management", desc: "Our supervisors and managers are on site every working day, driving progress, coordinating resources, managing sub-trades, and resolving issues before they become delays." },
                { title: "Progress Monitoring & Reporting", desc: "Weekly progress reports, schedule updates, cost reports, and quality status summaries are provided to clients, keeping all stakeholders informed and decisions data-driven." },
                { title: "Completion & Handover", desc: "We manage the close-out process including defect resolution, final inspections, regulatory sign-offs, and the compilation of a complete handover documentation package." }
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=600&fit=crop&auto=format')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Project Deserves Professional Management</h2>
          <p className="text-white/80 text-lg mb-10">Whether you need a site supervisor for a small renovation or a full project management team for a major development, we have the expertise and resources to deliver results. Contact us today.</p>
          <Link to="/contact" className="bg-accent text-primary font-black px-10 py-5 rounded text-lg hover:bg-yellow-400 transition-colors inline-block shadow-xl">
            Discuss Your Project
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-6">
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
