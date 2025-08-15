import { ovo } from "@/lib/fonts";
import Image from "next/image";
import { assets } from "@/public/assets"

export default function AboutUs() {
  const teamMembers = [
    { name: "Muhammad Uzair", pic: assets.pic1, role: "Founder", accent: "from-blue-300 to-blue-200" },
    { name: "Muhammad Zakarya", pic: assets.pic2, role: "Chief Technology Officer", accent: "from-blue-300 to-blue-200" },
    { name: "Muhammad Danyal", pic: assets.pic3, role: "Head of Employer Success", accent: "from-blue-300 to-blue-200" },
    { name: "Muhammad Khan", pic: assets.pic4, role: "Lead Product Strategist", accent: "from-blue-300 to-blue-200" }
  ];

  const stats = [
    { value: "85K+", label: "Live job postings", trend: "↑15% this month" },
    { value: "1.2M+", label: "Successful hires", trend: "↑30% YoY" },
    { value: "12K+", label: "Hiring companies", trend: "↑20% YoY" },
    { value: "97%", label: "Employer satisfaction", trend: "Industry-leading" }
  ];

  return (
    <section className="min-h-screen bg-neutral-50 py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-28">
          <span className="inline-block mb-4 px-3 py-1.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600 tracking-wider">
            who we are
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Connecting <span className="font-medium text-blue-600">talent</span> with
            <br className="hidden xl:block" /> the right <span className="font-medium text-blue-600">opportunities</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className={`${ovo.className} text-xl text-gray-600 leading-relaxed`}>
              We’re building the most trusted job marketplace where employers find the perfect fit
              and professionals discover their next big career move — faster, smarter, and easier.
            </p>
          </div>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-sm transition-all hover:border-blue-100">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              {/* Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-normal text-gray-900 mb-4">Smart Job Matching</h3>
            <p className={`${ovo.className} text-gray-600 mb-4`}>
              We connect candidates and employers based on skills, experience, and job requirements for the best fit.
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium inline-flex items-center group">
              Learn more
              <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-sm transition-all hover:border-blue-100">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              {/* Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-normal text-gray-900 mb-4">Verified Employers</h3>
            <p className={`${ovo.className} text-gray-600 mb-4`}>
              Every company is vetted to ensure genuine job postings and trustworthy opportunities for all users.
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium inline-flex items-center group">
              View employer policies
              <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-sm transition-all hover:border-blue-100">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              {/* Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-normal text-gray-900 mb-4">Career Tools</h3>
            <p className={`${ovo.className} text-gray-600 mb-4`}>
              Resume builder, interview prep, networking tools, and market insights to give candidates a competitive edge.
            </p>
            <a href="#" className="text-blue-600 text-sm font-medium inline-flex items-center group">
              Explore tools
              <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-2">Our Leadership</h2>
              <p className="text-gray-600 max-w-xl">
                Experienced professionals from LinkedIn, Indeed, and top recruitment agencies
                leading the future of hiring.
              </p>
            </div>
            <button className="mt-6 md:mt-0 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
              Meet the team
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xs transition-all">
                <div className={`h-40 bg-gradient-to-br ${member.accent} relative`}>
                  <Image src={member.pic} alt="member image" className="absolute -bottom-8 object-cover left-6 w-16 h-16 rounded-xl bg-white border-4 border-white flex items-center justify-center text-2xl font-medium text-gray-900" />
                </div>
                <div className="pt-12 pb-6 px-6">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                <div className="mt-4 flex space-x-3">
                    <button
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                      aria-label="Visit Facebook profile"
                      title="Visit Facebook profile"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                      aria-label="Visit Twitter profile"
                      title="Visit Twitter profile"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-32">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Making hiring happen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-100">
                <p className="text-4xl font-light text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xs text-blue-600 mt-2">{stat.trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-light text-white mb-4">Hire better. Get hired faster.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Whether you’re a recruiter looking for top talent or a professional ready for your next role,
            our platform makes it happen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-7 py-3.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Post a job
            </button>
            <button className="px-7 py-3.5 bg-transparent text-white border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Browse jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
