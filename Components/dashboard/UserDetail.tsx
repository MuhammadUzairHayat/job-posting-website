import { User } from "@/lib/props";
import Image from "next/image";
import React from "react";

const UserDetail = ({ user }: { user: User }) => {
  return (
    <div className="relative overflow-hidden isolate">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none mt-24 -z-10">
        {/* Large circle in top right */}
        <div 
          className="absolute top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-xl"
          aria-hidden="true"
        />
        
        {/* Medium circle in bottom left */}
        <div 
          className="absolute top-24 -left-16 w-32 h-32 bg-gradient-to-tr from-blue-400/15 to-indigo-500/15 rounded-full blur-lg"
          aria-hidden="true"
        />
        
        {/* Small decorative circles */}
        <div className="absolute top-8 right-32 w-6 h-6 bg-white/10 rounded-full" aria-hidden="true" />
        <div className="absolute top-16 right-16 w-4 h-4 bg-white/8 rounded-full" aria-hidden="true" />
        <div className="absolute bottom-8 left-32 w-5 h-5 bg-white/6 rounded-full" aria-hidden="true" />
        
        {/* Geometric shapes */}
        <div 
          className="absolute top-1/14 left-8 w-8 h-8 bg-gradient-to-br from-indigo-300/20 to-purple-400/20 transform rotate-45"
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-1/3 right-12 w-6 h-6 bg-gradient-to-tl from-blue-300/15 to-indigo-400/15 transform rotate-12"
          aria-hidden="true"
        />
        
        {/* Wave-like shape */}
        <div 
          className="absolute top-12 left-0 w-full h-24 bg-gradient-to-r from-indigo-600/10 via-purple-500/10 to-indigo-600/10 transform -skew-y-3"
          aria-hidden="true"
        />
      </div>

      {/* Main content container */}
      <div className="relative bg-gradient-to-br from-[#442dd7e7] via-[#372aacb9] to-[#372aacde] mt-24 rounded-t-xl px-4 sm:px-6 py-6 sm:py-8 shadow-2xl overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white/5 rounded-full" />
          <div className="absolute top-8 right-8 w-1 h-1 bg-white/5 rounded-full" />
          <div className="absolute bottom-4 left-12 w-1.5 h-1.5 bg-white/5 rounded-full" />
          <div className="absolute bottom-8 right-4 w-1 h-1 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white/5 rounded-full" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/5 rounded-full" />
        </div>
        
        {/* Profile content */}
        <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Profile image with animated border */}
          <div className="relative group">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full p-0.5 animate-pulse group-hover:animate-none group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-indigo-400 transition-all duration-500"
              aria-hidden="true"
            />
            <Image
              className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 sm:border-[3px] border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
              src={user.image || "/default-avatar.png"}
              alt={`Profile picture of ${user.name || "user"}`}
              width={96}
              height={96}
              sizes="(max-width: 640px) 80px, 96px"
              priority
            />
          </div>
          
          {/* User info */}
          <div className="text-center sm:text-left min-w-0 space-y-1.5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-words drop-shadow-sm">
              {user.name || "Your Name"}
            </h1>
            <p className="text-indigo-100 text-sm sm:text-base break-all sm:break-normal drop-shadow-sm">
              {user.email}
            </p>
            
            {/* Status indicator */}
            {/* {user.status && (
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className={`h-2 w-2 rounded-full ${
                  user.status === 'active' ? 'bg-emerald-400' : 
                  user.status === 'inactive' ? 'bg-amber-400' : 'bg-gray-400'
                }`} />
                <span className="text-xs text-indigo-100 capitalize">
                  {user.status}
                </span>
              </div>
            )} */}
            
            {/* Decorative divider */}
          </div>
        </div>
        
        {/* Bottom decorative border */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default UserDetail;