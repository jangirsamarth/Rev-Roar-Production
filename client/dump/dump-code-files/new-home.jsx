import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Removed Next.js Image and Link imports; using <img> and <a> instead.
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar, Mountain, Bike } from "lucide-react";

const sliderImages = [
  {
    src: "/placeholder.svg?height=1080&width=1920",
    quote: "Thrilling High-altitude Passes with Expert Guides.",
    location: "Ladakh, India",
    tag: "Adventure"
  },
  {
    src: "/placeholder.svg?height=1080&width=1920",
    quote: "The hum of your bike engine as you conquer Khardung LA.",
    location: "Khardung La, Ladakh",
    tag: "Bike Tours"
  },
  {
    src: "/placeholder.svg?height=1080&width=1920",
    quote: "A shared laugh with friends under the starry skies of Spiti.",
    location: "Spiti Valley, Himachal Pradesh",
    tag: "Group Tours"
  }
];

const featuredDestinations = [
  {
    name: "Ladakh",
    image: "/placeholder.svg?height=600&width=800",
    description: "Experience the breathtaking landscapes and ancient monasteries",
    tag: "Popular"
  },
  {
    name: "Spiti Valley",
    image: "/placeholder.svg?height=600&width=800",
    description: "Discover the hidden gem of the Himalayas with stunning vistas",
    tag: "Trending"
  },
  {
    name: "Manali",
    image: "/placeholder.svg?height=600&width=800",
    description: "Gateway to adventure and natural beauty in the mountains",
    tag: "Classic"
  }
];

export  function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentSlide, isAutoplay]);

  const handleSlideNavigation = (index) => {
    setCurrentSlide(index);
    resetAutoplay();
  };

  const handleManualNavigation = () => {
    // Temporarily pause autoplay when user manually navigates
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
    resetAutoplay();
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section with Improved Slider */}
      <div className="relative h-screen overflow-hidden">
        {/* Logo */}
        <motion.div 
          className="absolute top-8 left-8 z-30 md:top-12 md:left-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img 
            src="/placeholder.svg?height=200&width=400" 
            alt="Rev & Roar Logo" 
            width="180" 
            height="90"
            className="h-16 md:h-24 w-auto object-contain"
          />
        </motion.div>
        
        {/* Main Slider */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {sliderImages.map((slide, index) =>
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
                        objectFit: "cover"
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
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                          {slide.quote}
                        </h1>
                        <div className="flex items-center justify-center text-white/90 text-lg">
                          <MapPin className="w-5 h-5 mr-2" />
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
              prevSlide();
              handleManualNavigation();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => {
              nextSlide();
              handleManualNavigation();
            }}
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
                onClick={() => handleSlideNavigation(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-white scale-125" 
                    : "bg-white/50 hover:bg-white/70"
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
            <span className="text-sm mb-2">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight className="w-6 h-6 rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Featured Destinations Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                Featured Destinations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Discover our handpicked destinations that offer unforgettable experiences and breathtaking landscapes.
              </p>
            </div>
            <a 
              href="/destinations" 
              className="mt-4 md:mt-0 inline-flex items-center text-orange-600 font-medium hover:text-orange-800 transition-colors"
            >
              View all destinations
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-sm font-medium">
                      {destination.tag}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                    <p className="text-white/90 mb-4">{destination.description}</p>
                    <a 
                      href={`/destinations/${destination.name.toLowerCase()}`}
                      className="inline-flex items-center text-white font-medium hover:text-orange-200 transition-colors"
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
      
      {/* Adventure Types Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Choose Your Adventure
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're seeking thrilling rides or serene landscapes, we have the perfect adventure waiting for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  src="/placeholder.svg?height=400&width=600"
                  alt="Bike Tours"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Bike className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Bike Tours</h3>
                <p className="text-gray-600 mb-4">
                  Feel the roar of the engine as you conquer high mountain passes on a Royal Enfield or Himalayan.
                </p>
                <a
                  href="/adventures/bike-tours"
                  className="inline-flex items-center text-orange-600 font-medium hover:text-orange-800 transition-colors"
                >
                  View bike tours
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
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
                  src="/placeholder.svg?height=400&width=600"
                  alt="Group Tours"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Group Tours</h3>
                <p className="text-gray-600 mb-4">
                  Perfect for families and friends who want to explore the mountains with comfort and convenience.
                </p>
                <a
                  href="/adventures/group-tours"
                  className="inline-flex items-center text-orange-600 font-medium hover:text-orange-800 transition-colors"
                >
                  View group tours
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
                  src="/placeholder.svg?height=400&width=600"
                  alt="Custom Tours"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Mountain className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Custom Tours</h3>
                <p className="text-gray-600 mb-4">
                  Create your own adventure with our customized tour packages tailored to your preferences.
                </p>
                <a
                  href="/adventures/custom-tours"
                  className="inline-flex items-center text-orange-600 font-medium hover:text-orange-800 transition-colors"
                >
                  Build your tour
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Tours Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Upcoming Tours
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl">
                Secure your spot on our next adventure. Limited seats available!
              </p>
            </div>
            <a 
              href="/tours" 
              className="mt-4 md:mt-0 inline-flex items-center text-orange-400 font-medium hover:text-orange-300 transition-colors"
            >
              View all tours
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tour Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-xl overflow-hidden group hover:bg-gray-700 transition-colors"
            >
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Ladakh Bike Expedition"
                  className="object-cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Bike Tour
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-300 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>June 15 - June 25, 2023</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Ladakh Bike Expedition</h3>
                <p className="text-gray-400 mb-4">
                  10-day adventure through the breathtaking landscapes of Ladakh on Royal Enfield bikes.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">₹45,000</span>
                  <a 
                    href="/tours/ladakh-bike-expedition"
                    className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Tour Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden group hover:bg-gray-700 transition-colors"
            >
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Spiti Valley Explorer"
                  className="object-cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Group Tour
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-300 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>July 5 - July 12, 2023</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Spiti Valley Explorer</h3>
                <p className="text-gray-400 mb-4">
                  7-day journey through the magical Spiti Valley with comfortable stays and guided exploration.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">₹35,000</span>
                  <a 
                    href="/tours/spiti-valley-explorer"
                    className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Tour Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl overflow-hidden group hover:bg-gray-700 transition-colors"
            >
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Manali Weekend Getaway"
                  className="object-cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Weekend Trip
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-300 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Every Weekend</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Manali Weekend Getaway</h3>
                <p className="text-gray-400 mb-4">
                  3-day refreshing escape to Manali with adventure activities and mountain views.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">₹12,000</span>
                  <a 
                    href="/tours/manali-weekend-getaway"
                    className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              What Our Adventurers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from those who've experienced the thrill firsthand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Testimonial Avatar"
                    width="48"
                    height="48"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Rahul Sharma</h4>
                  <p className="text-gray-600 text-sm">Ladakh Bike Expedition</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The Ladakh trip was life-changing! The team took care of everything, from bike maintenance to accommodations. The guides knew all the best spots and made sure we were safe throughout."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Testimonial Avatar"
                    width="48"
                    height="48"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Priya Patel</h4>
                  <p className="text-gray-600 text-sm">Spiti Valley Explorer</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "As a solo female traveler, I was a bit apprehensive, but the Rev & Roar team made me feel completely safe and comfortable. The Spiti Valley tour was perfectly organized with amazing local experiences."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Testimonial Avatar"
                    width="48"
                    height="48"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Amit Singh</h4>
                  <p className="text-gray-600 text-sm">Corporate Retreat</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "We took our entire team of 20 for a corporate retreat, and it was the best team-building experience we've had. The activities were thoughtfully planned, and the logistics were flawless."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
              Let's create memories that will last a lifetime. Contact us today to plan your perfect Himalayan journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/tours"
                className="px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors"
              >
                Browse Tours
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
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
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </motion.a>
      </div>
      
      {/* Here you would include your TourPage and ContactUs components */}
      {/* <TourPage /> */}
      {/* <ContactUs /> */}
    </div>
  );
}

// Converted Users component (plain JSX)
function Users({ className }) {
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
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
      />
    </svg>
  );
}

export { Users };
export default Home;
