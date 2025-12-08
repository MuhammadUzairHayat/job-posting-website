"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import SuccessMessage from "../AlertMessages/SuccessMessage";
import ErrorMessage from "../AlertMessages/ErrorMessage";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface Props {
  applicationId: string;
  initial: {
    coverLetter?: string | null;
    phoneNumber?: string | null;
    linkedin?: string | null;
    github?: string | null;
    portfolio?: string | null;
    resumeUrl?: string | null;
  };
}

export default function ApplicationEditForm({ applicationId, initial }: Props) {
  const [form, setForm] = useState({
    coverLetter: initial.coverLetter ?? "",
    phoneNumber: initial.phoneNumber ?? "",
    linkedin: initial.linkedin ?? "",
    github: initial.github ?? "",
    portfolio: initial.portfolio ?? "",
    resumeUrl: initial.resumeUrl ?? "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      let res: Response;
      if (resumeFile) {
        const fd = new FormData();
        fd.append("coverLetter", form.coverLetter);
        fd.append("phoneNumber", form.phoneNumber);
        fd.append("linkedin", form.linkedin);
        fd.append("github", form.github);
        fd.append("portfolio", form.portfolio);
        fd.append("resume", resumeFile);
        res = await fetch(`/api/applications/${applicationId}`, {
          method: "PATCH",
          body: fd,
        });
      } else {
        res = await fetch(`/api/applications/${applicationId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      if (!res.ok) throw new Error("Failed to save");
      setSuccess(true);
      if (window && window.history) {
        setTimeout(() => {
          window.history.back();
        }, 1000); // waits 1 second
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          title="phone number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          LinkedIn Profile
        </label>
        <input
          title="linkedin link"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          GitHub Profile
        </label>
        <input
          title="github link"
          name="github"
          value={form.github}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
          placeholder="https://github.com/yourusername"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Portfolio Website
        </label>
        <input
          title="portfolio link"
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          placeholder="https://yourportfolio.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Resume (PDF)
        </label>
        <div className="relative">
          <input
            title="resume file"
            type="file"
            accept="application/pdf"
            onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        {form.resumeUrl && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Existing resume will remain if no new file is chosen.
            </p>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Cover Letter
        </label>
        <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
          <ReactQuill
            value={form.coverLetter}
            onChange={(v) => setForm((f) => ({ ...f, coverLetter: v }))}
            className="bg-white"
          />
        </div>
      </div>

      {error && <ErrorMessage message="Error Occurred in Form Editing" />}
      {success && <SuccessMessage message="Form Successfully Edited" />}

      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
