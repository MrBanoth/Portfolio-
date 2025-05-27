import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../utils/emailjs';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Real-time EmailJS email sending functionality
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current as HTMLFormElement
      )
      .then(() => {
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully! I will get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error: any) => {
        setSubmitStatus({
          success: false,
          message: 'There was an error sending your message. Please try again later.'
        });
        console.error('Email sending error:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <section className="bg-black pt-6 pb-0 md:pt-8 md:pb-0 lg:pt-10 lg:pb-0 border-t border-neutral-900" id="contact">
      <div className="container mx-auto px-4 pt-0 pb-2 md:px-6 md:pt-0 md:pb-2 lg:px-8 lg:pt-0 lg:pb-4">
        <div className="max-w-3xl mb-4 md:mb-6">
          <h2 className="text-4xl font-bold mb-2 md:mb-4">Contact Me</h2>
          <p className="text-neutral-300 text-lg leading-relaxed">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 md:mt-6">
        <div>
          <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
          <p className="text-neutral-300 mb-6">
            I'm currently available for freelance work. If you have a project that you want to get
            started, think you need my help with something, or just want to say hello, then get in
            touch.
          </p>

          <div className="space-y-5">
            <div className="flex items-start">
              <div className="bg-neutral-900 p-3 rounded-lg mr-4">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Phone</h4>
                <p className="text-neutral-400">+91-9390730129</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-neutral-900 p-2.5 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Email</h4>
                <p className="text-neutral-400">sandeepnaikb0@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-neutral-900 p-2.5 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Location</h4>
                <p className="text-neutral-400">Hyderabad, Telangana, India</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-medium mb-4">Follow Me</h4>
            <div className="flex items-center space-x-5">
              <a href="https://github.com/MrBanoth" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
                <Github size={22} />
              </a>
              <a href="https://www.linkedin.com/in/sandeep-naik-1316712a9/" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
          {submitStatus && (
            <div className={`p-4 mb-4 rounded-lg ${submitStatus.success ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
              {submitStatus.message}
            </div>
          )}
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm text-neutral-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-neutral-400 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm text-neutral-400 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-neutral-400 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-white"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-6 py-3 rounded-lg flex items-center hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="h-4 w-4 ml-2" />
            </button>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;