
import React from "react";

const About = () => {
  return (
    <section id="about" className="bg-moduno-lightgray section-padding">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              {/* This would be your profile photo */}
              <div className="bg-moduno-navy h-80 flex items-center justify-center">
                <img
        src="/lovable-uploads/profile.jpg" // Replace with your actual image path
        alt="Profile"
        className="h-full object-cover"
      />
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 heading-underline">About Me</h2>
            
            <h3 className="text-xl font-semibold mb-4">Banusha Balasubramaniyam</h3>
            
            <p className="text-gray-700 mb-4">
              I am the founder of Moduno PVT Ltd, specializing in 3D rendering and civil engineering design services. 
              With a passion for bringing architectural visions to life, I create stunning 3D visualizations that help clients 
              see their projects before construction begins.
            </p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Education:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Currently pursuing Degree in Civil Engineering at ICBT in BCC</li>
                <li>HND Graduate from BACS Campus, Jaffna</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-moduno-navy text-white rounded-full text-sm">3D Rendering</span>
                <span className="px-3 py-1 bg-moduno-navy text-white rounded-full text-sm">Lumion</span>
                <span className="px-3 py-1 bg-moduno-navy text-white rounded-full text-sm">SketchUp</span>
                <span className="px-3 py-1 bg-moduno-navy text-white rounded-full text-sm">2D to 3D Conversion</span>
                <span className="px-3 py-1 bg-moduno-navy text-white rounded-full text-sm">Civil Engineering</span>
                <span className="px-3 py-1 bg-moduno-navy text-white rounded-full text-sm">Interior Design</span>
              </div>
            </div>
            
            <a 
              href="#contact"
              className="inline-block px-6 py-3 bg-moduno-blue text-moduno-navy font-bold rounded-md hover:bg-moduno-navy hover:text-white transition-colors duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
