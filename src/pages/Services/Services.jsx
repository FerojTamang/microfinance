import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import LoanSection from './LoanSection';
import LoanForm from './LoanForm';
import EmiCalculator from './EmiCalculator';
import FinancialLiteracy from './FinancialLiteracy';
import Requirements from './Requirements';
import FAQ from './FAQ';
import Footer from './Footer';
import './App.css';

function Services() {
  const [showEmiCalculator, setShowEmiCalculator] = useState(false);
  const [showFinancialLiteracy, setShowFinancialLiteracy] = useState(false);

  return (
    <div className="App">
      <Header />
      <Navigation />
      <LoanSection />
      <div className="toggle-buttons">
        <button onClick={() => { setShowEmiCalculator(true); setShowFinancialLiteracy(false); }}>EMI Calculator</button>
        <button onClick={() => { setShowFinancialLiteracy(true); setShowEmiCalculator(false); }}>Financial Literacy</button>
      </div>
      {showEmiCalculator && <EmiCalculator />}
      {showFinancialLiteracy && <FinancialLiteracy />}
      <LoanForm />
      <Requirements />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Services;