import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#004d40', color: 'white' }}>
      <Link to="/" style={{ marginRight: '1rem', color: 'white' }}>Home</Link>
      <Link to="/about" style={{ marginRight: '1rem', color: 'white' }}>About</Link>
      <Link to="/services" style={{ marginRight: '1rem', color: 'white' }}>Services</Link>
      <Link to="/notice" style={{ marginRight: '1rem', color: 'white' }}>Notice</Link>
      <Link to="/membership" style={{ marginRight: '1rem', color: 'white' }}>Membership</Link>
      <Link to="/contact-us" style={{ marginRight: '1rem', color: 'white' }}>Contact</Link>
      <Link to="/admin" style={{ color: 'white' }}>Admin</Link>
    </nav>
  );
};

export default Navbar;
