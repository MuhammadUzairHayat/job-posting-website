import Link from "next/link";
import React from "react";

const CTASection = () => {
  return (
    <div className="mt-16 text-center">
      <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-10">
        <h3 className="text-2xl font-medium text-gray-900 mb-4">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our support team is available 24/7 to help you with any questions or
          issues.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contacts#messageUs"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
          <a
            href="tel:03404383528"
            className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Text Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
