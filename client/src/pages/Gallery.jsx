"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  Camera, 
  Mountain, 
  Bike 
} from "lucide-react"
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'

// Custom MapPin component
const MapPin = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

// Data Constants - Moved outside the component to avoid re-creation on each render
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "/pangog-lake-at-sunset.webp?height=600&width=800",
    alt: "Pangong Lake at sunset",
    category: "landscapes",
    location: "Ladakh",
  },
  {
    id: 2,
    src: "/bike-tour.JPG?height=800&width=600",
    alt: "Biking through mountain passes",
    category: "adventures",
    location: "Khardung La",
  },
  {
    id: 3,
    src: "/group-tour.webp?height=600&width=800",
    alt: "Group photo at Sipti",
    category: "people",
    location: "Spiti Valley",
  },
  {
    id: 4,
    src: "/camping under star.webp?height=800&width=600",
    alt: "Camping under the stars",
    category: "adventures",
    location: "Nubra Valley",
  },
  {
    id: 5,
    src: "/Spiti tour home page.webp?height=600&width=800",
    alt: "Ancient monastery",
    category: "culture",
    location: "Spiti Valley",
  },
  {
    id: 6,
    src: "/bike-tour-3.webp?height=800&width=600",
    alt: "Royal Enfield on mountain road",
    category: "adventures",
    location: "Ladakh",
  },
  {
    id: 7,
    src: "/snow.webp?height=600&width=800",
    alt: "Snow-capped mountains",
    category: "landscapes",
    location: "Spiti Valley",
  },
  {
    id: 8,
    src: "/local.webp?height=800&width=600",
    alt: "Local villagers",
    category: "people",
    location: "Spiti Valley",
  },
  {
    id: 9,
    src: "/flag.webp?height=600&width=800",
    alt: "Prayer flags on mountain pass",
    category: "culture",
    location: "Ladakh",
  },
  {
    id: 10,
    src: "/temppo.webp?height=800&width=600",
    alt: "Tempo traveler journey",
    category: "adventures",
    location: "Spiti Valley",
  },
  {
    id: 11,
    src: "/chandra.webp?height=600&width=800",
    alt: "Chandratal Lake",
    category: "landscapes",
    location: "Spiti Valley",
  },
  {
    id: 12,
    src: "/sangla.webp?height=800&width=600",
    alt: "Sangla valley",
    category: "people",
    location: "Ladakh",
  },
]

const TESTIMONIALS = [
  {
    id: 1,
    name: "Neha Sharma",
    avatar: "/lion-logo.webp?height=100&width=100",
    text: "This trip was the best decision of my life! Riding through Ladakh with Rev & Roar felt like living a dream. Their team made every moment unforgettable!",
    trip: "Ladakh Bike Expedition",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    avatar: "/lion-logo.webp?height=100&width=100",
    text: "As a corporate group, we were blown away by their professionalism and attention to detail. From tempo rides to adventure-packed days, every detail was perfect!",
    trip: "Corporate Retreat to Spiti",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Patel",
    avatar: "/lion-logo.webp?height=100&width=100",
    text: "The Spiti Valley tour exceeded all my expectations. The guides were knowledgeable, accommodations were comfortable, and the views were absolutely breathtaking!",
    trip: "Spiti Valley Explorer",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram Singh",
    avatar: "/lion-logo.webp?height=100&width=100",
    text: "As an avid photographer, I was looking for the perfect spots to capture the Himalayas. Rev & Roar's team knew exactly where to take me for those perfect shots!",
    trip: "Photography Tour",
    rating: 5,
  },
]

const SLIDER_IMAGES = [
  {
    src: "/high-alittude.webp?height=1080&width=1920",
    quote: "Thrilling High-altitude Passes with Expert Guides.",
  },
  {
    src: "/bike-gallery.webp?height=1080&width=1920",
    quote: "The hum of your bike engine as you conquer Khardung LA.",
  },
  {
    src: "/group-tour.webp?height=1080&width=1920",
    quote: "A shared laugh with friends under the starry skies of Spiti.",
  },
]

