import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>
      <div className="contact-content">
        <section className="contact-info">
          <h2>Our Address</h2>
          <p>123 Microfinance Lane, Kathmandu, Nepal</p>
          <div className="map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.123456!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAwLjAiTiA4NcKwMTknMzAuMCJF!5e0!3m2!1sen!2snp!4v1626457890!5m2!1sen!2snp"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
        <section className="contact-details">
          <h2>Contact Persons</h2>
          <div className="contact-person">
            <h3>Chairperson</h3>
            <p>Name: Mr. Feroj Tamang</p>
            <p>Email: chairperson@microfinance.org</p>
            <p>Phone: +977-1-1234567</p>
          </div>
          <div className="contact-person">
            <h3>Member</h3>
            <p>Name: Ms. Amisha Lama</p>
            <p>Email: member@microfinance.org</p>
            <p>Phone: +977-1-7654321</p>
          </div>
          <div className="contact-person">
            <h3>Secretary</h3>
            <p>Name: Mr. Adarsha Lama</p>
            <p>Email: secretary@microfinance.org</p>
            <p>Phone: +977-1-9876543</p>
          </div>
        </section>
        <section className="social-media">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://facebook.com/microfinance" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com/microfinance" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com/microfinance" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;