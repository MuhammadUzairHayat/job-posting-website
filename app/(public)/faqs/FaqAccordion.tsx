"use client";
import { useState } from "react";

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an account on your platform?",
      answer:
        "Click the 'Sign Up' button in the top right corner, enter your email, create a password, and complete your profile information. You'll receive a verification email to activate your account.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are securely processed through our payment gateway partners.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page, enter your registered email address, and you'll receive a password reset link. The link expires in 24 hours for security.",
    },
    {
      question: "What's your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee for all annual subscriptions. Monthly plans can be canceled anytime with no further charges, but no refunds for partial months.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our 24/7 support team through the live chat icon in the bottom right of your screen, or email support@yourcompany.com. Average response time is under 24 hours.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees. The price you see includes all applicable taxes. We're transparent about costs and will never charge you without explicit consent.",
    },
  ];
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
          >
            <h3 className="text-lg md:text-xl font-medium text-gray-900">
              {faq.question}
            </h3>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`px-6 pb-6 pt-0 transition-all duration-200 ${
              activeIndex === index ? "block" : "hidden"
            }`}
          >
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
