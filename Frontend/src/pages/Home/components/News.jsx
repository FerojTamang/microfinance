import React, { useState, useEffect } from 'react';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);

  // Function to truncate description to ~10 words
  const truncateDescription = (description) => {
    if (!description) return '';
    const words = description.split(' ');
    return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
  };

  // Load published news from localStorage
  const loadNews = () => {
    try {
      const stored = localStorage.getItem('events');
      if (stored) {
        const events = JSON.parse(stored);
        // Filter for published news items, sort by createdAt (newest first), take latest 6
        const publishedNews = events
          .filter((item) => item.type === 'news' && item.published)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setNewsItems(publishedNews);
      }
    } catch (error) {
      console.error('Error loading news from localStorage:', error);
    }
  };

  // Initial load and listen for storage changes
  useEffect(() => {
    // Load news on mount
    loadNews();

    // Listen for localStorage changes (e.g., when publishing/unpublishing)
    const handleStorageChange = (e) => {
      if (e.key === 'events') {
        loadNews();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Calculate animation duration based on number of news items
  const baseDuration = 20; // Base duration in seconds for 1 item
  const durationPerItem = 5; // Additional seconds per extra item
  const animationDuration = newsItems.length > 0
    ? baseDuration + (newsItems.length - 1) * durationPerItem
    : baseDuration; // Minimum duration of 20s if no items

  return (
    <div
      style={{
        backgroundColor: '#fff3cd',
        padding: '0.75rem 2rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontWeight: '600',
        fontSize: '1rem',
        color: '#856404',
        borderTop: '1px solid #ffeeba',
        borderBottom: '1px solid #ffeeba',
        userSelect: 'none',
      }}
    >
      <p
        style={{
          display: 'inline-block',
          animation: newsItems.length > 0 ? `news-scroll ${animationDuration}s linear infinite` : 'none',
        }}
      >
        {newsItems.length === 0 ? (
          'No published news available'
        ) : (
          newsItems.map((item, index) => (
            <span key={item.id}>
              {item.title} - {truncateDescription(item.description)}
              {index < newsItems.length - 1 ? ' \u00A0\u00A0|\u00A0\u00A0 ' : ''}
            </span>
          ))
        )}
      </p>

      <style>{`
        @keyframes news-scroll {
          0% { transform: translateX(100%) }
          100% { transform: translateX(-100%) }
        }
      `}</style>
    </div>
  );
};

export default News;