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

    // In a real app, here you'd send it to a backend
    alert("Thank you for your feedback!");
    setFeedback("");
    setName("");
  };

  return (
    <section style={{
      padding: "3rem 1.5rem",
      backgroundColor: "#f9f9f9",
      borderRadius: "20px",
      maxWidth: "800px",
      margin: "3rem auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{
        fontSize: "2rem",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#004d40"
      }}>
        We Value Your Feedback
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Your feedback..."
          style={{
            padding: "1rem",
            fontSize: "1rem",
            borderRadius: "12px",
            border: "1px solid #ccc",
            resize: "vertical",
            minHeight: "120px",
            background: "#fff",
            outlineColor: "#00796b"
          }}
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name (optional)"
          style={{
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            borderRadius: "12px",
            border: "1px solid #ccc",
            background: "#fff",
            outlineColor: "#00796b"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: "#00796b",
            color: "white",
            fontWeight: "600",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            alignSelf: "flex-start",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#004d40"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#00796b"}
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default FeedbackSection;
