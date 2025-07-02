import { prisma } from '@/lib/prisma';
import HomeJobSection from '@/Components/HomeSection/HomeSection';
import HeroSection from '@/Components/HomeSection/HeroSection';
import HomeCTASection from '@/Components/HomeSection/HomeCTASection';

export default async function HomePage() {
  const jobs = await prisma.job.findMany({
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
