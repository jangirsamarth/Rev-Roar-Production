import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const GoogleFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsFormSubmitted(true);

      const formData = { name, email, number };

      // Await the parent's onSubmit function.
      await onSubmit(formData);
    },
    [name, email, number, onSubmit]
  );

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleNumberChange = useCallback((e) => setNumber(e.target.value), []);

  // Reset the form when the modal is closed.
  useEffect(() => {
    if (!isOpen) {
      setIsFormSubmitted(false);
      setName("");
      setEmail("");
      setNumber("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
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
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(GoogleFormModal);
