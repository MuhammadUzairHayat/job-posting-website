import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import EditJobForm from "@/Components/EditJobForm/EditJobForm";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const {id} = await params
  const job = await prisma.job.findUnique({
    where: { id: id },
  });

  if (!job) return notFound();
  if (job.postedById !== currentUserId) return notFound();

  async function updateJob(data: {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
  }) {
    "use server";
    await prisma.job.update({
      where: { id: id },
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        type: data.type,
        salary: data.salary ? parseInt(data.salary) : null,
        description: data.description,
      },
    });
    redirect(`/jobs/${id}`);
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <EditJobForm job={job} onSubmit={updateJob} />
    </div>
  );
}