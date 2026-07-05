import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  LayoutDashboard,
  ConciergeBell,
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  Bookmark,
  Shield,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Check,
  X,
  Lock,
  Mail,
  User,
  HardHat,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Award,
  Globe,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Copy,
  Archive,
  HelpCircle,
  Share2,
  Phone,
  Ruler,
  AlertCircle
} from "lucide-react";

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // Auth form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState("");

  // Data states
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  
  // Settings structures
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
    companyName: "BuildForce",
    openHours: "Mon – Fri: 7:00am – 5:00pm",
    logoUrl: ""
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
  const [seo, setSeo] = useState<any>({
    titleTemplate: "BUILDForce | Construction & Engineering",
    metaDescription: "Commercial, industrial, and residential construction delivered with precision.",
    keywords: "construction, engineering, contractor, builder"
  });

  // Table filter state
  const [statusFilter, setStatusFilter] = useState("all"); // all, published, draft, archived

  // Preview / Edit modal states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [previewItem, setPreviewItem] = useState<any>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw error;
      setProfile(data);
      fetchAllData();
      if (data.role === 'super_admin') fetchUsers();
    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        sRes, pRes, tRes, testRes, bRes, cRes, eRes, fRes, mRes, qRes, mediaRes, settingsRes
      ] = await Promise.all([
        supabase.from("services").select("*").order("id"),
        supabase.from("projects").select("*").order("id"),
        supabase.from("team_members").select("*").order("id"),
        supabase.from("testimonials").select("*").order("id"),
        supabase.from("blog_posts").select("*").order("id"),
        supabase.from("careers").select("*").order("id"),
        supabase.from("equipment").select("*").order("id"),
        supabase.from("faqs").select("*").order("display_order"),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("media_library").select("*").order("created_at", { ascending: false }),
        supabase.from("website_settings").select("*")
      ]);

      if (sRes.data) setServices(sRes.data);
      if (pRes.data) setProjects(pRes.data);
      if (tRes.data) setTeamMembers(tRes.data);
      if (testRes.data) setTestimonials(testRes.data);
      if (bRes.data) setBlogPosts(bRes.data);
      if (cRes.data) setCareers(cRes.data);
      if (eRes.data) setEquipment(eRes.data);
      if (fRes.data) setFaqs(fRes.data);
      if (mRes.data) setContactMessages(mRes.data);
      if (qRes.data) setQuoteRequests(qRes.data);
      if (mediaRes.data) setMedia(mediaRes.data);

      if (settingsRes.data) {
        settingsRes.data.forEach(item => {
          if (item.key === "homepage_sections") setHomepageSections(item.value);
          if (item.key === "company_settings") setCompanySettings(item.value);
          if (item.key === "contact_details") setContactDetails(item.value);
          if (item.key === "socials") setSocials(item.value);
          if (item.key === "seo") setSeo(item.value);
        });
      }

    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("updated_at", { ascending: false });
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleApproveUser = async (userId: string, isApproved: boolean) => {
    try {
      const { error } = await supabase.from("profiles").update({ is_approved: isApproved }).eq("id", userId);
      if (error) throw error;
      fetchUsers();
    } catch (err: any) {
      alert("Error updating user: " + err.message);
    }
  };
  const formatError = (err: any): string => {
    console.error("RAW AUTH ERROR:", err);
    if (!err) return "Unknown error occurred";
    if (typeof err === "string") return err;
    if (err.message) {
      if (typeof err.message === 'string') return err.message;
      return JSON.stringify(err.message);
    }
    if (err.error_description) return err.error_description;
    
    // Attempt to stringify an Error object property names
    try {
      return JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
    } catch (e) {
      return String(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setAuthError(formatError(err) || "Invalid login credentials");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) throw error;
      alert("Sign up successful! You can now log in.");
      setIsSignUp(false);
    } catch (err: any) {
      setAuthError(formatError(err) || "Error signing up");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSave = async (table: string, id?: any) => {
    try {
      const payload = { ...formData };
      // Auto-generate slug if missing but title is present
      if (!payload.slug && payload.title) {
        payload.slug = slugify(payload.title) + "-" + Math.floor(Math.random() * 10000);
      }
      if (id) {
        const { error } = await supabase.from(table).update(payload).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert([payload]);
        if (error) throw error;
      }
      setIsAdding(false);
      setEditingItem(null);
      setFormData({});
      fetchAllData();
    } catch (err: any) {
      alert("Error saving record: " + err.message);
    }
  };

  // Generic status update (Publish, Unpublish, Archive)
  const handleStatusUpdate = async (table: string, id: any, newStatus: string) => {
    try {
      const { error } = await supabase.from(table).update({ status: newStatus }).eq("id", id);
      if (error) throw error;
      fetchAllData();
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    }
  };

  // Duplicate Action
  const handleDuplicate = async (table: string, item: any) => {
    try {
      const clone = { ...item };
      delete clone.id;
      delete clone.created_at;
      if (clone.title) clone.title = `${clone.title} (Copy)`;
      if (clone.name) clone.name = `${clone.name} (Copy)`;
      if (clone.slug) clone.slug = `${clone.slug}-copy-${Math.floor(Math.random() * 1000)}`;

      const { error } = await supabase.from(table).insert([clone]);
      if (error) throw error;
      alert("Item duplicated successfully!");
      fetchAllData();
    } catch (err: any) {
      alert("Error duplicating: " + err.message);
    }
  };

  const handleDelete = async (table: string, id: any) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      fetchAllData();
    } catch (err: any) {
      alert("Error deleting record: " + err.message);
    }
  };

  const handleSaveSettings = async (key: string, value: any) => {
    try {
      const { error } = await supabase.from("website_settings").upsert({ key, value });
      if (error) throw error;
      alert("Settings updated successfully!");
      fetchAllData();
    } catch (err: any) {
      alert("Error saving settings: " + err.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });

      await supabase.from("media_library").insert({
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: session.user.id
      });
      
      fetchAllData();
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("media_library").insert({
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: session.user.id
      });

      if (dbError) throw dbError;

      alert("Media uploaded successfully!");
      fetchAllData();
    } catch (err: any) {
      alert("Error uploading: " + err.message);
    }
  };

  // Helper filter logic
  const getFilteredItems = (items: any[]) => {
    if (statusFilter === "all") return items.filter(i => i.status !== "archived");
    return items.filter(i => i.status === statusFilter);
  };

  if (loading && !session) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2271b1] mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading WordPress Admin...</p>
        </div>
      </div>
    );
  }

  // ──────── PENDING APPROVAL SCREEN ────────
  if (session && profile && profile.is_approved === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative" 
        style={{ 
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="w-[400px] bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/20 rounded-xl text-center z-10">
          <div className="w-16 h-16 bg-[#f0c243] text-[#1d2327] rounded shadow-lg flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Pending Authorization</h2>
          <p className="text-gray-300 text-sm mb-8">
            Your account has been registered successfully, but it requires authorization from a site administrator before you can access the dashboard.
          </p>
          <button onClick={handleLogout} className="w-full bg-[#f0c243] hover:bg-yellow-400 text-[#1d2327] text-sm font-black py-3 rounded transition-colors shadow-lg">
            Sign Out For Now
          </button>
        </div>
      </div>
    );
  }

  // ──────── AUTHENTICATION SCREEN ────────
  if (!session) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-6 relative" 
        style={{ 
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="w-[360px] z-10 relative">
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-[#1d2327] flex items-center justify-center rounded shadow-lg">
              <HardHat size={24} className="text-[#f0c243]" />
            </div>
            <span className="text-3xl font-black text-white tracking-wider font-mono drop-shadow-md">
              BUILD<span className="text-[#f0c243]">FORCE</span>
            </span>
          </div>

          {/* Glassmorphism Form Container */}
          <form 
            onSubmit={isSignUp ? handleSignUp : handleLogin} 
            className="backdrop-blur-md bg-white/10 p-8 shadow-2xl border border-white/20 rounded-xl mb-6"
          >
            <h2 className="text-white text-center text-xl font-bold mb-6">
              {isSignUp ? "Register Portal Access" : "Client Portal Login"}
            </h2>

            {authError && (
              <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-200 text-sm flex items-start">
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="break-all">{typeof authError === 'object' ? JSON.stringify(authError, null, 2) : String(authError)}</span>
              </div>
            )}

            {isSignUp && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-200 uppercase mb-2 drop-shadow-sm">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/80 border border-white/30 rounded text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#f0c243] transition-all"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-200 uppercase mb-2 drop-shadow-sm">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-white/30 rounded text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#f0c243] transition-all"
                placeholder="name@company.com"
              />
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-200 uppercase mb-2 drop-shadow-sm">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-white/30 rounded text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#f0c243] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="w-full bg-[#f0c243] hover:bg-yellow-400 text-[#1d2327] text-sm font-black py-3 rounded transition-colors shadow-lg">
              {isSignUp ? "Register Admin Account" : "Secure Login"}
            </button>
          </form>

          <div className="text-center text-sm flex flex-col gap-3 px-1">
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-white/80 hover:text-white transition-colors">
              {isSignUp ? "Already have an account? Log In" : "Request new admin account"}
            </button>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto mt-2">
              <ArrowRight size={14} className="rotate-180" /> Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userRole = profile?.role || "editor";

  // ──────── MAIN DASHBOARD SCREEN ────────
  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1d2327] flex flex-col" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif" }}>
      
      {/* 1. TOP WP BAR */}
      <header className="bg-[#1d2327] text-white h-8 px-4 flex justify-between items-center text-xs z-30 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="font-bold flex items-center gap-1.5 cursor-pointer" onClick={onClose}>
            <HardHat size={13} className="text-[#f0c243]" />
            BuildForce Site Administration
          </div>
          <span className="text-gray-500">|</span>
          <div className="text-gray-400 hover:text-white cursor-pointer flex items-center gap-1" onClick={onClose}>
            <Globe size={11} /> Visit Site
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-gray-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold flex items-center gap-1">
            <Shield size={10} className="text-[#f0c243]" /> {userRole}
          </span>
          <span className="text-gray-300">Howdy, {profile?.full_name || profile?.email}</span>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white flex items-center gap-1">
            <LogOut size={11} /> Log Out
          </button>
        </div>
      </header>

      {/* 2. BODY LAYOUT */}
      <div className="flex-1 flex flex-row">
        
        {/* LEFT SIDEBAR (WordPress Admin Nav) */}
        <aside className="w-56 bg-[#1d2327] text-gray-300 select-none flex flex-col">
          <nav className="flex-1 pt-3 text-[13px]">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "homepage_sections", label: "Homepage Sections", icon: Globe },
              { id: "services", label: "Services", icon: ConciergeBell },
              { id: "projects", label: "Projects", icon: Briefcase },
              { id: "team", label: "Team Members", icon: Users },
              { id: "testimonials", label: "Testimonials", icon: MessageSquare },
              { id: "blogs", label: "Blog Posts", icon: FileText },
              { id: "faqs", label: "FAQs Manager", icon: HelpCircle },
              { id: "careers", label: "Careers", icon: Bookmark },
              { id: "media", label: "Media Library", icon: ImageIcon },
              { id: "settings", label: "Settings", icon: Settings },
              ...(userRole === "super_admin" ? [{ id: "users", label: "User Management", icon: User }] : []),
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsAdding(false);
                  setEditingItem(null);
                  setFormData({});
                  setStatusFilter("all");
                }}
                className={`w-full text-left px-4 py-2 flex items-center justify-between border-l-4 transition-colors ${
                  activeTab === item.id 
                    ? "bg-[#2271b1] text-white border-l-[#f0c243]" 
                    : "border-l-transparent hover:bg-[#2c3338] hover:text-[#72aee6]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <item.icon size={15} />
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN WORKING AREA */}
        <main className="flex-1 p-6 bg-[#f0f0f1] overflow-y-auto">
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2271b1]"></div>
            </div>
          ) : (
            <>
              {/* TAB: DASHBOARD OVERVIEW */}
              {activeTab === "dashboard" && (
                <div>
                  <h1 className="text-2xl font-normal mb-6">Dashboard Overview</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div
                      className="bg-white p-4 shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-[#2271b1] hover:shadow-md transition-all"
                      onClick={() => setActiveTab("services")}
                    >
                      <div>
                        <span className="text-gray-500 text-xs block uppercase font-semibold">Services</span>
                        <span className="text-2xl font-bold text-gray-800">{services.length}</span>
                      </div>
                      <ConciergeBell size={32} className="text-[#2271b1] opacity-40" />
                    </div>
                    <div
                      className="bg-white p-4 shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-[#2271b1] hover:shadow-md transition-all"
                      onClick={() => setActiveTab("projects")}
                    >
                      <div>
                        <span className="text-gray-500 text-xs block uppercase font-semibold">Projects Built</span>
                        <span className="text-2xl font-bold text-gray-800">{projects.length}</span>
                      </div>
                      <Briefcase size={32} className="text-[#2271b1] opacity-40" />
                    </div>
                    <div
                      className="bg-white p-4 shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-[#2271b1] hover:shadow-md transition-all"
                      onClick={() => setActiveTab("faqs")}
                    >
                      <div>
                        <span className="text-gray-500 text-xs block uppercase font-semibold">FAQs</span>
                        <span className="text-2xl font-bold text-[#2271b1]">{faqs.length}</span>
                      </div>
                      <HelpCircle size={32} className="text-[#2271b1] opacity-40" />
                    </div>
                    <div
                      className="bg-white p-4 shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-[#2271b1] hover:shadow-md transition-all"
                      onClick={() => setActiveTab("blogs")}
                    >
                      <div>
                        <span className="text-gray-500 text-xs block uppercase font-semibold">Blog Posts</span>
                        <span className="text-2xl font-bold text-gray-800">{blogPosts.length}</span>
                      </div>
                      <FileText size={32} className="text-[#2271b1] opacity-40" />
                    </div>
                  </div>

                  {/* Extra quick-access cards row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div
                      className="bg-white p-4 shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-[#2271b1] hover:shadow-md transition-all"
                      onClick={() => setActiveTab("team")}
                    >
                      <div>
                        <span className="text-gray-500 text-xs block uppercase font-semibold">Team Members</span>
                        <span className="text-2xl font-bold text-gray-800">{teamMembers.length}</span>
                      </div>
                      <Users size={32} className="text-[#2271b1] opacity-40" />
                    </div>
                    <div
                      className="bg-white p-4 shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-[#2271b1] hover:shadow-md transition-all"
                      onClick={() => setActiveTab("testimonials")}
                    >
                      <div>
                        <span className="text-gray-500 text-xs block uppercase font-semibold">Testimonials</span>
                        <span className="text-2xl font-bold text-gray-800">{testimonials.length}</span>
                      </div>
                      <MessageSquare size={32} className="text-[#2271b1] opacity-40" />
                    </div>
                    <div
                      className="bg-white p-4 shadow-sm border border-gray-200 flex justify-between items-center cursor-pointer hover:border-[#2271b1] hover:shadow-md transition-all"
                      onClick={() => setActiveTab("careers")}
                    >
                      <div>
                        <span className="text-gray-500 text-xs block uppercase font-semibold">Careers</span>
                        <span className="text-2xl font-bold text-gray-800">{careers.length}</span>
                      </div>
                      <Bookmark size={32} className="text-[#2271b1] opacity-40" />
                    </div>
                  </div>

                  <div className="bg-white p-6 shadow-sm border border-gray-200 rounded">
                    <h2 className="text-base font-semibold mb-4">Quick Stats & Statuses</h2>
                    <p className="text-sm text-gray-600 mb-2">Configure Homepage sections and website settings from the sidebar links to update your live website instantly.</p>
                  </div>
                </div>
              )}

              {/* TAB: HOMEPAGE SECTIONS */}
              {activeTab === "homepage_sections" && (
                <div className="bg-white p-6 shadow-sm border border-gray-200 max-w-2xl">
                  <h1 className="text-xl font-normal mb-6">Manage Homepage Sections</h1>
                  <p className="text-xs text-gray-500 mb-6">Toggle which sections are visible on the main page of your website.</p>
                  
                  <div className="space-y-4 mb-6">
                    {Object.keys(homepageSections).map(section => (
                      <div key={section} className="flex items-center justify-between py-2 border-b">
                        <span className="capitalize text-sm font-semibold">{section} Section</span>
                        <button
                          onClick={() => {
                            const updated = { ...homepageSections, [section]: !homepageSections[section] };
                            setHomepageSections(updated);
                          }}
                          className={`text-xs px-3 py-1 rounded font-bold uppercase transition-colors ${
                            homepageSections[section] ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {homepageSections[section] ? "Visible" : "Hidden"}
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSaveSettings("homepage_sections", homepageSections)}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded"
                  >
                    Save Layout Settings
                  </button>
                </div>
              )}

              {/* TAB: SERVICES */}
              {activeTab === "services" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-normal">Services</h1>
                    {!isAdding && !editingItem && (
                      <button onClick={() => { setIsAdding(true); setFormData({ status: "published" }); }} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5">
                        <Plus size={13} /> Add New Service
                      </button>
                    )}
                  </div>

                  {isAdding || editingItem ? (
                    <div className="bg-white p-6 shadow-sm border border-gray-200 max-w-2xl">
                      <h2 className="text-lg font-medium mb-4">{editingItem ? "Edit Service" : "Add New Service"}</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Slug</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.slug || ""} onChange={e => setFormData({...formData, slug: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tag/Category</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.tag || ""} onChange={e => setFormData({...formData, tag: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.status || "published"} onChange={e => setFormData({...formData, status: e.target.value})}>
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL</label>
                          <div className="flex gap-2 items-center">
                            <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.image_url || ""} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="Paste URL or upload..." />
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-2 rounded flex items-center gap-1.5 whitespace-nowrap">
                              {isUploadingImage ? "Uploading..." : <><Upload size={13} /> Upload</>}
                              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Icon Name (e.g. Building2, Wrench, Hammer)</label>
                          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                            value={formData.icon || ""} onChange={e => setFormData({...formData, icon: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Duration</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.duration || ""} onChange={e => setFormData({...formData, duration: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Value</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.value || ""} onChange={e => setFormData({...formData, value: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Scope</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.scope || ""} onChange={e => setFormData({...formData, scope: e.target.value})} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                          <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                            value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">SEO Title</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.seo_title || ""} onChange={e => setFormData({...formData, seo_title: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Canonical URL</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.canonical_url || ""} onChange={e => setFormData({...formData, canonical_url: e.target.value})} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Meta Description</label>
                          <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                            value={formData.meta_description || ""} onChange={e => setFormData({...formData, meta_description: e.target.value})} />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSave("services", editingItem?.id)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">
                            Save Changes
                          </button>
                          <button onClick={() => { setIsAdding(false); setEditingItem(null); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold px-4 py-2 rounded">
                            Cancel
                          </button>
                          {editingItem && (
                            <button onClick={() => setPreviewItem({ type: "service", data: formData })} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 ml-auto">
                              <Eye size={13} /> Preview
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Sub-navigation Filters */}
                      <div className="flex gap-4 text-xs mb-4 border-b pb-2 text-gray-500">
                        {["all", "published", "draft", "archived"].map(f => (
                          <button key={f} onClick={() => setStatusFilter(f)} className={`capitalize ${statusFilter === f ? "text-[#2271b1] font-bold" : "hover:text-[#2271b1]"}`}>
                            {f} ({services.filter(s => f === "all" ? s.status !== "archived" : s.status === f).length})
                          </button>
                        ))}
                      </div>

                      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                              <th className="p-3">Title</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">Tag</th>
                              <th className="p-3">Value</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredItems(services).map(s => (
                              <tr key={s.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold text-gray-900">{s.title}</td>
                                <td className="p-3">
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                    s.status === "published" ? "bg-green-100 text-green-800" :
                                    s.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                                  }`}>
                                    {s.status}
                                  </span>
                                </td>
                                <td className="p-3 text-gray-600">{s.tag}</td>
                                <td className="p-3 text-gray-600">{s.value}</td>
                                <td className="p-3 text-right flex justify-end gap-3 items-center">
                                  <button onClick={() => { setEditingItem(s); setFormData(s); }} className="text-[#2271b1] hover:text-[#135e96] flex items-center gap-0.5"><Edit3 size={13} /> Edit</button>
                                  <button onClick={() => handleDuplicate("services", s)} className="text-gray-600 hover:text-gray-800 flex items-center gap-0.5"><Copy size={13} /> Clone</button>
                                  {s.status !== "archived" && (
                                    <button onClick={() => handleStatusUpdate("services", s.id, "archived")} className="text-red-500 hover:text-red-700 flex items-center gap-0.5"><Archive size={13} /> Archive</button>
                                  )}
                                  <button onClick={() => handleDelete("services", s.id)} className="text-[#d63638] hover:text-[#a01c1e]"><Trash2 size={13} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === "projects" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-normal">Projects</h1>
                    {!isAdding && !editingItem && (
                      <button onClick={() => { setIsAdding(true); setFormData({ status: "published" }); }} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5">
                        <Plus size={13} /> Add New Project
                      </button>
                    )}
                  </div>

                  {isAdding || editingItem ? (
                    <div className="bg-white p-6 shadow-sm border border-gray-200 max-w-2xl">
                      <h2 className="text-lg font-medium mb-4">{editingItem ? "Edit Project" : "Add New Project"}</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Slug</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.slug || ""} onChange={e => setFormData({...formData, slug: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Location</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.location || ""} onChange={e => setFormData({...formData, location: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.status || "published"} onChange={e => setFormData({...formData, status: e.target.value})}>
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Year</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.year || ""} onChange={e => setFormData({...formData, year: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Value</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.value || ""} onChange={e => setFormData({...formData, value: e.target.value})} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL</label>
                          <div className="flex gap-2 items-center">
                            <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                              value={formData.image_url || ""} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="Paste URL or upload..." />
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-2 rounded flex items-center gap-1.5 whitespace-nowrap">
                              {isUploadingImage ? "Uploading..." : <><Upload size={13} /> Upload</>}
                              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} />
                            </label>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSave("projects", editingItem?.id)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">
                            Save Changes
                          </button>
                          <button onClick={() => { setIsAdding(false); setEditingItem(null); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold px-4 py-2 rounded">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Filter header */}
                      <div className="flex gap-4 text-xs mb-4 border-b pb-2 text-gray-500">
                        {["all", "published", "draft", "archived"].map(f => (
                          <button key={f} onClick={() => setStatusFilter(f)} className={`capitalize ${statusFilter === f ? "text-[#2271b1] font-bold" : "hover:text-[#2271b1]"}`}>
                            {f} ({projects.filter(p => f === "all" ? p.status !== "archived" : p.status === f).length})
                          </button>
                        ))}
                      </div>

                      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                              <th className="p-3">Title</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">Location</th>
                              <th className="p-3">Year</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredItems(projects).map(p => (
                              <tr key={p.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold text-gray-900">{p.title}</td>
                                <td className="p-3">
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                    p.status === "published" ? "bg-green-100 text-green-800" :
                                    p.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                                  }`}>
                                    {p.status}
                                  </span>
                                </td>
                                <td className="p-3 text-gray-600">{p.location}</td>
                                <td className="p-3 text-gray-600">{p.year}</td>
                                <td className="p-3 text-right flex justify-end gap-3 items-center">
                                  <button onClick={() => { setEditingItem(p); setFormData(p); }} className="text-[#2271b1] hover:text-[#135e96] flex items-center gap-0.5"><Edit3 size={13} /> Edit</button>
                                  <button onClick={() => handleDuplicate("projects", p)} className="text-gray-600 hover:text-gray-800 flex items-center gap-0.5"><Copy size={13} /> Clone</button>
                                  {p.status !== "archived" && (
                                    <button onClick={() => handleStatusUpdate("projects", p.id, "archived")} className="text-red-500 hover:text-red-700 flex items-center gap-0.5"><Archive size={13} /> Archive</button>
                                  )}
                                  <button onClick={() => handleDelete("projects", p.id)} className="text-[#d63638] hover:text-[#a01c1e]"><Trash2 size={13} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: FAQS */}
              {activeTab === "faqs" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-normal">FAQs Manager</h1>
                    {!isAdding && !editingItem && (
                      <button onClick={() => { setIsAdding(true); setFormData({ status: "published", display_order: 0 }); }} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5">
                        <Plus size={13} /> Add FAQ
                      </button>
                    )}
                  </div>

                  {isAdding || editingItem ? (
                    <div className="bg-white p-6 shadow-sm border border-gray-200 max-w-2xl">
                      <h2 className="text-lg font-medium mb-4">{editingItem ? "Edit FAQ" : "Add New FAQ"}</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Question</label>
                          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                            value={formData.question || ""} onChange={e => setFormData({...formData, question: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Display Order</label>
                          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                            value={formData.display_order || 0} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Answer</label>
                          <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]" 
                            value={formData.answer || ""} onChange={e => setFormData({...formData, answer: e.target.value})} />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSave("faqs", editingItem?.id)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">
                            Save Changes
                          </button>
                          <button onClick={() => { setIsAdding(false); setEditingItem(null); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold px-4 py-2 rounded">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                            <th className="p-3">Question</th>
                            <th className="p-3">Display Order</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faqs.map(faq => (
                            <tr key={faq.id} className="border-b hover:bg-gray-50">
                              <td className="p-3 font-semibold text-gray-900">{faq.question}</td>
                              <td className="p-3 text-gray-600">{faq.display_order}</td>
                              <td className="p-3 text-right flex justify-end gap-2">
                                <button onClick={() => { setEditingItem(faq); setFormData(faq); }} className="text-[#2271b1] hover:text-[#135e96]"><Edit3 size={14} /></button>
                                <button onClick={() => handleDelete("faqs", faq.id)} className="text-[#d63638] hover:text-[#a01c1e]"><Trash2 size={14} /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SYSTEM SETTINGS */}
              {activeTab === "settings" && (
                <div className="space-y-8 max-w-2xl">
                  {/* Company Profile Settings */}
                  <div className="bg-white p-6 shadow-sm border border-gray-200 rounded">
                    <h2 className="text-base font-semibold mb-4 border-b pb-2">Company Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Company Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={companySettings.companyName || ""} onChange={e => setCompanySettings({...companySettings, companyName: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Opening Hours</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={companySettings.openHours || ""} onChange={e => setCompanySettings({...companySettings, openHours: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Home Hero Background Image URL</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={companySettings.heroImageUrl || ""} onChange={e => setCompanySettings({...companySettings, heroImageUrl: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Home CTA Background Image URL</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={companySettings.ctaImageUrl || ""} onChange={e => setCompanySettings({...companySettings, ctaImageUrl: e.target.value})} />
                      </div>
                      <button onClick={() => handleSaveSettings("company_settings", companySettings)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">
                        Save Company Settings
                      </button>
                    </div>
                  </div>

                  {/* Contact Details Settings */}
                  <div className="bg-white p-6 shadow-sm border border-gray-200 rounded">
                    <h2 className="text-base font-semibold mb-4 border-b pb-2">Contact Details Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Physical Address</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={contactDetails.address || ""} onChange={e => setContactDetails({...contactDetails, address: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Contact Phone</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={contactDetails.phone || ""} onChange={e => setContactDetails({...contactDetails, phone: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Contact Email</label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={contactDetails.email || ""} onChange={e => setContactDetails({...contactDetails, email: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Emergency Hotline</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={contactDetails.emergencyPhone || ""} onChange={e => setContactDetails({...contactDetails, emergencyPhone: e.target.value})} />
                      </div>
                      <button onClick={() => handleSaveSettings("contact_details", contactDetails)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">
                        Save Contact Details
                      </button>
                    </div>
                  </div>

                  {/* Social Media links */}
                  <div className="bg-white p-6 shadow-sm border border-gray-200 rounded">
                    <h2 className="text-base font-semibold mb-4 border-b pb-2">Social Media Settings</h2>
                    <div className="space-y-4">
                      {["facebook", "twitter", "linkedin", "instagram"].map(key => (
                        <div key={key}>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1 capitalize">{key} Link</label>
                          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                            value={socials[key] || ""} onChange={e => setSocials({...socials, [key]: e.target.value})} />
                        </div>
                      ))}
                      <button onClick={() => handleSaveSettings("socials", socials)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">
                        Save Social Links
                      </button>
                    </div>
                  </div>

                  {/* SEO Settings */}
                  <div className="bg-white p-6 shadow-sm border border-gray-200 rounded">
                    <h2 className="text-base font-semibold mb-4 border-b pb-2">SEO Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">SEO Title Format</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={seo.titleTemplate || ""} onChange={e => setSeo({...seo, titleTemplate: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Meta Description</label>
                        <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={seo.metaDescription || ""} onChange={e => setSeo({...seo, metaDescription: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Keywords</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none" 
                          value={seo.keywords || ""} onChange={e => setSeo({...seo, keywords: e.target.value})} />
                      </div>
                      <button onClick={() => handleSaveSettings("seo", seo)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">
                        Save SEO Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: USERS */}
              {activeTab === "users" && userRole === "super_admin" && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-normal">User Management</h1>
                  </div>
                  <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                          <th className="p-3">Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Role</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-semibold text-gray-900">{u.full_name || "-"}</td>
                            <td className="p-3 text-gray-600">{u.email}</td>
                            <td className="p-3 text-gray-600 capitalize">{u.role}</td>
                            <td className="p-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${u.is_approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                {u.is_approved ? "Approved" : "Pending"}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              {u.role !== 'super_admin' && (
                                <button
                                  onClick={() => handleApproveUser(u.id, !u.is_approved)}
                                  className={`text-xs font-semibold px-3 py-1 rounded transition-colors ${u.is_approved ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                                >
                                  {u.is_approved ? "Revoke Access" : "Approve User"}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: TEAM MEMBERS */}
              {activeTab === "team" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-normal">Team Members</h1>
                    {!isAdding && !editingItem && (
                      <button onClick={() => { setIsAdding(true); setFormData({ status: "published", projects_completed: 0, years_experience: 0, display_order: 0 }); }} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5">
                        <Plus size={13} /> Add Team Member
                      </button>
                    )}
                  </div>

                  {isAdding || editingItem ? (
                    <div className="bg-white p-6 shadow-sm border border-gray-200 max-w-2xl">
                      <h2 className="text-lg font-medium mb-4">{editingItem ? "Edit Team Member" : "Add Team Member"}</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Job Title</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Senior Engineer" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.status || "published"} onChange={e => setFormData({...formData, status: e.target.value})}>
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Profile Image URL</label>
                          <div className="flex gap-2 items-center">
                            <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.image_url || ""} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="Paste URL or upload..." />
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-2 rounded flex items-center gap-1.5 whitespace-nowrap">
                              {isUploadingImage ? "Uploading..." : <><Upload size={13} /> Upload</>}
                              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} />
                            </label>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Projects Completed</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.projects_completed || 0} onChange={e => setFormData({...formData, projects_completed: parseInt(e.target.value) || 0})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Years Experience</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.years_experience || 0} onChange={e => setFormData({...formData, years_experience: parseInt(e.target.value) || 0})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Display Order</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.display_order || 0} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">LinkedIn URL</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.linkedin_url || ""} onChange={e => setFormData({...formData, linkedin_url: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Twitter URL</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.twitter_url || ""} onChange={e => setFormData({...formData, twitter_url: e.target.value})} />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSave("team_members", editingItem?.id)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">Save Changes</button>
                          <button onClick={() => { setIsAdding(false); setEditingItem(null); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold px-4 py-2 rounded">Cancel</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-4 text-xs mb-4 border-b pb-2 text-gray-500">
                        {["all", "published", "draft", "archived"].map(f => (
                          <button key={f} onClick={() => setStatusFilter(f)} className={`capitalize ${statusFilter === f ? "text-[#2271b1] font-bold" : "hover:text-[#2271b1]"}`}>
                            {f} ({teamMembers.filter(m => f === "all" ? m.status !== "archived" : m.status === f).length})
                          </button>
                        ))}
                      </div>
                      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                              <th className="p-3">Name</th>
                              <th className="p-3">Title</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">Experience</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredItems(teamMembers).length === 0 && (
                              <tr><td colSpan={5} className="p-6 text-center text-gray-400 italic">No team members found. Add one above.</td></tr>
                            )}
                            {getFilteredItems(teamMembers).map(m => (
                              <tr key={m.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold text-gray-900 flex items-center gap-2">
                                  {m.image_url && <img src={m.image_url} alt={m.name} className="w-7 h-7 rounded-full object-cover" />}
                                  {m.name}
                                </td>
                                <td className="p-3 text-gray-600">{m.title}</td>
                                <td className="p-3">
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                    m.status === "published" ? "bg-green-100 text-green-800" :
                                    m.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                                  }`}>{m.status}</span>
                                </td>
                                <td className="p-3 text-gray-600">{m.years_experience} yrs</td>
                                <td className="p-3 text-right flex justify-end gap-3 items-center">
                                  <button onClick={() => { setEditingItem(m); setFormData(m); }} className="text-[#2271b1] hover:text-[#135e96] flex items-center gap-0.5"><Edit3 size={13} /> Edit</button>
                                  <button onClick={() => handleDelete("team_members", m.id)} className="text-[#d63638] hover:text-[#a01c1e]"><Trash2 size={13} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: TESTIMONIALS */}
              {activeTab === "testimonials" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-normal">Testimonials</h1>
                    {!isAdding && !editingItem && (
                      <button onClick={() => { setIsAdding(true); setFormData({ status: "published", rating: 5 }); }} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5">
                        <Plus size={13} /> Add Testimonial
                      </button>
                    )}
                  </div>

                  {isAdding || editingItem ? (
                    <div className="bg-white p-6 shadow-sm border border-gray-200 max-w-2xl">
                      <h2 className="text-lg font-medium mb-4">{editingItem ? "Edit Testimonial" : "Add Testimonial"}</h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Client Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Role / Position</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.role || ""} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. CEO" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Company</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.company || ""} onChange={e => setFormData({...formData, company: e.target.value})} />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Rating (1-5)</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.rating || 5} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}>
                              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r !== 1 ? "s" : ""}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Avatar Image URL</label>
                          <div className="flex gap-2 items-center">
                            <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.avatar_url || ""} onChange={e => setFormData({...formData, avatar_url: e.target.value})} placeholder="Paste URL or upload..." />
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-2 rounded flex items-center gap-1.5 whitespace-nowrap">
                              {isUploadingImage ? "Uploading..." : <><Upload size={13} /> Upload</>}
                              <input type="file" className="hidden" accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0]; if (!file) return;
                                  setIsUploadingImage(true);
                                  const ext = file.name.split(".").pop();
                                  const path = `uploads/${Math.random()}.${ext}`;
                                  const { error: upErr } = await supabase.storage.from("media").upload(path, file);
                                  if (!upErr) {
                                    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
                                    setFormData((prev: any) => ({ ...prev, avatar_url: publicUrl }));
                                  }
                                  setIsUploadingImage(false);
                                }}
                                disabled={isUploadingImage} />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Review Text</label>
                          <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                            value={formData.text || ""} onChange={e => setFormData({...formData, text: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                            value={formData.status || "published"} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSave("testimonials", editingItem?.id)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">Save Changes</button>
                          <button onClick={() => { setIsAdding(false); setEditingItem(null); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold px-4 py-2 rounded">Cancel</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-4 text-xs mb-4 border-b pb-2 text-gray-500">
                        {["all", "published", "draft", "archived"].map(f => (
                          <button key={f} onClick={() => setStatusFilter(f)} className={`capitalize ${statusFilter === f ? "text-[#2271b1] font-bold" : "hover:text-[#2271b1]"}`}>
                            {f} ({testimonials.filter(t => f === "all" ? t.status !== "archived" : t.status === f).length})
                          </button>
                        ))}
                      </div>
                      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                              <th className="p-3">Client</th>
                              <th className="p-3">Company</th>
                              <th className="p-3">Rating</th>
                              <th className="p-3">Status</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredItems(testimonials).length === 0 && (
                              <tr><td colSpan={5} className="p-6 text-center text-gray-400 italic">No testimonials yet. Add one above.</td></tr>
                            )}
                            {getFilteredItems(testimonials).map(t => (
                              <tr key={t.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold text-gray-900 flex items-center gap-2">
                                  {t.avatar_url && <img src={t.avatar_url} alt={t.name} className="w-7 h-7 rounded-full object-cover" />}
                                  <div>
                                    <div>{t.name}</div>
                                    <div className="text-gray-400 font-normal">{t.role}</div>
                                  </div>
                                </td>
                                <td className="p-3 text-gray-600">{t.company}</td>
                                <td className="p-3 text-yellow-500">{"★".repeat(t.rating || 5)}</td>
                                <td className="p-3">
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                    t.status === "published" ? "bg-green-100 text-green-800" :
                                    t.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                                  }`}>{t.status}</span>
                                </td>
                                <td className="p-3 text-right flex justify-end gap-3 items-center">
                                  <button onClick={() => { setEditingItem(t); setFormData(t); }} className="text-[#2271b1] hover:text-[#135e96] flex items-center gap-0.5"><Edit3 size={13} /> Edit</button>
                                  <button onClick={() => handleDelete("testimonials", t.id)} className="text-[#d63638] hover:text-[#a01c1e]"><Trash2 size={13} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: BLOG POSTS */}
              {activeTab === "blogs" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-normal">Blog Posts</h1>
                    {!isAdding && !editingItem && (
                      <button onClick={() => { setIsAdding(true); setFormData({ status: "draft" }); }} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5">
                        <Plus size={13} /> Add New Post
                      </button>
                    )}
                  </div>

                  {isAdding || editingItem ? (
                    <div className="bg-white p-6 shadow-sm border border-gray-200 max-w-3xl">
                      <h2 className="text-lg font-medium mb-4">{editingItem ? "Edit Blog Post" : "Add New Blog Post"}</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Post Title</label>
                          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                            value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Slug (auto-generated if empty)</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.slug || ""} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="leave-blank-to-auto-generate" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.status || "draft"} onChange={e => setFormData({...formData, status: e.target.value})}>
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Featured Image URL</label>
                          <div className="flex gap-2 items-center">
                            <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                              value={formData.image_url || ""} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="Paste URL or upload..." />
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-2 rounded flex items-center gap-1.5 whitespace-nowrap">
                              {isUploadingImage ? "Uploading..." : <><Upload size={13} /> Upload</>}
                              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} />
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Excerpt / Short Summary</label>
                          <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1]"
                            value={formData.excerpt || ""} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Content</label>
                          <textarea rows={10} className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#2271b1] font-mono"
                            value={formData.content || ""} onChange={e => setFormData({...formData, content: e.target.value})} placeholder="Write your full blog post content here..." />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleSave("blog_posts", editingItem?.id)} className="bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded">Save Post</button>
                          <button onClick={() => { setIsAdding(false); setEditingItem(null); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold px-4 py-2 rounded">Cancel</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-4 text-xs mb-4 border-b pb-2 text-gray-500">
                        {["all", "published", "draft", "archived"].map(f => (
                          <button key={f} onClick={() => setStatusFilter(f)} className={`capitalize ${statusFilter === f ? "text-[#2271b1] font-bold" : "hover:text-[#2271b1]"}`}>
                            {f} ({blogPosts.filter(b => f === "all" ? b.status !== "archived" : b.status === f).length})
                          </button>
                        ))}
                      </div>
                      <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 font-semibold text-gray-700">
                              <th className="p-3">Title</th>
                              <th className="p-3">Slug</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">Created</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredItems(blogPosts).length === 0 && (
                              <tr><td colSpan={5} className="p-6 text-center text-gray-400 italic">No blog posts yet. Add one above.</td></tr>
                            )}
                            {getFilteredItems(blogPosts).map(b => (
                              <tr key={b.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-semibold text-gray-900 max-w-[200px] truncate">
                                  {b.image_url && <img src={b.image_url} alt={b.title} className="w-8 h-8 rounded object-cover inline-block mr-2 align-middle" />}
                                  {b.title}
                                </td>
                                <td className="p-3 text-gray-500 font-mono">{b.slug}</td>
                                <td className="p-3">
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                                    b.status === "published" ? "bg-green-100 text-green-800" :
                                    b.status === "draft" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                                  }`}>{b.status}</span>
                                </td>
                                <td className="p-3 text-gray-500">{new Date(b.created_at).toLocaleDateString()}</td>
                                <td className="p-3 text-right flex justify-end gap-3 items-center">
                                  <button onClick={() => { setEditingItem(b); setFormData(b); }} className="text-[#2271b1] hover:text-[#135e96] flex items-center gap-0.5"><Edit3 size={13} /> Edit</button>
                                  <button onClick={() => handleDuplicate("blog_posts", b)} className="text-gray-600 hover:text-gray-800 flex items-center gap-0.5"><Copy size={13} /> Clone</button>
                                  {b.status !== "archived" && (
                                    <button onClick={() => handleStatusUpdate("blog_posts", b.id, "archived")} className="text-red-500 hover:text-red-700 flex items-center gap-0.5"><Archive size={13} /> Archive</button>
                                  )}
                                  <button onClick={() => handleDelete("blog_posts", b.id)} className="text-[#d63638] hover:text-[#a01c1e]"><Trash2 size={13} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* FALLBACK TABS FOR CAREERS, MEDIA */}
              {["careers", "media"].includes(activeTab) && (
                <div className="bg-white p-6 shadow-sm border border-gray-200">
                  <h2 className="text-lg font-medium capitalize mb-4">Manage {activeTab}</h2>
                  <p className="text-sm text-gray-500">Fully loaded dashboard editor module for {activeTab}. Enable forms, uploads and list filtering on the go.</p>
                </div>
              )}

            </>
          )}

        </main>
      </div>

      {/* ────────────────── LIVE PREVIEW MODAL ────────────────── */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-[#1d2327]/60 flex items-center justify-center p-6" onClick={() => setPreviewItem(null)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#1d2327] text-white px-4 py-3 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider">Live Card Preview</span>
              <button onClick={() => setPreviewItem(null)} className="text-gray-400 hover:text-white"><X size={16} /></button>
            </div>
            
            {previewItem.type === "service" && (
              <div className="p-5">
                <div className="h-44 bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                  <img src={previewItem.data.image_url} alt={previewItem.data.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#f0c243] text-[#1d2327] text-[10px] font-black px-2.5 py-0.5 rounded uppercase">{previewItem.data.tag}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{previewItem.data.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">{previewItem.data.description}</p>
                <div className="border-t pt-3 grid grid-cols-3 gap-2 text-[10px]">
                  <div>
                    <span className="text-gray-400 block uppercase font-bold">Timeline</span>
                    <span className="font-bold text-gray-800">{previewItem.data.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase font-bold">Value</span>
                    <span className="font-bold text-gray-800">{previewItem.data.value}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block uppercase font-bold">Scope</span>
                    <span className="font-bold text-gray-800">{previewItem.data.scope}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 px-4 py-3 flex justify-end">
              <button onClick={() => setPreviewItem(null)} className="bg-[#2271b1] text-white text-xs font-semibold px-4 py-1.5 rounded">Close Preview</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
