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
        { type: "image", url: "/lovable-uploads/WhatsApp%20Image%202025-05-17%20at%2010.29.29.jpeg" },
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
    {
  id: 4,
  title: "Bathroom Interior Design",
  category: ["interior"],
  description: "Designed a bathroom with complete service—from 3D visuals and detailed drawings to cost estimation and construction support.",
  media: [
    { type: "image", url: "/lovable-uploads/3d3bf9fe-7919-4993-83dd-0e762368e9fd.jpg" },
     { type: "image", url: "/lovable-uploads/32d8f7d7-cba1-4481-b1fa-8e26e61df23b.jpg" },
      { type: "image", url: "/lovable-uploads/84fc3f40-8cc0-4bbd-91f1-068bf5f3e805.jpg" },
       { type: "image", url: "/lovable-uploads/af3524a2-9d0b-48a8-8b34-725032436e30.jpg" },
        { type: "image", url: "/lovable-uploads/b081c3e8-3619-44ae-8d87-9766b5317968.jpg" },
  ],
},
    {
      id: 5,
      title: "Single-Story House Renovation | Modern Makeover with Functional Design",
      category: ["exterior", "3d"],
      description: "A comprehensive renovation project featuring a modern single-story house with functional design, showcasing a light beige exterior with red-tiled hip roof, inviting porch with pergola-style roof, and practical carport integration.",
      media: [
        { type: "image", url: "/lovable-uploads/image.png" },
      ],
    },
    {
      id: 6,
      title: "Renovated 3-Storey House – Interior & Exterior Transformation!",
      category: ["interior", "exterior", "3d"],
      description: "A complete transformation of a 3-storey house featuring modern interior design with warm wooden accents, multi-layered false ceilings, and elegant furnishings. The project showcases both interior and exterior renovations with contemporary aesthetics.",
      media: [
        { type: "image", url: "/lovable-uploads/image%20copy.png" },
        { type: "image", url: "/lovable-uploads/image%20copy%202.png" },
        { type: "video", url: "/lovable-uploads/WhatsApp%20Video%202025-07-30%20at%2019.38.52.mp4" },
      ],
    },
    {
      id: 7,
      title: "New House 3 Storey Building",
      category: ["exterior", "3d"],
      description: "A stunning 3-storey building design showcasing modern architecture with innovative layout and contemporary aesthetics. This project demonstrates comprehensive 3D visualization and architectural planning.",
      media: [
        { type: "video", url: "/lovable-uploads/new%20house%203%20storey%20building.mp4" },
      ],
    },
    {
      id: 8,
      title: "Renovation Work",
      category: ["interior", "exterior", "3d"],
      description: "Comprehensive renovation project showcasing before and after transformations, highlighting the quality craftsmanship and attention to detail in modern renovation work.",
      media: [
        { type: "video", url: "/lovable-uploads/renovation%20work.mp4" },
      ],
    },
    {
      id: 9,
      title: "3 Storey House",
      category: ["exterior", "3d"],
      description: "A magnificent 3-storey house design featuring modern architecture with elegant proportions and sophisticated exterior detailing. This project showcases comprehensive 3D visualization and architectural excellence.",
      media: [
        { type: "video", url: "/lovable-uploads/3%20storey%20house.mp4" },
      ],
    },
    {
      id: 10,
      title: "Single Storey Budget House",
      category: ["exterior", "3d"],
      description: "An affordable single storey house design that maximizes functionality and style within budget constraints. This project demonstrates cost-effective architectural solutions with modern aesthetics.",
      media: [
        { type: "video", url: "/lovable-uploads/Sinhle%20storey%20budget%20house.mp4" },
      ],
    },
    {
      id: 11,
      title: "4 Storey Commercial Building",
      category: ["exterior", "3d"],
      description: "A sophisticated 4-storey commercial building design showcasing modern commercial architecture with functional layout and professional aesthetics. This project demonstrates comprehensive commercial development planning.",
      media: [
        { type: "video", url: "/lovable-uploads/commercialbuilding.mp4" },
      ],
    },
    {
      id: 12,
      title: "Bakery",
      category: ["interior", "exterior", "3d"],
      description: "A charming bakery design featuring warm and inviting interior spaces with functional commercial layout. This project showcases both interior and exterior design for a welcoming bakery environment.",
      media: [
        { type: "video", url: "/lovable-uploads/Bakery.mp4" },
      ],
    },
    {
      id: 13,
      title: "Two Storey Modern House",
      category: ["exterior", "3d"],
      description: "A contemporary two-storey modern house design featuring sleek architecture with innovative layout and sophisticated exterior detailing. This project showcases modern residential design excellence.",
      media: [
        { type: "video", url: "/lovable-uploads/Two%20storey%20modern%20house.mp4" },
      ],
    },
    {
      id: 14,
      title: "Single Storey House",
      category: ["exterior", "3d"],
      description: "A beautiful single storey house design featuring modern architecture with functional layout and elegant exterior detailing. This project demonstrates efficient use of space with contemporary aesthetics.",
      media: [
        { type: "video", url: "/lovable-uploads/Single%20storey%20house.mp4" },
      ],
    },
    {
      id: 15,
      title: "Three Storey Residential + Commercial Building",
      category: ["exterior", "3d"],
      description: "A sophisticated mixed-use building featuring three levels with commercial spaces on the ground floor and residential units above. The design showcases modern architecture with dynamic geometric patterns, warm color palette, and rooftop terrace with natural elements.",
      media: [
        { type: "image", url: "/lovable-uploads/Three%20storey%20residential%20%2B%20commercial%20building.jpeg" },
      ],
    },
    {
      id: 16,
      title: "New Two Storey House",
      category: ["exterior", "3d"],
      description: "A contemporary two-storey house featuring distinctive architecture with light blue and grey stone cladding, prominent arched window, and modern design elements. The house showcases clean lines, mixed textures, and harmonious integration with landscaped surroundings.",
      media: [
        { type: "image", url: "/lovable-uploads/image%20copy%203.png" },
      ],
    },
    {
      id: 17,
      title: "Renovation House",
      category: ["exterior", "3d"],
      description: "A modern two-story house renovation featuring white exterior walls with red-tiled hip roof, multiple windows with wooden frames, and extended balcony with decorative railing. The project showcases comprehensive landscaping with paved courtyard, green spaces, and natural vegetation integration.",
      media: [
        { type: "image", url: "/lovable-uploads/image%20copy%204.png" },
      ],
    },
    {
      id: 18,
      title: "New Two Storey House",
      category: ["exterior", "3d"],
      description: "A contemporary two-story house featuring light beige exterior with stacked stone cladding, pinkish-red tiled hip roof, and covered outdoor spaces. The design includes spacious porch and balcony areas with integrated lighting, surrounded by lush tropical landscaping.",
      media: [
        { type: "image", url: "/lovable-uploads/image%20copy%205.png" },
      ],
    },
    {
      id: 19,
      title: "Renovation Work + Moulding Work + IPanel",
      category: ["exterior", "3d"],
      description: "A detailed view of a house's exterior renovation showcasing modern design with covered porch and carport area. Features light beige walls, warm wooden slatted ceiling, reddish-brown tiled floor, dark wooden-framed windows with multiple panes, and matching double doors. Includes decorative white lattice structure and integration with lush landscaping.",
      media: [
        { type: "image", url: "/lovable-uploads/Renovation%20work%20%2B%20moulding%20work%20%2B%20ipannel.jpeg" },
      ],
    }

  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category.includes(activeFilter))

  // Debug logging
  console.log('Total projects:', projects.length)
  console.log('Filtered projects:', filteredProjects.length)
  console.log('Active filter:', activeFilter)

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
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-300 text-lg">No projects found for the selected filter.</p>
            </div>
          )}
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
                {project.media[0].type === "video" ? (
                  <div className="w-full h-full bg-gradient-to-br from-moduno-navy to-moduno-darknavy flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-moduno-blue/90 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-white"
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
                      <p className="text-white text-sm font-medium">Video Project</p>
                      <p className="text-moduno-blue text-xs mt-1">Click to play</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={project.media[0].url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = "/placeholder.svg";
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-moduno-darknavy to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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