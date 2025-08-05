import React, { useState } from 'react';

const ContactEditor = ({ contacts, setContacts }) => {
  const [newContact, setNewContact] = useState({ title: '', name: '', email: '', phone: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!newContact.title || !newContact.name || !newContact.email || !newContact.phone) {
      alert('All fields are required.');
      return;
    }
    if (editIndex !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = { ...newContact };
      setContacts(updatedContacts);
      setEditIndex(null);
    } else {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
    }
    setNewContact({ title: '', name: '', email: '', phone: '' });
  };

  const handleEdit = (index) => {
    setNewContact(contacts[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Manage Contacts</h2>
      <div className="mb-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title (e.g., Chairperson)"
            value={newContact.title}
            onChange={(e) => setNewContact({ ...newContact, title: e.target.value })}
            className="w-full p-2 border border-green-300 rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="w-full p-2 border border-green-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            className="w-full p-2 border border-green-300 rounded"
          />
          <input
            type="tel"
            placeholder="Phone (e.g., +977-1-1234567)"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            className="w-full p-2 border border-green-300 rounded"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editIndex !== null ? 'Update Contact' : 'Add Contact'}
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Contact List</h3>
        {contacts.map((contact, index) => (
          <div key={index} className="mb-4 p-4 border border-green-200 rounded-lg flex justify-between">
            <div>
              <h4 className="text-lg font-medium">{contact.title}</h4>
              <p>Name: {contact.name}</p>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(index)} className="text-blue-600 hover:text-blue-800">
                Edit
              </button>
              <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactEditor;