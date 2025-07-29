import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Notice from './pages/Notice/Notice';
import Membership from './pages/Membership/Membership';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';
import UseEffect from './pages/UseEffect/UseEffect';
import AdminDashboard from './components/AdminDashboard';
import AboutUsEditor from './pages/Admin/components/AboutUsEditor';
import FAQEditor from './pages/Admin/components/FAQEditor';

// Import Register and Login pages
import Register from './pages/Admin/components/Register';
import Login from './pages/Admin/components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with Navbar */}
        <Route path='/' element={<><Navbar /><Home /></>} />
        <Route path='/about' element={<><Navbar /><About /></>} />
        <Route path='/services' element={<><Navbar /><Services /></>} />
        <Route path='/notice' element={<><Navbar /><Notice /></>} />
        <Route path='/membership' element={<><Navbar /><Membership /></>} />
        <Route path='/contact-us' element={<><Navbar /><Contact /></>} />
        <Route path='/useeffect' element={<><Navbar /><UseEffect /></>} />
        
        {/* Admin routes without Navbar */}
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Other admin routes */}
        <Route path='/d' element={<AdminDashboard />} />
        <Route path='/e' element={<AboutUsEditor />} />
        <Route path='/f' element={<FAQEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;