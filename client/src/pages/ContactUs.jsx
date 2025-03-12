// "use client"

import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-600 text-white flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img 
          src="/contact-bg.webp" 
          alt="Contact Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          style={{ objectFit: "cover" }}
        />
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-3 text-black text-center"
        >
          <h1 className="text-6xl md:text-8xl font-light mb-4">Get in Touch</h1>
          <p className="text-2xl md:text-3xl mb-8">
            We're here to help you start your adventure!
          </p>
          <motion.a 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            href="mailto:info@revnroar.com"
            className="px-8 py-4 bg-orange-600 text-white rounded-full text-xl hover:bg-orange-700 transition-colors"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>

      {/* Contact Information Section */}
      <div className="flex-grow py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-xl"
          >
            <h2 className="text-4xl font-bold mb-6 text-center">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xl mb-2"><strong>Phone:</strong> +91 8118823650</p>
                <p className="text-xl mb-2"><strong>Email:</strong> info@revnroar.com</p>
                <p className="text-xl mb-2">
                  <strong>WhatsApp:</strong> <a href="https://wa.me/8118823650" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">Click here</a>
                </p>
              </div>
              <div>
                <p className="text-xl mb-2"><strong>Address:</strong> Himalayan Road, Ladakh, India</p>
                <p className="text-xl mb-2"><strong>Office Hours:</strong> Mon - Fri, 9 AM - 6 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl mb-4"
          >
            Follow us on social media for the latest updates and behind-the-scenes action!
          </motion.p>
          <div className="flex justify-center gap-8 text-4xl">
            <motion.a 
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-white hover:text-pink-500 transition-colors"
            >
              <FaInstagram />
            </motion.a>
            <motion.a 
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-white hover:text-blue-500 transition-colors"
            >
              <FaFacebook />
            </motion.a>
            <motion.a 
              href="https://wa.me/8118823650"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-white hover:text-green-500 transition-colors"
            >
              <FaWhatsapp />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Footer / Call to Action */}
      <div className="py-8 bg-gray-800 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg text-gray-400"
        >
          © {new Date().getFullYear()} Rev & Roar. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
};

export default ContactUs;
