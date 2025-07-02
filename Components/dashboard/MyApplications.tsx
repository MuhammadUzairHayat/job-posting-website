import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { statusColors } from "./ApplicationCard";
import DeleteApplicationMenu from "./DeleteApplicationMenu";

export default async function MyApplications() {
  const session = await auth();
  const currentUser = session?.user;

  const applications = await prisma.application.findMany({
    where: {
      userId: currentUser.id,
      isDeletedByUser: false
    },
    include: {
      job: true,
      user: true,
    },
  });

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <FaBriefcase className="text-5xl mb-4 text-gray-400" />
        <p className="text-lg font-medium">No Applications Found</p>
        <p className="text-sm text-gray-400">
          You haven’t applied for any jobs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="my-applications-container bg-white p-6 rounded-lg mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        My Applications
      </h2>

      <ul className="divide-y divide-gray-200">
        {applications.map((app) => (
          <li key={app.id} className="py-4 relative">
            <div className="">
              <div className="card-top-sect flex items-center gap-2 mb-4">
                <p className="font-medium text-gray-900">{app.job.title}</p>
                <span
                  className={`w-[min-content] text-xs font-medium px-3 py-1 rounded-full capitalize ${
                    statusColors[app.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <div className="absolute right-1 top-2">
                <DeleteApplicationMenu appId={app.id} />
              </div>
            </div>

            <div className="myCard-bottom-sect flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-600">{app.job.company}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>

              <Link
                href={`/jobs/${app.job.id}`}
                className="inline-block py-2 text-center text-xs bg-gradient-to-br to-indigo-700 from-blue-700 hover:to-blue-700 hover:from-indigo-700 text-white px-4 rounded-full hover:bg-blue-700 transition"
              >
                View Application
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
