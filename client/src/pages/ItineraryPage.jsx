"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Download, ChevronRight, Mountain, Globe, Users } from "lucide-react";
import { constant } from "../constants";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
// Import your modal component – adjust the path if needed
import GoogleFormModal from "../components/GoogleFormModal";

const ItineraryPage = () => {
  const [expandedItinerary, setExpandedItinerary] = useState(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [fomoVisible, setFomoVisible] = useState(false);
  const [fomoMessage, setFomoMessage] = useState("");

  // FOMO notification messages
  const fomoMessages = [
    "5 people booked this trip in the last hour!",
    "Only 3 seats left for the May expedition!",
    "7 people are viewing this itinerary right now",
    "Last booking was 2 minutes ago",
    "90% of trips for June are already booked",
  ];

  // Setup FOMO notifications
  useEffect(() => {
    // Show notification after 5 seconds
    const timer = setTimeout(() => {
      setFomoMessage(fomoMessages[Math.floor(Math.random() * fomoMessages.length)]);
      setFomoVisible(true);
    }, 5000);

    // Hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setFomoVisible(false);
    }, 13000);

    // Set interval to show notifications periodically
    const interval = setInterval(() => {
      setFomoMessage(fomoMessages[Math.floor(Math.random() * fomoMessages.length)]);
      setFomoVisible(true);

      // Hide after 8 seconds
      setTimeout(() => {
        setFomoVisible(false);
      }, 8000);
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  const toggleExpand = (title) => {
    setExpandedItinerary(expandedItinerary === title ? null : title);
  };

  // Function to open modal and set the PDF URL
  const openDownloadModal = (pdf) => {
    setSelectedPdf(pdf);
    setIsDownloadModalOpen(true);
  };

  // Simply close the modal without opening the PDF
  const handleModalClose = () => {
    setIsDownloadModalOpen(false);
  };

  // Updated handleFormSubmit to prevent default form submission and handle PDF download
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    console.log("Selected PDF:", selectedPdf); // Check selected PDF URL

    setIsDownloadModalOpen(false);
    if (selectedPdf) {
      // Open the selected PDF in a new tab
      window.open(selectedPdf, "_blank");
    }
  };

  // Updated renderTimeSlots function to show available seats and create FOMO
  const renderTimeSlots = (timeSlots) => {
    if (!timeSlots || timeSlots.length === 0) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {timeSlots.map((slot, index) => {
          if (slot.header) {
            return (
              <div key={index} className="col-span-full text-lg font-bold text-gray-800 mb-2">
                {slot.header}
              </div>
            );
          }

          // Generate random number of seats between 5-20 if not specified
          const seatsLeft = Math.floor(Math.random() * 16) + 5;
          // Determine color based on seats available
          let bgColor = "bg-green-600";
          if (seatsLeft < 8) {
            bgColor = "bg-red-600"; // Almost sold out
          } else if (seatsLeft < 12) {
            bgColor = "bg-orange-500"; // Selling fast
          }

          return (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 flex flex-col">
                <span className="font-bold text-gray-800">{slot.code}</span>
                <span className="text-gray-700">{slot.dates}</span>
                <span className="text-sm text-gray-600">Srinagar Leh Manali</span>
              </div>
              <div className={`${bgColor} text-white text-xs font-bold py-1 px-2 flex items-center self-start m-3 rounded`}>
                {seatsLeft} SEATS LEFT
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  console.log("ItineraryPage");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-orange-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/temppo.webp?height=600&width=1200" alt="Mountains background" className="object-cover" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Your Adventure</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Explore our carefully crafted itineraries for unforgettable journeys through the Himalayas
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Itineraries</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose an itinerary below to view the details and download the full PDF. Each journey is designed to provide
            you with an authentic and memorable experience.
          </p>
        </div>

        {constant.length > 0 ? (
          constant.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="mb-20"
            >
              <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
                <div className="md:w-1/3 rounded-xl overflow-hidden shadow-lg">{/* Image placeholder */}</div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-4 flex items-center">
                    <Mountain className="mr-2 text-orange-600" />
                    {group.category}
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">{group.description}</p>
                  <div className="flex items-center text-orange-600">
                    <MapPin className="mr-2" size={18} />
                    <span className="font-medium">Himalayas, India</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {group.options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (idx + index) * 0.1 + 0.3, duration: 0.5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleExpand(option.title)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-2 text-gray-800">{option.title}</h3>
                          <div className="flex items-center mb-3 text-gray-600">
                            <Calendar className="mr-2" size={18} />
                            <span>{option.duration}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 my-3 md:my-0">
                          {option.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                        <ChevronRight
                          className={`transition-transform duration-300 flex-shrink-0 text-orange-600 ${
                            expandedItinerary === option.title ? "rotate-90" : ""
                          }`}
                          size={24}
                        />
                      </div>
                    </div>

                    {expandedItinerary === option.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-6 bg-gray-50">
                          <h4 className="font-semibold text-lg mb-3 text-gray-700">Detailed Itinerary</h4>
                          <pre className="text-gray-700 whitespace-pre-wrap mb-6 font-sans text-base">
                            {option.snippet}
                          </pre>
                          {option.timeSlots && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-lg mb-3 text-gray-700">Available Time Slots</h4>
                              {renderTimeSlots(option.timeSlots)}
                            </div>
                          )}
                          <button
                            onClick={() => openDownloadModal(option.pdf)}
                            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
                          >
                            <Download className="mr-2" size={18} />
                            Download Full Itinerary
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <>hello</>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 bg-orange-50 rounded-2xl p-8 text-center shadow-md"
        >
          <h3 className="text-2xl font-bold mb-4">Ready for Your Adventure?</h3>
          <p className="text-lg mb-6">
            Contact us today to book your dream Himalayan journey or customize your own itinerary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a
              href="http://www.revnroar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg border border-blue-200 hover:bg-orange-50 transition-colors duration-200"
            >
              <Globe className="mr-2" size={18} />
              www.revnroar.com
            </a>
            <a
              href="tel:+917017775164"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +91-7017775164
            </a>
          </div>
        </motion.div>
      </div>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
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
        >
          <FaInstagram className="h-8 w-8 text-white" />
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
        >
          <FaWhatsapp className="h-8 w-8 text-white" />
        </motion.a>
      </div>

      {/* FOMO Notification */}
      <AnimatePresence>
        {fomoVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-6 z-40 bg-white rounded-lg shadow-lg p-4 max-w-xs border-l-4 border-orange-500"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <p className="text-sm font-medium">{fomoMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render the GoogleFormModal and pass both onClose and onSubmit callbacks */}
      <GoogleFormModal isOpen={isDownloadModalOpen} onClose={handleModalClose} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ItineraryPage;
