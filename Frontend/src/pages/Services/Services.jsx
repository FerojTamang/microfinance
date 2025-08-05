import React, { useState, useEffect } from 'react';
import { Calculator, BookOpen, FileText, Upload, Phone, Mail, User, CreditCard, HelpCircle } from 'lucide-react';
import FAQ from './components/FAQ';

// Initial FAQs with plain string answers
const initialFaqs = [
  {
    id: 1,
    question: "How do I apply for a loan?",
    answer: "To apply for a loan with MicroFinance Solutions, follow these steps:\n1. Navigate to the 'Apply for Loan' tab on our website.\n2. Fill out the loan application form with details such as loan type, amount, tenure, full name, email, phone number, and citizenship number.\n3. Optionally, upload supporting documents like a citizenship document or agreement papers (PDF, JPG, or PNG formats, max 5MB).\n4. Review your information and click 'Submit Loan Application.'\n5. You will receive a confirmation message, and our team will contact you for further processing.\nEnsure all required fields are completed to avoid delays in processing."
  },
  {
    id: 2,
    question: "What types of loans are available?",
    answer: "We offer Personal Loans, Agricultural Loans, and Group Loans. Each loan type is designed to meet specific financial needs, with flexible tenures ranging from 3 months to 5 years."
  },
  {
    id: 3,
    question: "What are the eligibility criteria for a loan?",
    answer: "To be eligible, you must be at least 18 years old, have a valid citizenship number, and provide accurate personal and contact information. Additional requirements may vary based on the loan type."
  },
  {
    id: 4,
    question: "How long does it take to process a loan application?",
    answer: "Loan applications are typically processed within 3-5 business days. You will be notified via email or phone once a decision is made."
  },
  {
    id: 5,
    question: "Can I calculate my EMI before applying?",
    answer: "Yes, use our EMI Calculator in the 'EMI Calculator' tab to estimate your monthly payments based on loan amount, tenure, and interest rate."
  },
];

// Header Component
const Header = () => (
  <header className="bg-green-600 text-white py-6">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center">MicroFinance Solutions</h1>
      <p className="text-center mt-2 text-green-100">Empowering Communities Through Financial Services</p>
    </div>
  </header>
);

