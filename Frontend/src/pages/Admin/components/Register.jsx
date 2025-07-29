// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from '../components/Form';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formData) => {
    console.log('=== REGISTRATION STARTED ===');
    console.log('Form data received:', formData);
    
    setIsLoading(true);

    try {
      console.log('Sending POST request to:', 'http://localhost:3000/api/auth/register');
      console.log('Request data:', formData);

      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      console.log('=== REGISTRATION SUCCESS ===');
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 201) {
        // Show success message
        alert(`🎉 Registration successful!\n\nUsername: ${formData.username}\n\nYou can now login with your credentials.`);
        
        // Navigate to login page
        console.log('Navigating to login page...');
        navigate('/login');
      } else {
        console.warn('Unexpected response status:', response.status);
        alert('Registration completed but with unexpected response. Please try logging in.');
        navigate('/login');
      }

    } catch (error) {
      console.error('=== REGISTRATION ERROR ===');
      console.error('Error object:', error);
      
      setIsLoading(false);

      if (error.response) {
        // Server responded with error status
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        
        const errorMessage = error.response.data?.error || error.response.data?.message || 'Registration failed';
        
        if (error.response.status === 400) {
          alert(`❌ Registration Failed\n\n${errorMessage}\n\nPlease check your input and try again.`);
        } else if (error.response.status === 409) {
          alert(`❌ Username Already Exists\n\nThe username "${formData.username}" is already taken.\n\nPlease choose a different username.`);
        } else if (error.response.status === 500) {
          alert(`❌ Server Error\n\nSomething went wrong on our end.\n\nPlease try again later or contact support.`);
        } else {
          alert(`❌ Registration Failed\n\n${errorMessage}`);
        }
      } else if (error.request) {
        // Network error - no response from server
        console.error('Network error - no response received');
        console.error('Request details:', error.request);
        alert(`❌ Connection Error\n\nCannot connect to the server.\n\nPlease check:\n• Is your backend server running?\n• Is it running on http://localhost:3000?\n• Check your internet connection`);
      } else {
        // Other error
        console.error('Unexpected error:', error.message);
        alert(`❌ Unexpected Error\n\n${error.message}\n\nPlease try again.`);
      }
    }
  };

  return (
    <div>
      <Form 
        type="register" 
        onSubmit={handleRegister} 
        isLoading={isLoading}
      />
    </div>
  );
};

export default Register;