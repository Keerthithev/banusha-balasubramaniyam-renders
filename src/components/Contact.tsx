import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("manokyaa");

  const handleToastSuccess = () => {
    toast({
      title: "✅ Message Sent",
      description: "Thank you! We'll get back to you shortly.",
      duration: 4000,
    });
  };

  React.useEffect(() => {
    if (state.succeeded) {
      handleToastSuccess();
    }
  }, [state.succeeded]);

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto my-20 p-10 bg-gradient-to-br from-moduno-blue/90 via-moduno-navy/90 to-gray-900 rounded-3xl shadow-2xl border border-moduno-blue/70 animate-fade-in"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-10 text-white drop-shadow-md">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left info panel */}
        <div className="md:w-1/2 text-white space-y-8">
          <p className="text-lg leading-relaxed">
            We’re always happy to hear from you! Whether you have questions, want
            to collaborate, or just want to say hello, feel free to drop us a
            message below.
          </p>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-moduno-blue">Our Contact Info</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@moduno.com"
                  className="text-moduno-blue hover:underline"
                >
                  moduno58@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+94 74 214 5537" className="text-moduno-blue hover:underline">
                  +94 74 214 5537
                </a>
              </li>
              <li>
                <strong>Office Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
              </li>
              <li>
                <strong>Address:</strong> Jaffna, Sri Lanka
              </li>
            </ul>
          </div>

          <div className="bg-moduno-navy rounded-lg p-4 shadow-inner">
            <p className="italic text-gray-400">
              “Your vision, our design. Let’s build something amazing together.”
            </p>
          </div>
        </div>

        {/* Right contact form */}
        <div className="md:w-1/2">
          {state.succeeded ? (
            <p className="text-green-400 text-center font-semibold text-lg animate-fade-in">
              Thanks for your message! We'll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 font-semibold text-moduno-blue text-lg"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="bg-white text-black rounded-lg px-4 py-3 shadow-md focus:ring-2 focus:ring-moduno-blue transition"
                  autoComplete="email"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-red-400 mt-1"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="mb-2 font-semibold text-moduno-blue text-lg"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message..."
                  required
                  className="bg-white text-black rounded-lg px-4 py-3 shadow-md focus:ring-2 focus:ring-moduno-blue transition resize-none"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-400 mt-1"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-gradient-to-r from-moduno-blue to-moduno-navy hover:from-moduno-navy hover:to-moduno-blue text-white font-bold text-lg rounded-xl shadow-lg transition-transform active:scale-95"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
