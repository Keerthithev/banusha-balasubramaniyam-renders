
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import ProjectService, { Project } from "@/services/ProjectService";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(ProjectService.getProjects());
  }, []);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "3d", label: "3D Renderings" },
    { id: "interior", label: "Interior Design" },
    { id: "exterior", label: "Exterior Design" },
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

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            {projects.length === 0 ? (
              <>
                <p className="text-lg mb-4">No projects have been added yet.</p>
                <p className="text-gray-400">
                  Projects will appear here once they are added through the admin dashboard.
                </p>
              </>
            ) : (
              <p className="text-lg">No projects found in this category.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link 
                to={`/project/${project.id}`} 
                key={project.id}
                className="bg-moduno-darknavy rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-2 duration-300"
              >
                <div className="h-52 overflow-hidden">
                  {project.images.length > 0 ? (
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-moduno-navy h-full flex items-center justify-center">
                      <span className="text-moduno-yellow text-lg font-medium">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.category.map((cat, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-moduno-navy rounded-full text-xs uppercase"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
