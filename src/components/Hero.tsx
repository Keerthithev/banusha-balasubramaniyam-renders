"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import DownloadButton from "./DownloadButton"
import ResumeDownloadButton from "./ResumeDownloadButton"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-moduno-navy overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: isLoaded ? 1.1 : 1.2, opacity: isLoaded ? 0.3 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{
            backgroundImage: "url('/lovable-uploads/PHOTO-2025-04-02-19-53-28.jpg')",
          }}
        />
      </div>

      {/* Glass container */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl backdrop-blur-md bg-white/5 rounded-2xl p-10 md:p-16 shadow-2xl border border-white/10"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="block">Bringing</span>
            <motion.span
              className="text-moduno-blue"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Your ideas
            </motion.span>
            <span className="block">to life</span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Professional 3D rendering services by Banusha Balasubramaniyam. Transforming 2D drawings into stunning 3D
            visualizations using Lumion and SketchUp.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a
              href="#services"
              className="px-8 py-3 bg-moduno-blue text-moduno-navy font-semibold rounded-lg shadow hover:bg-white hover:text-moduno-blue transition duration-300 ease-in-out text-center group"
            >
              <span className="relative inline-flex items-center">
                Our Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
            <a
              href="#portfolio"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-moduno-navy transition duration-300 ease-in-out text-center"
            >
              View Portfolio
            </a>
            <ResumeDownloadButton className="sm:hidden" />
            <DownloadButton className="sm:hidden" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-moduno-darknavy to-transparent" />

      {/* Floating download buttons on desktop */}
      <motion.div
        className="hidden sm:block absolute bottom-10 right-10 z-20 flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <ResumeDownloadButton className="shadow-xl" />
        <DownloadButton className="shadow-xl" />
      </motion.div>
    </section>
  )
}

export default Hero