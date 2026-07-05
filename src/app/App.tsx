import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router";
import { supabase } from "./supabaseClient";
import AdminDashboard from "./components/AdminDashboard";
import { ServicesPage, ProjectsPage, AboutPage, TeamPage, CareersPage, BlogPage, ContactPage } from "./components/Pages";
import CommercialConstruction from "./components/services/CommercialConstruction";
import IndustrialInfrastructure from "./components/services/IndustrialInfrastructure";
import ResidentialDevelopment from "./components/services/ResidentialDevelopment";
import RenovationRetrofit from "./components/services/RenovationRetrofit";
import ArchitecturalEngineering from "./components/services/ArchitecturalEngineering";
import CivilEarthworks from "./components/services/CivilEarthworks";
import InteriorExteriorFinishes from "./components/services/InteriorExteriorFinishes";
import CarpentryTimberWorks from "./components/services/CarpentryTimberWorks";
import MasonryBuildingMaterials from "./components/services/MasonryBuildingMaterials";
import LandSurveying from "./components/services/LandSurveying";
import ConstructionProjectManagement from "./components/services/ConstructionProjectManagement";
import Footer from "./components/Footer";
import SEO, { HOME_SEO, getFAQSchema, getTestimonialsSchema } from "./components/SEO";
import { WhatsAppButton } from "./components/ui/WhatsAppButton";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Star,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Clock,
  HardHat,
  Wrench,
  Building2,
  Hammer,
  Ruler,
  ShieldCheck,
  Truck,
  ClipboardList,
  Users,
  Award,
  TrendingUp,
  CalendarCheck,
  ChevronDown,
  Play,
  Layers,
  Zap,
} from "lucide-react";

const NAV_LINKS = ["Home", "Services", "Projects", "About", "Team", "Careers", "Blog", "Contact"];

const DEFAULT_SERVICES = [
  {
    id: 1,
    icon: Building2,
    image: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=600&h=400&fit=crop&auto=format",
    title: "Commercial Construction",
    tag: "Commercial",
    desc: "Office towers, retail complexes, and mixed-use developments built to exacting standards.",
    duration: "6–18 Months",
    value: "KES 500K – KES 50M",
    scope: "Full Turnkey",
  },
  {
    id: 2,
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1527335988388-b40ee248d80c?w=600&h=400&fit=crop&auto=format",
    title: "Industrial & Infrastructure",
    tag: "Industrial",
    desc: "Warehouses, factories, bridges, and infrastructure projects delivered on schedule.",
    duration: "12–36 Months",
    value: "KES 1M – KES 100M",
    scope: "Design-Build",
  },
  {
    id: 3,
    icon: Hammer,
    image: "https://images.unsplash.com/photo-1644221150186-5d785a471f44?w=600&h=400&fit=crop&auto=format",
    title: "Residential Development",
    tag: "Residential",
    desc: "Custom homes, apartment blocks, and estate communities crafted with precision.",
    duration: "3–12 Months",
    value: "KES 100K – KES 5M",
    scope: "Custom Build",
  },
  {
    id: 4,
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=600&h=400&fit=crop&auto=format",
    title: "Renovation & Retrofit",
    tag: "Renovation",
    desc: "Structural upgrades, façade renovations, and full interior retrofits for existing buildings.",
    duration: "1–6 Months",
    value: "KES 50K – KES 2M",
    scope: "Partial / Full",
  },
  {
    id: 5,
    icon: Ruler,
    image: "https://images.unsplash.com/photo-1774600166818-e554a4d4c376?w=600&h=400&fit=crop&auto=format",
    title: "Architectural & Engineering",
    tag: "Design",
    desc: "In-house architects and structural engineers providing concept-to-blueprint services.",
    duration: "2–8 Months",
    value: "Custom Quote",
    scope: "Consultancy",
  },
  {
    id: 6,
    icon: Truck,
    image: "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?w=600&h=400&fit=crop&auto=format",
    title: "Civil & Earthworks",
    tag: "Civil",
    desc: "Site preparation, excavation, grading, drainage, and road construction services.",
    duration: "1–12 Months",
    value: "KES 200K – KES 20M",
    scope: "Subcontract / Prime",
  },
  {
    id: 7,
    icon: Layers,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    title: "Interior & Exterior Finishes",
    tag: "Finishes",
    desc: "Floor tiling, wall tiling, interior and exterior painting, and waterproofing.",
    duration: "2–8 Weeks",
    value: "Custom Quote",
    scope: "Full / Partial",
  },
  {
    id: 8,
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&auto=format",
    title: "Carpentry & Timber Works",
    tag: "Carpentry",
    desc: "Wooden door and window installation, timber framing, and custom woodwork.",
    duration: "1–4 Weeks",
    value: "Custom Quote",
    scope: "Supply & Install",
  },
  {
    id: 9,
    icon: Layers,
    image: "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=600&h=400&fit=crop&auto=format",
    title: "Masonry & Building Materials",
    tag: "Masonry",
    desc: "Concrete block production, clay bricks, stone dressing, and masonry works.",
    duration: "1–6 Months",
    value: "Custom Quote",
    scope: "Supply / Build",
  },
  {
    id: 10,
    icon: Ruler,
    image: "https://images.unsplash.com/photo-1582621404618-fc4b2e4dfc9d?w=600&h=400&fit=crop&auto=format",
    title: "Land Surveying",
    tag: "Surveying",
    desc: "Site surveying, topographical surveys, boundary surveys, and setting out.",
    duration: "1–5 Days",
    value: "Custom Quote",
    scope: "Consultancy",
  },
  {
    id: 11,
    icon: ClipboardList,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop&auto=format",
    title: "Construction Project Management",
    tag: "Management",
    desc: "Site supervision, material management, scheduling, and project coordination.",
    duration: "1–36 Months",
    value: "Custom Quote",
    scope: "Full Management",
  },
];

