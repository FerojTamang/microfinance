import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import LoanSection from './components/LoanSection';
import LoanForm from './components/LoanForm';
import EmiCalculator from './components/EmiCalculator';
import FinancialLiteracy from './components/FinancialLiteracy';
import Requirements from './components/Requirements';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './components/App.css';

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