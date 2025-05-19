"use client"

import React, { useEffect } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion, useInView } from "framer-motion"
import { Send, Mail, Phone, Clock, MapPin } from "lucide-react"

export default function ContactForm() {
  const [state, handleSubmit] = useForm("manokyaa")
  const { toast } = useToast()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleToastSuccess = () => {
    toast({
      title: "✅ Message Sent",
      description: "Thank you! We'll get back to you shortly.",
      duration: 4000,
    })
  }

  useEffect(() => {
    if (state.succeeded) {
      handleToastSuccess()
    }
  }, [state.succeeded])

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto my-20 p-10 bg-gradient-to-br from-moduno-blue/90 via-moduno-navy/90 to-gray-900 rounded-3xl shadow-2xl border border-moduno-blue/70"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-10 text-white drop-shadow-md">Contact Us</h2>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left info panel */}
        <motion.div
          className="md:w-1/2 text-white space-y-8"
          initial={{ x: -20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg leading-relaxed">
            We're always happy to hear from you! Whether you have questions, want to collaborate, or just want to say
            hello, feel free to drop us a message below.
          </p>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-moduno-blue">Our Contact Info</h3>
            <ul className="space-y-5 text-gray-300">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-moduno-blue" />
                <span>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:moduno58@gmail.com" className="text-moduno-blue hover:underline">
                    moduno58@gmail.com
                  </a>
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-moduno-blue" />
                <span>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+94 74 214 5537" className="text-moduno-blue hover:underline">
                    +94 74 214 5537
                  </a>
                </span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-moduno-blue" />
                <span>
                  <strong>Office Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
                </span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-moduno-blue" />
                <span>
                  <strong>Address:</strong> Jaffna, Sri Lanka
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-moduno-navy rounded-lg p-6 shadow-inner border border-white/10">
            <p className="italic text-gray-400">"Your vision, our design. Let's build something amazing together."</p>
          </div>
        </motion.div>

        {/* Right contact form */}
        <motion.div
          className="md:w-1/2"
          initial={{ x: 20, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {state.succeeded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 rounded-lg p-8 text-center h-full flex items-center justify-center"
            >
              <div>
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-green-400 text-lg animate-fade-in mb-6">
                  Thanks for your message! We'll be in touch soon.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-moduno-navy"
                >
                  Send Another Message
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-semibold text-moduno-blue text-lg">
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
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 mt-1" />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="mb-2 font-semibold text-moduno-blue text-lg">
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
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 mt-1" />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-gradient-to-r from-moduno-blue to-moduno-navy hover:from-moduno-navy hover:to-moduno-blue text-white font-bold text-lg rounded-xl shadow-lg transition-transform active:scale-95 h-12"
              >
                {state.submitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}