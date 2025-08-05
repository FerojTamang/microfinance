import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.status === 201) {
        alert(`🎉 Registration successful!\n\nEmail: ${formData.email}\nUsername: ${formData.username}\n\nYou can now login.`);
        navigate('/login');
      } else {
        alert(`❌ Registration Failed\n\n${result.error || 'Unexpected response'}`);
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return <Form type="register" onSubmit={handleRegister} isLoading={isLoading} />;
};

export default Register;