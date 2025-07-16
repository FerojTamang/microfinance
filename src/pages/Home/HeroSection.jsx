function HeroSection() {
  return (
    <section style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      padding: "4rem 2rem",
      background: "linear-gradient(90deg, #004d40 0%, #00796b 100%)",
      color: "white",
      borderRadius: "0 0 50px 50px"
    }}>
      <div style={{ flex: "1 1 400px", maxWidth: "600px", marginBottom: "2rem" }}>
        <h1 style={{
          fontSize: "2.75rem",
          marginBottom: "1rem",
          fontWeight: "700",
          lineHeight: "1.2"
        }}>
          Empower Your Future with MicroFinance
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", opacity: 0.85 }}>
          Fast, reliable loans and savings designed for your growth and community development.
        </p>
        <div>
          <button style={{
            padding: "0.75rem 2rem",
            backgroundColor: "#ffc107",
            border: "none",
            borderRadius: "30px",
            fontWeight: "600",
            cursor: "pointer",
            marginRight: "1rem",
            transition: "background-color 0.3s"
          }} 
          onMouseOver={e => e.target.style.backgroundColor = "#ffca28"}
          onMouseOut={e => e.target.style.backgroundColor = "#ffc107"}>
            Register
          </button>
          <button style={{
            padding: "0.75rem 2rem",
            backgroundColor: "transparent",
            border: "2px solid white",
            borderRadius: "30px",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s"
          }}
          onMouseOver={e => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "#004d40";
          }}
          onMouseOut={e => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}>
            Login
          </button>
        </div>
      </div>

      <div style={{ flex: "1 1 400px", textAlign: "center" }}>
        <img 
          src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80"
          alt="Microfinance" 
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
        />
      </div>
    </section>
  );
}

export default HeroSection;
