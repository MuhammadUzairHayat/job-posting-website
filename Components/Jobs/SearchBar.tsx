"use client";

import React from "react";
import { Search, MapPin, Briefcase } from "lucide-react";

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
  const locationValue = defaultLocation;
  const typeValue = defaultType;
  const postValue = defaultPost;

  return (
    <form
      method="GET"
      action="/jobs"
      className="relative bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4 mb-6"
      aria-label="Job search form"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px_200px_auto] gap-3 items-center">
        {/* Post/keyword */}
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            name="post"
            placeholder="Search title, company, description..."
            defaultValue={postValue}
            className="w-full outline-none placeholder:text-gray-400 text-sm"
            aria-label="Search keywords"
          />
        </div>

        {/* Location */}
        <label htmlFor="location-input" className="sr-only">
          Location
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
          <MapPin className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <input
            id="location-input"
            type="text"
            name="location"
            placeholder="Location"
            defaultValue={locationValue}
            className="w-full outline-none placeholder:text-gray-400 text-sm"
            aria-label="Location"
          />
        </div>

        {/* Type */}
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
          <Briefcase className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <select
            name="type"
            defaultValue={typeValue}
            className="w-full bg-transparent outline-none text-sm"
            aria-label="Job type"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex md:justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-sm"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
