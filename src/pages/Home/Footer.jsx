function Footer() {
  return (
    <footer style={{
      backgroundColor: "#00251a",
      color: "#b2dfdb",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      padding: "2rem",
      gap: "2rem"
    }}>
      <div>
        <h4 style={{ fontWeight: "700", marginBottom: "1rem" }}>Contact Us</h4>
        <p>Phone: +977 9800000000</p>
        <p>Email: info@microfinance.com</p>
        <p>Address: Kathmandu, Nepal</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <h4 style={{ fontWeight: "700", marginBottom: "1rem" }}>Follow Us</h4>
        <p>
          <a href="#" style={{ color: "#b2dfdb", marginRight: "1rem" }}>Facebook</a>
          <a href="#" style={{ color: "#b2dfdb", marginRight: "1rem" }}>Twitter</a>
          <a href="#" style={{ color: "#b2dfdb" }}>LinkedIn</a>
        </p>
      </div>

      <div style={{ textAlign: "right" }}>
        <h4 style={{ fontWeight: "700", marginBottom: "1rem" }}>Location</h4>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5715675452546!2d85.30014011447563!3d27.70136558279981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199bdc0d0d39%3A0x56e03c92d48cc3ce!2sKathmandu!5e0!3m2!1sen!2snp!4v1678909876543!5m2!1sen!2snp"
          width="100%"
          height="120"
          style={{ border: 0, borderRadius: "15px" }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
    </footer>
  );
}

export default Footer;
