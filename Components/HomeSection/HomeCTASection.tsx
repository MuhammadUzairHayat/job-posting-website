'use client';

import Link from 'next/link';
import { Briefcase, UserPlus, ShieldCheck } from 'lucide-react';

export default function HomeCTASection() {
  return (
    <section className="bg-gradient-to-tr from-blue-950 to-blue-800 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Empowering Careers, One Job at a Time
        </h2>
        <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-14">
          Whether you&#39;re a job seeker or an employer, our platform is designed to connect you with the right opportunities and people — faster, easier, smarter.
        </p>

        <div className="grid sm:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mb-12">
          <div className="flex items-start gap-4">
            <Briefcase className="text-yellow-400 w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Verified Jobs</h4>
              <p className="text-sm text-gray-300">We only list genuine and verified job openings from trusted companies.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <UserPlus className="text-green-400 w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Easy Apply</h4>
              <p className="text-sm text-gray-300">Apply to jobs quickly with one-click resume submissions.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldCheck className="text-purple-400 w-6 h-6 mt-1" />
            <div>
              <h4 className="font-semibold text-white">Secure & Private</h4>
              <p className="text-sm text-gray-300">Your data is encrypted and protected — always.</p>
            </div>
          </div>
        </div>

        <Link
          href="/about"
          className="inline-block bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 mt-4 transition"
        >
          Who we Are
        </Link>
      </div>
    </section>
  );
}
