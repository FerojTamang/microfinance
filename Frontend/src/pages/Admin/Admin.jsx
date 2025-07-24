import React, { useState, useRef } from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Image,
  User,
  LogOut,
  Settings,
  X
} from 'lucide-react';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import News from './components/News';
import Gallery from './components/Gallery';
import MembershipForms from './components/MembershipForms';
import LoanApplications from './components/LoanApplications';
import AccountSettings from './components/AccountSettings';
import AdminDashboard from '../../components/AdminDashboard';
import AboutUsEditor from './components/AboutUsEditor';
import FAQEditor from './components/FAQEditor';
import Feedbacks from './components/Feedbacks';
import EventNewsPopup from './components/EventNewsPopup';

// Actual page components
const AboutUs = () => <AboutUsEditor />;
const ContactUs = () => <div><h3>Contact Us Content Here</h3></div>;
const FAQ = () => <FAQEditor />;
const feedbackList = [
  {
    id: 1,
    name: "Sita Sharma",
    email: "sita@example.com",
    message: "This system is amazing!",
    date: "2025-07-21"
  },
  {
    id: 2,
    name: "Hari Thapa",
    email: "hari@example.com",
    message: "The loan application form is very easy to use.",
    date: "2025-07-20"
  },
  {
    id: 3,
    name: "Ravi KC",
    email: "ravi@example.com",
    message: "Very helpful service, thank you!",
    date: "2025-07-19"
  }
];

const Feedback = () => <Feedbacks feedbackList={feedbackList} />;

const EventsPopup = () => <EventNewsPopup />;


