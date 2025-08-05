import React from 'react';
import { HelpCircle } from 'lucide-react';

class FAQErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-red-600">Error rendering FAQs. Please try again.</p>;
    }
    return this.props.children;
  }
}

const FAQ = ({ faqs }) => {
  console.log('FAQs received in FAQ.jsx:', faqs); // Debug

  // Convert non-string answers to strings or skip them
  const safeFaqs = faqs?.map((faq) => ({
    ...faq,
    answer: typeof faq.answer === 'string' ? faq.answer : JSON.stringify(faq.answer),
  })) || [];

  return (
    <FAQErrorBoundary>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-green-200">
        <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
          <HelpCircle className="mr-3 h-6 w-6 text-green-600" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {safeFaqs && safeFaqs.length > 0 ? (
            safeFaqs.map((faq) => (
              <div key={faq.id} className="border-b border-green-200 pb-4">
                <h3 className="text-lg font-semibold text-green-700 mb-2">{faq.question}</h3>
                <div className="text-gray-600 text-sm whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No FAQs available at the moment.</p>
          )}
        </div>
        <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-3">Have More Questions?</h3>
          <p className="mb-4">Contact our support team for personalized assistance.</p>
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </FAQErrorBoundary>
  );
};

export default FAQ;