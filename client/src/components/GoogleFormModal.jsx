import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

const GoogleFormModal = ({ isOpen, onClose }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    const formData = { name, email, number };

    try {
      const response = await fetch(
        "https://rev-roar-server.onrender.com/api/submitForm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Give user time to see success message before proceeding
        setTimeout(() => {
          // Instead of redirecting to itinerary page,
          // call onClose to let the parent handle PDF redirection
          onClose();
        }, 1000);
      } else {
        alert("Error submitting the form.");
        setIsFormSubmitted(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsFormSubmitted(false);
    }
  }, [name, email, number, onClose]);

  // Memoized input change handlers
  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleNumberChange = useCallback((e) => setNumber(e.target.value), []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Sign Up for the Tour</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={isFormSubmitted}
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
              onChange={handleEmailChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={isFormSubmitted}
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
              onChange={handleNumberChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={isFormSubmitted}
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

export default React.memo(GoogleFormModal);
