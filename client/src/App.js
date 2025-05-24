import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [confirmation, setConfirmation] = useState('');

  const loadFeedback = async () => {
    const response = await fetch('http://localhost:5000/feedback');
    const result = await response.json();
    setFeedbackList(result);
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const updateField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setConfirmation('✅ Feedback submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
      loadFeedback();
      setTimeout(() => setConfirmation(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left Section: Heading */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 text-blue-900">
              Drop your<br />
              <span className="text-blue-500">Feedback</span>
            </h1>
            <p className="text-lg text-gray-600">
              We’d love to hear your thoughts!
            </p>
          </div>

          {/* Right Section: Feedback Form */}
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-8 mt-6 lg:mt-0">
            <form onSubmit={submitForm} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={updateField}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={updateField}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <textarea
                name="message"
                placeholder="Your Feedback"
                rows="4"
                value={formData.message}
                onChange={updateField}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
            {confirmation && (
              <div className="mb-4 text-green-600 font-medium">
                {confirmation}
              </div>
            )}
          </div>
        </div>

        {/* Display Submitted Feedback */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Submitted Feedback</h2>
          <ul className="space-y-4">
            {feedbackList.map(item => (
              <li
                key={item._id}
                className="bg-white shadow p-4 rounded-lg border-l-4 border-blue-500"
              >
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.message}</p>
                <p className="text-sm text-gray-400">
                  {new Date(item.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
