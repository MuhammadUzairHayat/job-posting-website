import Link from 'next/link'
import React from 'react'

type EditButtonProps = {
  jobId: string;
};

const EditButton = ({ jobId }: EditButtonProps) => {
  return (
    <Link
  href={`/edit-job/${jobId}`}
  className="inline-flex items-center gap-2 px-5 py-2.5
    text-sm font-medium text-white rounded-lg shadow-sm
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:from-blue-700 hover:to-indigo-700
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    transition-all duration-200"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 5h6m2 2l-9 9-4 1 1-4 9-9z"
    />
  </svg>
  Edit
</Link>

  )
}

export default EditButton
