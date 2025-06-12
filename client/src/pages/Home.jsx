"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { FaInstagram, FaWhatsapp, FaStar } from "react-icons/fa"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Calendar,
  Mountain,
  Bike,
  Backpack,
  Award,
  Users
} from "lucide-react"

// Constants
const SLIDER_IMAGES = [
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

const FEATURED_DESTINATIONS = [
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
  }
]

const UPCOMING_TOURS = [
  {
    id: 1,
    title: "Ladakh Expedition",
    image: "/bike-tour.JPG?height=400&width=600",
    priceTag: "Starting from - ₹22,900",
    dates: "May 24 - May 30, 2025",
    description: "7-day adventure through the breathtaking landscapes of Ladakh on Royal Enfield bikes.",
    seatsLeft: 4,
    priceTagColor: "bg-orange-600",
  },
  {
    id: 2,
    title: "Spiti Valley Adventure",
    image: "/spiti-explore.webp?height=400&width=600",
    priceTag: "Starting from - ₹19,900",
    dates: "June 7 - June 14, 2024",
    description: "10-day journey through the magical Spiti Valley with comfortable stays and guided exploration.",
    seatsLeft: 7,
    priceTagColor: "bg-green-600",
  }
]

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "/lion-logo.webp?height=100&width=100",
    text: "The Ladakh trip was life-changing! The team took care of everything, from bike maintenance to accommodations. The guides knew all the best spots and made sure we were safe throughout.",
    trip: "Ladakh Bike Expedition",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/lion-logo.webp?height=100&width=100",
    text: "As a solo female traveler, I was a bit apprehensive, but the Rev & Roar team made me feel completely safe and comfortable. The Spiti Valley tour was perfectly organized with amazing local experiences.",
    trip: "Spiti Valley Explorer",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Singh",
    avatar: "/lion-logo.webp?height=100&width=100",
    text: "We took our entire team of 20 for a corporate retreat, and it was the best team-building experience we've had. The activities were thoughtfully planned, and the logistics were flawless.",
    trip: "Corporate Retreat",
    rating: 5,
  },
]

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

// Components
const HeroSection = ({ currentSlide, setCurrentSlide, isAutoplay, setIsAutoplay }) => {
  const [[page, direction], setPage] = useState([0, 0])
  const autoplayRef = React.useRef(null)

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection])
    setCurrentSlide((prev) => (prev + newDirection + SLIDER_IMAGES.length) % SLIDER_IMAGES.length)
  }, [page, setCurrentSlide])

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        paginate(1)
      }, 5000)
    }
  }, [isAutoplay, paginate])

  useEffect(() => {
    resetAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [resetAutoplay])

  const handleManualNavigation = useCallback(() => {
    setIsAutoplay(false)
    setTimeout(() => setIsAutoplay(true), 10000)
    resetAutoplay()
  }, [setIsAutoplay, resetAutoplay])

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <img
                src={SLIDER_IMAGES[currentSlide].src}
                alt={`Slide ${currentSlide + 1}`}
                className="object-cover w-full h-full"
                loading={currentSlide === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center items-center px-4 md:px-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-center max-w-5xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mb-8"
                  >
                    <img
                      src="/Logo-White.png?height=400&width=800"
                      alt="Rev & Roar Logo"
                      width="360"
                      height="180"
                      className="h-24 sm:h-32 md:h-48 w-auto object-contain mx-auto"
                    />
                  </motion.div>
                  <span className="inline-block px-4 py-1 mb-4 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                    {SLIDER_IMAGES[currentSlide].tag}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    {SLIDER_IMAGES[currentSlide].quote}
                  </h1>
                  <div className="flex items-center justify-center text-white/90 text-base sm:text-lg">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span>{SLIDER_IMAGES[currentSlide].location}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={() => {
              paginate(-1)
              handleManualNavigation()
            }}
            className="bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={() => {
              paginate(1)
              handleManualNavigation()
            }}
            className="bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2 sm:gap-3">
          {SLIDER_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setPage([index, index - currentSlide])
                setCurrentSlide(index)
                handleManualNavigation()
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentSlide}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs sm:text-sm mb-1 sm:mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

