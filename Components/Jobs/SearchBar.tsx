"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

interface SearchBarProps {
  defaultLocation?: string;
  defaultType?: string;
  defaultPost?: string;
}

export default function SearchBar({
  defaultLocation = "",
  defaultType = "",
  defaultPost = "",
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const locationValue = searchParams.get("location") || defaultLocation;
  const typeValue = searchParams.get("type") || defaultType;
  const postValue = searchParams.get("post") || defaultPost;

  return (
    <form
      method="GET"
      action="/jobs"
      className="flex flex-wrap gap-2 justify-center mb-6"
    >
      <input
        type="text"
        name="post"
        placeholder="Search title, company, description..."
        defaultValue={postValue}
        className="border rounded px-4 py-2 w-80"
      />
      <label htmlFor="location-input" className="sr-only">
        Location
      </label>
      <input
        id="location-input"
        type="text"
        name="location"
        placeholder="Location"
        defaultValue={locationValue}
        className="border rounded px-4 py-2 w-40"
        aria-label="Location"
      />
      <select
        name="type"
        defaultValue={typeValue}
        className="border rounded px-3 py-2"
        aria-label="Job Type"
      >
        <option value="">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
        {/* Add more types as needed */}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
}
