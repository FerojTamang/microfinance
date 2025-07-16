import React from 'react';

function Header() {
  return (
    <div className="header">
      <div className="user-info">
        <img src="https://via.placeholder.com/50" alt="User" className="user-avatar" />
        <div>
          <h3>Tony Stark</h3>
          <p>VP Fancy Admin</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat-card">11,361 Email Sent <span>+14%</span></div>
        <div className="stat-card">431,225 Sales Obtained <span>+21%</span></div>
        <div className="stat-card">32,441 New Clients <span>+5%</span></div>
        <div className="stat-card">$1,325,134 Traffic Received <span>+3%</span></div>
      </div>
      <button className="download-btn">Download Reports</button>
    </div>
  );
}

export default Header;