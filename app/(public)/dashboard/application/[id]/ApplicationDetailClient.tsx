"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Phone, 
  FileText, 
  Linkedin, 
  Github, 
  Globe, 
  MessageCircle,
  Mail,
  Edit,
  ExternalLink
} from "lucide-react";
import { ovo } from "@/lib/fonts";
import { statusColors } from "@/Components/dashboard/ApplicationCard";
import { useChat } from "@/Context/ChatContext";

interface Application {
  id: string;
  appliedAt: Date;
  status: string | null;
  phoneNumber: string | null;
  resumeUrl: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  coverLetter: string | null;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    jobTitle: string | null;
  };
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    postedById: string;
    postedBy: {
      id: string;
      name: string | null;
      email: string;
    };
  };
}

interface Props {
  application: Application;
  isOwner: boolean;
  isJobPoster: boolean;
}

export default function ApplicationDetailClient({ application, isOwner, isJobPoster }: Props) {
  const { setIsOpen, setSelectedUser } = useChat();

  const handleStartChat = () => {
    // If job poster viewing applicant, chat with applicant
    // If applicant viewing their own application, chat with job poster
    const chatUser = isJobPoster ? application.user : application.job.postedBy;
    
    setSelectedUser({
      id: chatUser.id,
      name: chatUser.name,
      email: chatUser.email,
      image: chatUser.id === application.user.id ? application.user.image : null,
      jobTitle: chatUser.id === application.user.id ? application.user.jobTitle : null,
    });
    setIsOpen(true);
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!application.resumeUrl) return;
    e.preventDefault();
    window.open(application.resumeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mt-16">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6"
        >
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={application.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(application.user.name || application.user.email)}&size=80&background=4F46E5&color=fff&bold=true`}
                    alt={application.user.name || "Applicant"}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {application.user.name || "Anonymous Applicant"}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-blue-100">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {application.user.email}
                    </span>
                    {application.user.jobTitle && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {application.user.jobTitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Chat Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartChat}
                className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Start Chat
              </motion.button>
            </div>
          </div>

          {/* Application Info */}
          <div className="px-6 sm:px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-medium">Position</span>
                </div>
                <p className="text-gray-900 font-semibold">{application.job.title}</p>
                <p className="text-sm text-gray-600">{application.job.company}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Location & Type</span>
                </div>
                <p className="text-gray-900 font-semibold">{application.job.location}</p>
                <p className="text-sm text-gray-600">{application.job.type}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Applied Date</span>
                </div>
                <p className="text-gray-900 font-semibold">
                  {new Date(application.appliedAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                  statusColors[application.status ?? "pending"] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {application.status
                  ? application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)
                  : "Pending"}
              </span>
            </div>
            {isOwner && (
              <Link
                href={`/dashboard/application/${application.id}/edit`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
              >
                <Edit className="w-4 h-4" />
                Edit Application
              </Link>
            )}
          </div>
        </motion.div>

        {/* Contact Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-indigo-600" />
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {application.phoneNumber && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Phone Number</p>
                  <p className="text-gray-900 font-semibold">{application.phoneNumber}</p>
                </div>
              </div>
            )}

            {application.resumeUrl && (
              <button
                onClick={handleResumeClick}
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all group cursor-pointer text-left"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Resume / CV</p>
                  <p className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Resume
                    <ExternalLink className="w-4 h-4" />
                  </p>
                </div>
              </button>
            )}

            {application.linkedin && (
              <a
                href={application.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all group"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">LinkedIn</p>
                  <p className="text-blue-600 font-semibold flex items-center gap-2">
                    View Profile
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </a>
            )}

            {application.github && (
              <a
                href={application.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-400 transition-all group"
              >
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">GitHub</p>
                  <p className="text-gray-900 font-semibold flex items-center gap-2">
                    View Profile
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </a>
            )}

            {application.portfolio && (
              <a
                href={application.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all group"
              >
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Globe className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-medium">Portfolio</p>
                  <p className="text-indigo-600 font-semibold flex items-center gap-2">
                    Visit Website
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </div>
              </a>
            )}
          </div>
        </motion.div>

        {/* Cover Letter Card */}
        {application.coverLetter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Cover Letter
            </h2>
            <div
              className={`${ovo.className} prose prose-lg prose-blue max-w-none border border-gray-200 rounded-xl p-6 bg-gray-50 text-gray-800 leading-relaxed`}
              dangerouslySetInnerHTML={{ __html: application.coverLetter }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
