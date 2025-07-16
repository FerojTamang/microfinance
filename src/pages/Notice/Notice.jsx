import React from 'react';
import './Notice.css';

const Notice = () => {
  const notices = [
    {
      id: 1,
      title: 'Repayment Deadline Extension for Flood-Affected Areas',
      date: 'July 16, 2025, 02:04 PM +0545',
      content: 'Due to recent floods, the repayment deadline is extended to July 31, 2025.'
    },
    {
      id: 2,
      title: 'Updated Interest Rates Effective August 1, 2025',
      date: 'July 15, 2025, 10:00 AM +0545',
      content: 'New interest rates will apply as per RBI guidelines starting next month.'
    },
    {
      id: 3,
      title: 'New Mobile Banking Feature Launched',
      date: 'July 14, 2025, 09:30 AM +0545',
      content: 'Apply for loans directly via our mobile app. Download now!'
    }
  ];

  return (
    <section className="notice-section">
      <h2>News & Notices</h2>
      <div className="notice-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <h3>{notice.title}</h3>
            <p className="notice-date">{notice.date}</p>
            <p>{notice.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notice;