import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.username || formData.email, password: formData.password }),
      });
      const result = await response.json();

      if (response.status === 200) {
        alert(`🎉 Welcome, ${result.user.username || result.user.email}!`);
        navigate('/admin');
      } else {
        alert(`❌ Login Failed\n\n${result.error || 'Unexpected response'}`);
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return <Form type="login" onSubmit={handleLogin} isLoading={isLoading} />;
};

export default Login;