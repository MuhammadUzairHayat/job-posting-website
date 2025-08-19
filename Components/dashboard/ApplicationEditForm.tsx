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
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          title="phone number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn
        </label>
        <input
          title="linkedin link"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          GitHub
        </label>
        <input
          title="github link"
          name="github"
          value={form.github}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Portfolio
        </label>
        <input
          title="portfolio link"
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resume (PDF)
        </label>
        <input
          title="resume file"
          type="file"
          accept="application/pdf"
          onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
          className="w-full px-3 py-2 border rounded-md"
        />
        {form.resumeUrl && (
          <p className="text-xs text-gray-500 mt-1">
            Existing resume will remain if no new file is chosen.
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Letter (HTML)
        </label>
        <ReactQuill
          value={form.coverLetter}
          onChange={(v) => setForm((f) => ({ ...f, coverLetter: v }))}
        />
      </div>

      {error && <ErrorMessage message="Error Occurred in Form Editing" />}
      {success && <SuccessMessage message="Form Successfully Edited" />}

      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
