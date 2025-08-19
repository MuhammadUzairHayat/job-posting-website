import React from 'react'

const HeroSection = () => {
  return (
    <div className="text-center mb-12 sm:mb-20 px-4">
          <span className="inline-block mb-4 px-3 py-1.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600 tracking-wider">
            CONTACT US
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-4 sm:mb-6 leading-tight">
            Get in <span className="font-medium text-blue-600">touch</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              We&apos;re here to help and answer any questions you might have.
            </p>
          </div>
        </div>
  )
}

export default HeroSection
