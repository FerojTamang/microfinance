import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

/**
 * Feedbacks component to display and manage feedback list.
 * @param {Array} feedbackList - List of feedback objects.
 * @param {Function} setSelectedFeedbackForEdit - Function to set the feedback for editing.
 * @returns {JSX.Element} - A table or list of feedback items with edit options.
 */
const Feedbacks = ({ feedbackList, setSelectedFeedbackForEdit }) => {
  const handleEdit = (feedback) => {
    setSelectedFeedbackForEdit(feedback);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-green-200">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Feedback Management</h2>
      {feedbackList.length === 0 ? (
        <p className="text-gray-600">No feedback available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbackList.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{feedback.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{feedback.feedback}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{feedback.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(feedback)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

Feedbacks.propTypes = {
  feedbackList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      feedback: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      timestamp: PropTypes.string,
      imageDataUrl: PropTypes.string,
    })
  ).isRequired,
  setSelectedFeedbackForEdit: PropTypes.func.isRequired,
};

export default Feedbacks;