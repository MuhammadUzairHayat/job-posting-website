'use client';

import Link from 'next/link';
import { Briefcase, UserPlus, ShieldCheck } from 'lucide-react';

export default function HomeCTASection() {
  return (
    <section className="relative overflow-hidden text-white py-20 sm:py-24 px-6 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-40 bg-white/5 blur-2xl" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center reveal">
        <span className="inline-block mb-4 px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 ring-1 ring-white/20 tracking-wider">
          OUR PROMISE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Empowering Careers, <span className="text-blue-300">One Job</span> at a Time
        </h2>
        <p className="text-base sm:text-lg text-blue-100/90 max-w-3xl mx-auto mt-4">
          Whether you&#39;re a job seeker or an employer, our platform connects you with the right opportunities and people — faster, easier, smarter.
        </p>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 text-left max-w-5xl mx-auto mt-10 reveal stagger-6">
          <div className="group relative rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm p-5 transition-all hover:bg-white/[0.07] hover:translate-y-[-2px] hover-lift shine-on-hover">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-yellow-400/20 text-yellow-300 ring-1 ring-yellow-300/30 p-2">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Verified Jobs</h4>
                <p className="text-sm text-blue-100/90 mt-1">Only genuine openings from trusted companies — curated and verified.</p>
              </div>
            </div>
          </div>
          <div className="group relative rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm p-5 transition-all hover:bg-white/[0.07] hover:translate-y-[-2px] hover-lift shine-on-hover">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-green-400/20 text-green-300 ring-1 ring-green-300/30 p-2">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Easy Apply</h4>
                <p className="text-sm text-blue-100/90 mt-1">Apply in a click with your saved resume and profile — no friction.</p>
              </div>
            </div>
          </div>
          <div className="group relative rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm p-5 transition-all hover:bg-white/[0.07] hover:translate-y-[-2px] hover-lift shine-on-hover">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-purple-400/20 text-purple-300 ring-1 ring-purple-300/30 p-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Secure & Private</h4>
                <p className="text-sm text-blue-100/90 mt-1">Your data is encrypted and protected — you control what&#39;s shared.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 reveal">
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 shadow-sm ring-1 ring-blue-200 transition"
          >
            Who we are
          </Link>
        </div>
      </div>
    </section>
  );
}
