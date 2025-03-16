import React, { useState, useCallback } from 'react';

const SubmitForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    setMessage('');

    // Validate inputs
    if (!name || !email || !number) {
      setMessage('All fields are required');
      setIsSubmitting(false);
      return;
    }

    // Send form data without a timestamp
    const formData = { name, email, number };

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || 'Form submitted successfully!');
        setName('');
        setEmail('');
        setNumber('');
      } else {
        setMessage(result.error || 'An error occurred while submitting the form.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to submit form.');
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, number, isSubmitting]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Submit Your Details</h2>
      {message && <p className="text-center mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <label htmlFor="number" className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isSubmitting}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default React.memo(SubmitForm);
