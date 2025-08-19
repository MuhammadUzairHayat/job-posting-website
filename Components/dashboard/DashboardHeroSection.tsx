"use client";

import React from "react";
import { Briefcase, FileText, UserCheck } from "lucide-react";

interface DashboardHeroSectionProps {
  totalPostedJobs: number;
  totalReceivedApplications: number;
  totalAppliedJobs: number;
}

const DashboardHeroSection: React.FC<DashboardHeroSectionProps> = ({
  totalPostedJobs,
  totalReceivedApplications,
  totalAppliedJobs,
}) => {
  const stats = [
    {
      title: "Posted Jobs",
      value: totalPostedJobs,
      icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-50",
      bc: "border-indigo-200"
    },
    {
      title: "Applications Received",
      value: totalReceivedApplications,
      icon: <FileText className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
      bc: "border-green-200",
    },
    {
      title: "Jobs You Applied",
      value: totalAppliedJobs,
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
      bc: "border-blue-200",
    },
  ];

  return (
    <section className="mb-[2px] reveal">
      <div className="bg-white mx-auto max-w-7xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 mb-6">
          <span className="text-blue-700 font-medium">Welcome back!</span> Here&#39;s your summary.
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 reveal stagger-6">
          {stats.map((item) => (
            <div
              key={item.title}
              className={`rounded-xl p-4 sm:p-5 flex items-center gap-4 shine-on-hover ${item.bg}`}
            >
              <div className={`p-2 sm:p-3 rounded-full bg-white border ${item.bc}`}>{item.icon}</div>
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">{item.title}</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardHeroSection;
