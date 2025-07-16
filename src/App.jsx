import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Notice from './pages/Notice/Notice';
import Membership from './pages/Membership/Membership';
import Contact from './pages/Contact/Contact';
import Admin from './pages/Admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services/>} />
        <Route path='/notice' element={<Notice/>} />
        <Route path='/membership' element={<Membership/>} />
        <Route path='/contact-us' element={<Contact/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
