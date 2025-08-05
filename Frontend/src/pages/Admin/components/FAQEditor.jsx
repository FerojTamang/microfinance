import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Save } from 'lucide-react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3>Something went wrong in FAQEditor.</h3>
          <p>Error: {this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const FAQEditor = ({ faqs: rawFaqs, setFaqs }) => {
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editingId, setEditingId] = useState(null);

  // Filter and validate faqs to remove invalid items
  const faqs = Array.isArray(rawFaqs)
    ? rawFaqs.filter(faq => 
        faq && typeof faq === 'object' && 
        'id' in faq && 
        typeof faq.question === 'string' && 
        typeof faq.answer === 'string'
      )
    : [];

  // Debug: Log each faq item during render
  useEffect(() => {
    faqs.forEach((faq, index) => {
      console.log(`FAQ item ${index}:`, faq);
    });
    if (faqs.length !== rawFaqs.length) {
      console.warn('Filtered out invalid FAQ items. Updating faqs state.');
      setFaqs(faqs); // Update state to remove invalid items
    }
  }, [faqs, rawFaqs, setFaqs]);

  console.log('FAQEditor rendering with validated FAQs:', faqs);

  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      alert('Both question and answer are required.');
      return;
    }

    const newId = Date.now();
    const updatedFaqs = [...faqs, { id: newId, question: newFaq.question, answer: newFaq.answer }];
    setFaqs(updatedFaqs);
    setNewFaq({ question: '', answer: '' });
    console.log('Added new FAQ:', { id: newId, ...newFaq });
  };

  const handleEditFaq = (faq) => {
    setEditingId(faq.id);
    setNewFaq({ question: faq.question, answer: faq.answer });
    console.log('Editing FAQ:', faq);
  };

  const handleUpdateFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      alert('Both question and answer are required.');
      return;
    }

    const updatedFaqs = faqs.map((faq) =>
      faq.id === editingId ? { ...faq, question: newFaq.question, answer: newFaq.answer } : faq
    );
    setFaqs(updatedFaqs);
    setEditingId(null);
    setNewFaq({ question: '', answer: '' });
    console.log('Updated FAQ:', { id: editingId, ...newFaq });
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      const updatedFaqs = faqs.filter((faq) => faq.id !== id);
      setFaqs(updatedFaqs);
      console.log('Deleted FAQ with id:', id);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('faqs', JSON.stringify(faqs));
      alert('FAQs saved successfully!');
      console.log('Saved FAQs to localStorage:', faqs);
    } catch (error) {
      console.error('Error saving FAQs to localStorage:', error);
      alert('Error saving FAQs. Please try again.');
    }
  };

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-green-200">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Manage FAQs</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            {editingId ? 'Edit FAQ' : 'Add New FAQ'}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Question"
              value={newFaq.question}
              onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <textarea
              placeholder="Answer"
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              rows={4}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={editingId ? handleUpdateFaq : handleAddFaq}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              {editingId ? 'Update FAQ' : 'Add FAQ'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq.id} className="border-b border-green-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700">{faq.question}</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{faq.answer}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditFaq(faq)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No FAQs available. Please add a new FAQ.</p>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Save All FAQs
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FAQEditor;