// Navigation Component
const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'apply', label: 'Apply for Loan', icon: FileText },
    { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
    { id: 'literacy', label: 'Financial Literacy', icon: BookOpen },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <nav className="bg-white shadow-md border-b-2 border-green-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 py-4 px-6 border-b-2 transition-colors ${
                activeTab === id 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-600 hover:text-green-500'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// EMI Calculator Component
const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(12);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi;
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - loanAmount;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
        <Calculator className="mr-3" />
        EMI Calculator
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (NPR)
            </label>
            <input
              type="number"
              min="10000"
              max="1000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter loan amount"
            />
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mt-2"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>NPR 10,000</span>
              <span>NPR 10,00,000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tenure (Months)
            </label>
            <select
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>1 Year</option>
              <option value={24}>2 Years</option>
              <option value={36}>3 Years</option>
              <option value={48}>4 Years</option>
              <option value={60}>5 Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              min="8"
              max="20"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter interest rate"
            />
            <input
              type="range"
              min="8"
              max="20"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>8%</span>
              <span>20%</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4">Calculation Results</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly EMI:</span>
              <span className="text-xl font-bold text-green-600">NPR {emi.toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Annual Interest Rate:</span>
              <span className="text-lg font-semibold text-blue-600">{interestRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount:</span>
              <span className="text-lg font-semibold text-gray-800">NPR {totalAmount.toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Interest:</span>
              <span className="text-lg font-semibold text-red-500">NPR {totalInterest.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Financial Literacy Component
const FinancialLiteracy = () => {
  const topics = [
    {
      title: "Understanding Microfinance",
      content: "Microfinance provides small loans and financial services to individuals and small businesses who lack access to traditional banking services.",
      icon: "💰"
    },
    {
      title: "Interest Rates & EMI",
      content: "Learn how interest rates work and how to calculate your monthly installments. Understanding EMI helps you plan your finances better.",
      icon: "📊"
    },
    {
      title: "Building Credit Score",
      content: "Regular repayment of loans helps build your credit history, making it easier to access larger loans in the future.",
      icon: "⭐"
    },
    {
      title: "Financial Planning",
      content: "Create a budget, track expenses, and save regularly. Good financial planning is the foundation of financial stability.",
      icon: "📋"
    },
    {
      title: "Risk Management",
      content: "Understand the risks involved in borrowing and ensure you have a repayment plan before taking any loan.",
      icon: "🛡️"
    },
    {
      title: "Digital Banking",
      content: "Learn about mobile banking, online payments, and digital financial services to manage your money efficiently.",
      icon: "📱"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
        <BookOpen className="mr-3" />
        Financial Literacy
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div key={index} className="bg-green-50 rounded-lg p-6 hover:bg-green-100 transition-colors">
            <div className="text-3xl mb-3">{topic.icon}</div>
            <h3 className="text-lg font-semibold text-green-700 mb-3">{topic.title}</h3>
            <p className="text-gray-600 text-sm">{topic.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-3">Want to Learn More?</h3>
        <p className="mb-4">Join our financial literacy workshops or contact our support team for personalized advice.</p>
        <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  );
};

// Loan Application Component
const LoanApplication = () => {
  const [formData, setFormData] = useState({
    loanType: '',
    amount: '',
    tenure: '',
    name: '',
    email: '',
    phone: '',
    citizenshipNumber: '',
    purpose: '',
    citizenshipFile: null,
    agreementFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.loanType ||
      !formData.amount ||
      !formData.tenure ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.citizenshipNumber
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (formData.citizenshipFile && formData.citizenshipFile.size > 5 * 1024 * 1024) {
      alert('Citizenship file size exceeds 5MB.');
      return;
    }
    if (formData.agreementFile && formData.agreementFile.size > 5 * 1024 * 1024) {
      alert('Agreement file size exceeds 5MB.');
      return;
    }

    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
        reader.readAsDataURL(file);
      });
    };

    try {
      const [citizenshipFileDataUrl, agreementFileDataUrl] = await Promise.all([
        readFileAsDataURL(formData.citizenshipFile),
        readFileAsDataURL(formData.agreementFile),
      ]);

      const loanData = {
        id: Date.now(),
        ...formData,
        amount: Number(formData.amount),
        tenure: Number(formData.tenure),
        citizenshipFileDataUrl,
        agreementFileDataUrl,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
      };

      const storedLoans = localStorage.getItem('loanForms');
      const loans = storedLoans ? JSON.parse(storedLoans) : [];
      loans.push(loanData);
      localStorage.setItem('loanForms', JSON.stringify(loans));

      alert('Loan application submitted successfully!');
      setFormData({
        loanType: '',
        amount: '',
        tenure: '',
        name: '',
        email: '',
        phone: '',
        citizenshipNumber: '',
        purpose: '',
        citizenshipFile: null,
        agreementFile: null,
      });
      document.querySelector('input[name="citizenshipFile"]').value = '';
      document.querySelector('input[name="agreementFile"]').value = '';
    } catch (error) {
      console.error('Error submitting loan application:', error);
      alert('Error submitting loan application. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
        <FileText className="mr-3" />
        Apply for a Loan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Type *
            </label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select loan type</option>
              <option value="personal">Personal Loan</option>
              <option value="agricultural">Agricultural Loan</option>
              <option value="group">Group Loan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (NPR) *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
              min="10000"
              max="1000000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tenure *
            </label>
            <select
              name="tenure"
              value={formData.tenure}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select tenure</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">1 Year</option>
              <option value="24">2 Years</option>
              <option value="36">3 Years</option>
              <option value="48">4 Years</option>
              <option value="60">5 Years</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-1 text-green-600" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1 text-green-600" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-1 text-green-600" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="inline w-4 h-4 mr-1 text-green-600" />
                Citizenship Number *
              </label>
              <input
                type="text"
                name="citizenshipNumber"
                value={formData.citizenshipNumber}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter citizenship number"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Describe the purpose of the loan..."
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Document Upload (Optional)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="inline w-4 h-4 mr-1 text-green-600" />
                Citizenship Document
              </label>
              <input
                type="file"
                name="citizenshipFile"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="inline w-4 h-4 mr-1 text-green-600" />
                Agreement Papers
              </label>
              <input
                type="file"
                name="agreementFile"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Submit Loan Application
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Services Component
const Services = () => {
  const [activeTab, setActiveTab] = useState('apply');
  const [faqs, setFaqs] = useState(() => {
    const stored = localStorage.getItem('faqs');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : initialFaqs;
      } catch (error) {
        console.error('Error parsing faqs from localStorage:', error);
        return initialFaqs;
      }
    }
    return initialFaqs;
  });

  useEffect(() => {
    const stored = localStorage.getItem('faqs');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFaqs(Array.isArray(parsed) ? parsed : initialFaqs);
      } catch (error) {
        console.error('Error parsing faqs from localStorage:', error);
        setFaqs(initialFaqs);
      }
    } else {
      setFaqs(initialFaqs);
    }
  }, []);

  const renderActiveComponent = () => {
    console.log('Active tab:', activeTab, 'FAQs:', faqs); // Debug
    switch (activeTab) {
      case 'apply':
        return <LoanApplication />;
      case 'calculator':
        return <EMICalculator />;
      case 'literacy':
        return <FinancialLiteracy />;
      case 'faq':
        return <FAQ faqs={faqs} />;
      default:
        return <LoanApplication />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Services;