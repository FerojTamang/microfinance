import React, { useState, useRef, useEffect } from 'react';

const EventNewsPopup = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', file: null, fileName: '' });
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('events');
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing events from localStorage:', error);
      }
    }
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, file: reader.result, fileName: file.name });
      };
      reader.onerror = () => {
        alert('Error reading file');
      };
      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, file: null, fileName: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert('Title and description are required');
      return;
    }
    const newEvent = {
      id: editingId || Date.now(),
      title: form.title,
      description: form.description,
      file: form.file, // Base64 string or null
      fileName: form.fileName, // Store original file name for display
      date: new Date().toISOString().split('T')[0]
    };

    if (editingId) {
      setEvents(events.map(ev => ev.id === editingId ? newEvent : ev));
      setEditingId(null);
    } else {
      setEvents([newEvent, ...events]);
    }

    setForm({ title: '', description: '', file: null, fileName: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      file: null, // Reset file input for editing
      fileName: ''
    });
    setEditingId(event.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this event?')) {
      setEvents(events.filter(ev => ev.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Events / Popups</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.jpg,.png,.jpeg"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <span className="text-sm text-gray-500">
            {form.fileName || 'No file chosen'}
          </span>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          {editingId ? 'Update Event' : 'Add Event'}
        </button>
      </form>
      <ul className="mt-6 space-y-4">
        {events.map(ev => (
          <li key={ev.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{ev.title}</h3>
                <p className="text-sm text-gray-700">{ev.description}</p>
                {ev.file && (
                  <a
                    href={ev.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm underline"
                  >
                    View File ({ev.fileName || 'File'})
                  </a>
                )}
                <p className="text-xs text-gray-500 mt-1">Date: {ev.date}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(ev)} className="text-blue-500 text-sm hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(ev.id)} className="text-red-500 text-sm hover:underline">
                  Delete
                </button>
              </div>

              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventNewsPopup;
