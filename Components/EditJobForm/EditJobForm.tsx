"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
)

interface EditJobFormProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: number | null;
    description: string;
  };
  onSubmit: (data: {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
  }) => void;
}

export default function EditJobForm({ job, onSubmit }: EditJobFormProps) {
    const [description, setDescription] = useState(job.description);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        onSubmit({
            title: formData.get("title") as string,
            company: formData.get("company") as string,
            location: formData.get("location") as string,
            type: formData.get("type") as string,
            salary: formData.get("salary") as string,
            description,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <div>
                <label className="block mb-1 font-medium" htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    defaultValue={job.title || ""}
                    required
                    className="w-full border rounded px-3 py-2"
                    autoComplete="off"
                    placeholder="Enter job title"
                    title="Job Title"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium" htmlFor="company">Company</label>
                <input
                    id="company"
                    name="company"
                    defaultValue={job.company || ""}
                    required
                    className="w-full border rounded px-3 py-2"
                    autoComplete="off"
                    placeholder="Enter company name"
                    title="Company Name"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium" htmlFor="location">Location</label>
                <input
                    id="location"
                    name="location"
                    defaultValue={job.location || ""}
                    required
                    className="w-full border rounded px-3 py-2"
                    autoComplete="off"
                    placeholder="Enter job location"
                    title="Job Location"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium" htmlFor="type">Type</label>
                <select
                    id="type"
                    name="type"
                    defaultValue={job.type || ""}
                    required
                    className="w-full border rounded px-3 py-2"
                    title="Job Type"
                >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>
            <div>
                <label className="block mb-1 font-medium" htmlFor="salary">Salary</label>
                <input
                    id="salary"
                    name="salary"
                    type="number"
                    defaultValue={job.salary !== null && job.salary !== undefined ? job.salary : ""}
                    className="w-full border rounded px-3 py-2"
                    autoComplete="off"
                    placeholder="Enter salary (optional)"
                    title="Salary"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium" htmlFor="description">Description</label>
                <ReactQuill value={description} onChange={setDescription} />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded"
            >
                Update Job
            </button>
        </form>
    );
}