const DEFAULT_PROJECTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=700&h=500&fit=crop&auto=format",
    title: "Apex Tower — Commercial Hub",
    category: "Commercial",
    location: "Downtown Chicago, IL",
    year: "2024",
    value: "KES 42M",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=700&h=500&fit=crop&auto=format",
    title: "Meridian Business Park",
    category: "Industrial",
    location: "Houston, TX",
    year: "2023",
    value: "KES 18M",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1601074231509-dce351c05199?w=700&h=500&fit=crop&auto=format",
    title: "Northgate Residential Estate",
    category: "Residential",
    location: "Atlanta, GA",
    year: "2024",
    value: "KES 9.5M",
  },
];

const DEFAULT_TEAM = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1647580427155-0483906cb9de?w=300&h=380&fit=crop&auto=format",
    name: "Marcus Reed",
    title: "Chief Executive Officer",
    projects: 120,
    years: 22,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1774600166818-e554a4d4c376?w=300&h=380&fit=crop&auto=format",
    name: "Dr. Priya Nair",
    title: "Lead Structural Engineer",
    projects: 84,
    years: 16,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1716037991590-c975184b37df?w=300&h=380&fit=crop&auto=format",
    name: "Sofia Almeida",
    title: "Principal Architect",
    projects: 67,
    years: 14,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1625722776951-39123efa4dc3?w=300&h=380&fit=crop&auto=format",
    name: "Derek Osei",
    title: "Senior Project Manager",
    projects: 95,
    years: 18,
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Jonathan Bell",
    role: "CEO, BellTech Logistics",
    text: "BuildForce delivered our 80,000 sq ft warehouse three weeks ahead of schedule and under budget. Their site management and safety record were exceptional throughout the entire build.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Catherine Mwangi",
    role: "Director, Veritas Property Group",
    text: "We have partnered with BuildForce on four commercial developments. Their engineering team and on-site execution are consistently world-class. Trusted, reliable, and genuinely excellent.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b7ef95e4?w=80&h=80&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Robert Hargrove",
    role: "Municipal Engineer, City of Portland",
    text: "The Bridge Rd. infrastructure contract was complex and politically sensitive. BuildForce navigated every challenge professionally and delivered a project the community is proud of.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
  },
];


const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "Zero-incident culture. Every crew member goes home safe — it is non-negotiable on every site.",
  },
  {
    icon: Award,
    title: "Certified Quality",
    desc: "ISO 9001-certified processes and in-house QA teams ensure every structure meets or exceeds code.",
  },
  {
    icon: CalendarCheck,
    title: "On-Time Delivery",
    desc: "Rigorous scheduling, daily reporting, and proactive risk management keep every project on track.",
  },
  {
    icon: TrendingUp,
    title: "Cost Certainty",
    desc: "Transparent fixed-price contracts with real-time cost dashboards — no surprises at handover.",
  },
];

const STATS = [
  { value: "350+", label: "Projects Delivered" },
  { value: "KES 2.1B", label: "Construction Value" },
  { value: "0.12", label: "TRIR Safety Rate" },
  { value: "28+", label: "Years in Business" },
];

