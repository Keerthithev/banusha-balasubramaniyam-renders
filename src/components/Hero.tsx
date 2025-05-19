
import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-moduno-navy flex items-center"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/lovable-uploads/32076377-c33a-4a0f-8351-04cf8ee1653f.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Bringing</span>
            <br />
            <span className="text-moduno-yellow">Your ideas</span>
            <br />
            <span className="text-white">to life</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
            Professional 3D rendering services by Banusha Balasubramaniyam.
            Transforming 2D drawings into stunning 3D visualizations with Lumion and SketchUp.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="px-8 py-3 bg-moduno-yellow text-moduno-navy font-bold rounded-md hover:bg-white transition-colors duration-300 text-center"
            >
              Our Services
            </a>
            <a
              href="#portfolio"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white/10 transition-colors duration-300 text-center"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-moduno-darknavy to-transparent" />
    </section>
  );
};

export default Hero;
