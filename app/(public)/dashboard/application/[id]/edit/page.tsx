import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import ApplicationEditForm from "@/Components/dashboard/ApplicationEditForm";

export default async function EditApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/signin");

  const application = await prisma.application.findUnique({ where: { id } });
  if (!application || application.userId !== userId) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Edit Application</h1>
            <p className="text-blue-100 mt-1">Update your application details</p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <ApplicationEditForm
              applicationId={application.id}
              initial={{
                coverLetter: application.coverLetter,
                phoneNumber: application.phoneNumber,
                linkedin: application.linkedin,
                github: application.github,
                portfolio: application.portfolio,
                resumeUrl: application.resumeUrl,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


