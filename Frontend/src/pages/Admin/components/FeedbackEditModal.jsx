import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const FeedbackEditModal = ({ feedback, onClose, updateFeedback }) => {
  if (!feedback) return null;

  const [formData, setFormData] = useState({
    name: feedback.name || '',
    feedback: feedback.feedback || '',
    phone: feedback.phone || '',
    timestamp: feedback.timestamp || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateFeedback(feedback.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-green-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-700">Edit Feedback</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">Timestamp</label>
            <input
              id="timestamp"
              name="timestamp"
              type="datetime-local"
              value={formData.timestamp}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

FeedbackEditModal.propTypes = {
  feedback: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    feedback: PropTypes.string,
    phone: PropTypes.string,
    timestamp: PropTypes.string,
    imageDataUrl: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  updateFeedback: PropTypes.func.isRequired,
};

export default FeedbackEditModal;