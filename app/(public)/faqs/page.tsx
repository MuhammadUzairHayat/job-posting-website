import CTASection from "./CTASection";
import FaqAccordion from "./FaqAccordion";


export default function FAQPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-3 py-1.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600 tracking-wider">
            HELP CENTER
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Frequently Asked <span className="font-medium">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our services and
            platform.
          </p>
        </div>

        <FaqAccordion />

        <CTASection />
      </div>
    </section>
  );
}
