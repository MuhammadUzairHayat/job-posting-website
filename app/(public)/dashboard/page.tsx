import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardHeroSection from "@/Components/dashboard/DashboardHeroSection";
import { ApplicationCardProps, JobCardProps } from "@/lib/props";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import UserDetail from "@/Components/dashboard/UserDetail";

export default async function DashboardPage() {
  const session = await auth();
  const currentUser = session?.user;
  // let activeTab = "";

  if (!currentUser)
    return <div className="mt-24 text-center">Please login</div>;

  // Fetch full user profile data
  const userProfile = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      phone: true,
      location: true,
      jobTitle: true,
      bio: true,
      companyName: true,
      companyWebsite: true,
      companySize: true,
      industry: true,
      linkedinUrl: true,
      githubUrl: true,
      portfolioUrl: true,
    },
  });

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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
      <UserDetail user={currentUser} />
      <DashboardHeroSection
        totalPostedJobs={myJobs.length}
        totalReceivedApplications={jobsApplications.length}
        totalAppliedJobs={myApplications.length}
      />

      <DashboardTabs
        jobs={myJobs}
        applicationsToMyJobs={jobsApplications}
        myApplications={myApplications}
        user={userProfile}
      />
    </div>
  );
}
