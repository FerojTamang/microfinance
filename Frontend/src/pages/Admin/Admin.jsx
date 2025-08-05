import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Image,
  User,
  LogOut,
  Settings,
  X,
  DollarSign,
  UserCheck,
  Activity,
  FileText,
  Upload,
  Mail,
  Phone,
} from 'lucide-react';
import EventNewsPopup from './components/EventNewsPopup';
import MembershipForms from './components/MembershipForms';
import LoanApplications from './components/LoanApplications';
import FAQEditor from './components/FAQEditor';
import ContactEditor from './components/ContactEditor';
import AboutUsEditor from './components/AboutUsEditor';
import FeedbackEditModal from './components/FeedbackEditModal';

// Sample Data URLs for testing (32x32 PNGs)
const SAMPLE_IMAGE_RED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_BLUE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_GREEN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_YELLOW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';

// Initial About Us data for fallback
const initialAboutData = {
  overview: 'Welcome to our Microfinance Institution. We provide financial services to empower communities and foster economic growth.',
  introduction: 'Founded in 2005, our microfinance institution was inspired by the global microfinance movement. We aim to provide accessible financial services to underserved communities.',
  team: [
    { id: 1, name: 'Dr. Jane Smith', role: 'Chairperson', description: 'Leads strategic vision.', photo: SAMPLE_IMAGE_RED, phone: '+977-1-1234567' },
    { id: 2, name: 'Mr. Anil Patel', role: 'Secretary', description: 'Manages operations.', photo: SAMPLE_IMAGE_BLUE, phone: '+977-1-7654321' },
    { id: 3, name: 'Ms. Priya Sharma', role: 'Finance Officer', description: 'Oversees financial portfolio.', photo: SAMPLE_IMAGE_GREEN, phone: '+977-1-9876543' },
    { id: 4, name: 'Ms. Lakshmi Rao', role: 'Village Representative', description: 'Advocates for rural clients.', photo: SAMPLE_IMAGE_YELLOW, phone: '+977-1-4567890' },
  ],
  financials: { totalCapital: 12000000, totalInvested: 8000000, futureGoal: 20000000 },
};

