"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Calendar,
  Mountain,
  Bike,
  Backpack
} from "lucide-react"

// Slider images and featured destinations arrays remain the same
const sliderImages = [
  {
    src: "/bg-image-1.webp?height=1080&width=1920",
    quote: "Thrilling High-altitude Passes with Expert Guides.",
    location: "Ladakh, India",
    tag: "Adventure",
  },
  {
    src: "/enfield.webp?height=1080&width=1920",
    quote: "The hum of your bike engine as you conquer Umling LA.",
    location: "Umling La, Ladakh",
    tag: "Bike Tours",
  },
  {
    src: "/hero-4.webp?height=1080&width=1920",
    quote: "A shared laugh with friends under the starry skies of Spiti.",
    location: "Spiti Valley, Himachal Pradesh",
    tag: "Group Tours",
  },
]

const featuredDestinations = [
  {
    name: "Ladakh",
    image: "/Ladakh-featured.webp?height=600&width=800",
    description: "Experience the breathtaking landscapes and ancient monasteries",
    tag: "Popular",
  },
  {
    name: "Spiti Valley",
    image: "/Spiti tour home page.webp?height=600&width=800",
    description: "Discover the hidden gem of the Himalayas with stunning vistas",
    tag: "Trending",
  },
]

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const autoplayRef = useRef(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const resetAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }
  }

  useEffect(() => {
    resetAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [currentSlide, isAutoplay])

  const handleSlideNavigation = (index) => {
    setCurrentSlide(index)
    resetAutoplay()
  }

  const handleManualNavigation = () => {
    // Pause autoplay temporarily when the user manually navigates
    setIsAutoplay(false)
    setTimeout(() => setIsAutoplay(true), 10000)
    resetAutoplay()
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section with Slider */}
      <div className="relative h-screen overflow-hidden">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-30"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <img
                src="/Logo-White.png?height=400&width=800"
                alt="Rev & Roar Logo"
                width="360"
                height="180"
                className="h-24 sm:h-32 md:h-48 w-auto object-contain"
              />
            </motion.div>
            {sliderImages.map(
              (slide, index) =>
                index === currentSlide && (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={slide.src || "/placeholder.svg"}
                        alt={`Slide ${index + 1}`}
                        className="object-cover"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 md:px-20">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="text-center max-w-5xl"
                        >
                          <span className="inline-block px-4 py-1 mb-4 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                            {slide.tag}
                          </span>
                          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                            {slide.quote}
                          </h1>
                          <div className="flex items-center justify-center text-white/90 text-base sm:text-lg">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            <span>{slide.location}</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => {
              prevSlide()
              handleManualNavigation()
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => {
              nextSlide()
              handleManualNavigation()
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2 sm:gap-3">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideNavigation(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="text-xs sm:text-sm mb-1 sm:mb-2">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Upcoming Tours Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-100 text-orange-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">
                Upcoming Tours
              </h2>
              <p className="text-base sm:text-lg text-black max-w-2xl">
                Secure your spot on our next adventure. Limited seats available!
              </p>
            </div>
            <a
              href="/itinerarypage"
              className="mt-4 md:mt-0 inline-flex items-center text-orange-700 font-medium hover:text-orange-800 transition-colors"
            >
              View all tours
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-stretch">
            {/* Tour Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-xl overflow-hidden group hover:bg-gray-700 transition-colors flex flex-col max-w-[400px] w-full mb-6 sm:mb-0 shadow-lg hover:shadow-xl"
            >
              <div className="aspect-video relative">
                <img
                  src="/bike-tour.JPG?height=400&width=600"
                  alt="Ladakh Expedition"
                  className="object-cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Starting from - ₹22,900
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
                <div className="flex items-center text-gray-300 mb-2 sm:mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">May 24 - May 30, 2025</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Ladakh Expedition</h3>
                <p className="text-gray-400 mb-4 text-sm sm:text-base">
                  7-day adventure through the breathtaking landscapes of Ladakh on Royal Enfield bikes.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/itinerarypage"
                    className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Explore Now
                  </a>
                  <span className="text-orange-500 text-sm">4 seats left</span>
                </div>
              </div>
            </motion.div>

            {/* Tour Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden group hover:bg-gray-700 transition-colors flex flex-col max-w-[400px] w-full shadow-lg hover:shadow-xl"
            >
              <div className="aspect-video relative">
                <img
                  src="/spiti-explore.webp?height=400&width=600"
                  alt="Spiti Valley Explorer"
                  className="object-cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Starting from - ₹19,900
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
                <div className="flex items-center text-gray-300 mb-2 sm:mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">June 7 - June 14, 2024</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Spiti Valley Adventure</h3>
                <p className="text-gray-400 mb-4 text-sm sm:text-base">
                  10-day journey through the magical Spiti Valley with comfortable stays and guided exploration.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/itinerarypage"
                    className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Explore Now
                  </a>
                  <span className="text-orange-500 text-sm">7 seats left</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Adventure Types Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 text-gray-900">
              Choose Your Adventure
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're seeking thrilling rides or serene landscapes, we have the perfect adventure waiting for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Bike Tours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/bike-tour.JPG?height=400&width=600"
                  alt="Bike Tours"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Bike className="w-6 h-6 sm:w-8 sm:h-8 text-orange-700" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Bike Tours</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Feel the roar of the engine as you conquer high mountain passes on a Royal Enfield or Himalayan.
                </p>
                <a
                  href="/itinerarypage"
                  className="inline-flex items-center text-orange-700 font-medium hover:text-orange-800 transition-colors text-sm sm:text-base"
                >
                  View bike tours
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Custom Tours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/custom-tour.webp?height=400&width=600"
                  alt="Custom Tours"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Mountain className="w-6 h-6 sm:w-8 sm:h-8 text-orange-700" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
                  Photography &amp; Travel Reel Add-On
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Elevate your adventure with our professional photography package. Capture every breathtaking moment and create lasting memories with high-quality photos and dynamic travel reels.
                </p>
                <Link
                  to="/custom-tours-details"
                  className="inline-flex items-center text-orange-700 font-medium hover:text-orange-800 transition-colors text-sm sm:text-base"
                >
                  Discover More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Group Tours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/group-tour.webp?height=400&width=600"
                  alt="Backpack Tours"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <span className="flex items-center">
                      {/* <img src="/group-icon.svg" alt="Group Icon" className="w-6 h-6 mr-1" /> */}
                      <Backpack className="w-6 h-6 sm:w-8 sm:h-8 text-orange-700" />

                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Backpack Tours</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Perfect for families and friends who want to explore the mountains with comfort and convenience.
                </p>
                <a
                  href="/itinerarypage"
                  className="inline-flex items-center text-orange-700 font-medium hover:text-orange-800 transition-colors text-sm sm:text-base"
                >
                  View group tours
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 text-gray-900">
                Featured Destinations
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                Discover our handpicked destinations that offer unforgettable experiences and breathtaking landscapes.
              </p>
            </div>
            <a
              href="/location"
              className="mt-4 md:mt-0 inline-flex items-center text-orange-700 font-medium hover:text-orange-800 transition-colors text-sm sm:text-base"
            >
              View all destinations
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg max-w-sm w-full h-full mb-6 sm:mb-0"
              >
                <div className="aspect-[4/3] relative h-full">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs sm:text-sm font-medium">
                      {destination.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-base">
                      {destination.description}
                    </p>
                    <a
                      href={`/location`}
                      className="inline-flex items-center text-white font-medium hover:text-orange-200 transition-colors text-sm sm:text-base"
                    >
                      Explore
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 text-gray-900">
              What Our Adventurers Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from those who've experienced the thrill firsthand.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                  <img
                    src="/lion-logo.webp?height=100&width=100"
                    alt="Testimonial Avatar"
                    width="48"
                    height="48"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Rahul Sharma</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Ladakh Bike Expedition</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                "The Ladakh trip was life-changing! The team took care of everything, from bike maintenance to
                accommodations. The guides knew all the best spots and made sure we were safe throughout."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                  <img
                    src="/lion-logo.webp?height=100&width=100"
                    alt="Testimonial Avatar"
                    width="48"
                    height="48"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Priya Patel</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Spiti Valley Explorer</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                "As a solo female traveler, I was a bit apprehensive, but the Rev & Roar team made me feel completely safe and comfortable. The Spiti Valley tour was perfectly organized with amazing local experiences."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                  <img
                    src="/lion-logo.webp?height=100&width=100"
                    alt="Testimonial Avatar"
                    width="48"
                    height="48"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg">Amit Singh</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Corporate Retreat</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                "We took our entire team of 20 for a corporate retreat, and it was the best team-building experience we've had. The activities were thoughtfully planned, and the logistics were flawless."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-base sm:text-xl text-orange-100 max-w-3xl mx-auto mb-6 sm:mb-8">
              Let's create memories that will last a lifetime. Contact us today to plan your perfect Himalayan journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-700 font-bold rounded-lg hover:bg-orange-50 transition-colors text-sm sm:text-base"
              >
                Contact Us
              </a>
              <a
                href="/location"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors text-sm sm:text-base border border-white/30"
              >
                Browse Tours
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Buttons */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end space-y-3 sm:space-y-4">
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

// Converted Users component remains unchanged
function Users({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

export { Users }
export default Home
