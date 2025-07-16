import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { fakeData } from './data';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

function Admin() {
  const Sidebar = () => (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/manage-team">Manage Team</Link></li>
        <li><Link to="/contacts-information">Contacts Information</Link></li>
        <li><Link to="/invoices-balances">Invoices Balances</Link></li>
      </ul>
      <h3>Pages</h3>
      <ul>
        <li><Link to="/profile-form">Profile Form</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/faq-page">FAQ Page</Link></li>
      </ul>
      <h3>Charts</h3>
      <ul>
        <li><Link to="/bar-chart">Bar Chart</Link></li>
        <li><Link to="/pie-chart">Pie Chart</Link></li>
        <li><Link to="/line-chart">Line Chart</Link></li>
        <li><Link to="/geography-chart">Geography Chart</Link></li>
      </ul>
    </div>
  );

  const Header = () => (
    <div className="header">
      <div className="user-info">
        <img
          src="https://via.placeholder.com/50?text=Feroj+Tamang"
          alt="Feroj Tamang"
          className="user-avatar"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div>
          <h3>Feroj Tamang</h3>
          <p>VP Fancy Admin</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat-card">{fakeData.stats.emailSent} Email Sent <span>+14%</span></div>
        <div className="stat-card">{fakeData.stats.salesObtained} Sales Obtained <span>+21%</span></div>
        <div className="stat-card">{fakeData.stats.newClients} New Clients <span>+5%</span></div>
        <div className="stat-card">${fakeData.stats.trafficReceived} Traffic Received <span>+3%</span></div>
      </div>
      <button className="download-btn">Download Reports</button>
    </div>
  );

  const MainContent = () => {
    const [interestRates, setInterestRates] = useState(fakeData.interestRates);
    const [emiCalculators, setEmiCalculators] = useState(fakeData.emiCalculators);
    const [news, setNews] = useState(fakeData.news);
    const [gallery, setGallery] = useState(fakeData.gallery);
    const [formData, setFormData] = useState({ type: '', id: null, title: '', content: '', rate: '', term: '', principal: '', tenure: '', url: '', description: '' });
    const [editing, setEditing] = useState(false);

    const { revenue, campaign, salesQuantity, geographyTraffic, transactions, stats } = fakeData;

    const handleAddEdit = () => {
      if (formData.type === 'interest' && formData.rate && formData.term) {
        if (editing) {
          setInterestRates(interestRates.map(item => item.id === formData.id ? { ...formData, id: formData.id } : item));
        } else {
          setInterestRates([...interestRates, { ...formData, id: interestRates.length + 1 }]);
        }
      } else if (formData.type === 'emi' && formData.principal && formData.rate && formData.tenure) {
        if (editing) {
          setEmiCalculators(emiCalculators.map(item => item.id === formData.id ? { ...formData, id: formData.id } : item));
        } else {
          setEmiCalculators([...emiCalculators, { ...formData, id: emiCalculators.length + 1 }]);
        }
      } else if (formData.type === 'news' && formData.title && formData.content) {
        if (editing) {
          setNews(news.map(item => item.id === formData.id ? { ...formData, id: formData.id } : item));
        } else {
          setNews([...news, { ...formData, id: news.length + 1 }]);
        }
      } else if (formData.type === 'gallery' && formData.url && formData.description) {
        if (editing) {
          setGallery(gallery.map(item => item.id === formData.id ? { ...formData, id: formData.id } : item));
        } else {
          setGallery([...gallery, { ...formData, id: gallery.length + 1 }]);
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

        <div className="dashboard">
          <div className="stats-row">
            <div className="stat-card">{stats.emailSent} Email Sent <span>+14%</span></div>
            <div className="stat-card">{stats.salesObtained} Sales Obtained <span>+21%</span></div>
            <div className="stat-card">{stats.newClients} New Clients <span>+5%</span></div>
            <div className="stat-card">${stats.trafficReceived} Traffic Received <span>+3%</span></div>
          </div>
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Revenue</h3>
              <Line data={{
                labels: revenue.labels,
                datasets: [{
                  label: 'Revenue',
                  data: revenue.data,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true,
                }],
              }} options={{ responsive: true, maintainAspectRatio: false, height: 200 }} />
            </div>
            <div className="chart-card">
              <h3>Campaign</h3>
              <Pie data={{
                labels: campaign.labels,
                datasets: [{
                  data: campaign.data,
                  backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                  borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                }],
              }} options={{ responsive: true, maintainAspectRatio: false, height: 200 }} />
            </div>
            <div className="chart-card">
              <h3>Sales Quantity</h3>
              <Bar data={{
                labels: salesQuantity.labels,
                datasets: [{
                  label: 'Sales',
                  data: salesQuantity.data,
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  borderColor: 'rgba(153, 102, 255, 1)',
                  borderWidth: 1,
                }],
              }} options={{ responsive: true, maintainAspectRatio: false, height: 200 }} />
            </div>
            <div className="chart-card">
              <h3>Geography Traffic</h3>
              <Pie data={{
                labels: geographyTraffic.labels,
                datasets: [{
                  data: geographyTraffic.data,
                  backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                  borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
                  borderWidth: 1,
                }],
              }} options={{ responsive: true, maintainAspectRatio: false, height: 200 }} />
            </div>
            <div className="chart-card">
              <h3>Recent Transactions</h3>
              <ul>
                {transactions.map(t => <li key={t.id}>{t.id} - {t.date} - ${t.amount}</li>)}
              </ul>
            </div>
          </div>
        </div>

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

          {formData.type && (
            <div className="data-list">
              {formData.type === 'interest' && interestRates.map(item => (
                <div key={item.id} className="data-item">
                  <span>Rate: {item.rate}%, Term: {item.term} months</span>
                  <button onClick={() => handleEdit(item, 'interest')}>Edit</button>
                  <button onClick={() => handleDelete(item.id, 'interest')}>Delete</button>
                </div>
              ))}
              {formData.type === 'emi' && emiCalculators.map(item => (
                <div key={item.id} className="data-item">
                  <span>Principal: ${item.principal}, Rate: {item.rate}%, Tenure: {item.tenure} months</span>
                  <button onClick={() => handleEdit(item, 'emi')}>Edit</button>
                  <button onClick={() => handleDelete(item.id, 'emi')}>Delete</button>
                </div>
              ))}
              {formData.type === 'news' && news.map(item => (
                <div key={item.id} className="data-item">
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                  <button onClick={() => handleEdit(item, 'news')}>Edit</button>
                  <button onClick={() => handleDelete(item.id, 'news')}>Delete</button>
                </div>
              ))}
              {formData.type === 'gallery' && gallery.map(item => (
                <div key={item.id} className="data-item">
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
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

export default Admin;