import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [contacts, setContacts] = useState(() => {
    const stored = localStorage.getItem('contacts');
    return stored
      ? JSON.parse(stored)
      : [
          { title: 'Chairperson', name: 'Mr. Feroj Tamang', email: 'chairperson@microfinance.org', phone: '+977-1-1234567' },
          { title: 'Member', name: 'Ms. Amisha Lama', email: 'member@microfinance.org', phone: '+977-1-7654321' },
          { title: 'Secretary', name: 'Mr. Adarsha Lama', email: 'secretary@microfinance.org', phone: '+977-1-9876543' },
        ];
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-700">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-600">Get in touch with Microfinance Nepal</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Location</h2>
            <p className="text-gray-600 mb-4">123 Microfinance Lane, Kathmandu, Nepal</p>
            <div className="map-container">
              <iframe
                title="Microfinance Nepal Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.123456!2d85.3200!3d27.7100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb0924f8b8e7c1%3A0x1234567890abcdef!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1691087600!5m2!1sen!2snp"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </section>
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Contact Persons</h2>
            {contacts.map((contact, index) => (
              <div key={index} className="mb-6 p-4 border border-green-200 rounded-lg">
                <h3 className="text-xl font-medium text-green-600">{contact.title}</h3>
                <p className="text-gray-700">Name: {contact.name}</p>
                <p className="text-gray-700">Email: {contact.email}</p>
                <p className="text-gray-700">Phone: {contact.phone}</p>
              </div>
            ))}
          </section>
          <section className="bg-white p-6 rounded-lg shadow-lg lg:col-span-2">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Follow Us</h2>
            <div className="flex space-x-6 justify-center">
              <a href="https://facebook.com/microfinancenepal" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                Facebook
              </a>
              <a href="https://twitter.com/microfinancenp" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                Twitter
              </a>
              <a href="https://instagram.com/microfinancenepal" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                Instagram
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;