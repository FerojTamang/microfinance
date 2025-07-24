import React, { useState } from 'react';

const AboutUsEditor = ({ aboutData = { aboutText: '', contactInfo: '' }, setAboutData = () => {} }) => {
  const [formState, setFormState] = useState({
    aboutText: aboutData.aboutText || '',
    contactInfo: aboutData.contactInfo || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAboutData(formState);
    alert('About Us and Contact Info updated!');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Edit About Us & Contact Info</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* About Us Section */}
        <div>
          <label htmlFor="aboutText" className="block font-medium mb-1">
            About Us
          </label>
          <textarea
            id="aboutText"
            name="aboutText"
            rows="6"
            value={formState.aboutText}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Write about your organization..."
          />
        </div>

        {/* Contact Info Section */}
        <div>
          <label htmlFor="contactInfo" className="block font-medium mb-1">
            Contact Information
          </label>
          <textarea
            id="contactInfo"
            name="contactInfo"
            rows="4"
            value={formState.contactInfo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter phone, email, or address..."
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutUsEditor;
