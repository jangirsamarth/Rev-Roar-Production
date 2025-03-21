"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: "",
    })

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: "Thank you for your message! We'll get back to you soon.",
      })

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    }, 1500)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img src="/contact-bg.webp" alt="Contact Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-white text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 bg-orange-600/90 backdrop-blur-sm rounded-full text-sm font-medium">
            Let's Connect
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white/90">
            We're here to help you start your adventure in the Himalayas!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              href="tel:+917017775164"
              className="px-6 py-3 bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors"
            >
              <FaPhone className="text-sm" />
              <span>Call Us</span>
            </motion.a>
            <motion.a
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              href="https://wa.me/7017775164"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.8 },
            y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            {/* <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our tours or need a custom itinerary? Fill out the form below and we'll get back to
                you as soon as possible.
              </p>

              {formStatus.isSubmitted && !formStatus.isError ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6 flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
                  <p>{formStatus.message}</p>
                </motion.div>
              ) : formStatus.isError ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                  <p>{formStatus.message}</p>
                </motion.div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Tell us about your travel plans or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus.isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-colors ${
                    formStatus.isSubmitting ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  {formStatus.isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div> */}

            {/* Contact Information */}
            <div className="flex flex-col gap-8">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 md:p-8"
              >
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600/20 p-3 rounded-full">
                      <FaPhone className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-orange-400">Phone</h3>
                      <p className="text-white/90">+91 7017775164</p>
                      <p className="text-sm text-white/70 mt-1">Available 24/7 for your queries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600/20 p-3 rounded-full">
                      <FaEnvelope className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-orange-400">Email</h3>
                      <p className="text-white/90">info@revnroar.com</p>
                      <p className="text-sm text-white/70 mt-1">We'll respond as quickly as possible</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600/20 p-3 rounded-full">
                      <FaMapMarkerAlt className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-orange-400">Address</h3>
                      <p className="text-white/90">
                        Shiv ganga enclave, lane -1, block- B, Sahastradhara road, Dehradun, Uttrakhand
                      </p>
                      <p className="text-sm text-white/70 mt-1">Our headquarters in the foothills of the Himalayas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600/20 p-3 rounded-full">
                      <FaClock className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-orange-400">Office Hours</h3>
                      <p className="text-white/90">Monday - Sunday, 24/7</p>
                      <p className="text-sm text-white/70 mt-1">We're always available for adventure seekers</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-xl h-[300px] relative"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.0174663191257!2d78.0297!3d30.3164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE5JzAzLjAiTiA3OMKwMDEnNDYuOSJF!5e0!3m2!1sen!2sin!4v1616661315372!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Rev & Roar Office Location"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Connect With Us</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, stunning photos, and behind-the-scenes action from our
              adventures!
            </p>

            <div className="flex justify-center gap-6">
              <motion.a
                href="https://www.instagram.com/revnroar.ig/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white text-3xl mb-2 shadow-lg">
                  <FaInstagram />
                </div>
                <span className="text-gray-800 font-medium">Instagram</span>
              </motion.a>

              <motion.a
                href="https://wa.me/7017775164"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white text-3xl mb-2 shadow-lg">
                  <FaWhatsapp />
                </div>
                <span className="text-gray-800 font-medium">WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions about contacting us and booking tours</p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900">How quickly do you respond to inquiries?</h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24 hours. For urgent matters, we recommend calling us
                directly at +91 7017775164.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900">Can I customize a tour package?</h3>
              <p className="text-gray-600">
                We specialize in creating custom itineraries. Just let us know your preferences, group size, and dates
                in your message, and we'll design the perfect adventure for you.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900">What's the best way to book a tour?</h3>
              <p className="text-gray-600">
                You can book a tour by filling out the contact form above, calling us directly, or sending us a WhatsApp
                message. We'll guide you through the booking process and answer any questions you may have.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-gray-900 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-400">© {new Date().getFullYear()} Rev & Roar. All rights reserved.</p>
        </div>
      </div>

      {/* Fixed Social Media Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        <motion.a
          href="https://www.instagram.com/revnroar.ig/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full shadow-lg hover:opacity-90 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <FaInstagram className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </motion.a>

        <motion.a
          href="https://wa.me/7017775164"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <FaWhatsapp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </motion.a>
      </div>
    </div>
  )
}

export default ContactUs

