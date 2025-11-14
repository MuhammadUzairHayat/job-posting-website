"use client";
import { ovo } from "@/lib/fonts";
import Image from "next/image";
import { assets } from "@/public/assets";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Muhammad Uzair",
      pic: assets.myPic,
      role: "Founder",
      accent: "from-blue-300 to-blue-200",
      linkedin: "https://linkedin.com/in/muhammad-uzair", // 🔗 add your real link
      twitter: "https://twitter.com/muhammad-uzair", // 🔗 add your real link
    },
    {
      name: "Muhammad Zakarya",
      pic: assets.pic2,
      role: "Chief Technology Officer",
      accent: "from-blue-300 to-blue-200",
      linkedin: "https://linkedin.com/in/muhammad-zakarya",
      twitter: "https://twitter.com/muhammad-zakarya",
    },
    {
      name: "Muhammad Danyal",
      pic: assets.pic3,
      role: "Head of Employer Success",
      accent: "from-blue-300 to-blue-200",
      linkedin: "https://linkedin.com/in/muhammad-danyal",
      twitter: "https://twitter.com/muhammad-danyal",
    },
    {
      name: "Muhammad Khan",
      pic: assets.pic4,
      role: "Lead Product Strategist",
      accent: "from-blue-300 to-blue-200",
      linkedin: "https://linkedin.com/in/muhammad-khan",
      twitter: "https://twitter.com/muhammad-khan",
    },
  ];

  const stats = [
    { value: "10+", label: "Job postings listed", trend: "Growing daily" },
    {
      value: "5+",
      label: "Registered job seekers",
      trend: "Actively applying",
    },
    {
      value: "2+",
      label: "Companies onboarded",
      trend: "Expanding network",
    },
    {
      value: "100%",
      label: "Free to post & apply",
      trend: "Early access offer",
    },
  ];

  return (
    <section className="min-h-screen bg-neutral-50 py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <span className="inline-block mb-4 px-3 py-1.5 text-xs font-medium  rounded-full bg-blue-50 text-blue-600 tracking-wider">
            WHO WE ARE
          </span>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Connecting <span className="font-medium text-blue-600">talent</span>{" "}
            with
            <br className="hidden xl:block" /> the right{" "}
            <span className="font-medium text-blue-600">opportunities</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <p
              className={`${ovo.className} text-xl text-gray-600 leading-relaxed`}
            >
              We’re building the most trusted job marketplace where employers
              find the perfect fit and professionals discover their next big
              career move — faster, smarter, and easier.
            </p>
          </div>
        </motion.div>

        {/* Value Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32  reveal stagger-6"
        >
          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-sm transition-all hover:border-blue-100 hover-lift shine-on-hover">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              {/* Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-normal text-gray-900 mb-4">
              Smart Job Matching
            </h3>
            <p className={`${ovo.className} text-gray-600 mb-4`}>
              We connect candidates and employers based on skills, experience,
              and job requirements for the best fit.
            </p>
            <a
              href="#"
              className="text-blue-600 text-sm font-medium inline-flex items-center group"
            >
              Learn more
              <svg
                className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-sm transition-all hover:border-blue-100 hover-lift shine-on-hover">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              {/* Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-normal text-gray-900 mb-4">
              Verified Employers
            </h3>
            <p className={`${ovo.className} text-gray-600 mb-4`}>
              Every company is vetted to ensure genuine job postings and
              trustworthy opportunities for all users.
            </p>
            <a
              href="#"
              className="text-blue-600 text-sm font-medium inline-flex items-center group"
            >
              View employer policies
              <svg
                className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-sm transition-all hover:border-blue-100 hover-lift shine-on-hover">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              {/* Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-normal text-gray-900 mb-4">
              Career Tools
            </h3>
            <p className={`${ovo.className} text-gray-600 mb-4`}>
              Resume builder, interview prep, networking tools, and market
              insights to give candidates a competitive edge.
            </p>
            <a
              href="#"
              className="text-blue-600 text-sm font-medium inline-flex items-center group"
            >
              Explore tools
              <svg
                className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Leadership */}
        {/* Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-32 reveal"
        >
          {" "}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-2">
                Our Leadership
              </h2>
              <p className="text-gray-600 max-w-xl">
                Experienced professionals from LinkedIn, Indeed, and top
                recruitment agencies leading the future of hiring.
              </p>
            </div>
            <button className="mt-6 md:mt-0 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
              Meet the team
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal stagger-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative group"
              >
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Floating circles */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400/10 rounded-full blur-lg"></div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>

                  {/* Geometric shapes */}
                  <div className="absolute top-10 right-12 w-8 h-8 bg-blue-300/20 rounded-lg rotate-45"></div>
                  {/* <div className="absolute bottom-8 left-10 w-6 h-6 bg-blue-400/25 rounded-full"></div> */}

                  {/* Animated floating particles */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-300/30 rounded-full animate-float"
                      style={{
                        top: `${Math.random() * 40}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: `${4 + i * 0.5}s`,
                      }}
                    ></div>
                  ))}
                </div>

                <div
                  className={`h-40 bg-gradient-to-br ${member.accent} relative `}
                >
                  {/* Animated wave effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer"></div>
                  </div>

                  <Image
                    src={member.pic}
                    alt="member image"
                    className="absolute -bottom-8 object-cover left-6 w-16 h-16 rounded-xl bg-white border-4 border-white flex items-center justify-center text-2xl font-medium text-gray-900 shadow-lg group-hover:scale-105 transition-transform duration-300 z-[1000]"
                  />
                </div>

                <div className="pt-12 pb-6 px-6 relative">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 relative">
                    {member.name}
                    {/* Underline animation on hover */}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{member.role}</p>

                  <div className="mt-4 flex space-x-3">
                    <button
                      className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 group/icon relative overflow-hidden"
                      aria-label="Visit Facebook profile"
                      title="Visit Facebook profile"
                    >
                      {/* Icon background effect */}
                      <div className="absolute inset-0 cursor-pointer bg-blue-200 rounded-full scale-0 group-hover/icon:scale-100 transition-transform duration-300"></div>
                      <svg
                        className="w-4 h-4 relative z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </button>

                    <button
                      className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 group/icon relative overflow-hidden"
                      aria-label="Visit Twitter profile"
                      title="Visit Twitter profile"
                    >
                      {/* Icon background effect */}
                      <div className="absolute inset-0 bg-blue-200 rounded-full scale-0 group-hover/icon:scale-100 transition-transform duration-300"></div>
                      <svg
                        className="w-4 h-4 relative z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to your global CSS */}
                <style jsx>{`
                  @keyframes float {
                    0% {
                      transform: translateY(0) rotate(0deg);
                      opacity: 0.7;
                    }
                    50% {
                      transform: translateY(-15px) rotate(5deg);
                      opacity: 1;
                    }
                    100% {
                      transform: translateY(0) rotate(0deg);
                      opacity: 0.7;
                    }
                  }
                  @keyframes shimmer {
                    0% {
                      transform: translateX(-100%) skewX(-15deg);
                    }
                    100% {
                      transform: translateX(200%) skewX(-15deg);
                    }
                  }
                  .animate-float {
                    animation: float 4s infinite;
                  }
                  .animate-shimmer {
                    animation: shimmer 2s infinite;
                  }
                `}</style>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-32 reveal"
        >
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">
            Making hiring happen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal stagger-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100"
              >
                <p className="text-4xl font-light text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xs text-blue-600 mt-2">{stat.trend}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-light text-white mb-4">
            Hire better. Get hired faster.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Whether you’re a recruiter looking for top talent or a professional
            ready for your next role, our platform makes it happen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={"./postJob"}
              className="px-7 py-3.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Post a job
            </Link>
            <Link
              href={"./jobs"}
              className="px-7 py-3.5 bg-transparent text-white border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Browse jobs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
