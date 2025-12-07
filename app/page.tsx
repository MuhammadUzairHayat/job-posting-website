import { prisma } from '@/lib/prisma';
import HomeJobSection from '@/Components/HomeSection/HomeSection';
import HeroSection from '@/Components/HomeSection/HeroSection';
import HomeCTASection from '@/Components/HomeSection/HomeCTASection';
import { JobCardProps } from '@/lib/props';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';
// import { auth } from '@/lib/auth';

export default async function HomePage() {
  // const session = await auth()
  // console.log("Session User", session?.user)
  const jobs: JobCardProps["job"][] = await prisma.job.findMany({
    orderBy: { postedAt: 'desc' },
    include: {postedBy: true},
    take: 6,
  });


  return (
    <main>
      {/* Other homepage content */}
      <Navbar />
      <HeroSection />
      <HomeJobSection jobs={jobs} />
      <HomeCTASection />
      <Footer />
    </main>
  );
}
