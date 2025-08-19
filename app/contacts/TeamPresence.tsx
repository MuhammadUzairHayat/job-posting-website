import { CheckCircleIcon, ClockIcon, GlobeIcon } from "lucide-react";
import React from "react";

function SupportIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

const TeamPresence = () => {
  return (
    <>
      {/* Team Presence Section */}
      <div className="mt-16 sm:mt-28">
        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8 text-center">
          Our Global Presence
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="min-h-[18rem] sm:h-96 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <GlobeIcon className="w-14 h-14 sm:w-20 sm:h-20 text-blue-500 mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 sm:mb-4">
              Borderless by Design
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              We&apos;re a fully remote team collaborating across timezones to
              deliver seamless service 24/5. Our distributed model allows us to
              work when you&apos;re awake, regardless of where you&apos;re
              located.
            </p>
            <div className="flex items-center justify-center mt-8 sm:mt-14 text-sm sm:text-base">
              <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
              GLOBAL TEAM, ALWAYS HERE.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 md:divide-x divide-gray-100">
            {[
              {
                title: "Support Coverage",
                content: "24/5 customer support across all timezones",
                icon: <SupportIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />,
              },
              {
                title: "Response Time",
                content: "Typically replies within 2 business hours",
                icon: <ClockIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />,
              },
              {
                title: "Contact",
                content: "Available via email, chat, and video calls",
                icon: <ChatIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />,
              },
            ].map((item, index) => (
              <div key={index} className="p-6 sm:p-8 text-center">
                <div className="flex justify-center mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-normal text-gray-900 mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPresence;
