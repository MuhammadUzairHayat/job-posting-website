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
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  // console.log(session?.user?.id)

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

      // ✅ Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);

      // ✅ Clear all form fields
      form.reset();
      setDescription("");
      window.location.href = "/dashboard";
    } catch (error) {
      setError("Error Occurred in PostJobForm: " + error);
      console.error("Error Occurred in PostJobForm: ", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-28 mb-20 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <TextEditor value={description} onChange={setDescription} />
        <input
          type="text"
          name="company"
          placeholder="Company"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <select
          title="type of Job"
          name="type"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
          <option>Internship</option>
        </select>
        <input
          type="number"
          name="salary"
          placeholder="Salary (optional)"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
