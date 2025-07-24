import React, { useState, useRef } from 'react';
import { Edit, Trash2, FileText, Upload } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState([
    { id: 1, title: 'New Loan Scheme Launched', content: 'We have launched a new micro-loan scheme for small businesses with competitive interest rates.', file: null, date: '2024-07-20' },
    { id: 2, title: 'Annual Meeting Notice', content: 'Annual general meeting will be held on August 15th at 2 PM in the main branch.', file: null, date: '2024-07-19' },
    { id: 3, title: 'Holiday Notice', content: 'All branches will remain closed on August 1st due to national holiday.', file: null, date: '2024-07-18' }
  ]);
  
  const [newsForm, setNewsForm] = useState({ title: '', content: '', file: null });
  const [editingNews, setEditingNews] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewsForm({...newsForm, file: file});
  };

  const resetForm = () => {
    setEditingNews(null);
    setNewsForm({ title: '', content: '', file: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Add/Edit News Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          {editingNews ? 'Edit News' : 'Add News'}
        </h3>
        <form onSubmit={handleNewsSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newsForm.title}
              onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter news title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={newsForm.content}
              onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter news content"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File (Optional)</label>
            <div className="flex items-center space-x-3">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {newsForm.file && (
              <p className="text-sm text-green-600 mt-2">File selected: {newsForm.file.name}</p>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {editingNews ? 'Update News' : 'Publish News'}
            </button>
            {editingNews && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Published News</h3>
          <p className="text-sm text-gray-600 mt-1">Manage all your news and announcements</p>
        </div>
        <div className="divide-y divide-gray-200">
          {news.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No news articles published yet.</p>
              <p className="text-sm">Create your first news article above.</p>
            </div>
          ) : (
            news.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-600 mb-3 leading-relaxed">{item.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Published on {new Date(item.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      {item.file && (
                        <span className="text-blue-600 flex items-center">
                          <Upload className="h-4 w-4 mr-1" />
                          Attachment: {item.file.name || 'File attached'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-6">
                    <button
                      onClick={() => handleNewsEdit(item)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit news"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleNewsDelete(item.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete news"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default News;