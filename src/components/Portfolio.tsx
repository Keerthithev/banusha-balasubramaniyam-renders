
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "3d", label: "3D Renderings" },
    { id: "interior", label: "Interior Design" },
    { id: "exterior", label: "Exterior Design" },
  ];

  // These would be replaced with your actual project images
  const projects = [
    {
      id: 1,
      title: "Modern Living Room",
      category: ["3d", "interior"],
      imagePlaceholder: "bg-moduno-navy",
      description: "3D rendering of a contemporary living room with open concept design."
    },
    {
      id: 2,
      title: "Luxury Villa Exterior",
      category: ["3d", "exterior"],
      imagePlaceholder: "bg-moduno-darknavy",
      description: "Exterior visualization of a luxury villa with swimming pool."
    },
    {
      id: 3,
      title: "Kitchen Renovation",
      category: ["interior"],
      imagePlaceholder: "bg-moduno-navy",
      description: "Clean, modern kitchen design with island and premium appliances."
    },
    {
      id: 4,
      title: "Garden Landscape",
      category: ["exterior"],
      imagePlaceholder: "bg-moduno-darknavy",
      description: "Lush garden landscape design with outdoor seating area."
    },
    {
      id: 5,
      title: "Office Space",
      category: ["3d", "interior"],
      imagePlaceholder: "bg-moduno-navy",
      description: "3D visualization of a corporate office space with ergonomic design."
    },
    {
      id: 6,
      title: "Residential Complex",
      category: ["3d", "exterior"],
      imagePlaceholder: "bg-moduno-darknavy",
      description: "3D rendering of a multi-unit residential complex with modern amenities."
    },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter));

  return (
    <section id="portfolio" className="bg-moduno-navy text-white section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold inline-block heading-underline mx-auto after:left-1/2 after:-translate-x-1/2 after:bg-moduno-yellow">
            Portfolio
          </h2>
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
            Explore our collection of 3D renders, interior designs, and architectural visualizations, showcasing the quality and creativity we bring to every project.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors",
                activeFilter === filter.id
                  ? "bg-moduno-yellow text-moduno-navy font-semibold"
                  : "bg-moduno-darknavy text-white hover:bg-moduno-navy"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-moduno-darknavy rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-2 duration-300">
              <div className={`${project.imagePlaceholder} h-52 flex items-center justify-center`}>
                <span className="text-moduno-yellow text-lg font-medium">Project Image</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-2">
                  {project.category.map((cat) => (
                    <span 
                      key={cat} 
                      className="px-3 py-1 bg-moduno-navy rounded-full text-xs uppercase"
                    >
                      {cat === "3d" ? "3D Rendering" : cat === "interior" ? "Interior" : "Exterior"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
