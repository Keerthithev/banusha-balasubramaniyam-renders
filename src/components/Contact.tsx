
import React from "react";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";

const Contact = () => {
  return (
    <section id="contact" className="bg-gradient-to-b from-moduno-lightgray to-white section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold inline-block relative mx-auto">
            Get In Touch
            <span className="absolute bottom-0 left-1/2 w-24 h-1 bg-moduno-yellow transform -translate-x-1/2 mt-2"></span>
          </h2>
          <p className="text-gray-700 mt-6 max-w-3xl mx-auto">
            Have a project in mind? Contact us today for a consultation and let's bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
