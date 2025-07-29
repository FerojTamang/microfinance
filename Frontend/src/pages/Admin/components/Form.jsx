// src/components/Form.jsx
import React, { useState } from 'react';

const Form = ({ type, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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

    if (type === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${type} form submitted with:`, formData);

    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    // Prepare data for API
    const apiData = {
      username: formData.username,
      password: formData.password
    };

    console.log('Calling onSubmit with:', apiData);
    onSubmit(apiData);
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  // Reset form when type changes
  React.useEffect(() => {
    resetForm();
  }, [type]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {type === 'register' ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field (only for register) */}
          {type === 'register' && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              type === 'register'
                ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400'
                : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
            } disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {type === 'register' ? 'Creating Account...' : 'Signing In...'}
              </span>
            ) : (
              type === 'register' ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        {/* Navigation Links */}
        <div className="mt-6 text-center">
          {type === 'register' ? (
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in here
              </a>
            </p>
          ) : (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Create one here
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;