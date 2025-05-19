import React from "react";
import DownloadButton from "./DownloadButton";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-moduno-navy overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-110 blur-sm"
          style={{
            backgroundImage: "url('/lovable-uploads/PHOTO-2025-04-02-19-53-28.jpg')",
          }}
        />
      </div>

      {/* Glass container */}
      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl backdrop-blur-md bg-white/5 rounded-2xl p-10 md:p-16 shadow-2xl animate-fade-in border border-white/10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
            <span className="block">Bringing</span>
            <span className="text-moduno-blue">Your ideas</span>
            <span className="block">to life</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">
            Professional 3D rendering services by Banusha Balasubramaniyam. Transforming 2D
            drawings into stunning 3D visualizations using Lumion and SketchUp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="px-8 py-3 bg-moduno-blue text-moduno-navy font-semibold rounded-lg shadow hover:bg-white hover:text-moduno-blue transition duration-300 ease-in-out text-center"
            >
              Our Services
            </a>
            <a
              href="#portfolio"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-moduno-navy transition duration-300 ease-in-out text-center"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-moduno-darknavy to-transparent" />
    </section>
  );
};

export default Hero;
