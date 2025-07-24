import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Reports() {
  // Data for Financial Overview
  const financialData = [
    { name: "Total Investment", value: 30000000 }, // 3 crore
    { name: "Total Loan/Investment", value: 20000000 }, // 2 crore
    { name: "Liquid Money", value: 10000000 }, // 1 crore
  ];

  // Data for Risk Assessment
  const riskData = [
    { name: "Low Risk", value: 40 }, // 40%
    { name: "Moderate Risk", value: 35 }, // 35%
    { name: "High Risk", value: 25 }, // 25%
  ];

  // Data for Future Targets
  const targetData = [
    { name: "Current (3 Cr)", value: 30000000 },
    { name: "Target (10 Cr)", value: 100000000 },
  ];

  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#8BC34A", "#00BCD4"];

  // Custom Tooltip for Financial Data
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <p className="label" style={{ margin: 0, fontWeight: 'bold' }}>{`${payload[0].name} : ₹${(payload[0].value / 10000000).toFixed(1)} crore`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Risk Data
  const RiskTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <p className="label" style={{ margin: 0, fontWeight: 'bold' }}>{`${payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate total risk to determine status
  const totalRisk = riskData.reduce((sum, entry) => sum + entry.value, 0);
  let riskStatus = "Neutral";
  let statusColor = "#2196F3";
  if (totalRisk > 50) {
    riskStatus = "Very Risk";
    statusColor = "#F44336";
  } else if (totalRisk < 20) {
    riskStatus = "Gain";
    statusColor = "#4CAF50";
  }

  return (
    <section>
      <style>
        {`
          section {
            background-color: #ffffff;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 40px;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }
          h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #2c5282;
            margin-bottom: 24px;
            text-align: center;
            text-transform: uppercase;
          }
          .chart-container {
            height: 400px;
            margin-bottom: 40px;
            background-color: #f9f9f9;
            border-radius: 10px;
            padding: 20px;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
            position: relative;
          }
          .risk-status {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: ${statusColor};
            color: white;
            padding: 8px 16px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 1.1rem;
          }
          .legend-item {
            display: flex;
            align-items: center;
            margin: 5px 0;
          }
          .legend-color {
            width: 12px;
            height: 12px;
            margin-right: 8px;
            border-radius: 50%;
          }
        `}
      </style>

      <h2>Financial Overview</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={financialData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
              label={({ name, value }) => `${name}: ₹${(value / 10000000).toFixed(1)} cr`}
            >
              {financialData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, entry) => (
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: COLORS[entry.payload.index % COLORS.length] }}></span>
                  {value}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h2>Risk Assessment</h2>
      <div className="chart-container">
        <div className="risk-status">{riskStatus}</div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {riskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<RiskTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, entry) => (
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: COLORS[entry.payload.index % COLORS.length] }}></span>
                  {value}
                </div>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h2>Future Targets</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={targetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#2c5282" fontSize={14} />
            <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)} cr`} stroke="#2c5282" fontSize={12} />
            <Tooltip formatter={(value) => `₹${(value / 10000000).toFixed(1)} cr`} />
            <Bar dataKey="value" fill="#2196F3">
              {targetData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default Reports;