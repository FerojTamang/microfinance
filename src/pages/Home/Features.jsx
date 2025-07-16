function Features() {
  const features = [
    { title: "Micro Loans", desc: "Affordable loans with easy repayment options." },
    { title: "Savings Account", desc: "Secure and flexible savings plans." },
    { title: "Community Support", desc: "Building growth through collective effort." },
    { title: "Financial Literacy", desc: "Empowering you with knowledge." }
  ];

  return (
    <section style={{ padding: "3rem 2rem", backgroundColor: "#f9f9f9", textAlign: "center" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem", fontWeight: "700" }}>Our Services</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        {features.map(({ title, desc }, i) => (
          <div key={i} style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "15px",
            width: "250px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "transform 0.3s",
            cursor: "default"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-10px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <h3 style={{ fontWeight: "700", marginBottom: "1rem" }}>{title}</h3>
            <p style={{ color: "#555" }}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
