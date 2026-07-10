import React, { useState } from "react";
import { Link } from "react-router";
import SEO, { SERVICES_SEO, PROJECTS_SEO, ABOUT_SEO, TEAM_SEO, BLOG_SEO, CONTACT_SEO, getBlogPostSEO } from "./SEO";
import FactList from "./FactList";
import StructuredFAQ from "./StructuredFAQ";
import { PageHero } from "./ui/PageHero";
import { supabase } from "../supabaseClient";
import Turnstile from "./ui/Turnstile";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ClipboardList,
  Building2,
  HardHat,
  Hammer,
  Wrench,
  Ruler,
  Truck,
  Layers,
  Star,
  Users,
  Award,
  Zap,
  Play,
  ShieldCheck,
  TrendingUp,
  CheckCircle
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface ServicesPageProps {
  services: any[];
}
export function ServicesPage({ services }: ServicesPageProps) {
  const [search, setSearch] = useState("");
  const filtered = services.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.description?.toLowerCase().includes(search.toLowerCase()));

  return (
    <main id="services-page" className="bg-background pb-16">
      <SEO {...SERVICES_SEO} />
      <PageHero
        title="Our Services"
        subtitle="What We Do"
        imageUrl="https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <p className="text-muted-foreground text-center mb-8 sm:mb-10 max-w-xl mx-auto text-sm">We provide end-to-end contracting, design-build, and consultancy services across commercial, industrial, civil, and residential projects.</p>
        
        {/* Search bar */}
        <div className="max-w-md mx-auto mb-10 sm:mb-12">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((s) => {
            const slug = s.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            return (
            <Link key={s.id} to={`/services/${slug}`} className="bg-card rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow group block no-underline text-foreground">
              <div className="relative overflow-hidden h-48 sm:h-52 bg-muted">
                <img src={s.image_url || s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-black px-3 py-1 rounded uppercase tracking-wide">{s.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-black text-primary text-base mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.description || s.desc}</p>
                <div className="border-t border-border pt-4 grid grid-cols-3 gap-2 text-xs mb-4">
                  {[
                    { label: "Timeline", val: s.duration },
                    { label: "Value", val: s.value },
                    { label: "Scope", val: s.scope },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <span className="text-muted-foreground block">{label}</span>
                      <span className="font-bold text-primary text-xs leading-tight">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-accent text-sm font-bold gap-1 mt-2 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectsPageProps {
  projects: any[];
}
export function ProjectsPage({ projects }: ProjectsPageProps) {
  const [filter, setFilter] = useState("All");
  const filtered = projects.filter(p => filter === "All" || p.category === filter);

  return (
    <main id="portfolio-page" className="bg-background pb-16">
      <SEO {...PROJECTS_SEO} />
      <PageHero 
        title="Project Portfolio"
        subtitle="Our Work"
        imageUrl="https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto text-sm">Explore our completed developments, civil undertakings, and custom residential communities.</p>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {["All", "Commercial", "Industrial", "Residential"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded text-xs font-bold transition-colors ${filter === f ? "bg-accent text-primary" : "bg-muted text-muted-foreground hover:bg-accent/20"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <div key={p.id} className="bg-card rounded-xl overflow-hidden shadow hover:shadow-2xl transition-shadow group">
              <div className="relative overflow-hidden h-64 bg-muted">
                <img loading="lazy" src={p.image_url || p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-black px-3 py-1 rounded uppercase tracking-wide">{p.category}</span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-black text-lg mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.title}</h3>
                  <div className="flex items-center justify-between text-white/70 text-xs">
                    <span className="flex items-center gap-1"><MapPin size={11} />{p.location}</span>
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Layers size={11} />{p.year}</span>
                      <span className="text-accent font-bold">{p.value}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function AboutPage() {
  return (
    <main id="about-page" className="bg-background pb-20">
      <SEO {...ABOUT_SEO} />
      <PageHero 
        title="About Titan Construction"
        subtitle="Our Story & Vision"
        imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        
        {/* Section 1: Our Story */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Decades of Engineering <span className="text-accent">Excellence</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded in 1996, Titan Construction began as a small regional contractor specializing in civil earthworks. Over the past twenty-eight years, we have strategically evolved into one of the nation's premier vertically integrated construction and engineering firms. Our journey is defined by a relentless pursuit of quality, an unwavering commitment to safety, and a deep-seated passion for building structures that endure for generations.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              From our earliest days, we recognized that the traditional construction model—often plagued by fragmented communication between architects, engineers, and general contractors—was inherently flawed. In response, we built a comprehensive, in-house team of structural engineers, master architects, procurement specialists, and seasoned project managers. This unified approach eliminates silos, accelerates project timelines, and ensures that every structural detail is meticulously planned and executed under a single point of accountability.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, Titan Construction boasts a delivered project portfolio exceeding KES 2.1 billion. We have successfully completed over 350 major developments across commercial, industrial, civil, and residential sectors. Whether we are constructing a state-of-the-art logistics hub, a towering corporate headquarters, or a complex municipal bridge, our core philosophy remains unchanged: to deliver absolute cost certainty, rigorous schedule adherence, and uncompromising structural integrity.
            </p>
          </div>
          <div className="relative">
            <img loading="lazy" src="https://images.unsplash.com/photo-1655975719898-8f3432eed322?w=600&h=800&fit=crop&auto=format" alt="Construction crane operating at a commercial building site" className="rounded-xl shadow-2xl object-cover w-full h-[600px]" />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
              <div className="text-4xl font-black text-primary mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>1996</div>
              <div className="text-sm font-bold text-accent uppercase tracking-widest">Year Established</div>
            </div>
          </div>
        </section>

        {/* Section 2: Mission & Values */}
        <section className="mb-16 sm:mb-24 bg-card p-6 sm:p-10 md:p-12 rounded-2xl shadow-sm border border-border">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Mission & Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We are driven by a singular mission: to engineer and construct environments that empower businesses, support communities, and respect the natural world.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Uncompromising Safety</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Our "Zero-Incident" culture is not just a slogan; it is the foundation of our operations. Every site is managed by a dedicated, OSHA 30-hour certified safety officer. We implement rigorous daily hazard analyses, mandatory safety briefings, and continuous training to ensure every worker returns home safely.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Certified Quality</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">As an ISO 9001:2015 certified organization, we maintain an exhaustive Quality Assurance and Quality Control (QA/QC) program. From materials procurement to final structural inspections, our proprietary auditing processes guarantee that every project meets or exceeds all local, state, and international building codes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Transparent Integrity</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">We believe in absolute financial transparency. Our fixed-price contract models and open-book reporting systems provide our clients with total cost certainty. There are no hidden fees or unexpected overruns—just honest communication, proactive problem-solving, and reliable financial stewardship.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Our Expertise & Services */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <img loading="lazy" src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=800&fit=crop&auto=format" alt="Architectural blueprints and engineering tools" className="rounded-xl shadow-2xl object-cover w-full h-[600px]" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Comprehensive <span className="text-accent">Capabilities</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our in-house capabilities span the entire project lifecycle. We leverage advanced Building Information Modeling (BIM) technologies to perform complex clash detection, structural load analysis, and 3D visualization long before the first shovel hits the ground. This proactive engineering approach allows us to optimize materials, reduce waste, and identify potential challenges during the design phase rather than during active construction.
              </p>
              
              <h3 className="text-xl font-bold text-primary mt-8 mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Industries We Serve</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-accent flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-primary block">Commercial Real Estate</strong>
                    <span className="text-muted-foreground text-sm">Corporate campuses, high-rise office towers, and mixed-use retail developments designed for maximum occupancy efficiency.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-accent flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-primary block">Industrial & Logistics</strong>
                    <span className="text-muted-foreground text-sm">Heavy manufacturing facilities, automated warehousing, and cold-storage distribution centers built to precise operational specifications.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-accent flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong className="text-primary block">Civil Infrastructure</strong>
                    <span className="text-muted-foreground text-sm">Municipal roadways, bridges, mass grading, and complex subterranean drainage systems engineered for public safety and longevity.</span>
                  </div>
                </li>
              </ul>
              
              <Link to="/services" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Explore All Services <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Sustainability & Innovation */}
        <section className="mb-16 sm:mb-24 bg-primary text-white p-6 sm:p-10 md:p-12 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Commitment to Sustainability</h2>
            <p className="text-white/80 leading-relaxed mb-8">
              As leaders in the built environment, we recognize our profound responsibility to minimize our ecological footprint. Titan Construction is a proud proponent of sustainable construction practices and LEED (Leadership in Energy and Environmental Design) certified development. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                <h4 className="font-bold text-accent mb-2 text-lg">Green Materials</h4>
                <p className="text-sm text-white/70 leading-relaxed">We prioritize the procurement of locally sourced, recycled, and low-VOC (Volatile Organic Compounds) building materials to reduce transportation emissions and improve indoor air quality.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                <h4 className="font-bold text-accent mb-2 text-lg">Energy Optimization</h4>
                <p className="text-sm text-white/70 leading-relaxed">Our MEP (Mechanical, Electrical, and Plumbing) engineering teams specialize in integrating high-efficiency HVAC systems, smart lighting controls, and renewable energy infrastructure like solar arrays.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                <h4 className="font-bold text-accent mb-2 text-lg">Waste Reduction</h4>
                <p className="text-sm text-white/70 leading-relaxed">We implement aggressive on-site waste diversion programs, consistently recycling over 75% of construction debris, including concrete, steel, and timber, keeping them out of local landfills.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                <h4 className="font-bold text-accent mb-2 text-lg">Water Conservation</h4>
                <p className="text-sm text-white/70 leading-relaxed">From installing low-flow fixtures to engineering advanced greywater recycling systems and permeable paving solutions, we design structures that dramatically reduce water consumption.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Titan Construction Process */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Project Delivery Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A systematic, phased approach ensuring seamless execution from initial concept to final occupancy.</p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-accent text-primary font-black flex items-center justify-center flex-shrink-0 text-xl">1</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Pre-Construction & Feasibility</h3>
                <p className="text-muted-foreground leading-relaxed">We begin with comprehensive site analysis, geotechnical evaluations, and detailed cost modeling. Our estimating team provides highly accurate preliminary budgets while our engineers identify potential zoning, environmental, or structural constraints, allowing us to mitigate risks before significant capital is deployed.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-accent text-primary font-black flex items-center justify-center flex-shrink-0 text-xl">2</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Design & Engineering (BIM Integration)</h3>
                <p className="text-muted-foreground leading-relaxed">Our in-house architectural and structural teams collaborate to produce fully coordinated 3D BIM models. This phase finalizes the aesthetic vision while simultaneously calculating precise load capacities, MEP routing, and material specifications, culminating in fully permitted, ready-to-build construction documents.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-accent text-primary font-black flex items-center justify-center flex-shrink-0 text-xl">3</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Procurement & Logistics</h3>
                <p className="text-muted-foreground leading-relaxed">Leveraging our extensive network of global and regional suppliers, we secure top-tier materials at competitive pricing. Our logistics coordinators manage the complex sequencing of deliveries to ensure materials arrive precisely when needed, preventing site congestion and costly delays.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-accent text-primary font-black flex items-center justify-center flex-shrink-0 text-xl">4</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Active Construction & Site Management</h3>
                <p className="text-muted-foreground leading-relaxed">Our seasoned superintendents take command of the site, orchestrating our specialized crews and vetted subcontractors. Utilizing cloud-based project management software, we track daily progress, monitor quality control metrics, and provide clients with real-time updates and transparent financial reporting.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-accent text-primary font-black flex items-center justify-center flex-shrink-0 text-xl">5</div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Commissioning & Handover</h3>
                <p className="text-muted-foreground leading-relaxed">As the build nears completion, our commissioning agents rigorously test all mechanical, electrical, and life-safety systems to verify operational integrity. We conduct exhaustive punch-list walkthroughs, provide comprehensive facility training to the owner's staff, and deliver a complete package of digital as-built documentation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Leadership & Experience */}
        <section className="mb-16 sm:mb-24 bg-card p-6 sm:p-10 md:p-12 rounded-2xl shadow-sm border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>A Leadership Team Built on Experience</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The success of Titan Construction is directly attributable to the exceptional talent and steadfast dedication of our leadership team. Comprised of industry veterans—including licensed structural engineers, registered architects, and certified project management professionals—our executives bring decades of hands-on experience navigating the most complex construction challenges.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We foster a culture of continuous learning and mentorship, ensuring that our technical expertise is passed down to the next generation of builders. When you partner with us, you are gaining the collective intellectual capital of a team that has successfully managed billions of shillings in critical infrastructure and commercial development.
              </p>
              <Link to="/team" className="inline-flex items-center gap-2 text-accent font-bold hover:underline">
                Meet Our Board of Directors <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-background p-6 rounded-xl text-center border border-border shadow-sm">
                 <div className="text-4xl font-black text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>150+</div>
                 <div className="text-xs font-bold text-muted-foreground uppercase">Full-Time Staff</div>
               </div>
               <div className="bg-background p-6 rounded-xl text-center border border-border shadow-sm">
                 <div className="text-4xl font-black text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>45</div>
                 <div className="text-xs font-bold text-muted-foreground uppercase">Licensed Engineers</div>
               </div>
               <div className="bg-background p-6 rounded-xl text-center border border-border shadow-sm">
                 <div className="text-4xl font-black text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>0</div>
                 <div className="text-xs font-bold text-muted-foreground uppercase">Litigation Cases</div>
               </div>
               <div className="bg-background p-6 rounded-xl text-center border border-border shadow-sm">
                 <div className="text-4xl font-black text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>92%</div>
                 <div className="text-xs font-bold text-muted-foreground uppercase">Repeat Clients</div>
               </div>
            </div>
          </div>
        </section>

        {/* Section 7: Final CTA */}
        <section className="text-center pb-12">
          <h2 className="text-3xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Start Your Next Project?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you are in the preliminary planning stages or ready to break ground, our team is prepared to provide the engineering expertise and construction management required to ensure your success.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-yellow-400 text-primary font-black px-10 py-4 rounded transition-colors text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <ClipboardList size={20} /> Request a Consultation
          </Link>
        </section>

      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEAM PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface TeamPageProps {
  team: any[];
}
export function TeamPage({ team }: TeamPageProps) {
  return (
    <main id="team-page" className="bg-background pb-16">
      <SEO {...TEAM_SEO} />
      <PageHero 
        title="Our Leadership"
        subtitle="The Team Behind the Build"
        imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto text-sm">Decades of combined engineering expertise, architectural innovation, and site contracting oversight.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.id} className="bg-card rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow text-center">
              <div className="relative overflow-hidden h-72 bg-muted">
                <img loading="lazy" src={m.image_url || m.image} alt={m.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-5">
                <h3 className="font-black text-primary text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>{m.name}</h3>
                <p className="text-accent text-sm font-semibold mb-3">{m.title}</p>
                <div className="flex justify-center gap-6 text-xs border-t border-border pt-3 text-gray-500">
                  <div>
                    <span className="font-black text-primary text-sm">{m.projects || m.projects_completed || 0}</span> Projects
                  </div>
                  <div>
                    <span className="font-black text-primary text-sm">{m.years || m.years_experience || 0}</span> Yrs Exp.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface BlogPageProps {
  blogs: any[];
}
export function BlogPage({ blogs }: BlogPageProps) {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  if (selectedPost) {
    const postSeo = getBlogPostSEO(selectedPost);
    return (
      <article id="blog-post" className="py-16 bg-background">
        <SEO {...postSeo} />
        <div className="max-w-3xl mx-auto px-6">
          <button onClick={() => setSelectedPost(null)} className="text-accent font-semibold text-xs mb-6 flex items-center gap-1 hover:underline">
            &larr; Back to all posts
          </button>
          <img loading="lazy" src={selectedPost.image_url} alt={selectedPost.title} className="w-full h-72 object-cover rounded-xl mb-6 shadow-md" />
          <h1 className="text-3xl font-black text-primary mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{selectedPost.title}</h1>
          <p className="text-xs text-gray-400 mb-6">Published on {new Date(selectedPost.created_at).toLocaleDateString()}</p>
          <FactList facts={["Expert construction insights and analysis", "Industry leading safety protocols discussed", "Structural engineering best practices highlighted"]} />
          <div className="prose max-w-none text-muted-foreground leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: selectedPost.content || "" }} />
        </div>
      </article>
    );
  }

  return (
    <main id="blog-index" className="bg-background pb-16">
      <SEO {...BLOG_SEO} />
      <PageHero 
        title="News & Insights"
        subtitle="Industry Perspectives"
        imageUrl="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto text-sm">Stay ahead with the latest industry updates, engineering innovations, and structural features.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.filter(b => b.status === "published" || b.published).map((b) => (
            <div key={b.id} onClick={() => setSelectedPost(b)} className="bg-card rounded-xl overflow-hidden shadow hover:shadow-xl transition-all cursor-pointer group">
              <div className="h-48 bg-muted overflow-hidden">
                <img loading="lazy" src={b.image_url || "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=700&h=500&fit=crop&auto=format"} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-primary text-base line-clamp-2 mb-2 group-hover:text-accent transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>{b.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-4">{b.excerpt || "Read full post insights."}</p>
                <span className="text-accent text-xs font-bold flex items-center gap-1">Read Post &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface ContactPageProps {
  contactDetails: any;
  companySettings: any;
}
export function ContactPage({ contactDetails, companySettings }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [submitCount, setSubmitCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in name, email and message fields.");
      return;
    }
    if (!captchaToken) {
      alert("Please complete the captcha verification.");
      return;
    }
    try {
      const { error } = await supabase.from("contact_messages").insert([
        { name, email, phone: phone || null, subject, message, is_read: false }
      ]);
      if (error) throw error;
      alert("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setCaptchaToken(null);
      setSubmitCount(prev => prev + 1);
    } catch (err: any) {
      alert("Failed to send message: " + err.message);
    }
  };

  return (
    <main id="contact-page" className="bg-background pb-16">
      <SEO {...CONTACT_SEO} />
      <PageHero 
        title="Get in Touch"
        subtitle="Start Your Project"
        imageUrl="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2000&auto=format&fit=crop"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 mt-12 sm:mt-16">
        <div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">Have structural inquiries, bid requests, or construction projects to discuss? Send us a message and our engineering staff will get back to you promptly.</p>
          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-4">
              <MapPin className="text-accent mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold block">Headquarters</span>
                <span className="text-muted-foreground">{contactDetails.address}</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-accent mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold block">Office Line</span>
                <span className="text-muted-foreground">{contactDetails.phone}</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-accent mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold block">Inquiries Email</span>
                <span className="text-muted-foreground">{contactDetails.email}</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-accent mt-1 flex-shrink-0" />
              <div>
                <span className="font-bold block">Office Hours</span>
                <span className="text-muted-foreground">{companySettings.openHours}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border border-border shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Send Message</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-background focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-background focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +254 712 345 678" className="w-full px-3 py-2 border border-border rounded text-sm bg-background focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subject</label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-background focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Message</label>
            <textarea required rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm bg-background focus:outline-none focus:border-accent" />
          </div>
          <Turnstile key={submitCount} siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAADygoJzEpw83-uEG"} onVerify={setCaptchaToken} />
          <button type="submit" className="bg-accent text-primary font-black py-2.5 px-6 rounded flex items-center justify-center gap-2 text-sm cursor-pointer w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Send Message &rarr;
          </button>
        </form>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREERS PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface CareersPageProps {
  careers: any[];
}
export function CareersPage({ careers }: CareersPageProps) {
  return (
    <main id="careers-page" className="bg-background pb-16">
      <style>{`
        .career-prose h1 { font-size: 1.6rem; font-weight: 800; margin: 0.75rem 0 0.5rem; line-height: 1.2; color: var(--color-primary, #1d2327); }
        .career-prose h2 { font-size: 1.25rem; font-weight: 700; margin: 0.65rem 0 0.4rem; line-height: 1.25; color: var(--color-primary, #1d2327); }
        .career-prose h3 { font-size: 1.05rem; font-weight: 700; margin: 0.55rem 0 0.35rem; line-height: 1.3; color: var(--color-primary, #1d2327); }
        .career-prose p { margin: 0.4rem 0; line-height: 1.65; color: inherit; }
        .career-prose ul { list-style: disc; padding-left: 1.4rem; margin: 0.5rem 0; }
        .career-prose ol { list-style: decimal; padding-left: 1.4rem; margin: 0.5rem 0; }
        .career-prose li { margin: 0.25rem 0; line-height: 1.6; }
        .career-prose a { color: var(--color-accent, #f0c243); text-decoration: underline; }
        .career-prose blockquote { border-left: 4px solid var(--color-accent, #f0c243); padding: 0.5rem 1rem; margin: 0.75rem 0; background: rgba(0,0,0,0.04); color: inherit; font-style: italic; border-radius: 0 4px 4px 0; }
        .career-prose hr { border: none; border-top: 1px solid #d1d5db; margin: 1rem 0; }
        .career-prose strong, .career-prose b { font-weight: 700; }
        .career-prose em, .career-prose i { font-style: italic; }
      `}</style>
      <SEO title="Careers | Titan Construction" description="Join our team of dedicated professionals." keywords="careers, jobs, construction jobs" canonical="/careers" />
      <PageHero
        title="Careers"
        subtitle="Join Our Team"
        imageUrl="/careers_hero.jpg"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto text-sm">
          We are always looking for talented and passionate individuals to join our team. 
          If you are committed to excellence and want to build a rewarding career, explore our open positions below.
        </p>

        {careers.length === 0 ? (
          <div className="text-center p-10 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-bold text-primary mb-2">No Open Positions Currently</h3>
            <p className="text-muted-foreground text-sm">Please check back later or send us your resume speculatively.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {careers.map((career) => (
              <div key={career.id} className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-black text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>{career.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      {career.department && <span className="flex items-center gap-1"><Users size={14} className="text-accent"/> {career.department}</span>}
                      {career.location && <span className="flex items-center gap-1"><MapPin size={14} className="text-accent"/> {career.location}</span>}
                      {career.type && <span className="flex items-center gap-1"><Clock size={14} className="text-accent"/> {career.type}</span>}
                    </div>
                  </div>
                  {career.deadline && new Date(career.deadline) < new Date() ? (
                    <button disabled className="bg-gray-200 text-gray-400 text-xs font-bold px-4 py-2 rounded cursor-not-allowed whitespace-nowrap self-start">
                      Applications Closed
                    </button>
                  ) : (
                    <Link to={`/careers/${career.slug || career.id}/apply`} className="bg-primary text-white text-xs font-bold px-4 py-2 rounded hover:bg-primary/90 transition-colors whitespace-nowrap self-start no-underline">
                      Apply Now
                    </Link>
                  )}
                </div>

                {/* Description: prefer rich HTML, fallback to plain text */}
                {career.description_html ? (
                  <div
                    className="career-prose text-sm text-muted-foreground mb-4"
                    dangerouslySetInnerHTML={{ __html: career.description_html }}
                  />
                ) : career.description ? (
                  <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">{career.description}</p>
                ) : null}

                {(() => {
                  const reqs = Array.isArray(career.requirements) 
                    ? career.requirements 
                    : (typeof career.requirements === 'string' ? career.requirements.split('\n').filter(Boolean) : []);
                  return reqs.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Requirements</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {reqs.map((req: string, i: number) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}
                {(() => {
                  const bens = Array.isArray(career.benefits) 
                    ? career.benefits 
                    : (typeof career.benefits === 'string' ? career.benefits.split('\n').filter(Boolean) : []);
                  return bens.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">Benefits</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {bens.map((ben: string, i: number) => (
                          <li key={i}>{ben}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
