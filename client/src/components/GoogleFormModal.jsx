import React, { useState } from "react";
import PropTypes from "prop-types";

const GoogleFormModal = ({ isOpen, onClose }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Mark the form as submitted
    setIsFormSubmitted(true);

    const formData = {
      name: name,
      email: email,
      number: number,
    };

    try {
      const response = await fetch("http://localhost:3000/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Wait for a short time before redirecting to let the user see the success message
        setTimeout(() => {
          window.location.href = "/itinerarypage"; // Redirect after 2 seconds
        }, 2000);
      } else {
        alert("Error submitting the form.");
        setIsFormSubmitted(false); // Reset the submission state if there was an error
      }
    } catch (error) {
      console.error("Error:", error);
      setIsFormSubmitted(false); // Reset the submission state if there was an error
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Sign Up for the Tour</h2>

        {/* Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
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
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
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
            <label htmlFor="number" className="block text-gray-700">
              Phone Number:
            </label>
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
  );
};

GoogleFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GoogleFormModal;
