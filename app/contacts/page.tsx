"use client";

import HeroSection from "@/app/contacts/HeroSection";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import ContactMethods from "./ContactMethods";
import TeamPresence from "./TeamPresence";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ContactPage() {
const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.2 });
const { ref: methodsRef, inView: methodsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.2 });
const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General inquiry",
    number: phone,
    message: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          number: phone,
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "General inquiry",
          number: "",
          message: "",
          consent: false,
        });
        setPhone("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      alert("Error sending message. Please try again later.");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <section className="min-h-screen bg-neutral-50 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
              x: 0,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.7, delay: 0, ease: "easeOut" },
            },
          }}
        >
          <HeroSection />
        </motion.div>
        {/* Contact Methods - Microsoft-style cards */}
        <motion.div
          ref={methodsRef}
          initial="hidden"
          animate={methodsInView ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              y: -40,
              x: 0,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
            },
          }}
        >
          <ContactMethods />
        </motion.div>
        {/* Contact Form - Google-style */}
        <h2
          id="messageUs"
          className="text-2xl sm:text-3xl font-light text-center mb-8 sm:mb-12 text-gray-900"
        >
          Send us a message
        </h2>{" "}
        <motion.div
          ref={formRef}
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
              x: 0,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.7, delay: 0.4, ease: "easeOut" },
            },
          }}
        >
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column */}
              <div className="p-6 sm:p-8 lg:p-12 bg-gray-50">
                <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6">
                  About yourself
                </h2>
                <p className="text-gray-600 mb-8">
                  Have a specific question? Fill out this form and our team will
                  get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Muhammad Uzair"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label> */}
                    <PhoneInput
                      country={"pk"}
                      value={phone}
                      onChange={(p) => setPhone(p)}
                      containerClass="w-full"
                      inputClass="!w-full !py-2.5 !pl-12 !pr-4 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="bg-white">
                {/* Left Column */}
                <div className="p-6 sm:p-8 lg:p-12 bg-gray-50">
                  <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6">
                    Your message
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      >
                        <option value="General inquiry">General inquiry</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Partnerships">Partnerships</option>
                      </select>
                    </div>
                    {/* Other input fields with similar modifications... */}
                  </div>
                </div>

                {/* Right Column */}
                <div className="p-6 sm:p-8 lg:p-12">
                  <div className="h-full flex flex-col">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      ></textarea>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-start gap-2 mb-6">
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          required
                        />
                        <label
                          htmlFor="consent"
                          className="block text-sm text-gray-600"
                        >
                          I agree to the privacy policy and terms of service
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full px-6 py-3.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        disabled={!formData.consent}
                      >
                        Send message
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
        <motion.div
          ref={teamRef}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              y: -40,
              x: 0,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.7, delay: 0.2, ease: "easeOut" },
            },
          }}
        >
          <TeamPresence />
        </motion.div>
      </div>
    </section>
  );
}
