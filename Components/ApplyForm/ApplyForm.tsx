"use client"

import dynamic from "next/dynamic";
import ApplyButton from "@/Components/Jobs/ApplyButton";
import React, { useState } from "react";
import ApplyFormSkeleton from "@/Components/ApplyForm/ApplyFormSkeleton";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
});

interface ApplyFormProps {
  jobId: string;
  applied?: string;
}

const ApplyForm: React.FC<ApplyFormProps> = ({ jobId, applied }) => {
  const [formData, setFormData] = useState({
    coverLetter: "",
    phoneNumber: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (file.type !== "application/pdf") {
        setErrors({ resume: "Please upload a PDF file" });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ resume: "File size exceeds 5MB limit" });
        return;
      }
      
      setResume(file);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.resume;
        return newErrors;
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setResumePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";
    if (!resume) newErrors.resume = "Resume is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    
    // Validate URLs
    if (formData.linkedin && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }
    
    if (formData.github && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.github)) {
      newErrors.github = "Please enter a valid GitHub URL";
    }
    
    if (formData.portfolio && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.portfolio)) {
      newErrors.portfolio = "Please enter a valid portfolio URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    const form = new FormData();
    form.append("coverLetter", formData.coverLetter);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("linkedin", formData.linkedin);
    form.append("github", formData.github);
    form.append("portfolio", formData.portfolio);
    form.append("resume", resume!);

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data?.error || "Something went wrong");
      } else {
        alert("Application submitted successfully!");
      }
    } catch {
      alert("An error occurred while submitting your application");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ApplyFormSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-16 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-24">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Apply for This Position</h2>
              <p className="text-blue-100 mt-1">Complete your application in minutes</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Cover Letter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Cover Letter *
            </label>
            <div className={`rounded-xl overflow-hidden border ${
              errors.coverLetter ? 'border-red-300' : 'border-gray-300'
            }`}>
              <ReactQuill
                theme="snow"
                value={formData.coverLetter}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, coverLetter: value }))
                }
                className="h-64 bg-white"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'clean']
                  ],
                }}
              />
            </div>
            {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Resume (PDF) *
            </label>
            <div className="space-y-3">
              <div className={`border-2 border-dashed rounded-xl p-6 text-center ${
                errors.resume ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
              } transition-colors`}>
                <input
                  title="Resume"
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label 
                  htmlFor="resume-upload" 
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600">
                    {resume ? resume.name : "Click to upload your resume (PDF)"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                </label>
              </div>
              
              {resumePreview && resume && (
                <div className="mt-2 flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700 truncate max-w-xs">{resume.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {(resume.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              )}
              
              {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
            </div>
          </div>

          {/* Personal Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 123-4567"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.phoneNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                      'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="linkedin"
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.linkedin ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                      'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                  />
                </div>
                {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
              </div>

              {/* GitHub */}
              <div className="space-y-2">
                <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                  GitHub Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="github"
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.github ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                      'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                  />
                </div>
                {errors.github && <p className="text-red-500 text-sm mt-1">{errors.github}</p>}
              </div>

              {/* Portfolio */}
              <div className="space-y-2">
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                  Portfolio Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="portfolio"
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.portfolio ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                      'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 transition-colors`}
                  />
                </div>
                {errors.portfolio && <p className="text-red-500 text-sm mt-1">{errors.portfolio}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <ApplyButton
              jobId={jobId}
              applied={applied || "applying"}
              formData={formData}
              resume={resume}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;