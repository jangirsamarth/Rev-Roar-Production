"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Star, Quote, Camera, Mountain, Bike } from "lucide-react";

// Replace these with your actual images as needed
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Pangong Lake at sunset",
    category: "landscapes",
    location: "Ladakh",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Biking through mountain passes",
    category: "adventures",
    location: "Khardung La",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Group photo at Key Monastery",
    category: "people",
    location: "Spiti Valley",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Camping under the stars",
    category: "adventures",
    location: "Nubra Valley",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Ancient monastery",
    category: "culture",
    location: "Spiti Valley",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Royal Enfield on mountain road",
    category: "adventures",
    location: "Ladakh",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Snow-capped mountains",
    category: "landscapes",
    location: "Ladakh",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Local villagers",
    category: "people",
    location: "Spiti Valley",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Prayer flags on mountain pass",
    category: "culture",
    location: "Ladakh",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Tempo traveler journey",
    category: "adventures",
    location: "Spiti Valley",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Chandratal Lake",
    category: "landscapes",
    location: "Spiti Valley",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Corporate team building",
    category: "people",
    location: "Ladakh",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Neha Sharma",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "This trip was the best decision of my life! Riding through Ladakh with Rev & Roar felt like living a dream. Their team made every moment unforgettable!",
    trip: "Ladakh Bike Expedition",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "As a corporate group, we were blown away by their professionalism and attention to detail. From tempo rides to adventure-packed days, every detail was perfect!",
    trip: "Corporate Retreat to Spiti",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "The Spiti Valley tour exceeded all my expectations. The guides were knowledgeable, accommodations were comfortable, and the views were absolutely breathtaking!",
    trip: "Spiti Valley Explorer",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "As an avid photographer, I was looking for the perfect spots to capture the Himalayas. Rev & Roar's team knew exactly where to take me for those perfect shots!",
    trip: "Photography Tour",
    rating: 5,
  },
];

const sliderImages = [
  {
    src: "/placeholder.svg?height=1080&width=1920",
    quote: "Thrilling High-altitude Passes with Expert Guides.",
  },
  {
    src: "/placeholder.svg?height=1080&width=1920",
    quote: "The hum of your bike engine as you conquer Khardung LA.",
  },
  {
    src: "/placeholder.svg?height=1080&width=1920",
    quote: "A shared laugh with friends under the starry skies of Spiti.",
  },
];

const categories = [
  { id: "all", label: "All Photos", icon: <Camera className="w-4 h-4" /> },
  { id: "landscapes", label: "Landscapes", icon: <Mountain className="w-4 h-4" /> },
  { id: "adventures", label: "Adventures", icon: <Bike className="w-4 h-4" /> },
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
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  { id: "ladakh", label: "Ladakh", icon: <MapPin className="w-4 h-4" /> },
  { id: "spiti valley", label: "Spiti Valley", icon: <MapPin className="w-4 h-4" /> },
];

export  function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayRef = useRef(null);

  const filteredImages =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter(
          (img) =>
            img.category === activeFilter ||
            img.location.toLowerCase() === activeFilter.toLowerCase()
        );

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleImageClick = (id) => {
    setSelectedImage(id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setSelectedImage(filteredImages[newIndex].id);
  };

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Gallery hero"
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

      {/* Gallery Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Filter Controls */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse Our Adventures</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium">{image.alt}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-300">
                      <MapPin className="w-3 h-3 mr-1" />
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

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">TESTIMONIALS</h2>
              <p className="text-gray-400">What our adventurers say about their experiences</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === currentTestimonial ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="relative h-full">
              <AnimatePresence mode="wait">
                {testimonials.map(
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
                        <Quote className="w-12 h-12 text-orange-600 mb-6 opacity-50" />
                        <p className="text-xl md:text-2xl italic mb-8 text-gray-300">"{testimonial.text}"</p>
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              width="64"
                              height="64"
                              style={{ objectFit: "cover" }}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">{testimonial.name}</h4>
                            <p className="text-gray-400">{testimonial.trip}</p>
                            <div className="flex mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
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

      {/* Image Slider Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <AnimatePresence mode="wait">
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
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
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
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div
              className="relative max-w-5xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
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
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                        <h3 className="text-xl font-medium">{image.alt}</h3>
                        <div className="flex items-center mt-1 text-gray-300">
                          <MapPin className="w-4 h-4 mr-1" />
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
    </div>
  );
}

// Custom MapPin component (converted to plain JSX)
function MapPin({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}


export default Gallery;
