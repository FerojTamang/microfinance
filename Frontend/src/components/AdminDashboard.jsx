import React, { useState } from 'react';

const AdminDashboard = ({ dashboardData, setDashboardData, onClose }) => {
  const [formState, setFormState] = useState({
    totalAmount: dashboardData.totalAmount,
    totalLoans: dashboardData.totalLoans,
    totalMembers: dashboardData.totalMembers,
    dailyTransactions: dashboardData.dailyTransactions,
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setDashboardData({
      ...dashboardData,
      ...formState,
      totalAmount: parseInt(formState.totalAmount),
      totalLoans: parseInt(formState.totalLoans),
      totalMembers: parseInt(formState.totalMembers),
      dailyTransactions: parseInt(formState.dailyTransactions),
    });

    alert("Dashboard updated!");
    onClose(); // ✅ Return to main Dashboard
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Edit Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Total Amount:</label>
          <input name="totalAmount" value={formState.totalAmount} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label>Total Loans:</label>
          <input name="totalLoans" value={formState.totalLoans} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label>Total Members:</label>
          <input name="totalMembers" value={formState.totalMembers} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div>
          <label>Daily Transactions:</label>
          <input name="dailyTransactions" value={formState.dailyTransactions} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save & Go Back
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
