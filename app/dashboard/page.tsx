import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardContent from "@/Components/dashboard/DashboardContent";
import DashboardHeroSection from "@/Components/dashboard/DashboardHeroSection";
import { ApplicationCardProps, JobCardProps } from "@/lib/props";

export default async function DashboardPage() {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser)
    return <div className="mt-24 text-center">Please login</div>;

  const myJobs: JobCardProps["job"][] = await prisma.job.findMany({
    where: { postedById: currentUser.id },
    include: { postedBy: true },
    orderBy: { postedAt: "desc" },
  });

  const jobsApplications: ApplicationCardProps["application"][] =
    (await prisma.application.findMany({
      where: {
        jobId: { in: myJobs.map((job) => job.id) },
        isDeletedByEmployer: false,
      },
      include: {
        job: {
          include: {
            postedBy: true,
          },
        },
        user: true,
      },
      orderBy: { appliedAt: "desc" },
    })) || null;

  // ✅ Fetch jobs *you* have applied to
  const myApplications: ApplicationCardProps["application"][] =
    await prisma.application.findMany({
      where: {
        userId: currentUser.id,
        isDeletedByUser: false,
      },
      include: {
        job: {
          include: {
            postedBy: true,
          },
        },
        user: true,
      },
    });

  // console.log("Applicants Applications: "+jobsApplications)
  // console.log("jobs Posted: ", myJobs)
  return (
    <>
      <DashboardHeroSection
        totalPostedJobs={myJobs.length}
        totalReceivedApplications={jobsApplications.length}
        totalAppliedJobs={myApplications.length}
      />

      <DashboardContent jobs={myJobs} applications={jobsApplications} />
    </>
  );
}
