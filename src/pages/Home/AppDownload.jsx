function AppDownload() {
  return (
    <section style={{
      backgroundColor: "#004d40",
      color: "white",
      textAlign: "center",
      padding: "3rem 2rem"
    }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Download Our Mobile App</h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: 0.8 }}>
        Manage your loans and savings on the go with our app.
      </p>
      <a 
        href="#"
        style={{
          display: "inline-block",
          backgroundColor: "#ffc107",
          color: "#004d40",
          padding: "0.75rem 2rem",
          borderRadius: "30px",
          fontWeight: "700",
          textDecoration: "none",
          boxShadow: "0 5px 15px rgba(255,193,7,0.5)",
          transition: "background-color 0.3s"
        }}
        onMouseOver={e => e.target.style.backgroundColor = "#ffca28"}
        onMouseOut={e => e.target.style.backgroundColor = "#ffc107"}
      >
        Download Now
      </a>
    </section>
  );
}

export default AppDownload;
