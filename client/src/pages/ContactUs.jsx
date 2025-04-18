"use client"

import React, { useState, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaArrowDown
} from "react-icons/fa"
import { Send, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"

// Animation variants for reuse
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

// Memoized components for better performance
const ContactInfo = memo(({ icon, title, content, subtitle }) => (
  <div className="flex items-start gap-4">
    <div className="bg-orange-600/20 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-medium text-orange-400">{title}</h3>
      <p className="text-white/90">{content}</p>
      {subtitle && <p className="text-sm text-white/70 mt-1">{subtitle}</p>}
    </div>
  </div>
))
ContactInfo.displayName = "ContactInfo"

const FAQ = memo(({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-bold text-gray-900">{question}</h3>
        <span className="text-orange-600 mt-1">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pt-2"
          >
            <p className="text-gray-600 mt-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
FAQ.displayName = "FAQ"

const SocialButton = memo(({ href, icon, label, bgClass }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -5 }}
    className="flex flex-col items-center"
    aria-label={label}
  >
    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${bgClass} text-white text-3xl mb-2 shadow-lg`}>
      {icon}
    </div>
    <span className="text-gray-800 font-medium">{label}</span>
  </motion.a>
))
SocialButton.displayName = "SocialButton"

const FloatingSocialButtons = memo(() => (
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
      aria-label="Visit our Instagram"
    >
      <FaInstagram className="h-6 w-6 sm:h-8 sm:w-8 text-white" aria-hidden="true" />
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
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6 sm:h-8 sm:w-8 text-white" aria-hidden="true" />
    </motion.a>
  </div>
))
FloatingSocialButtons.displayName = "FloatingSocialButtons"

// Data constants
const CONTACT_INFO = [
  {
    icon: <FaPhone className="w-5 h-5 text-orange-500" />,
    title: "Phone",
    content: "+91 7017775164",
    subtitle: "Available 24/7 for your queries"
  },
  {
    icon: <FaEnvelope className="w-5 h-5 text-orange-500" />,
    title: "Email",
    content: "info@revnroar.com",
    subtitle: "We'll respond as quickly as possible"
  },
  {
    icon: <FaMapMarkerAlt className="w-5 h-5 text-orange-500" />,
    title: "Address",
    content: "Shiv Ganga Enclave, Lane -1, Block- B, Sahastradhara Road, Dehradun, Uttrakhand"
  },
  {
    icon: <FaClock className="w-5 h-5 text-orange-500" />,
    title: "Office Hours",
    content: "Monday - Sunday, 24/7",
    subtitle: "We're always available for adventure seekers"
  }
]

const FAQS = [
  {
    question: "How quickly do you respond to inquiries?",
    answer: "We typically respond to all inquiries within 24 hours. For urgent matters, we recommend calling us directly at +91 7017775164."
  },
  {
    question: "Can I customize a tour package?",
    answer: "We specialize in creating custom itineraries. Just let us know your preferences, group size, and dates in your message, and we'll design the perfect adventure for you."
  },
  {
    question: "What's the best way to book a tour?",
    answer: "You can book a tour by filling out the contact form above, calling us directly, or sending us a WhatsApp message. We'll guide you through the booking process and answer any questions you may have."
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes, we offer special rates for groups of 5 or more. The larger your group, the better the discount we can offer. Contact us with your group size for a customized quote."
  },
  {
    question: "What should I bring on a tour?",
    answer: "For most tours, we recommend bringing comfortable clothing, sturdy footwear, sunscreen, a hat, sunglasses, a camera, and personal medications. We'll provide a detailed packing list specific to your tour after booking."
  }
]

const SOCIAL_BUTTONS = [
  {
    href: "https://www.instagram.com/revnroar.ig/",
    icon: <FaInstagram />,
    label: "Instagram",
    bgClass: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600"
  },
  {
    href: "https://wa.me/7017775164",
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    bgClass: "bg-green-500"
  }
]

// Main component
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    tourType: "bike-tour" // Default selection
  })

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: "",
  })

  // Optimize form handlers with useCallback
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: "",
    })

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Successful submission
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
        tourType: "bike-tour"
      })
    } catch (error) {
      // Handle error
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: true,
        message: "There was an error sending your message. Please try again or contact us directly.",
      })
    }
  }, [formData])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true" />
        <img 
          src="/hero-4.webp" 
          alt="Mountain landscape"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10" aria-hidden="true" />

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
              aria-label="Call us"
            >
              <FaPhone className="text-sm" aria-hidden="true" />
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
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp aria-hidden="true" />
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
          aria-hidden="true"
        >
          <FaArrowDown className="text-white w-6 h-6" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Contact Information */}
            <div className="w-full md:w-1/2 max-w-2xl flex flex-col gap-8">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 md:p-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-center">Contact Information</h2>
                <div className="space-y-6">
                  {CONTACT_INFO.map((info, index) => (
                    <ContactInfo
                      key={index}
                      icon={info.icon}
                      title={info.title}
                      content={info.content}
                      subtitle={info.subtitle}
                    />
                  ))}
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
                  aria-label="Map showing our office location in Dehradun"
                ></iframe>
              </motion.div>
            </div>

            {/* Social Media Section */}
            <div className="w-full md:w-1/2 max-w-2xl bg-orange-50 rounded-2xl shadow-xl p-6 md:p-8 flex items-center">
              <div className="w-full">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center">Connect With Us</h2>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-center">
                    Follow us on social media for the latest updates, stunning photos, and behind-the-scenes action from our
                    adventures!
                  </p>

                  <div className="flex justify-center gap-6">
                    {SOCIAL_BUTTONS.map((button, index) => (
                      <SocialButton
                        key={index}
                        href={button.href}
                        icon={button.icon}
                        label={button.label}
                        bgClass={button.bgClass}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Guide - New Section */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">How to Reach Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you - we're available through multiple channels
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              variants={scaleIn} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              className="bg-orange-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <FaPhone className="text-orange-600 text-xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Call Us</h3>
              <p className="text-gray-600 mb-4">
                For immediate assistance, give us a call any time of day
              </p>
              <a 
                href="tel:+917017775164" 
                className="inline-flex items-center text-orange-600 font-medium hover:text-orange-800"
              >
                +91 7017775164
              </a>
            </motion.div>
            
            <motion.div 
              variants={scaleIn} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-green-600 text-xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">WhatsApp</h3>
              <p className="text-gray-600 mb-4">
                Send us a message on WhatsApp for quick replies
              </p>
              <a 
                href="https://wa.me/7017775164" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 font-medium hover:text-green-800"
              >
                Chat with us
              </a>
            </motion.div>
            
            <motion.div 
              variants={scaleIn} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <FaEnvelope className="text-blue-600 text-xl" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Email</h3>
              <p className="text-gray-600 mb-4">
                Send us a detailed inquiry via email
              </p>
              <a 
                href="mailto:info@revnroar.com" 
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
              >
                info@revnroar.com
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section with Animation */}
      <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
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

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FAQ 
                  question={faq.question} 
                  answer={faq.answer} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 bg-gray-900 text-center">
        <div className="container mx-auto px-4">
          <p className="text-gray-400">© {new Date().getFullYear()} Rev & Roar. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Fixed Social Media Buttons */}
      <FloatingSocialButtons />
    </div>
  )
}

export default ContactUs