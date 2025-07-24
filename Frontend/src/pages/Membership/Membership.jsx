import React, { useState } from 'react';
import './Membership.css';

const Membership = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    dateOfBirth: '',
    citizenshipNumber: '',
    citizenshipFile: null,
    monthlyPayment: '',
    entryShare: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(formData.entryShare) < 1000) {
      alert('Entry share must be 1000 or more!');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3s animation
    console.log('Form submitted:', formData);
  };

  const progress = Object.values(formData).filter(val => val).length / 7 * 100;

  return (
    <div className="membership-container">
      <header className="membership-header">
        <img src="logo.png" alt="Logo" className="logo" />
        <h1>membership</h1>
        <nav>
          <a href="#">Notice</a>
        </nav>
      </header>
      <div className="content-wrapper">
        <div className="welcome-box">Welcome!</div>
        <div className="form-card">
          <h2>Join Our Community</h2>
          <form onSubmit={handleSubmit} className="membership-form">
            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label>Date of Birth:</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Citizenship Number:</label>
              <input type="text" name="citizenshipNumber" value={formData.citizenshipNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Upload Citizenship:</label>
              <input type="file" name="citizenshipFile" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Monthly Payment (₹):</label>
              <input type="number" name="monthlyPayment" value={formData.monthlyPayment} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Entry Share (₹, min 1000):</label>
              <input type="number" name="entryShare" value={formData.entryShare} onChange={handleChange} required />
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <button type="submit" className={`submit-btn ${submitted ? 'submitted' : ''}`}>
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Membership;