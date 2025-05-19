"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      id: 1,
      title: "3D Rendering",
      description:
        "Transform your architectural designs into photorealistic 3D visuals that bring your projects to life before construction begins.",
      icon: "🏠",
    },
    {
      id: 2,
      title: "Interior Design",
      description:
        "Custom room design, space planning, furniture selection, and lighting designs tailored to your preferences and needs.",
      icon: "🛋️",
    },
    {
      id: 3,
      title: "Exterior Design",
      description:
        "Landscape design, outdoor living spaces, garden design, and exterior home makeovers to enhance curb appeal.",
      icon: "🌳",
    },
    {
      id: 4,
      title: "2D to 3D Conversion",
      description:
        "Convert your 2D blueprints and floor plans into detailed 3D models and visualizations for better project understanding.",
      icon: "📐",
    },
    {
      id: 5,
      title: "Civil Engineering",
      description:
        "Professional civil engineering services including structural design, site planning, and technical consultations.",
      icon: "🏗️",
    },
    {
      id: 6,
      title: "Renovation Consulting",
      description: "Expert advice and planning for renovation projects to maximize space and enhance functionality.",
      icon: "🔨",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block pb-3 mb-4">
            Our Services
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-moduno-blue"></span>
          </h2>
          <p className="text-gray-700 mt-6 max-w-3xl mx-auto text-lg">
            At Moduno PVT Ltd, we offer a comprehensive range of design and visualization services to bring your
            architectural and interior design visions to life.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-moduno-blue/20 group"
              variants={itemVariants}
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-moduno-navy group-hover:text-moduno-blue transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services