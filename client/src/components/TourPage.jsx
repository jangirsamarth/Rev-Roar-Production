/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";

// Example image imports (replace with your own)
import ladakhImg from "/stamp/stamp-10.png";
import spitiImg from "/stamp/stamp-10.png";
import enrollStamp from "../assets/lion-logo.png";
import { useNavigate } from "react-router-dom";

const TourPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState(""); // Which tour was clicked
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();


  const handleCardClick = (tourName) => {
    setSelectedTour(tourName);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Build form data to match your Google Form field IDs.
    const data = new FormData();
    data.append("entry.123456789", formData.name); // Replace with your actual field ID for name
    data.append("entry.987654321", formData.email); // Replace with your actual field ID for email
    data.append("entry.111111111", selectedTour);   // Optional: include selected tour info

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse", // Replace with your actual form endpoint
        {
          method: "POST",
          mode: "no-cors", // Required for Google Forms
          body: data,
        }
      );
      // Redirect to itinerary page upon successful submission
      // window.location.href = "/itinerarypage";

    navigate("/itinerarypage"); // Ensure correct spelling

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-20 px-4 relative">
      {/* Page Heading */}
      <h1 className="text-center text-[36px] md:text-[58px] font-mono font-bold mb-12">
        Rev & Roar Tour Packages
      </h1>

      {/* Cards Container */}
      <div className="mx-52 grid grid-cols-1 md:grid-cols-2 gap-8 items-start space-x-6">
        {/* Ladakh Card */}
        <div
          className="bg-white flex items-center justify-start gap-4 py-8 cursor-pointer"
          onClick={() => handleCardClick("LADAKH")}
        >
          <div className="flex flex-col items-center text-center gap-3 h-fit relative">
            <img
              src={ladakhImg}
              alt="Ladakh Stamp"
              className="w-full max-w-sm object-contain"
            />
            <div className="mt-4 absolute bottom-12">
              <p className="text-[36px] font-mono font-semibold">LADAKH</p>
            </div>
          </div>
          <div className="h-full w-fit">
            <span>hi</span>
          </div>
        </div>

        {/* Spiti Card */}
        <div
          className="bg-white flex items-center justify-start gap-4 py-8 cursor-pointer"
          onClick={() => handleCardClick("SPITI")}
        >
          <div className="flex flex-col items-center text-center gap-3 h-fit relative">
            <img
              src={spitiImg}
              alt="Spiti Stamp"
              className="w-full max-w-sm object-contain"
            />
            <div className="mt-4 absolute bottom-12">
              <p className="text-[36px] font-mono font-semibold">SPITI</p>
            </div>
          </div>
          <div className="h-full w-fit">
            <span>hi</span>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowForm(false)}
          ></div>
          {/* Modal Content */}
          <div className="relative bg-white p-6 rounded shadow-lg z-60 w-11/12 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">
              Plan Your Rev & Roar Adventure - {selectedTour}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-orange-600 text-white rounded transition-all duration-200"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </motion.button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPage;
