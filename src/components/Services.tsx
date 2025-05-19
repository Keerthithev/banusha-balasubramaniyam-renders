
import React from "react";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "3D Rendering",
      description: "Transform your architectural designs into photorealistic 3D visuals that bring your projects to life before construction begins.",
      icon: "🏠"
    },
    {
      id: 2,
      title: "Interior Design",
      description: "Custom room design, space planning, furniture selection, and lighting designs tailored to your preferences and needs.",
      icon: "🛋️"
    },
    {
      id: 3,
      title: "Exterior Design",
      description: "Landscape design, outdoor living spaces, garden design, and exterior home makeovers to enhance curb appeal.",
      icon: "🌳"
    },
    {
      id: 4,
      title: "2D to 3D Conversion",
      description: "Convert your 2D blueprints and floor plans into detailed 3D models and visualizations for better project understanding.",
      icon: "📐"
    },
    {
      id: 5,
      title: "Civil Engineering",
      description: "Professional civil engineering services including structural design, site planning, and technical consultations.",
      icon: "🏗️"
    },
    {
      id: 6,
      title: "Renovation Consulting",
      description: "Expert advice and planning for renovation projects to maximize space and enhance functionality.",
      icon: "🔨"
    }
  ];

  return (
    <section id="services" className="bg-white section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold inline-block heading-underline mx-auto after:left-1/2 after:-translate-x-1/2">Our Services</h2>
          <p className="text-gray-700 mt-6 max-w-3xl mx-auto">
            At Moduno PVT Ltd, we offer a comprehensive range of design and visualization services to bring your architectural and interior design visions to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
