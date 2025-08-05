
  import React, { useState } from 'react';
import { User, MapPin, Calendar, CreditCard, Upload, CheckCircle, Loader2, FileText } from 'lucide-react';

const Membership = ({ addMembershipForm }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    citizenshipNumber: '',
    citizenshipFile: null,
    citizenshipFileDataUrl: '',
    monthlyPayment: '',
    entryShare: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.citizenshipNumber.trim()) newErrors.citizenshipNumber = 'Citizenship number is required';
    if (!formData.citizenshipFileDataUrl) newErrors.citizenshipFile = 'Citizenship document is required';
    if (!formData.monthlyPayment || formData.monthlyPayment <= 0) newErrors.monthlyPayment = 'Monthly payment must be greater than 0';
    if (!formData.entryShare || parseFloat(formData.entryShare) < 1000) newErrors.entryShare = 'Entry share must be 1000 or more';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          citizenshipFile: file,
          citizenshipFileDataUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const membershipData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        citizenshipNumber: formData.citizenshipNumber,
        monthlyPayment: formData.monthlyPayment,
        entryShare: formData.entryShare,
        citizenshipFile: formData.citizenshipFile.name,
        citizenshipFileDataUrl: formData.citizenshipFileDataUrl
      };

      addMembershipForm(membershipData);
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '', email: '', phone: '', address: '', dateOfBirth: '',
          citizenshipNumber: '', citizenshipFile: null, citizenshipFileDataUrl: '',
          monthlyPayment: '', entryShare: ''
        });
      }, 3000);

    } catch (error) {
      alert('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filledFields = Object.entries(formData).filter(([key, value]) => {
    if (key === 'citizenshipFile') return value !== null;
    if (key === 'citizenshipFileDataUrl') return value !== '';
    return value && value.toString().trim() !== '';
  }).length;
  const progress = (filledFields / 10) * 100;
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-pulse">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your membership application has been sent to our admin team for review. 
            You'll receive an email notification once it's processed.
          </p>
          <div className="w-full bg-green-100 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Membership</h1>
            </div>
            <nav>
              <a href="#" className="text-green-600 hover:text-green-700 font-medium transition-colors">
                Notice
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg hover:bg-green-700 transition-colors">
            Welcome!
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 text-lg">Become a member and enjoy exclusive benefits</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-green-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 text-green-600" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-300 ${
                    errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <span>✉️</span>
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-300 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <span>📱</span>
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-300 ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                  }`}
                  placeholder="Your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Date of Birth */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-300 ${
                    errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                  }`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="group">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Address</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-300 resize-none ${
                  errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                }`}
                placeholder="Enter your full address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Citizenship Number */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span>Citizenship Number</span>
                </label>
                <input
                  type="text"
                  name="citizenshipNumber"
                  value={formData.citizenshipNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-300 ${
                    errors.citizenshipNumber ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                  }`}
                  placeholder="Enter citizenship number"
                />
                {errors.citizenshipNumber && <p className="text-red-500 text-sm mt-1">{errors.citizenshipNumber}</p>}
              </div>

              {/* File Upload */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Upload className="w-4 h-4 text-green-600" />
                  <span>Upload Citizenship Document</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="citizenshipFile"
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="citizenship-file"
                  />
                  <label
                    htmlFor="citizenship-file"
                    className={`w-full px-4 py-3 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 hover:border-green-400 hover:bg-green-50 ${
                      errors.citizenshipFile ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">
                      {formData.citizenshipFile ? formData.citizenshipFile.name : 'Choose file'}
                    </span>
                  </label>
                </div>
                {errors.citizenshipFile && <p className="text-red-500 text-sm mt-1">{errors.citizenshipFile}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Payment */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <span>Monthly Payment (₹)</span>
                </label>
                <input
                  type="number"
                  name="monthlyPayment"
                  value={formData.monthlyPayment}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-300 ${
                    errors.monthlyPayment ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                  }`}
                  placeholder="Enter amount"
                  min="1"
                />
                {errors.monthlyPayment && <p className="text-red-500 text-sm mt-1">{errors.monthlyPayment}</p>}
              </div>

              {/* Entry Share */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <span>Entry Share (₹, min 1000)</span>
                </label>
                <input
                  type="number"
                  name="entryShare"
                  value={formData.entryShare}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-300 ${
                    errors.entryShare ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                  }`}
                  placeholder="Minimum 1000"
                  min="1000"
                />
                {errors.entryShare && <p className="text-red-500 text-sm mt-1">{errors.entryShare}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;