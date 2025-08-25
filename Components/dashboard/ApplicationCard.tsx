import React from "react";
import { Briefcase, CalendarCheck, Eye } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import DeleteApplicationMenu from "./DeleteApplicationMenu";
import { ApplicationCardProps } from "@/lib/props";

export const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  viewed: "bg-blue-100 text-blue-700",
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const handleView = async () => {
    if (application.status !== "pending") {
      return;
    }

    try {
      const res = await fetch(`/api/applications/${application.id}/view`, {
        method: "PATCH",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status");
      }
    } catch (err) {
      console.error(err || "Something went wrong");
    }
  };
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition">
      {/* Header */}
      <header className="flex justify-between items-start mb-4">
        <div>
          <h3 className="flex gap-2 items-center text-lg font-semibold text-gray-800">
            {application.job.title}
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                statusColors[application.status ?? ""] || "bg-gray-100 text-gray-600"
              }`}
            >
              {application.status}
            </span>
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {application.job.company}
          </p>
        </div>
        <DeleteApplicationMenu appId={application.id} />
      </header>

      <div className="card-bottom-sect flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <Image
            src={application.user.image || "/default-avatar.png"}
            alt={application?.user?.name || "User Avatar"}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">
              {application.user.name}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarCheck className="w-3 h-3" />
              Applied{" "}
              {formatDistanceToNow(new Date(application.appliedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {/* Action */}

        <Link
          onClick={handleView}
          href={{
            pathname: `/dashboard/application/${application.id}`,
            query: { id: application.id },
          }}
          className="flex items-center gap-2 mt-2 text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          <Eye className="w-4 h-4" /> View
        </Link>
      </div>
    </div>
  );
};

export default ApplicationCard;
