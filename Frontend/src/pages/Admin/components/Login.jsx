// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from '../components/Form';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    console.log('=== LOGIN ATTEMPT STARTED ===');
    console.log('Username:', formData.username);
    console.log('Password length:', formData.password.length);
    
    setIsLoading(true);

    try {
      console.log('Sending login request to backend...');
      
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username: formData.username,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      console.log('=== LOGIN RESPONSE RECEIVED ===');
      console.log('Status Code:', response.status);
      console.log('Response Data:', response.data);

      // Check if login was successful
      if (response.status === 200 && response.data) {
        console.log('✅ LOGIN SUCCESSFUL');
        console.log('User data:', response.data.user);
        
        // Optional: Store user info in localStorage for session management
        if (response.data.user) {
          localStorage.setItem('currentUser', JSON.stringify({
            username: response.data.user.username,
            loginTime: new Date().toISOString()
          }));
        }
        
        console.log('🚀 Navigating to admin panel...');
        
        // Navigate to admin page FIRST
        navigate('/admin');
        
        console.log('✅ Navigation completed');
        
        // Show success message AFTER navigation (with a small delay)
        setTimeout(() => {
          alert(`🎉 Welcome back, ${formData.username}!\n\nLogin successful!`);
        }, 100);
        
      } else {
        console.warn('⚠️ Unexpected response format');
        console.log('Response:', response);
        alert('Login response was unexpected. Please try again.');
        setIsLoading(false);
      }

    } catch (error) {
      console.error('=== LOGIN ERROR ===');
      console.error('Full error object:', error);
      
      setIsLoading(false);

      if (error.response) {
        // Server responded with an error status
        console.error('❌ Server Error Response');
        console.error('Status:', error.response.status);
        console.error('Error Data:', error.response.data);
        
        const errorMessage = error.response.data?.error || error.response.data?.message || 'Login failed';
        
        if (error.response.status === 401) {
          // Invalid credentials
          console.log('❌ Invalid credentials provided');
          alert(`❌ Login Failed\n\n❗ Invalid username or password\n\nPlease check your credentials and try again.\n\n💡 Make sure:\n• Username is spelled correctly\n• Password is correct\n• Account exists in database`);
        } else if (error.response.status === 400) {
          // Bad request (missing username/password)
          console.log('❌ Bad request - missing data');
          alert(`❌ Login Failed\n\n${errorMessage}\n\nPlease make sure both username and password are provided.`);
        } else if (error.response.status === 500) {
          // Server error
          console.log('❌ Internal server error');
          alert(`❌ Server Error\n\nSomething went wrong on our server.\n\nPlease try again later or contact support.\n\nError: ${errorMessage}`);
        } else {
          // Other server errors
          console.log('❌ Other server error:', error.response.status);
          alert(`❌ Login Failed\n\nServer Error (${error.response.status})\n\n${errorMessage}`);
        }
      } else if (error.request) {
        // Network error - no response from server
        console.error('❌ Network Error - No response received');
        console.error('Request details:', error.request);
        alert(`❌ Connection Error\n\n🔌 Cannot connect to the server\n\nPlease check:\n\n✓ Is your backend server running?\n✓ Is it running on http://localhost:3000?\n✓ Check your internet connection\n✓ Try refreshing the page\n\nIf the problem persists, contact support.`);
      } else {
        // Other unexpected errors
        console.error('❌ Unexpected Error:', error.message);
        alert(`❌ Unexpected Error\n\n${error.message}\n\nPlease try again or contact support if the problem persists.`);
      }
    }
  };

  return (
    <div>
      <Form 
        type="login" 
        onSubmit={handleLogin} 
        isLoading={isLoading}
      />
    </div>
  );
};

export default Login;