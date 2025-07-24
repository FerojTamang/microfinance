import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact">
        <p>Contact us: <br /> +977-982-615-815 <br /> +977-980-111-1234</p>
      </div>
      <div className="location">
        <img src="map.png" alt="Map" />
        <p>Location: Kathmandu, Nepal</p>
      </div>
      <div className="social">
        <img src="social.png" alt="Social Media" />
      </div>
      <p>© All right reserved © company</p>
    </footer>
  );
};

export default Footer;