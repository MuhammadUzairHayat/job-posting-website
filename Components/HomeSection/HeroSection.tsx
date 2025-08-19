'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="mt-[4rem] bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 py-16 sm:py-24 md:py-28">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Discover Your Next <span className="text-blue-600">Career Move</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Find jobs that match your skills and interests. Join thousands of professionals growing their careers on our platform.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>
          <Link
            href="/postJob"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-50 transition"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
}
