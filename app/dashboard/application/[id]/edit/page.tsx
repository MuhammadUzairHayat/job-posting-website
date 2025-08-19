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
    <div className="max-w-3xl mx-auto my-24 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6">Edit Application</h1>
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
  );
}