const TourCard = ({ tour, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUpVariants}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col w-full md:max-w-[380px] md:flex-1"
  >
    {/* Image Container */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={tour.image}
        alt={tour.title}
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Price Tag */}
      <div className="absolute top-4 left-4 z-20">
        <div className={`${tour.priceTagColor} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm bg-opacity-90`}>
          {tour.priceTag}
        </div>
      </div>

      {/* Seats Left Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`${
          tour.seatsLeft < 6 ? "bg-red-500" : "bg-orange-500"
        } text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm bg-opacity-90 flex items-center gap-1`}>
          <Users className="w-4 h-4" />
          {tour.seatsLeft} seats left
        </div>
      </div>
    </div>

    {/* Content Container */}
    <div className="p-6 flex flex-col flex-grow">
      {/* Date */}
      <div className="flex items-center text-gray-600 mb-3">
        <Calendar className="w-4 h-4 mr-2 text-orange-500" />
        <span className="text-sm font-medium">{tour.dates}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
        {tour.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm flex-grow">
        {tour.description}
      </p>

      {/* Action Button */}
      <div className="mt-auto">
        <a
          href="/itinerarypage"
          className="inline-flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors text-sm font-medium group-hover:shadow-lg"
        >
          Explore Now
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>

    {/* Hover Effect Border */}
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-2xl transition-colors pointer-events-none" />
  </motion.div>
)

const DestinationCard = ({ destination, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUpVariants}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative overflow-hidden rounded-2xl shadow-lg w-full md:max-w-sm md:flex-1 mb-6 md:mb-0"
  >
    <div className="aspect-[4/3] relative h-full">
      <img
        src={destination.image}
        alt={destination.name}
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
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
          href="/location"
          className="inline-flex items-center text-white hover:text-orange-200 font-medium transition-colors text-sm sm:text-base"
        >
          Explore
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  </motion.div>
)

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUpVariants}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all"
  >
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name}'s avatar`}
          width="48"
          height="48"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <h4 className="font-bold text-base sm:text-lg">{testimonial.name}</h4>
        <p className="text-gray-600 text-xs sm:text-sm">{testimonial.trip}</p>
      </div>
    </div>
    <p className="text-gray-700 mb-4 text-sm sm:text-base">
      "{testimonial.text}"
    </p>
    <div className="flex text-yellow-400">
      {[...Array(testimonial.rating)].map((_, i) => (
        <FaStar key={i} className="w-4 h-4 sm:w-5 sm:h-5" />
      ))}
    </div>
  </motion.div>
)

const SocialButton = ({ href, icon: Icon, color, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${color} rounded-full shadow-lg hover:opacity-90 transition-colors`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
  >
    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
  </motion.a>
)

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  return (
    <div className="relative min-h-screen bg-white">
      <HeroSection
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        isAutoplay={isAutoplay}
        setIsAutoplay={setIsAutoplay}
      />

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

          <div className="flex flex-col md:flex-row gap-5 justify-center items-stretch flex-wrap">
            {UPCOMING_TOURS.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
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
            {/* Adventure Type Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/bike-tour.JPG?height=400&width=600"
                  alt="Bike Tours"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
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

            {/* Add other adventure type cards similarly */}
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

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 justify-center items-stretch">
            {FEATURED_DESTINATIONS.map((destination, index) => (
              <DestinationCard key={index} destination={destination} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
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
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-700 font-bold rounded-lg hover:bg-orange-50 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Contact Us
              </a>
              <a
                href="/location"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors text-sm sm:text-base border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Browse Tours
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Buttons */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end space-y-3 sm:space-y-4">
        <SocialButton
          href="https://www.instagram.com/revnroar.ig/"
          icon={FaInstagram}
          color="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"
          delay={0.5}
        />
        <SocialButton
          href="https://wa.me/7017775164"
          icon={FaWhatsapp}
          color="bg-green-500"
          delay={1}
        />
      </div>
    </div>
  )
}

export default Home