const Admin = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminData, setAdminData] = useState({ username: 'admin', password: 'admin' });
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [accountSettings, setAccountSettings] = useState({
    newUsername: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [news, setNews] = useState([
    { id: 1, title: 'New Loan Scheme Launched', content: 'We have launched a new micro-loan scheme for small businesses.', file: null, date: '2024-07-20' },
    { id: 2, title: 'Annual Meeting Notice', content: 'Annual general meeting will be held on August 15th.', file: null, date: '2024-07-19' }
  ]);

  const [gallery, setGallery] = useState([
    { id: 1, title: 'Branch Opening', image: '/api/placeholder/300/200', date: '2024-07-18' },
    { id: 2, title: 'Community Event', image: '/api/placeholder/300/200', date: '2024-07-17' }
  ]);

  const [newsForm, setNewsForm] = useState({ title: '', content: '', file: null });
  const [galleryForm, setGalleryForm] = useState({ title: '', image: null });
  const [editingNews, setEditingNews] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);

  const [membershipForms, setMembershipForms] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', phone: '9876543210', address: '123 Main St', status: 'pending', date: '2024-07-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', phone: '9876543211', address: '456 Oak Ave', status: 'approved', date: '2024-07-19' }
  ]);

  const [loanForms, setLoanForms] = useState([
    { id: 1, name: 'Alice Johnson', amount: 50000, purpose: 'Small Business', phone: '9876543212', status: 'pending', date: '2024-07-20' },
    { id: 2, name: 'Bob Wilson', amount: 25000, purpose: 'Agriculture', phone: '9876543213', status: 'approved', date: '2024-07-19' }
  ]);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [dashboardData, setDashboardData] = useState({
    totalAmount: 2500000,
    totalLoans: 150,
    totalMembers: 350,
    dailyTransactions: 25,
    riskAnalysis: { low: 60, medium: 30, high: 10 }
  });

  const handleLogin = (userData) => {
    if (userData.username === adminData.username && userData.password === adminData.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setShowProfileMenu(false);
  };

  const handleAccountSettingsUpdate = (e) => {
    e.preventDefault();
    if (accountSettings.currentPassword !== adminData.password) {
      alert('Current password is incorrect');
      return;
    }
    if (accountSettings.newPassword && accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    const updatedData = { ...adminData };
    if (accountSettings.newUsername) updatedData.username = accountSettings.newUsername;
    if (accountSettings.newPassword) updatedData.password = accountSettings.newPassword;

    setAdminData(updatedData);
    setAccountSettings({ newUsername: '', currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowAccountSettings(false);
    alert('Account settings updated successfully!');
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (editingNews) {
      setNews(news.map(item =>
        item.id === editingNews.id
          ? { ...item, title: newsForm.title, content: newsForm.content, file: newsForm.file }
          : item
      ));
      setEditingNews(null);
    } else {
      const newNews = {
        id: Date.now(),
        title: newsForm.title,
        content: newsForm.content,
        file: newsForm.file,
        date: new Date().toISOString().split('T')[0]
      };
      setNews([newNews, ...news]);
    }
    setNewsForm({ title: '', content: '', file: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleNewsEdit = (item) => {
    setEditingNews(item);
    setNewsForm({ title: item.title, content: item.content, file: item.file });
  };

  const handleNewsDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      setNews(news.filter(item => item.id !== id));
    }
  };

  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (editingGallery) {
      setGallery(gallery.map(item =>
        item.id === editingGallery.id
          ? { ...item, title: galleryForm.title, image: galleryForm.image || item.image }
          : item
      ));
      setEditingGallery(null);
    } else {
      const newGalleryItem = {
        id: Date.now(),
        title: galleryForm.title,
        image: galleryForm.image || '/api/placeholder/300/200',
        date: new Date().toISOString().split('T')[0]
      };
      setGallery([newGalleryItem, ...gallery]);
    }
    setGalleryForm({ title: '', image: null });
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleGalleryEdit = (item) => {
    setEditingGallery(item);
    setGalleryForm({ title: item.title, image: null });
  };

  const handleGalleryDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      setGallery(gallery.filter(item => item.id !== id));
    }
  };

  const updateMembershipStatus = (id, status) => {
    setMembershipForms(membershipForms.map(form =>
      form.id === id ? { ...form, status } : form
    ));
  };

  const updateLoanStatus = (id, status) => {
    setLoanForms(loanForms.map(form =>
      form.id === id ? { ...form, status } : form
    ));
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', name: 'Add News', icon: FileText },
    { id: 'gallery', name: 'Add Gallery', icon: Image },
    { id: 'membership', name: 'Membership Forms', icon: Users },
    { id: 'loans', name: 'Loan Applications', icon: CreditCard },
    { id: 'aboutus', name: 'About Us', icon: User },
    { id: 'contactus', name: 'Contact Us', icon: User },
    { id: 'faq', name: 'FAQ', icon: User },
    { id: 'feedback', name: 'Feedback', icon: User },
    { id: 'events', name: 'Events Popup', icon: User },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard dashboardData={dashboardData} />;
      case 'news': return <News news={news} newsForm={newsForm} editingNews={editingNews} fileInputRef={fileInputRef} setNewsForm={setNewsForm} handleNewsSubmit={handleNewsSubmit} handleNewsEdit={handleNewsEdit} handleNewsDelete={handleNewsDelete} />;
      case 'gallery': return <Gallery gallery={gallery} galleryForm={galleryForm} editingGallery={editingGallery} imageInputRef={imageInputRef} setGalleryForm={setGalleryForm} handleGallerySubmit={handleGallerySubmit} handleGalleryEdit={handleGalleryEdit} handleGalleryDelete={handleGalleryDelete} />;
      case 'membership': return <MembershipForms membershipForms={membershipForms} updateMembershipStatus={updateMembershipStatus} />;
      case 'loans': return <LoanApplications loanForms={loanForms} updateLoanStatus={updateLoanStatus} />;
      case 'aboutus': return <AboutUs />;
      case 'contactus': return <ContactUs />;
      case 'faq': return <FAQ />;
      case 'feedback': return <Feedback />;
      case 'events': return <EventsPopup />;
      default: return <Dashboard dashboardData={dashboardData} />;
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen bg-gray-50 flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold text-gray-800">MicroFinance Admin</h1>
            </div>
            <nav className="mt-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${currentPage === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-600'}`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm border-b px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800 capitalize">{currentPage}</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>{adminData.username}</span>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <button
                          onClick={() => {
                            setShowAccountSettings(true);
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Account Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                        <button
                          onClick={() => {
                            setShowAdminDashboard(true);
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          Admin Panel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6">
              {renderPage()}
            </main>
          </div>

          {/* Modals */}
          <AccountSettings
            showAccountSettings={showAccountSettings}
            setShowAccountSettings={setShowAccountSettings}
            accountSettings={accountSettings}
            setAccountSettings={setAccountSettings}
            handleAccountSettingsUpdate={handleAccountSettingsUpdate}
          />

          {showAdminDashboard && (
            <div className="fixed inset-0 z-50 bg-white shadow-lg p-4 overflow-y-auto">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAdminDashboard(false)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <AdminDashboard
                dashboardData={dashboardData}
                setDashboardData={setDashboardData}
                onClose={() => {
                  setShowAdminDashboard(false);
                  setCurrentPage('dashboard');
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Admin;
