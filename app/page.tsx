import { prisma } from '@/lib/prisma';
import HomeJobSection from '@/Components/HomeSection/HomeSection';
import HeroSection from '@/Components/HomeSection/HeroSection';
import HomeCTASection from '@/Components/HomeSection/HomeCTASection';
import { JobCardProps } from '@/lib/props';
// import { auth } from '@/lib/auth';

export default async function HomePage() {
  // const session = await auth()
  // console.log("Session User", session?.user)
  const jobs: JobCardProps["job"][] = await prisma.job.findMany({
    orderBy: { postedAt: 'desc' },
    include: {postedBy: true},
    take: 4,
  });


  return (
    <main>
      {/* Other homepage content */}
      <HeroSection />
      <HomeJobSection jobs={jobs} />
      <HomeCTASection />
    </main>
  );
}
