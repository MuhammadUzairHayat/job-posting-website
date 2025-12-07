import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Briefcase, Building2, Users, Globe, Github, Linkedin, Calendar, Mail } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;

  // Fetch user details with their posted jobs
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      companyName: true,
      companyWebsite: true,
      companySize: true,
      industry: true,
      jobTitle: true,
      linkedinUrl: true,
      githubUrl: true,
      portfolioUrl: true,
      bio: true,
      location: true,
      jobs: {
        where: {
          isBlocked: false,
          isHidden: false,
        },
        orderBy: {
          postedAt: "desc",
        },
        take: 10,
      },
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 mt-12">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 mb-6">
              <div className="relative">
                <Image
                  src={user.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name || user.email) + "&size=128&background=4F46E5&color=fff&bold=true"}
                  alt={user.name || "User"}
                  width={128}
                  height={128}
                  className="rounded-full border-4 border-white shadow-lg object-cover"
                />
                {user.role === "admin" && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
                    👑 Admin
                  </div>
                )}
              </div>
              
              {/* Name and Title */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {user.name || "Unknown User"}
                </h1>
                {user.jobTitle && (
                  <p className="text-lg text-gray-600 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {user.jobTitle}
                  </p>
                )}
                {user.companyName && (
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4" />
                    {user.companyName}
                  </p>
                )}
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {user.location && (
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.industry && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  <span>{user.industry}</span>
                </div>
              )}
              
              {user.companySize && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>{user.companySize} employees</span>
                </div>
              )}
              
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-blue-500" />
                <a href={`mailto:${user.email}`} className="hover:text-blue-600 transition-colors">
                  {user.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {user.companyWebsite && (
                <a
                  href={user.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">Website</span>
                </a>
              )}
              
              {user.linkedinUrl && (
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-blue-700"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              )}
              
              {user.githubUrl && (
                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors text-white"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              )}
              
              {user.portfolioUrl && (
                <a
                  href={user.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors text-purple-700"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Posted Jobs Section */}
        {user.jobs.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-500" />
              Posted Jobs ({user.jobs.length})
            </h2>
            
            <div className="space-y-4">
              {user.jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                      {job.title}
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-1">
                        Rs {job.salary.toLocaleString()}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {user.jobs.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Posted Yet</h3>
            <p className="text-gray-500">This user hasn&apos;t posted any jobs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
