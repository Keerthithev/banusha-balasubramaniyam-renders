
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EmailService from "@/services/EmailService";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await EmailService.sendContactEmail(formData);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Message failed to send",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-moduno-navy flex items-center">
        <MessageSquare className="h-6 w-6 mr-2 text-moduno-yellow" />
        Send a Message
      </h3>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">
            Full Name
          </Label>
          <div className="relative">
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10 focus:border-moduno-yellow focus:ring-moduno-yellow"
              required
              disabled={isSubmitting}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 focus:border-moduno-yellow focus:ring-moduno-yellow"
              required
              disabled={isSubmitting}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-700 font-medium">
            Phone Number
          </Label>
          <div className="relative">
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="pl-10 focus:border-moduno-yellow focus:ring-moduno-yellow"
              disabled={isSubmitting}
            />
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-700 font-medium">
            Your Message
          </Label>
          <div className="relative">
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="pl-10 focus:border-moduno-yellow focus:ring-moduno-yellow"
              required
              disabled={isSubmitting}
            />
            <MessageSquare className="absolute left-3 top-4 text-gray-500" size={18} />
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-moduno-navy to-moduno-darknavy hover:opacity-90 text-white font-bold flex items-center justify-center gap-2 overflow-hidden group"
          disabled={isSubmitting}
        >
          <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
