import React from 'react';
import {
  DollarSign,
  CreditCard,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';

const Dashboard = ({ dashboardData }) => {
  const statsCards = [
    {
      title: 'Total Amount',
      value: `₹${dashboardData.totalAmount.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Loans',
      value: dashboardData.totalLoans,
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      title: 'Total Members',
      value: dashboardData.totalMembers,
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Daily Transactions',
      value: dashboardData.dailyTransactions,
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  const riskData = [
    {
      level: 'Low Risk',
      percentage: dashboardData.riskAnalysis.low,
      color: 'bg-green-50 text-green-600',
      textColor: 'text-green-700'
    },
    {
      level: 'Medium Risk',
      percentage: dashboardData.riskAnalysis.medium,
      color: 'bg-yellow-50 text-yellow-600',
      textColor: 'text-yellow-700'
    },
    {
      level: 'High Risk',
      percentage: dashboardData.riskAnalysis.high,
      color: 'bg-red-50 text-red-600',
      textColor: 'text-red-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <Icon className={`h-8 w-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk Analysis Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Risk Analysis Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {riskData.map((risk, index) => (
            <div key={index} className={`text-center p-6 rounded-lg ${risk.color.split(' ')[0]}`}>
              <div className={`text-3xl font-bold mb-2 ${risk.color.split(' ')[1]}`}>
                {risk.percentage}%
              </div>
              <div className={`text-sm font-medium ${risk.textColor}`}>
                {risk.level}
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      risk.level === 'Low Risk' ? 'bg-green-500' :
                      risk.level === 'Medium Risk' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${risk.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-600">5 new membership applications</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-gray-600">12 loan applications processed</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              <span className="text-gray-600">₹1,25,000 disbursed today</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-gray-600">3 news articles published</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Approval Rate</span>
              <span className="font-semibold text-green-600">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Loan Amount</span>
              <span className="font-semibold text-blue-600">₹45,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recovery Rate</span>
              <span className="font-semibold text-green-600">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Borrowers</span>
              <span className="font-semibold text-purple-600">128</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