const CATEGORIES = [
  { id: "all", label: "All Photos", icon: <Camera className="w-4 h-4" aria-hidden="true" /> },
  { id: "landscapes", label: "Landscapes", icon: <Mountain className="w-4 h-4" aria-hidden="true" /> },
  { id: "adventures", label: "Adventures", icon: <Bike className="w-4 h-4" aria-hidden="true" /> },
  {
    id: "people",
    label: "People",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  { id: "ladakh", label: "Ladakh", icon: <MapPin className="w-4 h-4" aria-hidden="true" /> },
  { id: "spiti valley", label: "Spiti Valley", icon: <MapPin className="w-4 h-4" aria-hidden="true" /> },
]

// Animation variants - Defined outside for reuse
const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const fadeInUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

const Gallery = () => {
  // State declarations
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const testimonialTimerRef = useRef(null)
  const sliderTimerRef = useRef(null)

  // Calculate filtered images only when dependencies change
  const filteredImages = React.useMemo(() => {
    return activeFilter === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter(
          (img) =>
            img.category === activeFilter ||
            img.location.toLowerCase() === activeFilter.toLowerCase()
        )
  }, [activeFilter])

  // Handle auto-advance for testimonials
  useEffect(() => {
    testimonialTimerRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    
    return () => clearInterval(testimonialTimerRef.current)
  }, [])

  // Handle auto-advance for slider
  useEffect(() => {
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, 5000)
    
    return () => {
      if (sliderTimerRef.current) {
        clearInterval(sliderTimerRef.current)
      }
    }
  }, [])

  // Handlers converted to useCallback to prevent recreation on each render
  const nextSlide = useCallback(() => {
    // Reset the interval timer when manually navigating
    if (sliderTimerRef.current) {
      clearInterval(sliderTimerRef.current)
    }
    setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length)
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, 5000)
  }, [])

  const prevSlide = useCallback(() => {
    // Reset the interval timer when manually navigating
    if (sliderTimerRef.current) {
      clearInterval(sliderTimerRef.current)
    }
    setCurrentSlide((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length)
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, 5000)
  }, [])

  const handleImageClick = useCallback((id) => {
    setSelectedImage(id)
    // Pause auto-advances when lightbox is open
    if (testimonialTimerRef.current) clearInterval(testimonialTimerRef.current)
    if (sliderTimerRef.current) clearInterval(sliderTimerRef.current)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    // Resume auto-advances when lightbox is closed
    testimonialTimerRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, 5000)
  }, [])

  const navigateImage = useCallback((direction) => {
    if (selectedImage === null) return
    
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
    let newIndex
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }
    setSelectedImage(filteredImages[newIndex].id)
  }, [selectedImage, filteredImages])

  const setTestimonial = useCallback((index) => {
    // Reset the interval timer when manually navigating
    if (testimonialTimerRef.current) {
      clearInterval(testimonialTimerRef.current)
    }
    setCurrentTestimonial(index)
    testimonialTimerRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
  }, [])

  const setSlide = useCallback((index) => {
    // Reset the interval timer when manually navigating
    if (sliderTimerRef.current) {
      clearInterval(sliderTimerRef.current)
    }
    setCurrentSlide(index)
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, 5000)
  }, [])

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowRight") {
        navigateImage("next")
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev")
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, navigateImage, closeLightbox])

  // Component Sub-sections
  const renderHeroSection = () => (
    <div className="relative h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/bg-image-1.webp?height=1080&width=1920"
          alt="Himalayan adventure landscape"
          loading="eager"
          style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
          className="object-cover opacity-60"
        />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          GALLERY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl max-w-3xl font-light"
        >
          A Picture is Worth a Thousand Adventures
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 max-w-2xl text-gray-300"
        >
          Explore our gallery featuring glowing sunsets over Pangong Lake, joyful group shots in Spiti, and the sheer
          thrill of biking through the Himalayas.
        </motion.p>
      </div>
    </div>
  )

  const renderGallerySection = () => (
    <section className="py-16 px-4 md:px-8 lg:px-16" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto">
        {/* Filter Controls */}
        <div className="mb-12">
          <h2 id="gallery-heading" className="text-2xl font-bold mb-6">Browse Our Adventures</h2>
          <div className="flex flex-wrap gap-3" role="tablist" aria-label="Gallery filters">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                role="tab"
                aria-selected={activeFilter === category.id}
                aria-controls="gallery-grid"
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  activeFilter === category.id
                    ? "bg-orange-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div 
          id="gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
          role="tabpanel"
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handleImageClick(image.id)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleImageClick(image.id)}
              role="button"
              aria-label={`View ${image.alt} from ${image.location}`}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  loading="lazy"
                  style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium">{image.alt}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-300">
                    <MapPin className="w-3 h-3 mr-1" aria-hidden="true" />
                    {image.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No images found for this filter.</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              View All Images
            </button>
          </div>
        )}
      </div>
    </section>
  )

  const renderTestimonialsSection = () => (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-900" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 id="testimonials-heading" className="text-3xl font-bold mb-2">TESTIMONIALS</h2>
            <p className="text-gray-400">What our adventurers say about their experiences</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentTestimonial ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-selected={idx === currentTestimonial}
                role="tab"
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="relative h-full" role="tabpanel" aria-label="Testimonial content">
            <AnimatePresence mode="wait">
              {TESTIMONIALS.map(
                (testimonial, idx) =>
                  idx === currentTestimonial && (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-800 rounded-2xl p-8 md:p-12"
                    >
                      <Quote className="w-12 h-12 text-orange-700 mb-6 opacity-50" aria-hidden="true" />
                      <p className="text-xl md:text-2xl italic mb-8 text-gray-300">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={`${testimonial.name}'s profile`}
                            width="64"
                            height="64"
                            loading="lazy"
                            style={{ objectFit: "cover" }}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold">{testimonial.name}</h4>
                          <p className="text-gray-400">{testimonial.trip}</p>
                          <div className="flex mt-1" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" aria-hidden="true" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )

  const renderImageSliderSection = () => (
    <section 
      className="relative h-[80vh] overflow-hidden" 
      aria-label="Inspirational quotes and images"
    >
      <AnimatePresence mode="wait">
        {SLIDER_IMAGES.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                className="absolute inset-0"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1 }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={slide.src || "/placeholder.svg"}
                    alt={`Himalayan adventure scene ${index + 1}`}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.p
                      variants={fadeInUpVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl px-4"
                    >
                      {slide.quote}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Slider Dots */}
      <div 
        className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3"
        role="tablist"
        aria-label="Slider navigation"
      >
        {SLIDER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>
    </section>
  )

  const renderLightbox = () => (
    <AnimatePresence>
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("prev")
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("next")
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
            role="img"
          >
            {filteredImages.map(
              (image) =>
                image.id === selectedImage && (
                  <div key={image.id} className="w-full h-full relative">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                      }}
                      className="object-contain"
                      loading="eager"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                      <h3 className="text-xl font-medium">{image.alt}</h3>
                      <div className="flex items-center mt-1 text-gray-300">
                        <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
                        {image.location}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const renderSocialButtons = () => (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-4">
      {/* Instagram Button */}
      <motion.a
        href="https://www.instagram.com/revnroar.ig/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full shadow-lg hover:opacity-90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        aria-label="Visit our Instagram"
      >
        <FaInstagram className="h-8 w-8 text-white" aria-hidden="true" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/7017775164"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="h-8 w-8 text-white" aria-hidden="true" />
      </motion.a>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black text-white">
      {/* Main Sections */}
      {renderHeroSection()}
      {renderGallerySection()}
      {renderTestimonialsSection()}
      {renderImageSliderSection()}
      {renderLightbox()}
      {renderSocialButtons()}
    </div>
  )
}

export default Gallery