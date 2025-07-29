import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Image,
  User,
  LogOut,
  Settings,
  X,
  TrendingUp,
  DollarSign,
  UserCheck,
  Activity
} from 'lucide-react';

// Mock components (you'll replace these with your actual components)
const Dashboard = ({ dashboardData }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-green-600">₹{dashboardData.totalAmount.toLocaleString()}</p>
          </div>
          <DollarSign className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Loans</p>
            <p className="text-2xl font-bold text-blue-600">{dashboardData.totalLoans}</p>
          </div>
          <CreditCard className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Members</p>
            <p className="text-2xl font-bold text-purple-600">{dashboardData.totalMembers}</p>
          </div>
          <UserCheck className="h-8 w-8 text-purple-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Daily Transactions</p>
            <p className="text-2xl font-bold text-orange-600">{dashboardData.dailyTransactions}</p>
          </div>
          <Activity className="h-8 w-8 text-orange-600" />
        </div>
      </div>
    </div>
    
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Risk Analysis</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Low Risk</span>
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: `${dashboardData.riskAnalysis.low}%`}}></div>
            </div>
            <span className="text-sm font-medium">{dashboardData.riskAnalysis.low}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Medium Risk</span>
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${dashboardData.riskAnalysis.medium}%`}}></div>
            </div>
            <span className="text-sm font-medium">{dashboardData.riskAnalysis.medium}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">High Risk</span>
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{width: `${dashboardData.riskAnalysis.high}%`}}></div>
            </div>
            <span className="text-sm font-medium">{dashboardData.riskAnalysis.high}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const News = ({ news, newsForm, editingNews, fileInputRef, setNewsForm, handleNewsSubmit, handleNewsEdit, handleNewsDelete }) => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">{editingNews ? 'Edit News' : 'Add News'}</h3>
      <form onSubmit={handleNewsSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="News Title"
          value={newsForm.title}
          onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <textarea
          placeholder="News Content"
          value={newsForm.content}
          onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setNewsForm({...newsForm, file: e.target.files[0]})}
          className="w-full p-3 border rounded-lg"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          {editingNews ? 'Update News' : 'Add News'}
        </button>
      </form>
    </div>
    
    <div className="space-y-4">
      {news.map(item => (
        <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.content}</p>
              <p className="text-sm text-gray-500 mt-2">Published: {item.date}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleNewsEdit(item)} className="text-blue-600 hover:text-blue-800">Edit</button>
              <button onClick={() => handleNewsDelete(item.id)} className="text-red-600 hover:text-red-800">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Gallery = ({ gallery, galleryForm, editingGallery, imageInputRef, setGalleryForm, handleGallerySubmit, handleGalleryEdit, handleGalleryDelete }) => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">{editingGallery ? 'Edit Gallery Item' : 'Add Gallery Item'}</h3>
      <form onSubmit={handleGallerySubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Image Title"
          value={galleryForm.title}
          onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          onChange={(e) => setGalleryForm({...galleryForm, image: e.target.files[0]})}
          className="w-full p-3 border rounded-lg"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          {editingGallery ? 'Update Gallery' : 'Add to Gallery'}
        </button>
      </form>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gallery.map(item => (
        <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{item.date}</p>
            <div className="flex space-x-2 mt-3">
              <button onClick={() => handleGalleryEdit(item)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
              <button onClick={() => handleGalleryDelete(item.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MembershipForms = ({ membershipForms, updateMembershipStatus }) => (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="p-6 border-b">
      <h3 className="text-lg font-semibold">Membership Applications</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {membershipForms.map(form => (
            <tr key={form.id}>
              <td className="px-6 py-4 whitespace-nowrap">{form.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{form.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{form.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  form.status === 'approved' ? 'bg-green-100 text-green-800' :
                  form.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {form.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                {form.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => updateMembershipStatus(form.id, 'approved')}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateMembershipStatus(form.id, 'rejected')}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const LoanApplications = ({ loanForms, updateLoanStatus }) => (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="p-6 border-b">
      <h3 className="text-lg font-semibold">Loan Applications</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loanForms.map(form => (
            <tr key={form.id}>
              <td className="px-6 py-4 whitespace-nowrap">{form.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">₹{form.amount.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{form.purpose}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  form.status === 'approved' ? 'bg-green-100 text-green-800' :
                  form.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {form.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                {form.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => updateLoanStatus(form.id, 'approved')}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateLoanStatus(form.id, 'rejected')}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AboutUsEditor = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-4">Edit About Us</h3>
    <textarea 
      className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="Enter about us content..."
      defaultValue="Welcome to our MicroFinance Institution. We provide financial services to help communities grow and prosper."
    />
    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
      Save Changes
    </button>
  </div>
);

const ContactUs = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea 
          className="w-full p-3 border rounded-lg"
          defaultValue="123 Finance Street, Banking District, City - 12345"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input 
          type="tel" 
          className="w-full p-3 border rounded-lg"
          defaultValue="+1 234 567 8900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          className="w-full p-3 border rounded-lg"
          defaultValue="info@microfinance.com"
        />
      </div>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Update Contact Info
      </button>
    </div>
  </div>
);

const FAQEditor = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-4">FAQ Management</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
        <input 
          type="text" 
          className="w-full p-3 border rounded-lg"
          placeholder="Enter FAQ question"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
        <textarea 
          className="w-full p-3 border rounded-lg h-24"
          placeholder="Enter FAQ answer"
        />
      </div>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Add FAQ
      </button>
    </div>
  </div>
);

const Feedbacks = ({ feedbackList }) => (
  <div className="bg-white rounded-lg shadow-sm border">
    <div className="p-6 border-b">
      <h3 className="text-lg font-semibold">Customer Feedback</h3>
    </div>
    <div className="p-6 space-y-4">
      {feedbackList.map(feedback => (
        <div key={feedback.id} className="border-l-4 border-blue-500 pl-4 py-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{feedback.name}</h4>
              <p className="text-sm text-gray-600">{feedback.email}</p>
              <p className="mt-2">{feedback.message}</p>
            </div>
            <span className="text-sm text-gray-500">{feedback.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EventNewsPopup = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold mb-4">Event Popup Management</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
        <input 
          type="text" 
          className="w-full p-3 border rounded-lg"
          placeholder="Enter event title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
        <textarea 
          className="w-full p-3 border rounded-lg h-24"
          placeholder="Enter event description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
        <input 
          type="date" 
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="enablePopup" className="rounded" />
        <label htmlFor="enablePopup" className="text-sm text-gray-700">Enable popup on homepage</label>
      </div>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Update Event Popup
      </button>
    </div>
  </div>
);

const AccountSettings = ({ showAccountSettings, setShowAccountSettings, accountSettings, setAccountSettings, handleAccountSettingsUpdate }) => {
  if (!showAccountSettings) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <button onClick={() => setShowAccountSettings(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleAccountSettingsUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="New Username (leave blank to keep current)"
            value={accountSettings.newUsername}
            onChange={(e) => setAccountSettings({...accountSettings, newUsername: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Current Password"
            value={accountSettings.currentPassword}
            onChange={(e) => setAccountSettings({...accountSettings, currentPassword: e.target.value})}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="New Password (leave blank to keep current)"
            value={accountSettings.newPassword}
            onChange={(e) => setAccountSettings({...accountSettings, newPassword: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={accountSettings.confirmPassword}
            onChange={(e) => setAccountSettings({...accountSettings, confirmPassword: e.target.value})}
            className="w-full p-3 border rounded-lg"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Update Settings
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ dashboardData, setDashboardData, onClose }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Admin Panel</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Update Dashboard Data</h3>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Total Amount"
            value={dashboardData.totalAmount}
            onChange={(e) => setDashboardData({...dashboardData, totalAmount: Number(e.target.value)})}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Total Loans"
            value={dashboardData.totalLoans}
            onChange={(e) => setDashboardData({...dashboardData, totalLoans: Number(e.target.value)})}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Total Members"
            value={dashboardData.totalMembers}
            onChange={(e) => setDashboardData({...dashboardData, totalMembers: Number(e.target.value)})}
            className="w-full p-3 border rounded-lg"
          />
          <button 
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Simple Form component for demo
const Form = ({ onLogin, onSubmit }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Admin Component
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

  // Initialize with logged in state to simulate post-login state
  useEffect(() => {
    // Check if user was logged in (simulate checking localStorage)
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsLoggedIn(true);
      const userData = JSON.parse(currentUser);
      setAdminData({ ...adminData, username: userData.username });
    }
  }, []);

  const [news, setNews] = useState([
    { id: 1, title: 'New Loan Scheme Launched', content: 'We have launched a new micro-loan scheme for small businesses.', file: null, date: '2024-07-20' },
    { id: 2, title: 'Annual Meeting Notice', content: 'Annual general meeting will be held on August 15th.', file: null, date: '2024-07-19' }
  ]);

  const [gallery, setGallery] = useState([
    { id: 1, title: 'Branch Opening', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop', date: '2024-07-18' },
    { id: 2, title: 'Community Event', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop', date: '2024-07-17' }
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

  const feedbackList = [
    { id: 1, name: 'Sita Sharma', email: 'sita@example.com', message: 'This system is amazing!', date: '2025-07-21' },
    { id: 2, name: 'Hari Thapa', email: 'hari@example.com', message: 'The loan application form is very easy to use.', date: '2025-07-20' },
    { id: 3, name: 'Ravi KC', email: 'ravi@example.com', message: 'Very helpful service, thank you!', date: '2025-07-19' }
  ];

  const handleLogin = (userData) => {
    console.log('Login attempt with:', userData);
    if (userData.username === adminData.username && userData.password === adminData.password) {
      setIsLoggedIn(true);
      // Store in localStorage to simulate real login
      localStorage.setItem('currentUser', JSON.stringify({
        username: userData.username,
        loginTime: new Date().toISOString()
      }));
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (formData) => {
    console.log('Registration data:', formData);
    setAdminData({
      username: formData.username,
      password: formData.password
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setShowProfileMenu(false);
    localStorage.removeItem('currentUser');
  };

  const handleAccountSettingsUpdate = (e) => {
    e.preventDefault();
    console.log('Account settings update:', accountSettings);
    if (accountSettings.currentPassword !== adminData.password) {
      alert('Current password is incorrect');
      return;
    }
    if (accountSettings.newPassword && accountSettings.newPassword !== accountSettings.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    const updatedData = {
      username: accountSettings.newUsername || adminData.username,
      password: accountSettings.newPassword || adminData.password
    };

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
        image: galleryForm.image ? URL.createObjectURL(galleryForm.image) : 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
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
      case 'aboutus': return <AboutUsEditor />;
      case 'contactus': return <ContactUs />;
      case 'faq': return <FAQEditor />;
      case 'feedback': return <Feedbacks feedbackList={feedbackList} />;
      case 'events': return <EventNewsPopup />;
      default: return <Dashboard dashboardData={dashboardData} />;
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <Form onLogin={handleLogin} onSubmit={handleRegister} />
      ) : (
        <div className="min-h-screen bg-gray-50 flex">
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

          <div className="flex-1 flex flex-col">
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

            <main className="flex-1 p-6">
              {renderPage()}
            </main>
          </div>

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