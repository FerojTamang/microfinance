import React, { useState } from 'react';
import './LoanForm.css';

const LoanForm = () => {
  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [tenure, setTenure] = useState('');

  const calculateEMI = (principal, rate = 10 / 12 / 100, months = tenure || 3 * 12) => {
    if (principal && months) {
      const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      return emi.toFixed(2);
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount);
    const months = parseFloat(tenure) * 12 || 3 * 12; // Default to 3 years if tenure is not selected
    const emi = calculateEMI(principal, 10 / 12 / 100, months);

    if (emi) {
      const confirmMessage = `You are about to apply for a loan of ₹${principal}. Your monthly EMI will be approximately ₹${emi}. Do you want to proceed?`;
      if (window.confirm(confirmMessage)) {
        // Database submission logic can be added here later
        alert('Form submitted successfully! (Database integration pending)');
      }
    } else {
      alert('Please fill in the loan amount.');
    }
  };

  return (
    <section className="loan-form">
      <h2>Educational Loan / Personal Loan</h2>
      <p>Are you interested in personal loan / educational loan?</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Loan Type:</label>
          <select value={loanType} onChange={(e) => setLoanType(e.target.value)} required>
            <option value="">Select Loan Type</option>
            <option value="personal">Personal Loan</option>
            <option value="educational">Educational Loan</option>
            <option value="agricultural">Agricultural Loan</option>
            <option value="group">Group Loan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Loan Amount (₹):</label>
          <select value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required>
            <option value="">Select Loan Amount</option>
            <option value="50000">₹50,000</option>
            <option value="100000">₹1,00,000</option>
            <option value="200000">₹2,00,000</option>
            <option value="500000">₹5,00,000</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tenure (Years):</label>
          <select value={tenure} onChange={(e) => setTenure(e.target.value)}>
            <option value="">Select Tenure (Default: 3 Years)</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
          </select>
        </div>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" placeholder="Full name" required />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input type="email" placeholder="Email address" required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" placeholder="Phone number" required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea placeholder="Enter your address"></textarea>
        </div>
        <div className="form-group">
          <label>Citizenship Number:</label>
          <input type="text" placeholder="Citizenship number" required />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea placeholder="Description"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default LoanForm;