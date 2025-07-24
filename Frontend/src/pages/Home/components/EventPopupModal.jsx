import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EventPopupModal = () => {
  const [show, setShow] = useState(false);
  const [latestEvent, setLatestEvent] = useState(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('popup_shown');
    if (!hasSeen) {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        try {
          const events = JSON.parse(storedEvents);
          if (events.length > 0) {
            setLatestEvent(events[0]);
            setShow(true);
            sessionStorage.setItem('popup_shown', 'true');
          }
        } catch (error) {
          console.error('Error parsing events from localStorage:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShow(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!show || !latestEvent) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-[650px] max-h-[90vh] p-4 overflow-auto pointer-events-auto"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-3 text-gray-700 hover:text-red-600 text-2xl font-bold z-50"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">{latestEvent.title}</h2>
            <p className="text-gray-700">{latestEvent.description}</p>
            <p className="text-sm text-gray-500 mt-2 mb-4">📅 {latestEvent.date}</p>
            {latestEvent.file && (
              <>
                {latestEvent.file.startsWith('data:application/pdf') ? (
                  <iframe
                    src={latestEvent.file}
                    title="Event PDF"
                    className="w-full h-[450px] border rounded-md"
                  />
                ) : (
                  <img
                    src={latestEvent.file}
                    alt="Event"
                    className="w-full max-h-[450px] object-contain rounded-md"
                  />
                )}
                <a
                  href={latestEvent.file}
                  download={latestEvent.fileName || `event-${latestEvent.date}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block"
                >
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200">
                    Download
                  </button>
                </a>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventPopupModal 