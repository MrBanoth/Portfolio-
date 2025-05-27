import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_AUTO_REPLY_TEMPLATE_ID } from '../utils/emailjs';
// WhatsApp helper function
const createWhatsAppLink = (phone: string, message: string): string => {
  const formattedPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean; message: string; showWhatsAppButton?: boolean} | null>(null);
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      // 1. Send the main email to you
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current as HTMLFormElement
      );

      // 2. Send auto-reply to the user
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        {
          to_email: formData.email,
          to_name: formData.name,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      // 3. Prepare WhatsApp auto-reply if phone number is provided
      if (formData.phone) {
        // Message for you (the website owner)
        const messageToYou = `New contact form submission\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
        
        // Auto-reply message for the user
        const autoReplyMessage = `👋 Hi ${formData.name}!\n\nThank you for reaching out through my portfolio! I've received your message and will get back to you soon.\n\nBest regards,\nSandeep Naik\n📧 sandeepnaikb0@gmail.com`;
        
        // Create both WhatsApp links
        const whatsappLinkToYou = createWhatsAppLink('919390730129', messageToYou);
        const whatsappLinkToUser = createWhatsAppLink(formData.phone, autoReplyMessage);
        
        // Set the link to show to the user
        setWhatsappLink(whatsappLinkToUser);
        
        // Open WhatsApp to send message to you (the owner)
        window.open(whatsappLinkToYou, '_blank');
        
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent! You will receive a WhatsApp confirmation shortly.',
          showWhatsAppButton: true
        });
      } else {
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully! I will get back to you soon.'
        });
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'}`}>
              <p className="mb-2">{submitStatus.message}</p>
              {submitStatus?.showWhatsAppButton && whatsappLink && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Click below to receive a confirmation message on WhatsApp:
                  </p>
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.28.3-.47.1-.17.05-.31-.03-.44-.07-.12-.67-1.62-.92-2.21-.24-.57-.49-.51-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.36-.27.3-1.04 1.02-1.04 2.48 0 1.5 1.07 2.86 1.22 3.07.15.2 2.1 3.2 5.1 4.49.71.3 1.26.48 1.69.62.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.43.25-.7.25-1.29.18-1.42-.08-.14-.27-.21-.57-.35"/>
                    </svg>
                    Get WhatsApp Confirmation
                  </a>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    WhatsApp will open with a pre-filled message. Just tap send to confirm.
                  </p>
                </div>
              )}
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
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-300">
                Phone Number (for WhatsApp reply, optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 1234567890"
              />
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