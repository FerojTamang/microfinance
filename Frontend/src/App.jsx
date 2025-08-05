import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Notice from './pages/Notice/Notice';
import Membership from './pages/Membership/Membership';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import UseEffect from './pages/UseEffect/UseEffect';
import AdminLogin from './pages/Admin/AdminLogin';

function App() {
  // Load membershipForms from localStorage (or use default seed data)
  const [membershipForms, setMembershipForms] = useState(() => {
    const stored = localStorage.getItem('membershipForms');
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@email.com',
            phone: '9876543210',
            address: '123 Main St',
            status: 'pending',
            date: '2024-07-20',
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@email.com',
            phone: '9876543211',
            address: '456 Oak Ave',
            status: 'approved',
            date: '2024-07-19',
          },
        ];
  });

  // Persist data to localStorage on change
  useEffect(() => {
    localStorage.setItem('membershipForms', JSON.stringify(membershipForms));
  }, [membershipForms]);

  const addMembershipForm = (formData) => {
    const newForm = {
      ...formData,
      id: Date.now(),
      status: 'pending',
      date: new Date().toLocaleDateString(),
    };
    setMembershipForms((prev) => [newForm, ...prev]);
  };

  const updateMembershipStatus = (id, status) => {
    setMembershipForms((prev) =>
      prev.map((form) => (form.id === id ? { ...form, status } : form))
    );
  };

  return (
    <Router>
      <Routes>
        {/* Public routes with Navbar */}
        <Route path='/' element={<><Navbar /><Home /></>} />
        <Route path='/about' element={<><Navbar /><About /></>} />
        <Route path='/services' element={<><Navbar /><Services /></>} />
        <Route path='/notice' element={<><Navbar /><Notice /></>} />
        <Route path='/membership' element={<><Navbar /><Membership addMembershipForm={addMembershipForm} /></>} />
        <Route path='/contact-us' element={<><Navbar /><Contact/></>} />
        <Route path='/useeffect' element={<><Navbar /><UseEffect /></>} />

        {/* Admin routes - separate login and dashboard */}
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<Admin membershipForms={membershipForms} updateMembershipStatus={updateMembershipStatus} />} />
      </Routes>
    </Router>
  );
}

export default App;
