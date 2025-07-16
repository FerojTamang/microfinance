import React, { useState } from 'react';

function MainContent() {
  const [interestRates, setInterestRates] = useState([{ id: 1, rate: 5.5, term: 12 }]);
  const [emiCalculators, setEmiCalculators] = useState([{ id: 1, principal: 10000, rate: 5.5, tenure: 12 }]);
  const [news, setNews] = useState([{ id: 1, title: "New Loan Scheme", content: "Details...", date: "2025-07-10" }]);
  const [gallery, setGallery] = useState([{ id: 1, title: "Branch Opening", url: "https://via.placeholder.com/150", description: "Event" }]);
  const [formData, setFormData] = useState({ type: '', id: null, title: '', content: '', rate: '', term: '', principal: '', tenure: '', url: '', description: '' });
  const [editing, setEditing] = useState(false);

  const handleAddEdit = () => {
    if (formData.type === 'interest') {
      if (formData.rate && formData.term) {
        if (editing) {
          setInterestRates(interestRates.map(item => item.id === formData.id ? { ...formData, id: formData.id } : item));
        } else {
          setInterestRates([...interestRates, { ...formData, id: interestRates.length + 1 }]);
        }
      }
    } else if (formData.type === 'emi') {
      if (formData.principal && formData.rate && formData.tenure) {
        if (editing) {
          setEmiCalculators(emiCalculators.map(item => item.id === formData.id ? { ...formData, id: formData.id } : item));
        } else {
          setEmiCalculators([...emiCalculators, { ...formData, id: emiCalculators.length + 1 }]);
        }
      }
    } else if (formData.type === 'news') {
      if (formData.title && formData.content) {
        if (editing) {
          setNews(news.map(item => item.id === formData.id ? { ...formData, id: formData.id } : item));
        } else {
          setNews([...news, { ...formData, id: news.length + 1 }]);
        }
      }
    } else if (formData.type === 'gallery') {
      if (formData.url && formData.description) {
        if (editing) {
          setGallery(gallery.map(item => item.id === formData.id ? { ...formData, id: formData.id } : item));
        } else {
          setGallery([...gallery, { ...formData, id: gallery.length + 1 }]);
        }
      }
    }
    setFormData({ type: '', id: null, title: '', content: '', rate: '', term: '', principal: '', tenure: '', url: '', description: '' });
    setEditing(false);
  };

  const handleEdit = (item, type) => {
    setFormData({ ...item, type });
    setEditing(true);
  };

  const handleDelete = (id, type) => {
    if (type === 'interest') setInterestRates(interestRates.filter(item => item.id !== id));
    if (type === 'emi') setEmiCalculators(emiCalculators.filter(item => item.id !== id));
    if (type === 'news') setNews(news.filter(item => item.id !== id));
    if (type === 'gallery') setGallery(gallery.filter(item => item.id !== id));
  };

  return (
    <div className="main-content-inner">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>

      {/* Charts and Stats */}
      <div className="charts">
        <div className="chart-card">Revenue Generated $59,342.32 <canvas id="lineChart" width="400" height="200"></canvas></div>
        <div className="chart-card">Campaign <canvas id="pieChart" width="200" height="200"></canvas></div>
        <div className="chart-card">Sales Quantity <canvas id="barChart" width="300" height="200"></canvas></div>
        <div className="chart-card">Geography Based Traffic <canvas id="geoChart" width="300" height="200"></canvas></div>
        <div className="chart-card">Recent Transactions <ul><li>01e4d5a $43.95</li><li>0315d5aa $33.45</li></ul></div>
      </div>

      {/* CRUD Forms */}
      <div className="crud-section">
        <h2>Manage Content</h2>
        <select onChange={(e) => setFormData({ ...formData, type: e.target.value })} value={formData.type}>
          <option value="">Select Type</option>
          <option value="interest">Interest Rate</option>
          <option value="emi">EMI Calculator</option>
          <option value="news">News/Notice</option>
          <option value="gallery">Gallery</option>
        </select>
        {formData.type === 'interest' && (
          <>
            <input placeholder="Rate (%)" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: e.target.value })} />
            <input placeholder="Term (months)" value={formData.term} onChange={(e) => setFormData({ ...formData, term: e.target.value })} />
          </>
        )}
        {formData.type === 'emi' && (
          <>
            <input placeholder="Principal" value={formData.principal} onChange={(e) => setFormData({ ...formData, principal: e.target.value })} />
            <input placeholder="Rate (%)" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: e.target.value })} />
            <input placeholder="Tenure (months)" value={formData.tenure} onChange={(e) => setFormData({ ...formData, tenure: e.target.value })} />
          </>
        )}
        {formData.type === 'news' && (
          <>
            <input placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <textarea placeholder="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}></textarea>
          </>
        )}
        {formData.type === 'gallery' && (
          <>
            <input placeholder="Image URL" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
            <input placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </>
        )}
        <button onClick={handleAddEdit}>{editing ? 'Update' : 'Add'}</button>

        {/* Display Data */}
        {formData.type && (
          <div className="data-list">
            {formData.type === 'interest' && interestRates.map(item => (
              <div key={item.id}>
                <span>Rate: {item.rate}%, Term: {item.term} months</span>
                <button onClick={() => handleEdit(item, 'interest')}>Edit</button>
                <button onClick={() => handleDelete(item.id, 'interest')}>Delete</button>
              </div>
            ))}
            {formData.type === 'emi' && emiCalculators.map(item => (
              <div key={item.id}>
                <span>Principal: ${item.principal}, Rate: {item.rate}%, Tenure: {item.tenure} months</span>
                <button onClick={() => handleEdit(item, 'emi')}>Edit</button>
                <button onClick={() => handleDelete(item.id, 'emi')}>Delete</button>
              </div>
            ))}
            {formData.type === 'news' && news.map(item => (
              <div key={item.id}>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                <button onClick={() => handleEdit(item, 'news')}>Edit</button>
                <button onClick={() => handleDelete(item.id, 'news')}>Delete</button>
              </div>
            ))}
            {formData.type === 'gallery' && gallery.map(item => (
              <div key={item.id}>
                <img src={item.url} alt={item.title} style={{ width: '100px' }} />
                <p>{item.description}</p>
                <button onClick={() => handleEdit(item, 'gallery')}>Edit</button>
                <button onClick={() => handleDelete(item.id, 'gallery')}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainContent;