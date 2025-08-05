import React, { useState, useRef, useEffect } from 'react';

const EventNewsPopup = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    file: null,
    fileName: '',
    type: 'event',
  });
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('event');
  const fileInputRef = useRef(null);

  // Load from localStorage
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

  // Save to localStorage
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
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert('Title and description are required');
      return;
    }

    const existingEvent = events.find((e) => e.id === editingId);

    const newEvent = {
      id: editingId || Date.now(),
      title: form.title,
      description: form.description,
      file: form.file || existingEvent?.file || null,
      fileName: form.fileName || existingEvent?.fileName || '',
      type: form.type,
      date: new Date().toISOString().split('T')[0],
      published: editingId ? existingEvent?.published : false,
      createdAt: new Date().toISOString(),
    };

    if (editingId) {
      setEvents(events.map((ev) => (ev.id === editingId ? newEvent : ev)));
      setEditingId(null);
    } else {
      setEvents([newEvent, ...events]);
    }

    // Reset form
    setForm({ title: '', description: '', file: null, fileName: '', type: activeTab });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      file: event.file,
      fileName: event.fileName,
      type: event.type || 'event',
    });
    setEditingId(event.id);
    setActiveTab(event.type || 'event');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this item?')) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };

  const handlePublish = (id) => {
    if (window.confirm('Publish this item as popup?')) {
      setEvents(
        events.map((ev) =>
          ev.id === id ? { ...ev, published: true } : ev
        )
      );
      sessionStorage.removeItem('popup_shown');
      alert('Item published successfully.');
    }
  };

  const handleUnpublish = (id) => {
    if (window.confirm('Unpublish this item?')) {
      setEvents(
        events.map((ev) => (ev.id === id ? { ...ev, published: false } : ev))
      );
      alert('Item unpublished successfully.');
    }
  };

  const getFileType = (fileName) => {
    if (!fileName) return 'unknown';
    const ext = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
    if (ext === 'pdf') return 'pdf';
    return 'other';
  };

  const renderFilePreview = (file, fileName) => {
    if (!file) return null;
    const type = getFileType(fileName);
    if (type === 'image') {
      return (
        <img
          src={file}
          alt="Preview"
          className="mt-2 max-w-xs max-h-48 object-cover rounded border"
        />
      );
    }
    if (type === 'pdf') {
      return (
        <iframe
          src={file}
          title="PDF Preview"
          className="mt-2 w-full h-48 border rounded"
        />
      );
    }
    return null;
  };

  const filteredEvents = events.filter((ev) => ev.type === activeTab);
  const publishedEvent = events.find((ev) => ev.published);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage Events & News</h2>

      {publishedEvent && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>
            <strong>Currently Published:</strong> {publishedEvent.title} (
            {publishedEvent.type})
          </span>
          <button
            onClick={() => handleUnpublish(publishedEvent.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Unpublish
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        {['event', 'news'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setForm({ ...form, type: tab });
              setEditingId(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className={`px-6 py-3 font-semibold ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab === 'event' ? '📅 Events' : '📰 News'}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? `Edit ${activeTab}` : `Add New ${activeTab}`}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder={`Enter ${activeTab} title`}
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder={`Describe the ${activeTab}`}
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload File (Image or PDF)
            </label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
              >
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.png,.jpeg,.gif,.webp"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <span className="text-sm text-gray-500">
                {form.fileName || 'No file chosen'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Max 5MB. Supported: JPG, PNG, PDF, etc.
            </p>

            {renderFilePreview(form.file, form.fileName)}
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold"
            >
              {editingId ? `Update ${activeTab}` : `Save ${activeTab}`}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: '',
                    description: '',
                    file: null,
                    fileName: '',
                    type: activeTab,
                  });
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 capitalize">
          {activeTab}s ({filteredEvents.length})
        </h3>

        {filteredEvents.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500">
            No {activeTab}s found.
          </div>
        ) : (
          filteredEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.type === 'event'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {item.type}
                    </span>
                    {item.published && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        Published
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{item.description}</p>
                  {item.file && (
                    <div className="mb-2">
                      {getFileType(item.fileName) === 'image' ? (
                        <img
                          src={item.file}
                          alt="Attachment"
                          className="max-w-sm max-h-32 object-cover rounded border"
                        />
                      ) : (
                        <a
                          href={item.file}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 text-sm"
                        >
                          📎 {item.fileName}
                        </a>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Created: {item.date}</p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() =>
                      item.published ? handleUnpublish(item.id) : handlePublish(item.id)
                    }
                    className={`${
                      item.published ? 'bg-yellow-600' : 'bg-green-600'
                    } text-white px-4 py-2 rounded-md text-sm hover:opacity-90`}
                  >
                    {item.published ? '📤 Unpublish' : '🚀 Publish'}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventNewsPopup;