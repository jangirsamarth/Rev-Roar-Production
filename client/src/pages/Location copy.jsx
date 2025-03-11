"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ChevronRight, Mountain, Camera, Sun, Cloud, ArrowRight } from "lucide-react";

// Sample data for destinations
const destinations = [
  {
    id: "ladakh",
    name: "Ladakh",
    tagline: "The Land of High Passes",
    description:
      "Think Pangong Tso's magical hue, the thrill of Khardung La, and the warm smiles of Nubra Valley...",
    fullDescription:
      "Nestled in the northernmost part of India, Ladakh is a land of stark landscapes, ancient monasteries, and vibrant culture. From the world's highest motorable passes to serene lakes that change colors with the sun, Ladakh offers an otherworldly experience that stays with you long after you've left.",
    image: "/Ladakh3.webp?height=1080&width=1920",
    mapLocation: "34.1526° N, 77.5770° E",
    bestTimeToVisit: "June to September",
    altitude: "3,000 - 5,500 meters",
    climate: "Cold desert, extreme temperatures",
    highlights: [
      {
        name: "Pangong Lake",
        description: "The stunning blue lake that changes colors throughout the day",
        image: "/Ladakh-featured.webp?height=400&width=600",
      },
      {
        name: "Khardung La Pass",
        description: "One of the world's highest motorable passes at 18,380 ft",
        image: "/ladakh-hero-location-2.webp?height=400&width=600",
      },
      {
        name: "Nubra Valley",
        description: "Known for its sand dunes, double-humped camels, and monasteries",
        image: "/pexels-dhruv-jangid-2945224-30255573.webp?height=400&width=600",
      },
    ],
  },
  {
    id: "spiti",
    name: "Spiti",
    tagline: "The Middle Land",
    description:
      "A remote wonderland with crystal-clear skies, ancient monasteries, and landscapes that belong in a dream...",
    fullDescription:
      "Spiti Valley, often referred to as 'Little Tibet', is a cold desert mountain valley located high in the Himalayas. With its breathtaking landscapes, thousand-year-old monasteries, and clear night skies perfect for stargazing, Spiti offers a journey into both natural beauty and spiritual tranquility.",
    image: "/spiti-location.webp?height=1080&width=1920",
    mapLocation: "32.2464° N, 78.0349° E",
    bestTimeToVisit: "May to October",
    altitude: "3,800 meters (average)",
    climate: "Cold desert, extreme temperatures",
    highlights: [
      {
        name: "Key Monastery",
        description: "A thousand-year-old Buddhist monastery perched on a hilltop",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        name: "Chandratal Lake",
        description: "The 'Moon Lake' known for its crescent shape and crystal clear waters",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        name: "Dhankar Monastery",
        description: "An ancient monastery built on a cliff offering spectacular views",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        name: "Pin Valley",
        description: "Home to the endangered snow leopard and ibex in a stunning landscape",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
  },
];

export default function LocationsPage() {
  const [activeDestination, setActiveDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, number };

    try {
      const response = await fetch("http://localhost:5000/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setTimeout(() => {
          window.location.href = "/itinerarypage";
        }, 2000);
      } else {
        alert("Error submitting the form.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal on button click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/ladakh-hero-location-2.webp?height=1080&width=1920"
            alt="Mountains background"
            style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-6 mb-8"
          >
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-center md:text-right"
            >
              DESTINATIONS <br className="hidden md:block" /> WE CALL HOME
            </motion.h1>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="h-20 md:h-32"
            >
              <img
                src="/logo-white.png?height=200&width=400"
                alt="Rev & Roar Logo"
                width="200"
                height="100"
                className="h-full w-auto object-contain"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl max-w-3xl text-center font-light"
          >
            Discover the breathtaking landscapes and unique cultures of our favorite Himalayan destinations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <a
              href="#destinations"
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
              onClick={openModal} // Open the modal on "Explore Tours" button click
            >
              <span className="mb-2">Explore Destinations</span>
              <ChevronRight className="w-6 h-6 rotate-90 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Modal for Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4 text-black" onClick={closeModal}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Sign Up for the Tour</h2>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="number" className="block text-gray-700">Phone Number:</label>
                <input
                  type="text"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md"
                disabled={isFormSubmitted}
              >
                {isFormSubmitted ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Destinations Overview */}
      <section id="destinations" className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold mb-16 text-center"
          >
            Our Himalayan Havens
          </motion.h2>

          <div className="space-y-32">
            {destinations.map((destination, index) => (
              <div key={destination.id} className="scroll-mt-20" id={destination.id}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
                >
                  {/* Destination Image */}
                  <motion.div
                    variants={fadeInUp}
                    className="w-full md:w-1/2 relative h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl"
                  >
                    <img
                      src={destination.image || "/ladakh-hero-location.webp"}
                      alt={destination.name}
                      className="object-cover"
                      style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? "r" : "l"} from-black/70 via-black/30 to-transparent`}
                    />

                    <div className={`absolute bottom-0 ${index % 2 === 0 ? "left-0" : "right-0"} p-8 md:p-12 max-w-md`}>
                      <h2 className="text-5xl md:text-7xl font-bold text-white mb-2">{destination.name}</h2>
                      <p className="text-white/90 text-lg">{destination.tagline}</p>
                    </div>
                  </motion.div>

                  {/* Destination Info */}
                  <motion.div variants={fadeInUp} className="w-full md:w-1/2 p-4">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Discover {destination.name}</h3>
                    <p className="text-lg text-gray-700 mb-6">{destination.fullDescription}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Location</h4>
                          <p className="text-gray-600">{destination.mapLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                          <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mountain className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Altitude</h4>
                          <p className="text-gray-600">{destination.altitude}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Cloud className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Climate</h4>
                          <p className="text-gray-600">{destination.climate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() =>
                          setActiveDestination(activeDestination === destination.id ? null : destination.id)
                        }
                        className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                      >
                        {activeDestination === destination.id ? "Hide Highlights" : "View Highlights"}
                        <ChevronRight
                          className={`ml-2 w-5 h-5 transition-transform ${activeDestination === destination.id ? "rotate-90" : ""}`}
                        />
                      </button>

                      <a
                        href={`/tours/${destination.id}`}
                        className="px-6 py-3 bg-white border border-blue-600 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors flex items-center"
                      >
                        Explore Tours
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Highlights Section */}
                {activeDestination === destination.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 overflow-hidden"
                  >
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Highlights of {destination.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {destination.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={highlight.image || "/placeholder.svg"}
                              alt={highlight.name}
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-lg mb-2">{highlight.name}</h4>
                            <p className="text-gray-600 text-sm">{highlight.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Travel Tips for Himalayan Adventures</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Make the most of your journey with these essential tips for high-altitude travel
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Mountain className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Altitude Acclimatization</h3>
              <p className="text-gray-600">
                Take it slow for the first 24-48 hours. Stay hydrated, avoid alcohol, and consider medications like Diamox after consulting your doctor.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Sun className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Weather Preparation</h3>
              <p className="text-gray-600">
                Pack layers! Temperatures can vary drastically between day and night. Always carry a good quality sunscreen, sunglasses, and a hat.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Photography Tips</h3>
              <p className="text-gray-600">
                Carry extra batteries as they drain faster in cold. The light is magical during golden hours, and night skies offer incredible stargazing opportunities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Explore These Breathtaking Destinations?</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
              Let us guide you through the majestic landscapes of Ladakh and Spiti Valley. Book your adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors flex items-center"
              >
                Contact Us
              </a>
              <a
                href="/itinerarypage"
                className="px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors flex items-center"
              >
                Browse Tours
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
