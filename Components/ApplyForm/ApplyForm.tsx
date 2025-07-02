"use client"

import dynamic from "next/dynamic";
import ApplyButton from "@/Components/Jobs/ApplyButton";
import React, { useState } from "react";
import ApplyFormSkeleton from "@/Components/ApplyForm/ApplyFormSkeleton";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

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
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload your resume as PDF.");
      return;
    }

    const form = new FormData();
    form.append("coverLetter", formData.coverLetter);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("linkedin", formData.linkedin);
    form.append("github", formData.github);
    form.append("portfolio", formData.portfolio);

    if (resume) {
      form.append("resume", resume);
    } else {
      alert("Please upload a resume.");
      setLoading(false);
      return;
    }

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
  };

  if (loading) {
    return <ApplyFormSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 mt-24 mb-12 rounded-lg max-w-2xl mx-auto space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Apply for this Job
      </h2>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Write Cover Letter
      </label>
      <ReactQuill
        theme="snow"
        value={formData.coverLetter}
        placeholder="Write your cover letter"
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, coverLetter: value }))
        }
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Resume (PDF)
      </label>
      <input
        title="Resume"
        type="file"
        name="resume"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full border border-gray-300 p-3 rounded"
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Other Details
      </label>

      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full border border-gray-300 p-3 rounded"
      />

      <input
        type="url"
        name="linkedin"
        value={formData.linkedin}
        onChange={handleChange}
        placeholder="LinkedIn Profile URL"
        className="w-full border border-gray-300 p-3 rounded"
      />

      <input
        type="url"
        name="github"
        value={formData.github}
        onChange={handleChange}
        placeholder="GitHub Profile URL"
        className="w-full border border-gray-300 p-3 rounded"
      />

      <input
        type="url"
        name="portfolio"
        value={formData.portfolio}
        onChange={handleChange}
        placeholder="Portfolio Website URL"
        className="w-full border border-gray-300 p-3 rounded"
      />

      <ApplyButton
        jobId={jobId}
        applied={applied || "applying"}
        formData={formData}
        resume={resume}
      />
    </form>
  );
};

export default ApplyForm;