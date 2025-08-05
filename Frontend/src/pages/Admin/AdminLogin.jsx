import React, { useState } from 'react';
import { Lock, User, Mail, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  // Mock navigation function for demo - replace with your actual router
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // In your actual app, replace this with: const navigate = useNavigate(); from react-router-dom
    // For demo purposes, showing navigation paths
    if (path === '/') {
      console.log('Going to Home page');
      window.location.href = '/';
    } else if (path === '/register') {
      console.log('Going to Register page (your existing Register.jsx)');
      window.location.href = '/register';
    } else if (path === '/admin/dashboard') {
      console.log('Going to Admin Dashboard (your Admin.jsx component)');
      window.location.href = '/admin/dashboard';
    } else if (path === '/admin/forgot-password') {
      console.log('Going to Admin Forgot Password (create this page)');
      window.location.href = '/admin/forgot-password';
    } else {
      window.location.href = path;
    }
  };
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Using the same API endpoint as your Login.jsx
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: formData.username || formData.email, 
          password: formData.password 
        }),
      });
      
      const result = await response.json();

      if (response.status === 200) {
        // Success message similar to Login.jsx
        alert(`🎉 Welcome, ${result.user.username || result.user.email}!`);
        
        // Store user data in localStorage (similar to your existing AdminLogin)
        localStorage.setItem('currentUser', JSON.stringify({
          username: result.user.username,
          email: result.user.email,
          id: result.user.id,
          loginTime: new Date().toISOString()
        }));

        // Navigate to Admin.jsx (your main admin page)
        navigate('/admin/dashboard');
      } else {
        // Error handling similar to Login.jsx
        setError(result.error || 'Unexpected response');
        alert(`❌ Login Failed\n\n${result.error || 'Unexpected response'}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(`Error: ${error.message}`);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing (similar to Form.jsx logic)
    if (error) setError('');
  };

  const handleForgotPassword = () => {
    // You can create AdminForgotPassword.jsx later
    navigate('/admin/forgot-password');
  };

  const handleGoToRegister = () => {
    // Navigate to your existing Register.jsx component
    navigate('/register');
  };

  const handleBackToHome = () => {
    // Navigate to home page
    navigate('/');
  };

  // Validation logic similar to Form.jsx
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    console.log('Admin login form submitted with:', formData);
    
    if (!validateForm()) {
      setError('Please fill in all required fields');
      return;
    }

    handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Back to home button */}
      <button
        onClick={handleBackToHome}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors z-10"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header - similar to Form.jsx styling */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Admin Portal
          </h2>
          <p className="text-gray-600">Secure access to admin dashboard</p>
        </div>
        
        {/* Error message - similar to Form.jsx error handling */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Form fields - using Form.jsx styling patterns */}
        <div className="space-y-4">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit button - using Form.jsx button styling */}
          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In to Admin Panel'
            )}
          </button>
        </div>

        {/* Navigation Links - similar to Form.jsx bottom section */}
        <div className="mt-6 space-y-4">
          {/* Forgot Password */}
          <div className="text-center">
            <button
              onClick={handleForgotPassword}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors"
            >
              Forgot your password?
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Register Link - calls your existing Register.jsx */}
          <div className="text-center">
            <p className="text-gray-600">
              Need admin access?{' '}
              <button
                onClick={handleGoToRegister}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
              >
                <Mail size={16} />
                Request Admin Account
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Demo credentials: username: <strong>amu2020</strong>, password: <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;