const SERVICE_TYPES = ["Commercial", "Industrial", "Residential", "Civil", "Renovation", "Design", "Finishes", "Carpentry", "Masonry", "Surveying", "Management"];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentPage = pathParts.length === 0 ? "home" : pathParts[0];
  const setCurrentPage = (page: string) => navigate(page === "home" ? "/" : `/${page}`);
  const [showAdmin, setShowAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [email, setEmail] = useState("");

  // Dynamic content states loaded from Supabase
  const [services, setServices] = useState<any[]>(DEFAULT_SERVICES);
  const [projects, setProjects] = useState<any[]>(DEFAULT_PROJECTS);
  const [team, setTeam] = useState<any[]>(DEFAULT_TEAM);
  const [testimonials, setTestimonials] = useState<any[]>(DEFAULT_TESTIMONIALS);
  const [faqs, setFaqs] = useState<any[]>([
    { question: "Do you offer free structural inspections?", answer: "Yes, we offer complimentary initial site reviews and feasibility reports for all prospective commercial and industrial projects." },
    { question: "What is your typical project timeline?", answer: "Timeline depends strictly on structural scope. Small residential builds take 3-12 months, whereas large commercial office towers range between 6-18 months." }
  ]);
  const [homepageSections, setHomepageSections] = useState<any>({
    hero: true,
    services: true,
    projects: true,
    about: true,
    team: true,
    testimonials: true,
    faqs: true,
    newsletter: true
  });
  const [companySettings, setCompanySettings] = useState<any>({
    companyName: "BUILDFORCE",
    openHours: "Mon – Fri: 7:00am – 5:00pm"
  });
  const [contactDetails, setContactDetails] = useState<any>({
    address: "48 Industrial Blvd, Suite 200, Chicago, IL 60601",
    phone: "+1 (312) 555-0192",
    email: "projects@buildforce.com",
    emergencyPhone: "+1 (312) 555-0911"
  });
  const [socials, setSocials] = useState<any>({
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#"
  });
  const [blogs, setBlogs] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    async function loadDynamicContent() {
      try {
        const [sRes, pRes, tRes, testRes, fRes, settingsRes, bRes, cRes] = await Promise.all([
          supabase.from("services").select("*"),
          supabase.from("projects").select("*"),
          supabase.from("team_members").select("*"),
          supabase.from("testimonials").select("*"),
          supabase.from("faqs").select("*").order("display_order"),
          supabase.from("website_settings").select("*"),
          supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
          supabase.from("careers").select("*").order("created_at", { ascending: false })
        ]);

        if (sRes.data && sRes.data.length > 0) {
          const iconMap: Record<string, any> = {
            "Building2": Building2,
            "HardHat": HardHat,
            "Hammer": Hammer,
            "Wrench": Wrench,
            "Ruler": Ruler,
            "Truck": Truck
          };
          const mappedServices = sRes.data.map(item => ({
            ...item,
            icon: iconMap[item.icon] || Building2
          }));
          setServices(mappedServices);
        }
        if (pRes.data && pRes.data.length > 0) setProjects(pRes.data);
        if (tRes.data && tRes.data.length > 0) setTeam(tRes.data);
        if (testRes.data && testRes.data.length > 0) setTestimonials(testRes.data);
        if (fRes.data && fRes.data.length > 0) setFaqs(fRes.data);
        if (bRes.data) setBlogs(bRes.data);
        if (cRes.data) setCareers(cRes.data.filter((c: any) => c.status === "published"));


        if (settingsRes.data) {
          settingsRes.data.forEach(item => {
            if (item.key === "homepage_sections") setHomepageSections(item.value);
            if (item.key === "company_settings") setCompanySettings(item.value);
            if (item.key === "contact_details") setContactDetails(item.value);
            if (item.key === "socials") setSocials(item.value);
          });
        }
      } catch (err) {
        console.error("Failed to load Supabase content, using defaults:", err);
      }
    }
    loadDynamicContent();
  }, []);


  const handleGetQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please provide an email address.");
      return;
    }
    try {
      const { error } = await supabase.from("quote_requests").insert([
        { service_type: projectType, budget: budget, email: email }
      ]);
      if (error) throw error;
      alert("Your quote request has been submitted successfully!");
      setProjectType("");
      setBudget("");
      setEmail("");
    } catch (err: any) {
      alert("Failed to submit request: " + err.message);
    }
  };

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    try {
      // Save newsletter signup to contact_messages
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: "Newsletter Subscriber",
          email: email,
          subject: "Newsletter Subscription",
          message: "User subscribed to newsletter updates."
        }
      ]);
      if (error) throw error;
      alert("Thank you for subscribing!");
      setEmail("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const homeSeoConfig = {
    ...HOME_SEO,
    structuredData: {
      ...HOME_SEO.structuredData,
      "@graph": [
        ...(HOME_SEO.structuredData?.["@graph"] || []),
        ...(getFAQSchema(faqs) ? [getFAQSchema(faqs)] : []),
        ...(getTestimonialsSchema(testimonials)?.["@graph"] || [])
      ]
    }
  };

  if (showAdmin) {
    return <AdminDashboard onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* ─── TOP BAR ─── */}
      <div className="bg-primary text-white text-sm py-2.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5 text-white/75">
              <MapPin size={13} className="text-accent" />
              {contactDetails.address}
            </span>
            <span className="flex items-center gap-1.5 text-white/75">
              <Clock size={13} className="text-accent" />
              {companySettings.openHours}
            </span>
          </div>
          <div className="flex gap-5 items-center">
            <span className="flex items-center gap-1.5 text-white/75">
              <Phone size={13} className="text-accent" />
              {contactDetails.phone}
            </span>
            <span className="flex items-center gap-1.5 text-white/75">
              <Mail size={13} className="text-accent" />
              {contactDetails.email}
            </span>
            <div className="flex gap-2 ml-2">
              {[
                { icon: Facebook, link: socials.facebook },
                { icon: Twitter, link: socials.twitter },
                { icon: Linkedin, link: socials.linkedin },
                { icon: Instagram, link: socials.instagram }
              ].map(({ icon: Icon, link }, i) => (
                <a key={i} href={link || "#"} className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-primary transition-colors">
                  <Icon size={11} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── NAVBAR ─── */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setCurrentPage("home")} className="flex items-center gap-2 no-underline cursor-pointer border-0 bg-transparent min-h-0 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary flex items-center justify-center rounded flex-shrink-0">
              <HardHat size={18} className="text-accent" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black text-primary block leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {companySettings.companyName.toUpperCase().startsWith("BUILD") ? (
                  <>
                    BUILD<span className="text-accent">{companySettings.companyName.toUpperCase().substring(5)}</span>
                  </>
                ) : (
                  companySettings.companyName
                )}
              </span>
              <span className="hidden sm:block text-xs text-muted-foreground tracking-widest uppercase">Construction & Engineering</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <Link
                  to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
                  className={`block px-4 py-2 text-sm font-semibold rounded transition-colors no-underline ${
                    currentPage === link.toLowerCase() ? "text-accent" : "text-primary hover:text-accent"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setShowAdmin(true)} className="text-sm font-semibold text-primary hover:text-accent transition-colors cursor-pointer border-0 bg-transparent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Client Portal
            </button>
            <Link to="/contact" className="bg-accent text-primary text-sm font-bold px-5 py-2.5 rounded hover:bg-yellow-400 transition-colors cursor-pointer flex items-center gap-2 no-underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <ClipboardList size={15} />
              Request a Quote
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-primary">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-6 py-4">
            <ul className="flex flex-col gap-1 list-none m-0 p-0 mb-4">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    to={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center w-full py-2.5 text-sm font-semibold no-underline min-h-0 justify-start ${
                      currentPage === link.toLowerCase() ? "text-accent" : "text-primary hover:text-accent"
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-4 flex flex-col gap-3">
              <button
                onClick={() => { setShowAdmin(true); setMenuOpen(false); }}
                className="w-full text-sm font-semibold text-primary hover:text-accent transition-colors cursor-pointer border border-border rounded py-2.5 px-4 bg-transparent text-left min-h-0 justify-start"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Client Portal
              </button>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-accent text-primary text-sm font-bold px-5 py-3 rounded hover:bg-yellow-400 transition-colors cursor-pointer flex items-center justify-center gap-2 no-underline min-h-0"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <ClipboardList size={15} />
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ─── PAGE ROUTER ─── */}
      <Routes>
        <Route path="/services" element={<ServicesPage services={services} />} />
        <Route path="/services/commercial-construction" element={<CommercialConstruction serviceData={services.find(s => s.slug === "commercial-construction")} />} />
        <Route path="/services/industrial-infrastructure" element={<IndustrialInfrastructure serviceData={services.find(s => s.slug === "industrial-infrastructure")} />} />
        <Route path="/services/residential-development" element={<ResidentialDevelopment serviceData={services.find(s => s.slug === "residential-development")} />} />
        <Route path="/services/renovation-retrofit" element={<RenovationRetrofit serviceData={services.find(s => s.slug === "renovation-retrofit")} />} />
        <Route path="/services/architectural-engineering" element={<ArchitecturalEngineering serviceData={services.find(s => s.slug === "architectural-engineering")} />} />
        <Route path="/services/civil-earthworks" element={<CivilEarthworks serviceData={services.find(s => s.slug === "civil-earthworks")} />} />
        <Route path="/services/interior-exterior-finishes" element={<InteriorExteriorFinishes serviceData={services.find(s => s.slug === "interior-exterior-finishes")} />} />
        <Route path="/services/carpentry-timber-works" element={<CarpentryTimberWorks serviceData={services.find(s => s.slug === "carpentry-timber-works")} />} />
        <Route path="/services/masonry-building-materials" element={<MasonryBuildingMaterials serviceData={services.find(s => s.slug === "masonry-building-materials")} />} />
        <Route path="/services/land-surveying" element={<LandSurveying serviceData={services.find(s => s.slug === "land-surveying")} />} />
        <Route path="/services/construction-project-management" element={<ConstructionProjectManagement serviceData={services.find(s => s.slug === "construction-project-management")} />} />
        <Route path="/projects" element={<ProjectsPage projects={projects} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage team={team} />} />
        <Route path="/careers" element={<CareersPage careers={careers} />} />
        <Route path="/blog" element={<BlogPage blogs={blogs} />} />
        <Route path="/contact" element={<ContactPage contactDetails={contactDetails} companySettings={companySettings} />} />
        <Route path="/" element={<>

      {/* ─── HOME PAGE CONTENT ─── */}
      <SEO {...homeSeoConfig} />

      {/* ─── HERO ─── */}
      <section
        className="relative flex flex-col bg-primary"
        style={{
          backgroundImage: `url(${companySettings.heroImageUrl || "https://images.unsplash.com/photo-1673978481178-b4d72cfd2fb9?w=1800&h=1000&fit=crop&auto=format"})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30 pointer-events-none" />
        {/* Yellow accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 md:pb-36 w-full min-h-[520px] sm:min-h-[600px] md:min-h-[680px] flex items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 sm:w-10 h-0.5 bg-accent" />
              <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Building Excellence Since 1996
              </p>
            </div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-5 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              We Build Your <span className="text-accent">Vision</span> Into Reality
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-lg">
              Commercial, industrial, and residential construction delivered with precision engineering, certified safety, and on-time guarantees.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link to="/contact" className="bg-accent hover:bg-yellow-400 text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded flex items-center justify-center gap-2 transition-colors no-underline min-h-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <ClipboardList size={18} /> Start Your Project
              </Link>
              <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <Play size={16} /> Watch Showreel
              </button>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-5 sm:gap-8">
              {STATS.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-accent text-xl sm:text-2xl font-black leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.value}</span>
                  <span className="text-white/60 text-xs mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick inquiry ribbon — static on mobile, absolute-bottom on md+ */}
        <form onSubmit={handleGetQuote} id="quote" className="relative z-20 md:absolute md:bottom-0 md:left-0 md:right-0 bg-primary/95 border-t-2 border-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-end">
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wide block mb-1.5">Service Type</label>
                <div className="relative">
                  <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full bg-white/10 border border-white/20 text-white px-3 py-2.5 rounded text-sm focus:outline-none focus:border-accent appearance-none pr-8">
                    <option value="" className="text-primary">Select Service</option>
                    {SERVICE_TYPES.map((s) => <option key={s} className="text-primary">{s}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wide block mb-1.5">Estimated Budget</label>
                <div className="relative">
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-white/10 border border-white/20 text-white px-3 py-2.5 rounded text-sm focus:outline-none focus:border-accent appearance-none pr-8">
                    <option value="" className="text-primary">Any Budget</option>
                    <option className="text-primary">Under KES 500K</option>
                    <option className="text-primary">KES 500K – KES 2M</option>
                    <option className="text-primary">KES 2M – KES 10M</option>
                    <option className="text-primary">KES 10M – KES 50M</option>
                    <option className="text-primary">Above KES 50M</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-white/60 uppercase tracking-wide block mb-1.5">Your Email</label>
                <input required type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-3 py-2.5 rounded text-sm focus:outline-none focus:border-accent" />
              </div>
              <button type="submit" className="bg-accent hover:bg-yellow-400 text-primary font-black py-2.5 px-6 rounded flex items-center justify-center gap-2 transition-colors text-sm cursor-pointer min-h-0 w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <ArrowRight size={16} /> Get Free Quote
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* ─── SERVICES ─── */}
      {homepageSections.services && (
        <section className="py-14 sm:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-0.5 bg-accent" />
                  <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>What We Do</p>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Our Construction Services
                </h2>
              </div>
              <Link to="/services" className="flex items-center gap-2 text-accent font-bold text-sm hover:gap-3 transition-all no-underline min-h-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                All Services <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((s) => {
                const slug = s.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                return (
                <Link key={s.id} to={`/services/${slug}`} className="bg-card rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow group block no-underline text-foreground">
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 sm:h-52 bg-muted">
                    <img loading="lazy" src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors" />
                    <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-black px-3 py-1 rounded uppercase tracking-wide">
                      {s.tag}
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/70 to-transparent" />
                  </div>
                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-accent/15 rounded flex items-center justify-center flex-shrink-0">
                        <s.icon size={16} className="text-accent" />
                      </div>
                      <h3 className="font-black text-primary text-sm sm:text-base group-hover:text-accent transition-colors leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                    <div className="border-t border-border pt-3 sm:pt-4 grid grid-cols-3 gap-1 sm:gap-2 text-xs mb-3">
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
                    <div className="flex items-center text-accent text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              )})}
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-14 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-6 h-0.5 bg-accent" />
              <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Commitments</p>
              <span className="w-6 h-0.5 bg-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Built on Four Non-Negotiables
            </h2>
            <p className="text-white/55 mt-3 max-w-xl mx-auto text-sm">Every project we take on is underpinned by these core standards &mdash; no exceptions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {CORE_VALUES.map((v, i) => (
              <div key={i} className="p-5 sm:p-7 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/8 transition-all group text-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-accent/15 group-hover:bg-accent flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-colors">
                  <v.icon size={26} className="text-accent group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-white font-black text-base mb-2 sm:mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>{v.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SPLIT ─── */}
      <section className="py-14 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Image grid */}
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            <img loading="lazy" src="https://images.unsplash.com/photo-1655975719898-8f3432eed322?w=400&h=500&fit=crop&auto=format" alt="Construction crane and steelwork" className="rounded-xl object-cover w-full h-48 sm:h-64" />
            <img loading="lazy" src="https://images.unsplash.com/photo-1575282366139-d605e098a825?w=400&h=500&fit=crop&auto=format" alt="Engineer reviewing plans on site" className="rounded-xl object-cover w-full h-48 sm:h-64 sm:mt-10" />
            {/* Badge — sits below on mobile to avoid overflow */}
            <div className="col-span-2 sm:col-auto sm:absolute sm:-bottom-4 sm:left-1/2 sm:-translate-x-1/2 bg-accent text-primary rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-center shadow-xl mt-2 sm:mt-0">
              <span className="text-2xl sm:text-3xl font-black block" style={{ fontFamily: "'Montserrat', sans-serif" }}>28+</span>
              <span className="text-xs font-bold uppercase tracking-wide whitespace-nowrap">Years of Excellence</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-accent" />
              <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>About BuildForce</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-5 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Engineering the Structures <span className="text-accent">That Last a Century</span>
            </h2>
            <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
              Founded in 1996, BuildForce Construction & Engineering has grown from a regional contractor into one of the Midwest's most respected full-service builders. We operate across commercial, industrial, civil, and residential sectors with a combined delivered value exceeding KES 2.1 billion.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
              Our vertically integrated model — in-house architecture, structural engineering, procurement, and site management — gives clients a single point of accountability from groundbreaking to handover.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                "ISO 9001:2015 Certified",
                "OSHA 30-Hour Compliant Crews",
                "In-House Structural Engineering",
                "BIM / 3D Modelling Capability",
                "Fixed-Price Contract Guarantee",
                "Dedicated Safety Officer Per Site",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/about" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold px-8 py-3.5 rounded transition-colors no-underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Company Profile <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      {homepageSections.projects && (
        <section className="py-14 sm:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-0.5 bg-accent" />
                  <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Work</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>Featured Projects</h2>
              </div>
              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2">
                {["All", "Commercial", "Industrial", "Residential"].map((f) => (
                  <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded text-xs font-bold transition-colors ${activeFilter === f ? "bg-accent text-primary" : "bg-muted text-muted-foreground hover:bg-accent/20 hover:text-primary"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.filter(p => activeFilter === "All" || p.category === activeFilter).slice(0, 3).map((p) => (
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

            <div className="text-center mt-12">
              <Link to="/projects" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold px-8 py-3.5 rounded transition-colors no-underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ─── */}
      {/* NOTE: backgroundAttachment:fixed removed — broken on iOS Safari */}
      <section
        className="py-16 sm:py-24 relative bg-primary"
        style={{
          backgroundImage: `url(${companySettings.ctaImageUrl || "https://images.unsplash.com/photo-1558524845-736893ef7dd6?w=1800&h=700&fit=crop&auto=format"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-0.5 bg-accent" />
            <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Ready to Build?</p>
            <span className="w-6 h-0.5 bg-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-5 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Your Next Project Starts <span className="text-accent">Here</span>
          </h2>
          <p className="text-white/70 mb-8 sm:mb-10 text-base sm:text-lg">
            From concept to completion — our team is ready to evaluate your project and provide a detailed, obligation-free proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/contact" className="bg-accent hover:bg-yellow-400 text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded transition-colors flex items-center justify-center gap-2 no-underline min-h-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <ClipboardList size={18} /> Request Free Proposal
            </Link>
            <a href="tel:+13125550192" className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded border border-white/30 transition-colors flex items-center justify-center gap-2 no-underline min-h-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <Phone size={18} /> Call +1 (312) 555-0192
            </a>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      {homepageSections.team && (
        <section className="py-14 sm:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="w-6 h-0.5 bg-accent" />
                <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>The Experts Behind the Work</p>
                <span className="w-6 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>Meet Our Leadership Team</h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
                Decades of combined experience in construction management, structural engineering, and architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((m) => (
                <div key={m.id} className="bg-card rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow group text-center">
                  <div className="relative overflow-hidden h-72 bg-muted">
                    <img loading="lazy" src={m.image} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      {[Linkedin, Twitter, Mail].map((Icon, i) => (
                        <a key={i} href="#" className="w-9 h-9 bg-white/15 hover:bg-accent rounded-full flex items-center justify-center text-white hover:text-primary transition-colors">
                          <Icon size={14} />
                        </a>
                      ))}
                    </div>
                    {/* Hard hat icon badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow">
                      <HardHat size={14} className="text-primary" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-primary text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>{m.name}</h3>
                    <p className="text-accent text-sm font-semibold mb-3">{m.title}</p>
                    <div className="flex justify-center gap-6 text-xs border-t border-border pt-3">
                      <div>
                        <span className="font-black text-primary text-sm">{m.projects || m.projects_completed}</span>
                        <span className="text-muted-foreground ml-1">Projects</span>
                      </div>
                      <div>
                        <span className="font-black text-primary text-sm">{m.years || m.years_experience}</span>
                        <span className="text-muted-foreground ml-1">Yrs Exp.</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TESTIMONIALS ─── */}
      {homepageSections.testimonials && (
        <section className="py-14 sm:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="w-6 h-0.5 bg-accent" />
                <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Client Testimonials</p>
                <span className="w-6 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>What Our Clients Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-background p-8 rounded-xl border border-border hover:border-accent/40 hover:shadow-lg transition-all relative">
                  <div className="text-accent/20 text-7xl font-black leading-none absolute top-4 right-6 select-none">"</div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img loading="lazy" src={t.avatar || t.avatar_url} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-black text-primary text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t.name}</p>
                      <p className="text-xs text-accent font-semibold">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQS SECTION ─── */}
      {homepageSections.faqs && (
        <section className="py-14 sm:py-20 bg-background border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="w-6 h-0.5 bg-accent" />
                <p className="text-accent text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Got Questions?</p>
                <span className="w-6 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.id || index} className="bg-card p-5 rounded-lg border border-border shadow-sm">
                  <h3 className="font-bold text-base text-primary mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── NEWSLETTER / UPDATES ─── */}
      {homepageSections.newsletter && (
        <section className="py-12 sm:py-16 bg-accent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap size={18} className="text-primary" />
              <h2 className="text-2xl md:text-3xl font-black text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Stay Ahead of the Build
              </h2>
            </div>
            <p className="text-primary/70 mb-8 font-medium">
              Industry news, project spotlights, and construction insights delivered to your inbox. No spam — ever.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={handleNewsletterSubscribe}>
              <input
                type="email"
                placeholder="your@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded text-sm focus:outline-none text-foreground bg-white border border-yellow-300"
              />
              <button type="submit" className="bg-primary hover:bg-primary/80 text-white font-bold px-7 py-3.5 rounded transition-colors whitespace-nowrap text-sm cursor-pointer" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Subscribe
              </button>
            </form>
          </div>
        </section>
      )}
      </>} />
      </Routes>

      {/* ─── FOOTER ─── */}
      <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 bg-accent flex items-center justify-center rounded">
                  <HardHat size={20} className="text-primary" />
                </div>
                <span className="text-xl font-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {companySettings.companyName.toUpperCase().startsWith("BUILD") ? (
                    <>
                      BUILD<span className="text-accent">{companySettings.companyName.toUpperCase().substring(5)}</span>
                    </>
                  ) : (
                    companySettings.companyName
                  )}
                </span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                Full-service construction and engineering firm serving commercial, industrial, and residential clients since 1996.
              </p>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, link: socials.facebook },
                  { icon: Twitter, link: socials.twitter },
                  { icon: Linkedin, link: socials.linkedin },
                  { icon: Instagram, link: socials.instagram }
                ].map(({ icon: Icon, link }, i) => (
                  <a key={i} href={link || "#"} className="w-9 h-9 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors hover:text-primary">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-white mb-5 text-xs uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>Quick Links</h4>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {[
                  { label: "About Us", page: "/about" },
                  { label: "Our Services", page: "/services" },
                  { label: "Project Portfolio", page: "/projects" },
                  { label: "Meet the Team", page: "/team" },
                  { label: "News & Insights", page: "/blog" },
                  { label: "Contact Us", page: "/contact" },
                ].map(({ label, page }) => (
                  <li key={label}>
                    <Link to={page} className="text-white/55 hover:text-accent text-sm transition-colors flex items-center gap-2 no-underline">
                      <ArrowRight size={12} />{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black text-white mb-5 text-xs uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>Our Services</h4>
              <ul className="space-y-2.5 list-none p-0 m-0">
                {[
                  { label: "Commercial Construction", slug: "commercial-construction" },
                  { label: "Industrial & Infrastructure", slug: "industrial-infrastructure" },
                  { label: "Residential Development", slug: "residential-development" },
                  { label: "Civil & Earthworks", slug: "civil-earthworks" },
                  { label: "Renovation & Retrofit", slug: "renovation-retrofit" },
                  { label: "Architectural & Engineering", slug: "architectural-engineering" },
                  { label: "Interior & Exterior Finishes", slug: "interior-exterior-finishes" },
                  { label: "Carpentry & Timber Works", slug: "carpentry-timber-works" },
                  { label: "Masonry & Building Materials", slug: "masonry-building-materials" },
                  { label: "Land Surveying", slug: "land-surveying" },
                  { label: "Construction Project Management", slug: "construction-project-management" }
                ].map(({ label, slug }) => (
                  <li key={slug}>
                    <Link to={`/services/${slug}`} className="text-white/55 hover:text-accent text-sm transition-colors flex items-center gap-2 no-underline">
                      <ArrowRight size={12} />{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-black text-white mb-5 text-xs uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-white/55 text-sm">
                  <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  {contactDetails.address}
                </div>
                <div className="flex items-center gap-3 text-white/55 text-sm">
                  <Phone size={16} className="text-accent flex-shrink-0" />
                  {contactDetails.phone}
                </div>
                <div className="flex items-center gap-3 text-white/55 text-sm">
                  <Mail size={16} className="text-accent flex-shrink-0" />
                  {contactDetails.email}
                </div>
                <div className="flex items-center gap-3 text-white/55 text-sm">
                  <Clock size={16} className="text-accent flex-shrink-0" />
                  {companySettings.openHours}
                </div>
                <div className="flex items-center gap-3 text-white/55 text-sm">
                  <Users size={16} className="text-accent flex-shrink-0" />
                  Emergency: {contactDetails.emergencyPhone}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} BuildForce Construction & Engineering LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-5">
              {["Terms", "Privacy Policy", "Safety Policy", "Sitemap"].map((item) => (
                <a key={item} href="#" className="text-white/40 hover:text-accent text-xs transition-colors no-underline min-h-0 min-w-0">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
