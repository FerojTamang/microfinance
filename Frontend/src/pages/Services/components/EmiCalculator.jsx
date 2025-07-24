import React, { useState } from 'react';
import './EmiCalculator.css';

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const months = parseFloat(tenure) * 12; // Convert years to months

    if (principal && rate && months) {
      const emiValue = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      setEmi(emiValue.toFixed(2));
    } else {
      setEmi('Please fill all fields');
    }
  };

  const yearlyPayment = emi ? (parseFloat(emi) * 12).toFixed(2) : null;

  return (
    <section className="emi-calculator">
      <h2>Calculate EMI for Personal Loan!</h2>
      <form onSubmit={calculateEMI}>
        <div>
          <label>Loan Amount (₹):</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
            required
          />
        </div>
        <div>
          <label>Annual Interest Rate (%):</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter interest rate"
            step="0.1"
            required
          />
        </div>
        <div>
          <label>Loan Tenure (Years):</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Enter tenure in years"
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {emi && (
        <div>
          <p>Your Monthly EMI: ₹{emi}</p>
          <p>Your Yearly Payment: ₹{yearlyPayment}</p>
        </div>
      )}
    </section>
  );
}

export default EmiCalculator;