// AboutUsPreview Component
const AboutUsPreview = ({ aboutData }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200 mb-6">
    <h3 className="text-lg font-semibold mb-4 text-green-700">About Us Preview</h3>
    <h4 className="text-md font-medium mb-2">Team</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {aboutData.team.map((member) => (
        <div key={member.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
          <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h5 className="font-semibold text-green-700">{member.name}</h5>
            <p className="text-gray-600">{member.role}</p>
            <p className="text-gray-600">
              <Phone className="inline w-4 h-4 mr-1 text-green-600" />
              {member.phone || 'No phone provided'}
            </p>
            <p className="text-gray-700 text-sm">{member.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Initial FAQs with plain string answers
const initialFaqs = [
  {
    id: 1,
    question: 'How do I apply for a loan?',
    answer: 'To apply for a loan with MicroFinance Solutions, follow these steps:\n1. Navigate to the \'Apply for Loan\' tab on our website.\n2. Fill out the loan application form with details such as loan type, amount, tenure, full name, email, phone number, and citizenship number.\n3. Optionally, upload supporting documents like a citizenship document or agreement papers (PDF, JPG, or PNG formats, max 5MB).\n4. Review your information and click \'Submit Loan Application.\'\n5. You will receive a confirmation message, and our team will contact you for further processing.\nEnsure all required fields are completed to avoid delays in processing.',
  },
  {
    id: 2,
    question: 'What types of loans are available?',
    answer: 'We offer Personal Loans, Agricultural Loans, and Group Loans. Each loan type is designed to meet specific financial needs, with flexible tenures ranging from 3 months to 5 years.',
  },
  {
    id: 3,
    question: 'What are the eligibility criteria for a loan?',
    answer: 'To be eligible, you must be at least 18 years old, have a valid citizenship number, and provide accurate personal and contact information. Additional requirements may vary based on the loan type.',
  },
  {
    id: 4,
    question: 'How long does it take to process a loan application?',
    answer: 'Loan applications are typically processed within 3-5 business days. You will be notified via email or phone once a decision is made.',
  },
  {
    id: 5,
    question: 'Can I calculate my EMI before applying?',
    answer: 'Yes, use our EMI Calculator in the \'Apply for Loan\' tab to estimate your monthly payments based on loan amount, tenure, and interest rate.',
  },
];

// Initial Contacts
const initialContacts = [
  { id: 1, title: 'Chairperson', name: 'Mr. Feroj Tamang', email: 'chairperson@microfinance.org', phone: '+977-1-1234567' },
  { id: 2, title: 'Member', name: 'Ms. Amisha Lama', email: 'member@microfinance.org', phone: '+977-1-7654321' },
  { id: 3, title: 'Secretary', name: 'Mr. Adarsha Lama', email: 'secretary@microfinance.org', phone: '+977-1-9876543' },
];

// Dashboard Component
const Dashboard = ({ dashboardData }) => {
  const aboutData = JSON.parse(localStorage.getItem('aboutData')) || initialAboutData;
  return (
    <div className="space-y-6">
      <AboutUsPreview aboutData={aboutData} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">NPR {dashboardData.totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Loans</p>
              <p className="text-2xl font-bold text-green-600">{dashboardData.totalLoans}</p>
            </div>
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-green-600">{dashboardData.totalMembers}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Transactions</p>
              <p className="text-2xl font-bold text-green-600">{dashboardData.dailyTransactions}</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
        <h3 className="text-lg font-semibold mb-4 text-green-700">Risk Analysis</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Low Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${dashboardData.riskAnalysis.low}%` }}></div>
              </div>
              <span className="text-sm font-medium">{dashboardData.riskAnalysis.low}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Medium Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${dashboardData.riskAnalysis.medium}%` }}></div>
              </div>
              <span className="text-sm font-medium">{dashboardData.riskAnalysis.medium}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">High Risk</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${dashboardData.riskAnalysis.high}%` }}></div>
              </div>
              <span className="text-sm font-medium">{dashboardData.riskAnalysis.high}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Gallery Component
const Gallery = ({ gallery, galleryForm, editingGallery, imageInputRef, setGalleryForm, handleGallerySubmit, handleGalleryEdit, handleGalleryDelete }) => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
      <h3 className="text-lg font-semibold mb-4 text-green-700">{editingGallery ? 'Edit Gallery Item' : 'Add Gallery Item'}</h3>
      <form onSubmit={handleGallerySubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Image Title"
          value={galleryForm.title}
          onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
          className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <input
          type="file"
          ref={imageInputRef}
          accept="image/jpeg,image/png"
          onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.files[0] })}
          className="w-full p-3 border border-green-300 rounded-lg"
        />
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          {editingGallery ? 'Update Gallery' : 'Add to Gallery'}
        </button>
      </form>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gallery.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-sm border border-green-200 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="font-semibold text-green-700">{item.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{item.date}</p>
            <div className="flex space-x-2 mt-3">
              <button onClick={() => handleGalleryEdit(item)} className="text-green-600 hover:text-green-800 text-sm">
                Edit
              </button>
              <button onClick={() => handleGalleryDelete(item.id)} className="text-red-600 hover:text-red-800 text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Feedbacks Component
const Feedbacks = ({ feedbackList, setFeedbackList, setSelectedFeedbackForEdit }) => (
  <div className="bg-white rounded-lg shadow-sm border border-green-200">
    <div className="p-6 border-b border-green-200">
      <h3 className="text-lg font-semibold text-green-700">Customer Feedback</h3>
    </div>
    <div className="p-6 space-y-4">
      {feedbackList.length === 0 ? (
        <p className="text-gray-600">No feedback available.</p>
      ) : (
        feedbackList.map((feedback) => (
          <div key={feedback.id} className="border-l-4 border-green-500 pl-4 py-2 flex items-start space-x-4">
            {feedback.imageDataUrl && (
              <img
                src={feedback.imageDataUrl}
                alt={feedback.name || 'Feedback Profile'}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-green-700">{feedback.name || 'Anonymous'}</h4>
                  <p className="text-sm text-gray-600">{feedback.phone || 'No phone provided'}</p>
                  <p className="mt-2">{feedback.feedback}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="text-sm text-gray-500">{feedback.timestamp}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedFeedbackForEdit(feedback)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this feedback?')) {
                          setFeedbackList(feedbackList.filter((item) => item.id !== feedback.id));
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

// AccountSettings Component
const AccountSettings = ({ showAccountSettings, setShowAccountSettings, accountSettings, setAccountSettings, handleAccountSettingsUpdate }) => {
  if (!showAccountSettings) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-green-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-700">Account Settings</h3>
          <button onClick={() => setShowAccountSettings(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleAccountSettingsUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="New Username (leave blank to keep current)"
            value={accountSettings.newUsername}
            onChange={(e) => setAccountSettings({ ...accountSettings, newUsername: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Current Password"
            value={accountSettings.currentPassword}
            onChange={(e) => setAccountSettings({ ...accountSettings, currentPassword: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="New Password (leave blank to keep current)"
            value={accountSettings.newPassword}
            onChange={(e) => setAccountSettings({ ...accountSettings, newPassword: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={accountSettings.confirmPassword}
            onChange={(e) => setAccountSettings({ ...accountSettings, confirmPassword: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Update Settings
          </button>
        </form>
      </div>
    </div>
  );
};

// AdminDashboard Component
const AdminDashboard = ({ dashboardData, setDashboardData, onClose }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-green-700">Admin Panel</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
        <h3 className="text-lg font-semibold mb-4 text-green-700">Update Dashboard Data</h3>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Total Amount"
            value={dashboardData.totalAmount}
            onChange={(e) => setDashboardData({ ...dashboardData, totalAmount: Number(e.target.value) })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Total Loans"
            value={dashboardData.totalLoans}
            onChange={(e) => setDashboardData({ ...dashboardData, totalLoans: Number(e.target.value) })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Total Members"
            value={dashboardData.totalMembers}
            onChange={(e) => setDashboardData({ ...dashboardData, totalMembers: Number(e.target.value) })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

// LoanDetailsModal Component
const LoanDetailsModal = ({ loan, onClose }) => {
  if (!loan) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-green-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-700">Loan Application Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <p className="text-gray-900">{loan.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Type</label>
            <p className="text-gray-900">{loan.loanType}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
            <p className="text-gray-900">NPR {loan.amount.toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tenure</label>
            <p className="text-gray-900">{loan.tenure} months</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Purpose/Description</label>
            <p className="text-gray-900">{loan.purpose}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="text-gray-900">{loan.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{loan.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Citizenship Number</label>
            <p className="text-gray-900">{loan.citizenshipNumber}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Submission Date</label>
            <p className="text-gray-900">{loan.date}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p
              className={`text-gray-900 ${
                loan.status === 'approved'
                  ? 'text-green-600'
                  : loan.status === 'rejected'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              }`}
            >
              {loan.status}
            </p>
          </div>
          {loan.citizenshipFileDataUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Citizenship Document</label>
              {loan.citizenshipFileDataUrl.startsWith('data:image/') ? (
                <img src={loan.citizenshipFileDataUrl} alt="Citizenship Document" className="max-w-full h-auto mt-2" />
              ) : (
                <a
                  href={loan.citizenshipFileDataUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  View Citizenship Document
                </a>
              )}
            </div>
          )}
          {loan.agreementFileDataUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Agreement Papers</label>
              {loan.agreementFileDataUrl.startsWith('data:image/') ? (
                <img src={loan.agreementFileDataUrl} alt="Agreement Papers" className="max-w-full h-auto mt-2" />
              ) : (
                <a
                  href={loan.agreementFileDataUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  View Agreement Papers
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// LoanEditModal Component
const LoanEditModal = ({ loan, onClose, updateLoan }) => {
  if (!loan) return null;
  const [formData, setFormData] = useState({
    loanType: loan.loanType || '',
    amount: loan.amount || '',
    tenure: loan.tenure || '',
    name: loan.name || '',
    email: loan.email || '',
    phone: loan.phone || '',
    citizenshipNumber: loan.citizenshipNumber || '',
    purpose: loan.purpose || '',
    citizenshipFile: null,
    agreementFile: null,
    citizenshipFileDataUrl: loan.citizenshipFileDataUrl || null,
    agreementFileDataUrl: loan.agreementFileDataUrl || null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.loanType ||
      !formData.amount ||
      !formData.tenure ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.citizenshipNumber
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    if (formData.citizenshipFile && formData.citizenshipFile.size > 5 * 1024 * 1024) {
      alert('Citizenship file size exceeds 5MB.');
      return;
    }
    if (formData.agreementFile && formData.agreementFile.size > 5 * 1024 * 1024) {
      alert('Agreement file size exceeds 5MB.');
      return;
    }
    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
        reader.readAsDataURL(file);
      });
    };
    try {
      const [citizenshipFileDataUrl, agreementFileDataUrl] = await Promise.all([
        readFileAsDataURL(formData.citizenshipFile),
        readFileAsDataURL(formData.agreementFile),
      ]);
      const updatedLoan = {
        ...loan,
        loanType: formData.loanType,
        amount: Number(formData.amount),
        tenure: Number(formData.tenure),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        citizenshipNumber: formData.citizenshipNumber,
        purpose: formData.purpose,
        citizenshipFileDataUrl: citizenshipFileDataUrl || formData.citizenshipFileDataUrl,
        agreementFileDataUrl: agreementFileDataUrl || formData.agreementFileDataUrl,
      };
      updateLoan(loan.id, updatedLoan);
      onClose();
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error updating loan application. Please try again.');
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-green-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-700">Edit Loan Application</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type *</label>
              <select
                name="loanType"
                value={formData.loanType}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select loan type</option>
                <option value="personal">Personal Loan</option>
                <option value="agricultural">Agricultural Loan</option>
                <option value="group">Group Loan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (NPR) *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                min="10000"
                max="1000000"
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenure *</label>
              <select
                name="tenure"
                value={formData.tenure}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select tenure</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">1 Year</option>
                <option value="24">2 Years</option>
                <option value="36">3 Years</option>
                <option value="48">4 Years</option>
                <option value="60">5 Years</option>
              </select>
            </div>
          </div>
          <div className="border-t border-green-200 pt-6">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1 text-green-600" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1 text-green-600" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1 text-green-600" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="inline w-4 h-4 mr-1 text-green-600" />
                  Citizenship Number *
                </label>
                <input
                  type="text"
                  name="citizenshipNumber"
                  value={formData.citizenshipNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter citizenship number"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe the purpose of the loan..."
            />
          </div>
          <div className="border-t border-green-200 pt-6">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Document Upload (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload className="inline w-4 h-4 mr-1 text-green-600" />
                  Citizenship Document
                </label>
                {formData.citizenshipFileDataUrl && (
                  <div className="mb-2">
                    {formData.citizenshipFileDataUrl.startsWith('data:image/') ? (
                      <img src={formData.citizenshipFileDataUrl} alt="Citizenship Document" className="max-w-xs h-auto" />
                    ) : (
                      <a
                        href={formData.citizenshipFileDataUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        View Current Citizenship Document
                      </a>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  name="citizenshipFile"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload className="inline w-4 h-4 mr-1 text-green-600" />
                  Agreement Papers
                </label>
                {formData.agreementFileDataUrl && (
                  <div className="mb-2">
                    {formData.agreementFileDataUrl.startsWith('data:image/') ? (
                      <img src={formData.agreementFileDataUrl} alt="Agreement Papers" className="max-w-xs h-auto" />
                    ) : (
                      <a
                        href={formData.agreementFileDataUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        View Current Agreement Papers
                      </a>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  name="agreementFile"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          </div>
          <div className="pt-6 flex space-x-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Form Component
const Form = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-green-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Admin Component
const Admin = ({ membershipForms, updateMembershipStatus }) => {
  const navigate = useNavigate();
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
    confirmPassword: '',
  });
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedLoanForEdit, setSelectedLoanForEdit] = useState(null);
  const [selectedFeedbackForEdit, setSelectedFeedbackForEdit] = useState(null);
  const [contacts, setContacts] = useState(() => {
    const stored = localStorage.getItem('contacts');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : initialContacts;
      } catch (error) {
        console.error('Error parsing contacts from localStorage:', error);
        return initialContacts;
      }
    }
    return initialContacts;
  });
  const [faqs, setFaqs] = useState(() => {
    const stored = localStorage.getItem('faqs');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('Loaded FAQs from localStorage:', parsed);
        return Array.isArray(parsed) ? parsed : initialFaqs;
      } catch (error) {
        console.error('Error parsing faqs from localStorage:', error);
        return initialFaqs;
      }
    }
    console.log('Using initialFaqs:', initialFaqs);
    return initialFaqs;
  });
  const [feedbackList, setFeedbackList] = useState(() => {
    const stored = localStorage.getItem('feedbackList');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [
          {
            id: 1,
            name: 'John Doe',
            feedback: 'Great service!',
            phone: '1234567890',
            imageDataUrl: SAMPLE_IMAGE_RED,
            timestamp: new Date().toLocaleString(),
          },
          {
            id: 2,
            name: 'Jane Smith',
            feedback: 'Very helpful team.',
            phone: '0987654321',
            imageDataUrl: SAMPLE_IMAGE_BLUE,
            timestamp: new Date().toLocaleString(),
          },
        ];
      } catch (error) {
        console.error('Error parsing feedbackList from localStorage:', error);
        return [
          {
            id: 1,
            name: 'John Doe',
            feedback: 'Great service!',
            phone: '1234567890',
            imageDataUrl: SAMPLE_IMAGE_RED,
            timestamp: new Date().toLocaleString(),
          },
          {
            id: 2,
            name: 'Jane Smith',
            feedback: 'Very helpful team.',
            phone: '0987654321',
            imageDataUrl: SAMPLE_IMAGE_BLUE,
            timestamp: new Date().toLocaleString(),
          },
        ];
      }
    }
    return [
      {
        id: 1,
        name: 'John Doe',
        feedback: 'Great service!',
        phone: '1234567890',
        imageDataUrl: SAMPLE_IMAGE_RED,
        timestamp: new Date().toLocaleString(),
      },
      {
        id: 2,
        name: 'Jane Smith',
        feedback: 'Very helpful team.',
        phone: '0987654321',
        imageDataUrl: SAMPLE_IMAGE_BLUE,
        timestamp: new Date().toLocaleString(),
      },
    ];
  });
  useEffect(() => {
    try {
      localStorage.setItem('faqs', JSON.stringify(faqs));
      console.log('Saved FAQs to localStorage:', faqs);
    } catch (error) {
      console.error('Error saving faqs to localStorage:', error);
    }
  }, [faqs]);
  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving contacts to localStorage:', error);
    }
  }, [contacts]);
  useEffect(() => {
    try {
      localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
    } catch (error) {
      console.error('Error saving feedbackList to localStorage:', error);
    }
  }, [feedbackList]);
  const [localMembershipForms, setLocalMembershipForms] = useState(() => {
    const stored = localStorage.getItem('membershipForms');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : (membershipForms || [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            citizenshipNumber: '123456',
            citizenshipFile: 'citizenship.jpg',
            citizenshipFileDataUrl: SAMPLE_IMAGE_RED,
            address: '123 Main St',
            dateOfBirth: '1990-01-01',
            monthlyPayment: 500,
            entryShare: 1000,
            status: 'pending',
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '0987654321',
            citizenshipNumber: '654321',
            citizenshipFile: 'user_doc.jpeg',
            citizenshipFileDataUrl: SAMPLE_IMAGE_BLUE,
            address: '456 Oak Ave',
            dateOfBirth: '1985-05-15',
            monthlyPayment: 600,
            entryShare: 1500,
            status: 'pending',
          },
        ]);
      } catch (error) {
        console.error('Error parsing membershipForms from localStorage:', error);
        return membershipForms || [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            citizenshipNumber: '123456',
            citizenshipFile: 'citizenship.jpg',
            citizenshipFileDataUrl: SAMPLE_IMAGE_RED,
            address: '123 Main St',
            dateOfBirth: '1990-01-01',
            monthlyPayment: 500,
            entryShare: 1000,
            status: 'pending',
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '0987654321',
            citizenshipNumber: '654321',
            citizenshipFile: 'user_doc.jpeg',
            citizenshipFileDataUrl: SAMPLE_IMAGE_BLUE,
            address: '456 Oak Ave',
            dateOfBirth: '1985-05-15',
            monthlyPayment: 600,
            entryShare: 1500,
            status: 'pending',
          },
        ];
      }
    }
    return membershipForms || [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        citizenshipNumber: '123456',
        citizenshipFile: 'citizenship.jpg',
        citizenshipFileDataUrl: SAMPLE_IMAGE_RED,
        address: '123 Main St',
        dateOfBirth: '1990-01-01',
        monthlyPayment: 500,
        entryShare: 1000,
        status: 'pending',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        citizenshipNumber: '654321',
        citizenshipFile: 'user_doc.jpeg',
        citizenshipFileDataUrl: SAMPLE_IMAGE_BLUE,
        address: '456 Oak Ave',
        dateOfBirth: '1985-05-15',
        monthlyPayment: 600,
        entryShare: 1500,
        status: 'pending',
      },
    ];
  });
  useEffect(() => {
    setLocalMembershipForms((prevForms) => {
      const mergedForms = membershipForms ? [...membershipForms] : prevForms;
      try {
        localStorage.setItem('membershipForms', JSON.stringify(mergedForms));
      } catch (error) {
        console.error('Error saving membershipForms to localStorage:', error);
      }
      return mergedForms;
    });
  }, [membershipForms]);
  const [gallery, setGallery] = useState([]);
  const [galleryForm, setGalleryForm] = useState({ title: '', image: null });
  const [editingGallery, setEditingGallery] = useState(null);
  const imageInputRef = useRef(null);
  const [loanForms, setLoanForms] = useState(() => {
    const stored = localStorage.getItem('loanForms');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed)
          ? parsed
          : [
              { id: 1, name: 'Alice Johnson', amount: 50000, purpose: 'Small Business', phone: '9876543212', status: 'pending', date: '2024-07-20' },
              { id: 2, name: 'Bob Wilson', amount: 25000, purpose: 'Agriculture', phone: '9876543213', status: 'approved', date: '2024-07-19' },
            ];
      } catch (error) {
        console.error('Error parsing loanForms from localStorage:', error);
        return [
          { id: 1, name: 'Alice Johnson', amount: 50000, purpose: 'Small Business', phone: '9876543212', status: 'pending', date: '2024-07-20' },
          { id: 2, name: 'Bob Wilson', amount: 25000, purpose: 'Agriculture', phone: '9876543213', status: 'approved', date: '2024-07-19' },
        ];
      }
    }
    return [
      { id: 1, name: 'Alice Johnson', amount: 50000, purpose: 'Small Business', phone: '9876543212', status: 'pending', date: '2024-07-20' },
      { id: 2, name: 'Bob Wilson', amount: 25000, purpose: 'Agriculture', phone: '9876543213', status: 'approved', date: '2024-07-19' },
    ];
  });
  const [dashboardData, setDashboardData] = useState({
    totalAmount: 2500000,
    totalLoans: 150,
    totalMembers: 350,
    dailyTransactions: 25,
    riskAnalysis: { low: 60, medium: 30, high: 10 },
  });
  useEffect(() => {
    const stored = localStorage.getItem('gallery');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setGallery(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error('Error parsing gallery from localStorage:', error);
        setGallery([]);
      }
    } else {
      setGallery([]);
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('gallery', JSON.stringify(gallery));
    } catch (error) {
      console.error('Error saving gallery to localStorage:', error);
    }
  }, [gallery]);
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser);
        setIsLoggedIn(true);
        setAdminData({ ...adminData, username: userData.username });
      } catch (error) {
        console.error('Error parsing currentUser from localStorage:', error);
      }
    }
  }, []);
  const handleLogin = (userData) => {
    if (userData.username === adminData.username && userData.password === adminData.password) {
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify({
        username: userData.username,
        loginTime: new Date().toISOString(),
      }));
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setShowProfileMenu(false);
    localStorage.removeItem('currentUser');
    navigate('/admin');
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
    const updatedData = {
      username: accountSettings.newUsername || adminData.username,
      password: accountSettings.newPassword || adminData.password,
    };
    setAdminData(updatedData);
    setAccountSettings({ newUsername: '', currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowAccountSettings(false);
    alert('Account settings updated successfully!');
  };
  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (!galleryForm.title) {
      alert('Image title is required');
      return;
    }
    if (!galleryForm.image && !editingGallery) {
      alert('Image is required for new gallery items');
      return;
    }
    if (galleryForm.image && galleryForm.image.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }
    if (galleryForm.image && !['image/jpeg', 'image/png'].includes(galleryForm.image.type)) {
      alert('Only JPEG and PNG images are supported');
      return;
    }
    const saveGalleryItem = (imageDataUrl) => {
      const newItem = {
        id: editingGallery ? editingGallery.id : Date.now(),
        title: galleryForm.title,
        image: imageDataUrl || (editingGallery ? editingGallery.image : ''),
        date: new Date().toISOString().split('T')[0],
      };
      if (editingGallery) {
        setGallery(gallery.map((item) => (item.id === editingGallery.id ? newItem : item)));
      } else {
        setGallery([newItem, ...gallery]);
      }
      setGalleryForm({ title: '', image: null });
      setEditingGallery(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
    };
    if (galleryForm.image) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        if (dataUrl.startsWith('data:image/')) {
          saveGalleryItem(dataUrl);
        } else {
          alert('Failed to generate valid image Data URL');
        }
      };
      reader.onerror = () => {
        alert('Error reading image file');
      };
      reader.readAsDataURL(galleryForm.image);
    } else {
      saveGalleryItem(null);
    }
  };
  const handleGalleryEdit = (item) => {
    setEditingGallery(item);
    setGalleryForm({ title: item.title, image: null });
  };
  const handleGalleryDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      setGallery(gallery.filter((item) => item.id !== id));
    }
  };
  const updateLoanStatus = (id, status) => {
    setLoanForms((prevForms) => {
      const updatedForms = prevForms.map((form) => (form.id === id ? { ...form, status } : form));
      try {
        localStorage.setItem('loanForms', JSON.stringify(updatedForms));
      } catch (error) {
        console.error('Error saving loanForms to localStorage:', error);
      }
      return updatedForms;
    });
  };
  const updateLoan = (id, updatedData) => {
    setLoanForms((prevForms) => {
      const updatedForms = prevForms.map((form) => (form.id === id ? { ...form, ...updatedData } : form));
      try {
        localStorage.setItem('loanForms', JSON.stringify(updatedForms));
      } catch (error) {
        console.error('Error saving loanForms to localStorage:', error);
      }
      return updatedForms;
    });
  };
  const updateFeedback = (id, updatedData) => {
    setFeedbackList((prevList) => {
      const updatedList = prevList.map((item) => (item.id === id ? { ...item, ...updatedData } : item));
      try {
        localStorage.setItem('feedbackList', JSON.stringify(updatedList));
      } catch (error) {
        console.error('Error saving feedbackList to localStorage:', error);
      }
      return updatedList;
    });
  };
  const updateMembershipForm = (id, updatedData) => {
    setLocalMembershipForms((prevForms) => {
      const updatedForms = prevForms.map((form) => (form.id === id ? { ...form, ...updatedData } : form));
      try {
        localStorage.setItem('membershipForms', JSON.stringify(updatedForms));
      } catch (error) {
        console.error('Error saving updated membershipForms to localStorage:', error);
      }
      return updatedForms;
    });
  };
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'gallery', name: 'Add Gallery', icon: Image },
    { id: 'membership', name: 'Membership Forms', icon: Users },
    { id: 'loans', name: 'Loan Applications', icon: CreditCard },
    { id: 'aboutus', name: 'About Us', icon: User },
    { id: 'contactus', name: 'Contact Us', icon: User },
    { id: 'faq', name: 'FAQ', icon: FileText },
    { id: 'feedback', name: 'Feedback', icon: User },
    { id: 'events', name: 'Events & News Popup', icon: User },
  ];
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard dashboardData={dashboardData} />;
      case 'gallery':
        return (
          <Gallery
            gallery={gallery}
            galleryForm={galleryForm}
            editingGallery={editingGallery}
            imageInputRef={imageInputRef}
            setGalleryForm={setGalleryForm}
            handleGallerySubmit={handleGallerySubmit}
            handleGalleryEdit={handleGalleryEdit}
            handleGalleryDelete={handleGalleryDelete}
          />
        );
      case 'membership':
        return (
          <MembershipForms
            membershipForms={localMembershipForms}
            updateMembershipStatus={updateMembershipStatus}
            updateMembershipForm={updateMembershipForm}
          />
        );
      case 'loans':
        return (
          <LoanApplications
            loanForms={loanForms}
            updateLoanStatus={updateLoanStatus}
            setSelectedLoan={setSelectedLoan}
            setSelectedLoanForEdit={setSelectedLoanForEdit}
          />
        );
      case 'aboutus':
        return <AboutUsEditor />;
      case 'contactus':
        return <ContactEditor contacts={contacts} setContacts={setContacts} />;
      case 'faq':
        return <FAQEditor faqs={faqs} setFaqs={setFaqs} />;
      case 'feedback':
        return (
          <Feedbacks
            feedbackList={feedbackList}
            setFeedbackList={setFeedbackList}
            setSelectedFeedbackForEdit={setSelectedFeedbackForEdit}
          />
        );
      case 'events':
        return <EventNewsPopup />;
      default:
        return <Dashboard dashboardData={dashboardData} />;
    }
  };
  return (
    <>
      {!isLoggedIn ? (
        <Form onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen bg-gray-50 flex">
          <div className="w-64 bg-white shadow-lg border-r border-green-200">
            <div className="p-6 border-b border-green-200">
              <h1 className="text-xl font-bold text-green-700">MicroFinance Admin</h1>
            </div>
            <nav className="mt-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-green-50 transition-colors ${
                      currentPage === item.id ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-600'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex-1 flex flex-col">
            <header className="bg-white shadow-sm border-b border-green-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-green-700 capitalize">{currentPage}</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-800 transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>{adminData.username}</span>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-green-200">
                        <button
                          onClick={() => {
                            setShowAccountSettings(true);
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 w-full text-left"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Account Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 w-full text-left"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                        <button
                          onClick={() => {
                            setShowAdminDashboard(true);
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 w-full text-left"
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
            <LoanDetailsModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
            <LoanEditModal
              loan={selectedLoanForEdit}
              onClose={() => setSelectedLoanForEdit(null)}
              updateLoan={updateLoan}
            />
            <FeedbackEditModal
              feedback={selectedFeedbackForEdit}
              onClose={() => setSelectedFeedbackForEdit(null)}
              updateFeedback={updateFeedback}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;