import React, { useState } from 'react';

const FAQEditor = ({ faqs, setFaqs }) => {
  // faqs example: [{ id: 1, question: '', answer: '' }, ...]
  const [faqList, setFaqList] = useState(faqs || []);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqList];
    updatedFaqs[index][field] = value;
    setFaqList(updatedFaqs);
  };

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFaqList([...faqList, { id: Date.now(), ...newFaq }]);
      setNewFaq({ question: '', answer: '' });
    } else {
      alert('Please enter both question and answer');
    }
  };

  const handleDeleteFaq = (id) => {
    setFaqList(faqList.filter(faq => faq.id !== id));
  };

  const handleSave = () => {
    setFaqs(faqList);
    alert('FAQs updated!');
  };

  return (
    <div className="p-4 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Edit Frequently Asked Questions</h2>
      
      {faqList.map((faq, index) => (
        <div key={faq.id} className="mb-4 border p-3 rounded bg-white shadow">
          <input
            type="text"
            value={faq.question}
            onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
            placeholder="Question"
            className="w-full mb-2 border rounded p-2"
          />
          <textarea
            value={faq.answer}
            onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
            rows="3"
            placeholder="Answer"
            className="w-full border rounded p-2"
          />
          <button
            onClick={() => handleDeleteFaq(faq.id)}
            className="mt-2 text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}

      <div className="mb-4 border p-3 rounded bg-gray-50">
        <input
          type="text"
          value={newFaq.question}
          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          placeholder="New question"
          className="w-full mb-2 border rounded p-2"
        />
        <textarea
          value={newFaq.answer}
          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          rows="3"
          placeholder="New answer"
          className="w-full border rounded p-2"
        />
        <button
          onClick={handleAddFaq}
          className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
        >
          Add FAQ
        </button>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save All FAQs
      </button>
    </div>
  );
};

export default FAQEditor;
