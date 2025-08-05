import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Phone } from 'lucide-react';

// Placeholder Image Data URLs
const SAMPLE_IMAGE_RED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_BLUE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_GREEN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_YELLOW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';

const AboutUsEditor = () => {
  const [aboutData, setAboutData] = useState({
    overview: '',
    introduction: '',
    team: [],
    financials: { totalCapital: 0, totalInvested: 0, futureGoal: 0 },
  });
  const [teamForm, setTeamForm] = useState({ id: null, name: '', role: '', description: '', photo: null, phone: '' });
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem('aboutData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAboutData({
          overview: parsedData.overview || 'Welcome to our Microfinance Institution. We provide financial services to empower communities and foster economic growth.',
          introduction: parsedData.introduction || 'Founded in 2005, our microfinance institution was inspired by the global microfinance movement. We aim to provide accessible financial services to underserved communities.',
          team: Array.isArray(parsedData.team)
            ? parsedData.team
            : [
                { id: 1, name: 'Dr. Jane Smith', role: 'Chairperson', description: 'Leads strategic vision.', photo: SAMPLE_IMAGE_RED, phone: '+977-1-1234567' },
                { id: 2, name: 'Mr. Anil Patel', role: 'Secretary', description: 'Manages operations.', photo: SAMPLE_IMAGE_BLUE, phone: '+977-1-7654321' },
                { id: 3, name: 'Ms. Priya Sharma', role: 'Finance Officer', description: 'Oversees financial portfolio.', photo: SAMPLE_IMAGE_GREEN, phone: '+977-1-9876543' },
                { id: 4, name: 'Ms. Lakshmi Rao', role: 'Village Representative', description: 'Advocates for rural clients.', photo: SAMPLE_IMAGE_YELLOW, phone: '+977-1-4567890' },
              ],
          financials: parsedData.financials || { totalCapital: 12000000, totalInvested: 8000000, futureGoal: 20000000 },
        });
      } catch (error) {
        console.error('Error parsing aboutData from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('aboutData', JSON.stringify(aboutData));
    } catch (error) {
      console.error('Error saving aboutData to localStorage:', error);
    }
  }, [aboutData]);

  const handleOverviewSubmit = (e) => {
    e.preventDefault();
    if (!aboutData.overview.trim()) {
      alert('Overview is required.');
      return;
    }
    setAboutData({ ...aboutData });
    alert('Overview updated successfully!');
  };

  const handleIntroductionSubmit = (e) => {
    e.preventDefault();
    if (!aboutData.introduction.trim()) {
      alert('Introduction is required.');
      return;
    }
    setAboutData({ ...aboutData });
    alert('Introduction updated successfully!');
  };

  const handleFinancialsSubmit = (e) => {
    e.preventDefault();
    if (
      aboutData.financials.totalCapital <= 0 ||
      aboutData.financials.totalInvested <= 0 ||
      aboutData.financials.futureGoal <= 0
    ) {
      alert('Financial values must be positive numbers.');
      return;
    }
    setAboutData({ ...aboutData });
    alert('Financial data updated successfully!');
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.role || !teamForm.description) {
      alert('Name, role, and description are required.');
      return;
    }
    if (!editingTeamMember && !teamForm.photo) {
      alert('Photo is required for new team members.');
      return;
    }
    if (teamForm.photo && teamForm.photo.size > 5 * 1024 * 1024) {
      alert('Photo size should be less than 5MB.');
      return;
    }
    if (teamForm.photo && !['image/jpeg', 'image/png'].includes(teamForm.photo.type)) {
      alert('Only JPEG and PNG images are supported.');
      return;
    }
    if (!teamForm.phone) {
      alert('Phone number is required.');
      return;
    }

    const saveTeamMember = (photoDataUrl) => {
      const newMember = {
        id: editingTeamMember ? editingTeamMember.id : Date.now(),
        name: teamForm.name,
        role: teamForm.role,
        description: teamForm.description,
        photo: photoDataUrl || (editingTeamMember ? editingTeamMember.photo : SAMPLE_IMAGE_RED),
        phone: teamForm.phone,
      };

      if (editingTeamMember) {
        setAboutData({
          ...aboutData,
          team: aboutData.team.map((member) => (member.id === editingTeamMember.id ? newMember : member)),
        });
      } else {
        setAboutData({
          ...aboutData,
          team: [...aboutData.team, newMember],
        });
      }

      setTeamForm({ id: null, name: '', role: '', description: '', photo: null, phone: '' });
      setEditingTeamMember(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
      alert('Team member saved successfully!');
    };

    if (teamForm.photo) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        if (dataUrl.startsWith('data:image/')) {
          saveTeamMember(dataUrl);
        } else {
          alert('Failed to generate valid image Data URL.');
        }
      };
      reader.onerror = () => alert('Error reading image file.');
      reader.readAsDataURL(teamForm.photo);
    } else {
      saveTeamMember(null);
    }
  };

  const handleTeamEdit = (member) => {
    setEditingTeamMember(member);
    setTeamForm({
      id: member.id,
      name: member.name,
      role: member.role,
      description: member.description,
      photo: null,
      phone: member.phone || '',
    });
  };

  const handleTeamDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setAboutData({
        ...aboutData,
        team: aboutData.team.filter((member) => member.id !== id),
      });
      alert('Team member deleted successfully!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
      <h3 className="text-lg font-semibold mb-4 text-green-700">Edit About Us</h3>

      {/* Overview Editor */}
      <div className="mb-8">
        <h4 className="text-md font-medium mb-2">Company Overview</h4>
        <form onSubmit={handleOverviewSubmit}>
          <textarea
            className="w-full h-32 p-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter company overview..."
            value={aboutData.overview}
            onChange={(e) => setAboutData({ ...aboutData, overview: e.target.value })}
          />
          <button
            type="submit"
            className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Save Overview
          </button>
        </form>
      </div>

      {/* Introduction Editor */}
      <div className="mb-8">
        <h4 className="text-md font-medium mb-2">Introduction</h4>
        <form onSubmit={handleIntroductionSubmit}>
          <textarea
            className="w-full h-32 p-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter introduction..."
            value={aboutData.introduction}
            onChange={(e) => setAboutData({ ...aboutData, introduction: e.target.value })}
          />
          <button
            type="submit"
            className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Save Introduction
          </button>
        </form>
      </div>

      {/* Team Editor */}
      <div className="mb-8">
        <h4 className="text-md font-medium mb-2">{editingTeamMember ? 'Edit Team Member' : 'Add Team Member'}</h4>
        <form onSubmit={handleTeamSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={teamForm.name}
            onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={teamForm.role}
            onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={teamForm.phone}
            onChange={(e) => setTeamForm({ ...teamForm, phone: e.target.value })}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            placeholder="Description"
            value={teamForm.description}
            onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
            className="w-full h-24 p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="inline w-4 h-4 mr-1 text-green-600" />
              Photo {editingTeamMember ? '(Optional)' : '(Required)'}
            </label>
            {editingTeamMember && teamForm.photo && (
              <img src={teamForm.photo} alt="Preview" className="w-24 h-24 rounded-full mb-2" />
            )}
            <input
              type="file"
              ref={imageInputRef}
              accept="image/jpeg,image/png"
              onChange={(e) => setTeamForm({ ...teamForm, photo: e.target.files[0] })}
              className="w-full p-3 border border-green-300 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG (Max 5MB)</p>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            {editingTeamMember ? 'Update Team Member' : 'Add Team Member'}
          </button>
        </form>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutData.team.map((member) => (
            <div key={member.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
              <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h5 className="font-semibold">{member.name}</h5>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-gray-600">
                  <Phone className="inline w-4 h-4 mr-1 text-green-600" />
                  {member.phone || 'No phone provided'}
                </p>
                <p className="text-gray-700 text-sm">{member.description}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleTeamEdit(member)}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleTeamDelete(member.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financials Editor */}
      <div>
        <h4 className="text-md font-medium mb-2">Financial Data</h4>
        <form onSubmit={handleFinancialsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Capital ($)</label>
            <input
              type="number"
              value={aboutData.financials.totalCapital}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  financials: { ...aboutData.financials, totalCapital: Number(e.target.value) },
                })
              }
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Invested ($)</label>
            <input
              type="number"
              value={aboutData.financials.totalInvested}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  financials: { ...aboutData.financials, totalInvested: Number(e.target.value) },
                })
              }
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Future Goal (2030) ($)</label>
            <input
              type="number"
              value={aboutData.financials.futureGoal}
              onChange={(e) =>
                setAboutData({
                  ...aboutData,
                  financials: { ...aboutData.financials, futureGoal: Number(e.target.value) },
                })
              }
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
              min="0"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Save Financial Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutUsEditor;