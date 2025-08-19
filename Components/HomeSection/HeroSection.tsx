"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden mt-[4rem] bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 py-16 sm:py-24 md:py-28">
      {/* Decorative background shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl hero-float" />
        <div className="absolute top-10 -right-24 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl hero-float" />
        {/* Soft horizon glow */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-28 bg-white/60 blur-2xl" />
        {/* Small decorative dots */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-blue-300/50 hero-pulse" />
        <div className="absolute top-32 left-24 w-1.5 h-1.5 rounded-full bg-indigo-300/60 hero-pulse" />
        <div className="absolute top-16 right-28 w-1.5 h-1.5 rounded-full bg-blue-300/60 hero-pulse" />
        <div className="absolute bottom-16 right-16 w-2 h-2 rounded-full bg-indigo-300/50 hero-pulse" />

        {/* Progress path line */}
        <svg
          className="absolute left-6 bottom-10 w-40 h-32 text-blue-400/30 hero-float"
          viewBox="0 0 160 128"
          fill="none"
        >
          <path
            d="M4 120 C 32 96, 64 88, 90 72 C 118 54, 132 36, 156 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="156" cy="16" r="3" fill="currentColor" />
        </svg>

        {/* Upward chevrons (career growth) */}
        <div className="absolute right-10 bottom-14 space-y-1 opacity-30 text-indigo-500 hero-float">
          <div className="[letter-spacing:.15em] font-semibold">› › ›</div>
          <div className="[letter-spacing:.15em] font-semibold">› › ›</div>
          <div className="[letter-spacing:.15em] font-semibold">› › ›</div>
        </div>

        {/* Subtle bar chart */}
        <div className="absolute left-10 bottom-8 flex items-end gap-1.5 opacity-40 hero-pulse">
          <div className="w-1.5 h-3 rounded bg-blue-400/40" />
          <div className="w-1.5 h-4 rounded bg-blue-400/40" />
          <div className="w-1.5 h-6 rounded bg-blue-500/50" />
          <div className="w-1.5 h-9 rounded bg-indigo-500/60" />
        </div>

        {/* Concentric rings */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-20 hero-pulse">
          <div className="w-24 h-24 rounded-full border border-white/40" />
          <div className="absolute inset-2 rounded-full border border-white/30" />
          <div className="absolute inset-4 rounded-full border border-white/20" />
        </div>

        {/* Diagonal accent lines */}
        <div className="absolute -top-6 right-20 rotate-12 opacity-20 hero-float">
          <div className="w-24 h-[2px] bg-white/40 mb-2" />
          <div className="w-16 h-[2px] bg-white/30 mb-2" />
          <div className="w-20 h-[2px] bg-white/20" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center reveal">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl
         font-bold text-gray-900 leading-tight mb-6"
        >
          Discover Your Next <span className="text-blue-600 font-extrabold">Career Move</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Find jobs that match your skills and interests. Join thousands of
          professionals growing their careers on our platform.
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
