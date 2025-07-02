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
    },
    {
      title: "Applications Received",
      value: totalReceivedApplications,
      icon: <FileText className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Jobs You Applied",
      value: totalAppliedJobs,
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="mt-24 mb-[2px] px-4">
      <div className="bg-white mx-auto max-w-6xl p-8" style={{borderTopRightRadius: "14px", borderTopLeftRadius: "14px",}}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          <span className="text-blue-700">Welcome back!</span> Here&#39;s your dashboard summary.
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((item) => (
            <div
              key={item.title}
              className={`rounded-xl p-5 flex items-center gap-4  ${item.bg}`}
            >
              <div className="p-3 rounded-full bg-white border">{item.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <p className="text-xl font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardHeroSection;
