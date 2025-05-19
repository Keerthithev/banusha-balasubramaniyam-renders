import React, { useState } from "react";
import { cn } from "@/lib/utils";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "3d", label: "3D Renderings" },
    { id: "interior", label: "Interior Design" },
    { id: "exterior", label: "Exterior Design" },
  ];

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
      description:
        "Stylish and personalized room interior featuring optimized layout, lighting, and decor elements.",
      media: [
        { type: "image", url: "/lovable-uploads/room.jpg" },
        { type: "video", url: "/lovable-uploads/VIDEO-2025-05-09-16-58-40.mp4" },
      ],
    },
    {
      id: 3,
      title: "TV Wall Decoration",
      category: ["interior"],
      description:
        "Modern TV wall decor with panel accents and ambient lighting for a sleek living room upgrade.",
      media: [
        { type: "image", url: "/lovable-uploads/tv.jpg" },
        { type: "video", url: "/lovable-uploads/VIDEO-2025-05-10-07-39-25.mp4" },
      ],
    },
    // {
    //   id: 4,
    //   title: "General Interior Design Projects",
    //   category: ["interior"],
    //   description:
    //     "Collection of interior design works across various spaces, showcasing creativity, comfort, and modern styling.",
    //   media: [
    //     { type: "image", url: "/lovable-uploads/interior1.jpg" },
    //     { type: "image", url: "/lovable-uploads/interior2.jpg" },
    //   ],
    // },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category.includes(activeFilter));

  const openModal = (project) => {
    setActiveProject(project);
    setActiveMediaIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveProject(null);
  };

  const nextMedia = () => {
    setActiveMediaIndex((prev) =>
      prev + 1 < activeProject.media.length ? prev + 1 : 0
    );
  };

  const prevMedia = () => {
    setActiveMediaIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : activeProject.media.length - 1
    );
  };

  return (
    <section
      id="portfolio"
      className="bg-moduno-navy text-white section-padding"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold inline-block heading-underline mx-auto after:left-1/2 after:-translate-x-1/2 after:bg-moduno-blue">
            Portfolio
          </h2>
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto">
            Explore our collection of 3D renders, interior designs, and
            architectural visualizations, showcasing the quality and creativity
            we bring to every project.
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
                  ? "bg-moduno-blue text-moduno-navy font-semibold"
                  : "bg-moduno-darknavy text-white hover:bg-moduno-navy"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-moduno-darknavy rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-2 duration-300 cursor-pointer"
              onClick={() => openModal(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') openModal(project); }}
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={project.media[0].url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-moduno-navy rounded-full text-xs uppercase"
                    >
                      {cat === "3d"
                        ? "3D Rendering"
                        : cat === "interior"
                        ? "Interior"
                        : "Exterior"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && activeProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full bg-moduno-darknavy rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent modal close on content click
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-moduno-blue transition"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="relative">
              {activeProject.media[activeMediaIndex].type === "image" ? (
                <img
                  src={activeProject.media[activeMediaIndex].url}
                  alt={`${activeProject.title} media`}
                  className="w-full max-h-[70vh] object-contain bg-black"
                />
              ) : (
                <video
                  controls
                  className="w-full max-h-[70vh] bg-black"
                  src={activeProject.media[activeMediaIndex].url}
                />
              )}

              {/* Navigation */}
              {activeProject.media.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-moduno-blue bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full"
                    aria-label="Previous media"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-moduno-blue bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full"
                    aria-label="Next media"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="p-4 text-white bg-moduno-navy">
              <h3 className="font-bold text-xl">{activeProject.title}</h3>
              <p>{activeProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
