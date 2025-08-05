import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

// Placeholder Image Data URLs (same as in AboutUsEditor)
const SAMPLE_IMAGE_RED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_BLUE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_GREEN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
const SAMPLE_IMAGE_YELLOW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';

const About = () => {
  const [aboutData, setAboutData] = useState({
    overview: 'Welcome to our Microfinance Institution. We provide financial services to empower communities and foster economic growth.',
    introduction: 'Founded in 2005, our microfinance institution was inspired by the global microfinance movement. We aim to provide accessible financial services to underserved communities.',
    team: [
      { id: 1, name: 'Dr. Jane Smith', role: 'Chairperson', description: 'Leads strategic vision.', photo: SAMPLE_IMAGE_RED, phone: '+977-1-1234567' },
      { id: 2, name: 'Mr. Anil Patel', role: 'Secretary', description: 'Manages operations.', photo: SAMPLE_IMAGE_BLUE, phone: '+977-1-7654321' },
      { id: 3, name: 'Ms. Priya Sharma', role: 'Finance Officer', description: 'Oversees financial portfolio.', photo: SAMPLE_IMAGE_GREEN, phone: '+977-1-9876543' },
      { id: 4, name: 'Ms. Lakshmi Rao', role: 'Village Representative', description: 'Advocates for rural clients.', photo: SAMPLE_IMAGE_YELLOW, phone: '+977-1-4567890' },
    ],
    financials: { totalCapital: 12000000, totalInvested: 8000000, futureGoal: 20000000 },
  });

  useEffect(() => {
    const storedData = localStorage.getItem('aboutData');
    if (storedData) {
      try {
        setAboutData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing aboutData from localStorage:', error);
      }
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8">About Us</h1>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Mission</h2>
          <p className="text-gray-700">{aboutData.overview}</p>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Story</h2>
          <p className="text-gray-700">{aboutData.introduction}</p>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.team.map((member) => (
              <div key={member.id} className="bg-white p-6 rounded-lg shadow-sm border border-green-200 flex items-center space-x-4">
                <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-green-700">{member.name}</h3>
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
        </section>

        {/* Financials */}
        <section>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-lg font-semibold text-green-700">Total Capital</h3>
              <p className="text-2xl font-bold">${aboutData.financials.totalCapital.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-lg font-semibold text-green-700">Total Invested</h3>
              <p className="text-2xl font-bold">${aboutData.financials.totalInvested.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
              <h3 className="text-lg font-semibold text-green-700">Future Goal (2030)</h3>
              <p className="text-2xl font-bold">${aboutData.financials.futureGoal.toLocaleString()}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;