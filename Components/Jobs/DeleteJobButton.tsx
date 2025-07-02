"use client";

import { Trash2 } from "lucide-react";

interface DeleteJobButtonProps {
  jobId: string;
}

export default function DeleteJobButton({ jobId }: DeleteJobButtonProps) {
  return (
    <form action={`/api/jobs/${jobId}/delete`} method="POST">
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("⚠️ Are you sure you want to delete this job?")) {
            e.preventDefault();
          }
        }}
        className="inline-flex items-center gap-2 px-5 py-2.5
          text-sm font-medium text-white rounded-lg shadow-sm
          bg-gradient-to-r from-red-600 to-pink-600
          hover:from-red-700 hover:to-pink-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          transition-all duration-200"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </form>
  );
}
