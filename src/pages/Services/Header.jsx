import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <img src="logo.png" alt="Logo" className="logo" />
      <div className="user-info">
        <span>Username</span>
        <span>1</span>
        <button>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;