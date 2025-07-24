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


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/notice' element={<Notice/>} />
        <Route path='/membership' element={<Membership/>} />
        <Route path='/contact-us' element={<Contact/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/useeffect' element={<UseEffect/>} />
        <Route path='/d' element={<AdminDashboard/>} />
        <Route path='/e' element={<AboutUsEditor/>} />
        <Route path='/f' element={<FAQEditor/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
