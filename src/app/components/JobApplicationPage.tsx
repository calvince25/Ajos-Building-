import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import { supabase } from "../supabaseClient";
import SEO from "./SEO";
import { PageHero } from "./ui/PageHero";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Calendar, 
  DollarSign, 
  UserCheck, 
  ArrowLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Trash2 
} from "lucide-react";

interface JobApplicationPageProps {
  careers: any[] | null;
}

export function JobApplicationPage({ careers }: JobApplicationPageProps) {
  const { slug } = useParams();
  
  // Loading state for parent careers loading
  if (careers === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2271b1]"></div>
      </div>
    );
  }

  const career = careers.find(
    (c) => c.slug === slug || String(c.id) === slug
  );

  // If career position does not exist or status is not published
  if (!career || career.status !== "published") {
    return <Navigate to="/careers" replace />;
  }

  const isClosed = career.deadline && new Date(career.deadline) < new Date();

  // Form Field States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    city: "",
    educationLevel: "Bachelor's Degree",
    yearsExperience: "",
    currentEmployer: "",
    currentPosition: "",
    expectedSalary: "",
    startDate: "",
    interestReason: "",
    experienceSummary: "",
  });

  // File states
  const [files, setFiles] = useState<{
    cv: File | null;
    coverLetter: File | null;
    certificates: File | null;
    portfolio: File | null;
    nationalId: File | null;
  }>({
    cv: null,
    coverLetter: null,
    certificates: null,
    portfolio: null,
    nationalId: null,
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof typeof files) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    
    // Validations: PDF, DOC, DOCX, JPG, PNG
    const allowedExtensions = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
    
    if (!allowedExtensions.includes(fileExt)) {
      alert("Invalid file format. Only PDF, DOC, DOCX, JPG, and PNG are allowed.");
      return;
    }

    // Max Size: 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File is too large. Maximum file size is 5MB.");
      return;
    }

    setFiles((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleRemoveFile = (fieldName: keyof typeof files) => {
    setFiles((prev) => ({ ...prev, [fieldName]: null }));
    const input = document.getElementById(fieldName) as HTMLInputElement;
    if (input) input.value = "";
  };

  const uploadFileToStorage = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const uniqueId = crypto.randomUUID();
    const filePath = `applications/${folder}/${uniqueId}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from("media")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isClosed) {
      alert("Applications are closed for this position.");
      return;
    }

    if (!files.cv) {
      alert("CV/Resume is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Upload files
      let cvUrl = "";
      let coverLetterUrl = "";
      let certificatesUrl = "";
      let portfolioUrl = "";
      let idUrl = "";

      if (files.cv) cvUrl = await uploadFileToStorage(files.cv, "cvs");
      if (files.coverLetter) coverLetterUrl = await uploadFileToStorage(files.coverLetter, "cover_letters");
      if (files.certificates) certificatesUrl = await uploadFileToStorage(files.certificates, "certificates");
      if (files.portfolio) portfolioUrl = await uploadFileToStorage(files.portfolio, "portfolios");
      if (files.nationalId) idUrl = await uploadFileToStorage(files.nationalId, "ids");

      // 2. Insert application record into database
      const applicationPayload = {
        career_id: career.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        city: formData.city,
        education_level: formData.educationLevel,
        years_experience: parseInt(formData.yearsExperience) || 0,
        current_employer: formData.currentEmployer || null,
        current_position: formData.currentPosition || null,
        expected_salary: formData.expectedSalary || null,
        start_date: formData.startDate || null,
        interest_reason: formData.interestReason,
        experience_summary: formData.experienceSummary,
        cv_url: cvUrl,
        cover_letter_url: coverLetterUrl || null,
        certificates_url: certificatesUrl || null,
        portfolio_url: portfolioUrl || null,
        id_url: idUrl || null,
        status: "New",
      };

      const { error: dbError } = await supabase
        .from("job_applications")
        .insert([applicationPayload]);

      if (dbError) throw dbError;

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-background min-h-screen pb-20">
      <SEO 
        title={`Apply for ${career.title} | Titan Construction`} 
        description={`Submit your application for the ${career.title} role at Titan Construction.`}
        canonical={`/careers/${slug}/apply`}
      />
      <PageHero
        title="Careers Portal"
        subtitle="Join Our Team"
        imageUrl="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent font-bold mb-8 no-underline">
          <ArrowLeft size={16} /> Back to Open Positions
        </Link>

        {submitSuccess ? (
          <div className="max-w-2xl mx-auto bg-card border border-border p-10 rounded-xl shadow-lg text-center my-10 animate-fade-in">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={45} />
            </div>
            <h2 className="text-3xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Application Received!</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
              Thank you for applying for the <strong>{career.title}</strong> position. Your application has been received successfully. We will contact you if you are shortlisted.
            </p>
            <Link to="/careers" className="bg-[#2271b1] hover:bg-[#135e96] text-white text-sm font-bold px-6 py-3 rounded transition-colors inline-block no-underline">
              Back to Careers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: JOB INFO CARD */}
            <div className="lg:col-span-4 bg-card border border-border p-6 rounded-lg sticky top-24">
              <h2 className="text-2xl font-black text-primary mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {career.title}
              </h2>
              
              <div className="space-y-3.5 mb-6 text-sm text-muted-foreground">
                {career.department && (
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={16} className="text-accent flex-shrink-0" />
                    <span>{career.department}</span>
                  </div>
                )}
                {career.location && (
                  <div className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-accent flex-shrink-0" />
                    <span>{career.location}</span>
                  </div>
                )}
                {career.type && (
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-accent flex-shrink-0" />
                    <span>{career.type}</span>
                  </div>
                )}
                {career.salary && (
                  <div className="flex items-center gap-2.5">
                    <DollarSign size={16} className="text-accent flex-shrink-0" />
                    <span>Expected: {career.salary}</span>
                  </div>
                )}
                {career.vacancies > 0 && (
                  <div className="flex items-center gap-2.5">
                    <UserCheck size={16} className="text-accent flex-shrink-0" />
                    <span>Vacancies: {career.vacancies}</span>
                  </div>
                )}
                {career.deadline && (
                  <div className="flex items-center gap-2.5">
                    <Calendar size={16} className="text-accent flex-shrink-0" />
                    <span>
                      Deadline: {new Date(career.deadline).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              {isClosed ? (
                <div className="bg-red-50 text-red-800 p-4 rounded border border-red-200 text-sm flex items-start gap-2 mb-6">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Applications Closed.</span> The deadline for submissions has passed and this position is no longer accepting applications.
                  </div>
                </div>
              ) : null}

              {career.description && (
                <div className="border-t pt-4">
                  <h4 className="text-xs uppercase font-black text-primary tracking-wider mb-2">Description</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                    {career.description}
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: APPLICATION FORM */}
            <div className="lg:col-span-8 bg-card border border-border p-6 sm:p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-black text-primary mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Submit Application
              </h3>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg text-sm mb-6 flex items-start gap-2.5">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information */}
                <div>
                  <h4 className="text-sm font-bold text-primary border-b pb-2 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">First Name *</label>
                      <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Last Name *</label>
                      <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number *</label>
                      <input required type="tel" name="phone" placeholder="e.g. +254 700 000000" value={formData.phone} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nationality *</label>
                      <input required type="text" name="nationality" placeholder="e.g. Kenyan" value={formData.nationality} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">County/City *</label>
                      <input required type="text" name="city" placeholder="e.g. Nairobi" value={formData.city} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h4 className="text-sm font-bold text-primary border-b pb-2 mb-4">Professional Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Highest Education Level *</label>
                      <select name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]">
                        <option value="High School">High School</option>
                        <option value="Diploma / Certificate">Diploma / Certificate</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD / Doctorate">PhD / Doctorate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Years of Experience *</label>
                      <input required type="number" min="0" name="yearsExperience" value={formData.yearsExperience} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Current Employer (Optional)</label>
                      <input type="text" name="currentEmployer" value={formData.currentEmployer} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Current Position (Optional)</label>
                      <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Expected Salary (Optional)</label>
                      <input type="text" name="expectedSalary" placeholder="e.g. Ksh 150k" value={formData.expectedSalary} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Available Start Date</label>
                      <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} disabled={isClosed}
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                  </div>
                </div>

                {/* Application Questions */}
                <div>
                  <h4 className="text-sm font-bold text-primary border-b pb-2 mb-4">Application Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Why are you interested in this position? *</label>
                      <textarea required rows={4} name="interestReason" value={formData.interestReason} onChange={handleInputChange} disabled={isClosed}
                        placeholder="State your motivation for applying..."
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Brief summary of your relevant experience *</label>
                      <textarea required rows={4} name="experienceSummary" value={formData.experienceSummary} onChange={handleInputChange} disabled={isClosed}
                        placeholder="Highlight key achievements and roles that match the job description..."
                        className="w-full px-3 py-2.5 border border-border rounded text-sm bg-background focus:outline-none focus:border-[#2271b1]" />
                    </div>
                  </div>
                </div>

                {/* Document Uploads */}
                <div>
                  <h4 className="text-sm font-bold text-primary border-b pb-2 mb-4">Document Uploads</h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Allowed formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB per file).
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* CV Upload */}
                    <div className="border border-dashed border-border p-4 rounded-lg bg-gray-50 flex flex-col justify-between">
                      <div>
                        <span className="block text-xs font-bold text-gray-700 uppercase mb-1">CV/Resume *</span>
                        <span className="text-[10px] text-muted-foreground block mb-3">Upload your latest professional CV.</span>
                      </div>
                      {files.cv ? (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border rounded">
                          <span className="truncate flex items-center gap-1.5 text-primary"><FileText size={14} /> {files.cv.name}</span>
                          <button type="button" onClick={() => handleRemoveFile("cv")} className="text-red-500 hover:text-red-700" disabled={isClosed}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className={`w-full flex items-center justify-center gap-2 border bg-white border-gray-300 px-3 py-2 rounded text-xs cursor-pointer hover:bg-gray-100 transition-colors text-primary font-bold ${isClosed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Upload size={14} /> Upload CV
                          <input required id="cv" type="file" onChange={(e) => handleFileChange(e, "cv")} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" disabled={isClosed} />
                        </label>
                      )}
                    </div>

                    {/* Cover Letter */}
                    <div className="border border-dashed border-border p-4 rounded-lg bg-gray-50 flex flex-col justify-between">
                      <div>
                        <span className="block text-xs font-bold text-gray-700 uppercase mb-1">Cover Letter (Optional)</span>
                        <span className="text-[10px] text-muted-foreground block mb-3">Upload a supporting cover letter.</span>
                      </div>
                      {files.coverLetter ? (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border rounded">
                          <span className="truncate flex items-center gap-1.5 text-primary"><FileText size={14} /> {files.coverLetter.name}</span>
                          <button type="button" onClick={() => handleRemoveFile("coverLetter")} className="text-red-500 hover:text-red-700" disabled={isClosed}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className={`w-full flex items-center justify-center gap-2 border bg-white border-gray-300 px-3 py-2 rounded text-xs cursor-pointer hover:bg-gray-100 transition-colors text-primary font-bold ${isClosed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Upload size={14} /> Upload Cover Letter
                          <input id="coverLetter" type="file" onChange={(e) => handleFileChange(e, "coverLetter")} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" disabled={isClosed} />
                        </label>
                      )}
                    </div>

                    {/* Academic Certificates */}
                    <div className="border border-dashed border-border p-4 rounded-lg bg-gray-50 flex flex-col justify-between">
                      <div>
                        <span className="block text-xs font-bold text-gray-700 uppercase mb-1">Certificates (Optional)</span>
                        <span className="text-[10px] text-muted-foreground block mb-3">Upload academic/professional certificates.</span>
                      </div>
                      {files.certificates ? (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border rounded">
                          <span className="truncate flex items-center gap-1.5 text-primary"><FileText size={14} /> {files.certificates.name}</span>
                          <button type="button" onClick={() => handleRemoveFile("certificates")} className="text-red-500 hover:text-red-700" disabled={isClosed}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className={`w-full flex items-center justify-center gap-2 border bg-white border-gray-300 px-3 py-2 rounded text-xs cursor-pointer hover:bg-gray-100 transition-colors text-primary font-bold ${isClosed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Upload size={14} /> Upload Certificates
                          <input id="certificates" type="file" onChange={(e) => handleFileChange(e, "certificates")} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" disabled={isClosed} />
                        </label>
                      )}
                    </div>

                    {/* Portfolio */}
                    <div className="border border-dashed border-border p-4 rounded-lg bg-gray-50 flex flex-col justify-between">
                      <div>
                        <span className="block text-xs font-bold text-gray-700 uppercase mb-1">Portfolio (Optional)</span>
                        <span className="text-[10px] text-muted-foreground block mb-3">Upload projects or portfolio document.</span>
                      </div>
                      {files.portfolio ? (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border rounded">
                          <span className="truncate flex items-center gap-1.5 text-primary"><FileText size={14} /> {files.portfolio.name}</span>
                          <button type="button" onClick={() => handleRemoveFile("portfolio")} className="text-red-500 hover:text-red-700" disabled={isClosed}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className={`w-full flex items-center justify-center gap-2 border bg-white border-gray-300 px-3 py-2 rounded text-xs cursor-pointer hover:bg-gray-100 transition-colors text-primary font-bold ${isClosed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Upload size={14} /> Upload Portfolio
                          <input id="portfolio" type="file" onChange={(e) => handleFileChange(e, "portfolio")} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" disabled={isClosed} />
                        </label>
                      )}
                    </div>

                    {/* National ID / Passport */}
                    <div className="border border-dashed border-border p-4 rounded-lg bg-gray-50 flex flex-col justify-between">
                      <div>
                        <span className="block text-xs font-bold text-gray-700 uppercase mb-1">National ID/Passport (Optional)</span>
                        <span className="text-[10px] text-muted-foreground block mb-3">Upload copy of ID card or Passport.</span>
                      </div>
                      {files.nationalId ? (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border rounded">
                          <span className="truncate flex items-center gap-1.5 text-primary"><FileText size={14} /> {files.nationalId.name}</span>
                          <button type="button" onClick={() => handleRemoveFile("nationalId")} className="text-red-500 hover:text-red-700" disabled={isClosed}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className={`w-full flex items-center justify-center gap-2 border bg-white border-gray-300 px-3 py-2 rounded text-xs cursor-pointer hover:bg-gray-100 transition-colors text-primary font-bold ${isClosed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <Upload size={14} /> Upload National ID
                          <input id="nationalId" type="file" onChange={(e) => handleFileChange(e, "nationalId")} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" disabled={isClosed} />
                        </label>
                      )}
                    </div>

                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || isClosed}
                    className={`bg-[#2271b1] hover:bg-[#135e96] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-2 ${(isSubmitting || isClosed) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                        Submitting...
                      </>
                    ) : "Submit Application"}
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
