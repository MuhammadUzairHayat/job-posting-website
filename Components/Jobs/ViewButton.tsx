import Link from 'next/link'
import React from 'react'

interface  jobIDProp {
    jobId: string
}
const ViewButton = ({jobId}: jobIDProp) => {
  return (
    <Link
          href={`/jobs/${jobId}`}
          prefetch={true}
          className="w-full sm:w-auto text-center text-sm bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-purple-700 transition"
        >
          View Job
        </Link>
  )
}

export default ViewButton
