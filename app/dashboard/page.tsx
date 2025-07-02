import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardContent from "@/Components/dashboard/DashboardContent";
import DashboardHeroSection from "@/Components/dashboard/DashboardHeroSection";

export default async function DashboardPage() {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return <div className="mt-24 text-center">Please login</div>;

  // ✅ Fetch your posted jobs
  const myJobs = await prisma.job.findMany({
    where: { postedById: currentUser.id },
    include: { postedBy: true },
    orderBy: { postedAt: "desc" },
  });

  // ✅ Fetch applications to your jobs
  const jobsApplications = await prisma.application.findMany({
    where: {
      jobId: { in: myJobs.map((job) => job.id) },
      isDeletedByEmployer: false
    },
    include: {
      job: true,
      user: true,
    },
    orderBy: { appliedAt: "desc" },
  });

  // ✅ Fetch jobs *you* have applied to
  const myApplications = await prisma.application.findMany({
    where: {
      userId: currentUser.id,
      isDeletedByUser: false
    },
  });

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
