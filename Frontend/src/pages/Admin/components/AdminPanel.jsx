import { useState, useEffect } from "react";

function AdminPanel() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFeedback, setEditFeedback] = useState("");
  const [editName, setEditName] = useState("");

  // Load feedback from localStorage on mount
  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem("feedbackList") || "[]");
    setFeedbackList(savedFeedback);
  }, []);

  // Update localStorage when feedbackList changes
  useEffect(() => {
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleEdit = (feedback) => {
    setEditingId(feedback.id);
    setEditFeedback(feedback.feedback);
    setEditName(feedback.name);
  };

  const handleSave = (id) => {
    if (!editFeedback.trim()) {
      alert("Feedback cannot be empty.");
      return;
    }
    setFeedbackList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, feedback: editFeedback, name: editName }
          : item
      )
    );
    setEditingId(null);
  };

  const deleteFeedback = (id) => {
    setFeedbackList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="p-6 max-w-4xl mx-auto my-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Admin Feedback Panel
      </h2>
      {feedbackList.length === 0 ? (
        <p className="text-gray-600 text-center">No feedback available.</p>
      ) : (
        feedbackList.map((item) => (
          <div
            key={item.id}
            className="p-4 border-b border-gray-200 mb-4 last:border-b-0"
          >
            {editingId === item.id ? (
              <div className="flex flex-col gap-4">
                <textarea
                  value={editFeedback}
                  onChange={(e) => setEditFeedback(e.target.value)}
                  className="p-2 rounded-lg border border-gray-300 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name (optional)"
                  className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => handleSave(item.id)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-800 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-400 text-gray-800 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-700">
                  <strong>Feedback:</strong> {item.feedback}
                </p>
                <p className="text-gray-700">
                  <strong>Name:</strong> {item.name || "Anonymous"}
                </p>
                <p className="text-gray-700">
                  <strong>Time:</strong> {item.timestamp}
                </p>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteFeedback(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </section>
  );
}

export default AdminPanel;