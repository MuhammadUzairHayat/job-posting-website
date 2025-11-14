import React from "react";

const ContactMethods = () => {
  const contactMethods = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      description: "Our preferred contact method",
      details: "mduzairhayat@outlook.com",
      action: "Send message",
      href: "mailto:mduzairhayat@outlook.com",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone",
      description: "Saturday-Sunday from 8am to 5pm PST",
      details: "+92 (340) 438-3528",
      action: "Call now",
      href: "tel:03404383528",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      ),
      title: "Live Chat",
      description: "For instant support Saturday-Sunday",
      details: "Available 9AM - 6PM",
      action: "Start chat",
      href: "https://wa.me/923404383528",
    },
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-28 reveal stagger-6">
      {contactMethods.map((method, index) => (
        <div
          key={index}
          className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 hover:shadow-xs transition-all hover-lift shine-on-hover"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
            {method.icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-normal text-gray-900 mb-2 sm:mb-3">
            {method.title}
          </h3>
          <p className="text-gray-600 mb-3 sm:mb-4">{method.description}</p>
          <p className="text-gray-900 font-medium mb-6">{method.details}</p>
          <a
            href={method.href}
            className="text-blue-600 text-sm font-medium inline-flex items-center group"
          >
            {method.action}
            <svg
              className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContactMethods;
