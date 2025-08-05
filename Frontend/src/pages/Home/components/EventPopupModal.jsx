import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EventPopupModal = () => {
  const [show, setShow] = useState(false);
  const [publishedItem, setPublishedItem] = useState(null);

  useEffect(() => {
    // Check if popup was already shown in this session
    const hasSeen = sessionStorage.getItem('popup_shown');
    
    // Get events from localStorage
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      try {
        const events = JSON.parse(storedEvents);
        // Find the published event/news
        const published = events.find(event => event.published === true);
        
        if (published && !hasSeen) {
          setPublishedItem(published);
          setShow(true);
          // Mark as shown for this session
          sessionStorage.setItem('popup_shown', 'true');
        }
      } catch (error) {
        console.error('Error parsing events from localStorage:', error);
      }
    }
  }, []);

  // Listen for storage changes (when admin publishes new content)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        try {
          const events = JSON.parse(storedEvents);
          const published = events.find(event => event.published === true);
          
          // If there's a new published item and popup wasn't shown yet
          if (published && (!publishedItem || published.id !== publishedItem.id)) {
            const hasSeen = sessionStorage.getItem('popup_shown');
            if (!hasSeen) {
              setPublishedItem(published);
              setShow(true);
              sessionStorage.setItem('popup_shown', 'true');
            }
          }
          // If no published items, hide popup
          else if (!published && show) {
            setShow(false);
            setPublishedItem(null);
          }
        } catch (error) {
          console.error('Error parsing events from localStorage:', error);
        }
      }
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for changes (in case of same-tab updates)
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [publishedItem, show]);

  // Handle escape key to close popup
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShow(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Get file type for proper display
  const getFileType = (fileName) => {
    if (!fileName) return 'unknown';
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
    if (extension === 'pdf') return 'pdf';
    return 'other';
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (!show || !publishedItem) return null;

  const fileType = getFileType(publishedItem.fileName);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={(e) => {
            // Close if clicking outside the modal
            if (e.target === e.currentTarget) {
              setShow(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-[700px] max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close popup"
              >
                ×
              </button>
              
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">
                  {publishedItem.type === 'event' ? '📅' : '📰'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  publishedItem.type === 'event' 
                    ? 'bg-blue-500/20 text-blue-100' 
                    : 'bg-green-500/20 text-green-100'
                }`}>
                  {publishedItem.type === 'event' ? 'Event' : 'News'}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold leading-tight pr-8">
                {publishedItem.title}
              </h2>
              
              <p className="text-blue-100 text-sm mt-2">
                📅 {formatDate(publishedItem.date)}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="prose max-w-none">
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {publishedItem.description}
                </p>
              </div>

              {/* File Display */}
              {publishedItem.file && (
                <div className="mt-6">
                  {fileType === 'image' ? (
                    <div className="text-center">
                      <img
                        src={publishedItem.file}
                        alt={publishedItem.title}
                        className="w-full max-h-[400px] object-contain rounded-lg shadow-md mx-auto"
                        loading="lazy"
                      />
                    </div>
                  ) : fileType === 'pdf' ? (
                    <div className="border rounded-lg overflow-hidden">
                      <iframe
                        src={publishedItem.file}
                        title={`${publishedItem.title} PDF`}
                        className="w-full h-[400px]"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-600 mb-2">📎 Attachment available</p>
                      <p className="text-sm text-gray-500">{publishedItem.fileName}</p>
                    </div>
                  )}

                  {/* Download Button */}
                  <div className="mt-4 text-center">
                    <a
                      href={publishedItem.file}
                      download={publishedItem.fileName || `${publishedItem.type}-${publishedItem.date}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
                    >
                      <span>📥</span>
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Published on {formatDate(publishedItem.date)}
                </p>
                <button
                  onClick={() => setShow(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventPopupModal;