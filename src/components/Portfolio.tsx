"use client"

import { useState } from "react"

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all")

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
      description: "Full Exterior design for a functional 1000 sq. ft. house, blending modern aesthetics and efficient use of space.",
      image: "/lovable-uploads/WhatsApp%20Image%202025-05-17%20at%2010.29.29.jpeg"
    },
    {
      id: 2,
      title: "Room Interior Design",
      category: ["interior"],
      description: "Stylish and personalized room interior featuring optimized layout, lighting, and decor elements.",
      image: "/lovable-uploads/room.jpg"
    },
    {
      id: 3,
      title: "TV Wall Decoration",
      category: ["interior"],
      description: "Modern TV wall decor with panel accents and ambient lighting for a sleek living room upgrade.",
      image: "/lovable-uploads/tv.jpg"
    },
    {
      id: 4,
      title: "Bathroom Interior Design",
      category: ["interior"],
      description: "Designed a bathroom with complete service—from 3D visuals and detailed drawings to cost estimation and construction support.",
      image: "/lovable-uploads/3d3bf9fe-7919-4993-83dd-0e762368e9fd.jpg"
    },
    {
      id: 5,
      title: "Single-Story House Renovation",
      category: ["exterior", "3d"],
      description: "A comprehensive renovation project featuring a modern single-story house with functional design.",
      image: "/lovable-uploads/image.png"
    },
    {
      id: 6,
      title: "Renovated 3-Storey House",
      category: ["interior", "exterior", "3d"],
      description: "A complete transformation of a 3-storey house featuring modern interior design with warm wooden accents.",
      image: "/lovable-uploads/image%20copy.png"
    },
    {
      id: 7,
      title: "New House 3 Storey Building",
      category: ["exterior", "3d"],
      description: "A stunning 3-storey building design showcasing modern architecture with innovative layout.",
      image: "/lovable-uploads/new%20house%203%20storey%20building.mp4"
    },
    {
      id: 8,
      title: "Renovation Work",
      category: ["interior", "exterior", "3d"],
      description: "Comprehensive renovation project showcasing before and after transformations.",
      image: "/lovable-uploads/renovation%20work.mp4"
    },
    {
      id: 9,
      title: "3 Storey House",
      category: ["exterior", "3d"],
      description: "A magnificent 3-storey house design featuring modern architecture with elegant proportions.",
      image: "/lovable-uploads/3%20storey%20house.mp4"
    },
    {
      id: 10,
      title: "Single Storey Budget House",
      category: ["exterior", "3d"],
      description: "An affordable single storey house design that maximizes functionality and style within budget constraints.",
      image: "/lovable-uploads/Sinhle%20storey%20budget%20house.mp4"
    },
    {
      id: 11,
      title: "4 Storey Commercial Building",
      category: ["exterior", "3d"],
      description: "A sophisticated 4-storey commercial building design showcasing modern commercial architecture.",
      image: "/lovable-uploads/commercialbuilding.mp4"
    },
    {
      id: 12,
      title: "Bakery",
      category: ["interior", "exterior", "3d"],
      description: "A charming bakery design featuring warm and inviting interior spaces with functional commercial layout.",
      image: "/lovable-uploads/Bakery.mp4"
    },
    {
      id: 13,
      title: "Two Storey Modern House",
      category: ["exterior", "3d"],
      description: "A contemporary two-storey modern house design featuring sleek architecture with innovative layout.",
      image: "/lovable-uploads/Two%20storey%20modern%20house.mp4"
    },
    {
      id: 14,
      title: "Single Storey House",
      category: ["exterior", "3d"],
      description: "A beautiful single storey house design featuring modern architecture with functional layout.",
      image: "/lovable-uploads/Single%20storey%20house.mp4"
    },
    {
      id: 15,
      title: "Three Storey Residential + Commercial Building",
      category: ["exterior", "3d"],
      description: "A sophisticated mixed-use building featuring three levels with commercial spaces on the ground floor.",
      image: "/lovable-uploads/Three%20storey%20residential%20%2B%20commercial%20building.jpeg"
    },
    {
      id: 16,
      title: "New Two Storey House",
      category: ["exterior", "3d"],
      description: "A contemporary two-storey house featuring distinctive architecture with light blue and grey stone cladding.",
      image: "/lovable-uploads/image%20copy%203.png"
    },
    {
      id: 17,
      title: "Renovation House",
      category: ["exterior", "3d"],
      description: "A modern two-story house renovation featuring white exterior walls with red-tiled hip roof.",
      image: "/lovable-uploads/image%20copy%204.png"
    },
    {
      id: 18,
      title: "New Two Storey House",
      category: ["exterior", "3d"],
      description: "A contemporary two-story house featuring light beige exterior with stacked stone cladding.",
      image: "/lovable-uploads/image%20copy%205.png"
    },
    {
      id: 19,
      title: "Renovation Work + Moulding Work + IPanel",
      category: ["exterior", "3d"],
      description: "A detailed view of a house's exterior renovation showcasing modern design with covered porch and carport area.",
      image: "/lovable-uploads/Renovation%20work%20%2B%20moulding%20work%20%2B%20ipannel.jpeg"
    }
  ]

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter((project) => project.category.includes(activeFilter))

  return (
    <section id="portfolio" className="bg-moduno-navy text-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block pb-3 mb-4">
            Portfolio
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-moduno-blue"></span>
          </h2>
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-lg">
            Explore our collection of 3D renders, interior designs, and architectural visualizations.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                activeFilter === filter.id
                  ? "bg-moduno-blue text-moduno-navy shadow-lg scale-105"
                  : "bg-moduno-darknavy text-white hover:bg-moduno-navy"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Debug Info */}
        <div className="text-center py-4 text-white text-sm mb-8">
          Total projects: {projects.length} | Filtered: {filteredProjects.length} | Filter: {activeFilter}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-300 text-lg">No projects found for the selected filter.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-moduno-darknavy rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group"
              >
                {/* Project Image/Video */}
                <div className="h-64 overflow-hidden relative">
                  {project.image.endsWith('.mp4') ? (
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
                      src={project.image}
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

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-moduno-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.category.map((cat) => (
                      <span key={cat} className="px-3 py-1 bg-moduno-navy rounded-full text-xs uppercase font-medium">
                        {cat === "3d" ? "3D Rendering" : cat === "interior" ? "Interior" : "Exterior"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Portfolio