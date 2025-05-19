"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "3d", label: "3D Renderings" },
    { id: "interior", label: "Interior Design" },
    { id: "exterior", label: "Exterior Design" },
  ]

  const projects = [
    {
      id: 1,
      title: "1000 Sq. Ft. House Exterior",
      category: ["exterior", "3d"],
      description:
        "Full Exterior design for a functional 1000 sq. ft. house, blending modern aesthetics and efficient use of space.",
      media: [
        { type: "image", url: "/lovable-uploads/WhatsApp Image 2025-05-17 at 10.29.29.jpeg" },
        { type: "image", url: "/lovable-uploads/PHOTO-2025-05-17-10-29-29.jpg" },
        { type: "video", url: "/lovable-uploads/VIDEO-2025-05-17-10-30-03.mp4" },
      ],
    },
    {
      id: 2,
      title: "Room Interior Design",
      category: ["interior"],
      description: "Stylish and personalized room interior featuring optimized layout, lighting, and decor elements.",
      media: [
        { type: "image", url: "/lovable-uploads/room.jpg" },
        { type: "video", url: "/lovable-uploads/VIDEO-2025-05-09-16-58-40.mp4" },
      ],
    },
    {
      id: 3,
      title: "TV Wall Decoration",
      category: ["interior"],
      description: "Modern TV wall decor with panel accents and ambient lighting for a sleek living room upgrade.",
      media: [
        { type: "image", url: "/lovable-uploads/tv.jpg" },
        { type: "video", url: "/lovable-uploads/VIDEO-2025-05-10-07-39-25.mp4" },
      ],
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category.includes(activeFilter))

  const openModal = (project) => {
    setActiveProject(project)
    setActiveMediaIndex(0)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    setActiveProject(null)
    document.body.style.overflow = "auto"
  }

  const nextMedia = (e) => {
    e.stopPropagation()
    setActiveMediaIndex((prev) => (prev + 1 < activeProject.media.length ? prev + 1 : 0))
  }

  const prevMedia = (e) => {
    e.stopPropagation()
    setActiveMediaIndex((prev) => (prev - 1 >= 0 ? prev - 1 : activeProject.media.length - 1))
  }

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
    <section id="portfolio" className="bg-moduno-navy text-white py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block pb-3 mb-4">
            Portfolio
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-moduno-blue"></span>
          </h2>
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg">
            Explore our collection of 3D renders, interior designs, and architectural visualizations, showcasing the
            quality and creativity we bring to every project.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-6 py-3 rounded-full transition-all duration-300 font-medium",
                activeFilter === filter.id
                  ? "bg-moduno-blue text-moduno-navy shadow-lg scale-105"
                  : "bg-moduno-darknavy text-white hover:bg-moduno-navy",
              )}
              whileHover={{ scale: activeFilter === filter.id ? 1.05 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-moduno-darknavy rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group"
              onClick={() => openModal(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") openModal(project)
              }}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={project.media[0].url || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moduno-darknavy to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.media[0].type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-moduno-blue/80 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 group-hover:text-moduno-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.category.map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-moduno-navy rounded-full text-xs uppercase font-medium">
                      {cat === "3d" ? "3D Rendering" : cat === "interior" ? "Interior" : "Exterior"}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-moduno-darknavy rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-moduno-navy/80 hover:bg-moduno-blue text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative bg-black">
                {activeProject.media[activeMediaIndex].type === "image" ? (
                  <img
                    src={activeProject.media[activeMediaIndex].url || "/placeholder.svg"}
                    alt={`${activeProject.title} media`}
                    className="w-full max-h-[70vh] object-contain mx-auto"
                  />
                ) : (
                  <video
                    controls
                    autoPlay
                    className="w-full max-h-[70vh]"
                    src={activeProject.media[activeMediaIndex].url}
                  />
                )}

                {/* Media counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {activeMediaIndex + 1} / {activeProject.media.length}
                </div>

                {/* Navigation */}
                {activeProject.media.length > 1 && (
                  <>
                    <button
                      onClick={prevMedia}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-moduno-blue/80 hover:bg-moduno-blue text-white p-3 rounded-full transition-colors duration-300"
                      aria-label="Previous media"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextMedia}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-moduno-blue/80 hover:bg-moduno-blue text-white p-3 rounded-full transition-colors duration-300"
                      aria-label="Next media"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div className="p-6 text-white">
                <h3 className="font-bold text-2xl mb-2 text-moduno-blue">{activeProject.title}</h3>
                <p className="text-gray-300 mb-4">{activeProject.description}</p>

                {/* Thumbnails */}
                {activeProject.media.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {activeProject.media.map((media, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveMediaIndex(index)
                        }}
                        className={cn(
                          "w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all",
                          activeMediaIndex === index
                            ? "border-moduno-blue scale-105"
                            : "border-transparent opacity-70 hover:opacity-100",
                        )}
                      >
                        {media.type === "image" ? (
                          <img src={media.url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-moduno-navy flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Portfolio