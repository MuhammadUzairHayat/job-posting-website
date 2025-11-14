"use client";

import { useState } from "react";
import TextEditor from "@/Components/PostJob/TextEditor";
import { FormEvent } from "react";
import { useSession } from "next-auth/react";
import ErrorMessage from "../AlertMessages/ErrorMessage";
import SuccessMessage from "../AlertMessages/SuccessMessage";

export default function PostJobForm() {
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState< boolean | string | null>(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      salary: formData.get("salary"),
      description,
      postedById: session?.user?.id,
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to post job");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      form.reset();
      setDescription("");
      window.location.href = "/dashboard";
    } catch (error) {
      setError("Error Occurred in PostJobForm: " + error);
      console.error("Error Occurred in PostJobForm: ", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 mb-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Post a New Job Opportunity</h2>
        <p className="mt-2 text-gray-600">Fill out the form below to list your job opening</p>
      </div>

      {success && (
        <SuccessMessage
          message="Job posted successfully!"
          onClose={() => setSuccess(false)}
        />
      )}
      {error && (
        <ErrorMessage
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="e.g. Senior Frontend Developer"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company Name *
            </label>
            <input
              id="company"
              type="text"
              name="company"
              placeholder="Your company name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location *
            </label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="e.g. Remote, New York, etc."
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Employment Type *
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary Range (optional)
            </label>
            <input
              id="salary"
              type="number"
              name="salary"
              placeholder="Annual salary in USD"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Job Description *
          </label>
          <div className="mt-1">
            <TextEditor value={description} onChange={setDescription} />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Describe the role, responsibilities, and requirements
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:opacity-90 transition shadow-md hover:shadow-lg"
          >
            Post Job Opportunity
          </button>
        </div>
      </form>
    </div>
  );
}