import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>Manage Team</li>
        <li>Contacts Information</li>
        <li>Invoices Balances</li>
      </ul>
      <h3>Pages</h3>
      <ul>
        <li>Profile Form</li>
        <li>Calendar</li>
        <li>FAQ Page</li>
      </ul>
      <h3>Charts</h3>
      <ul>
        <li>Bar Chart</li>
        <li>Pie Chart</li>
        <li>Line Chart</li>
        <li>Geography Chart</li>
      </ul>
    </div>
  );
}

export default Sidebar;