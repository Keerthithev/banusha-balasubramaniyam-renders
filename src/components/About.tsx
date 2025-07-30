"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="bg-gray-50 py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-moduno-navy/70 to-transparent z-10"></div>
              <img
                src="/lovable-uploads/profile.jpg"
                alt="Banusha Balasubramaniyam"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white">Banusha Balasubramaniyam</h3>
                <p className="text-moduno-blue font-medium">Founder & Lead Designer</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block pb-3">
              About Me
              <span className="absolute bottom-0 left-0 w-24 h-1 bg-moduno-blue"></span>
            </h2>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              I am the founder of Moduno PVT Ltd, specializing in 3D rendering and civil engineering design services.
              With a passion for bringing architectural visions to life, I create stunning 3D visualizations that help
              clients see their projects before construction begins.
            </p>

            <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-semibold mb-3 text-moduno-navy text-lg">Education:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Currently pursuing Degree in Civil Engineering at ICBT in BCC</li>
                <li>HND Graduate from BACS Campus, Jaffna</li>
              </ul>
            </div>

            <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-semibold mb-3 text-moduno-navy text-lg">Employment:</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-moduno-blue pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-gray-800">Propertied</h5>
                    <span className="text-sm text-gray-500">Apr 2025 - Present</span>
                  </div>
                  <p className="text-moduno-blue font-medium">Moduno (Pvt) Ltd, Thellipalai</p>
                </div>
                
                <div className="border-l-4 border-moduno-blue pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-gray-800">Technical Officer, Assistant Accountant & Draughtsman</h5>
                    <span className="text-sm text-gray-500">Jul 2024 - Apr 2025</span>
                  </div>
                  <p className="text-moduno-blue font-medium">Myl Construction & Engineering, Sri Lanka</p>
                </div>
                
                <div className="border-l-4 border-moduno-blue pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-gray-800">Internship Trainee</h5>
                    <span className="text-sm text-gray-500">Feb 2024 - May 2024</span>
                  </div>
                  <p className="text-moduno-blue font-medium">Department of Buildings, Northern Province, Sri Lanka</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold mb-4 text-moduno-navy text-lg">Skills:</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "3D Rendering",
                  "Lumion",
                  "SketchUp",
                  "2D to 3D Conversion",
                  "Civil Engineering",
                  "Interior Design",
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="px-4 py-2 bg-moduno-navy text-white rounded-full text-sm font-medium shadow-md hover:bg-moduno-blue hover:text-moduno-navy transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-moduno-blue text-moduno-navy font-bold rounded-lg hover:bg-moduno-navy hover:text-white transition-colors duration-300 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About