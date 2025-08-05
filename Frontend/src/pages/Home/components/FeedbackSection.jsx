import { useState } from "react";

function FeedbackSection() {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    // Load existing feedback from localStorage
    const existingFeedback = JSON.parse(localStorage.getItem("feedbackList") || "[]");
    // Create new feedback entry
    const newFeedback = {
      id: Date.now(),
      feedback,
      name,
      timestamp: new Date().toLocaleString(),
    };
    // Save updated feedback list to localStorage
    localStorage.setItem("feedbackList", JSON.stringify([...existingFeedback, newFeedback]));
    
    alert("Thank you for your feedback!");
    setFeedback("");
    setName("");
  };

  return (
    <section className="p-6 sm:p-12 bg-gray-50 rounded-3xl max-w-2xl mx-auto my-12 shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-teal-900">
        We Value Your Feedback
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback..."
          className="p-4 text-base rounded-xl border border-gray-300 min-h-[120px] bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 resize-y"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name (optional)"
          className="p-3 text-base rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-full self-start hover:bg-teal-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default FeedbackSection;