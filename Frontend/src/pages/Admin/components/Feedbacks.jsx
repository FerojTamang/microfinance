import React from 'react';

const Feedbacks = ({ feedbackList = [] }) => {
  if (!feedbackList.length) {
    return <p className="p-4 text-gray-600">No feedback received yet.</p>;
  }

  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">User Feedbacks</h2>
      <ul className="space-y-4">
        {feedbackList.map(({ id, name, email, message, date }) => (
          <li key={id} className="border p-4 rounded shadow bg-white">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">{name}</span>
              <span className="text-sm text-gray-500">
                {new Date(date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-1">{message}</p>
            <p className="text-xs text-gray-500">Email: {email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedbacks;
