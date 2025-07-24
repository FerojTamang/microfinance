import React from 'react';
import { X } from 'lucide-react';

const AccountSettings = ({ showAccountSettings, setShowAccountSettings, accountSettings, setAccountSettings, handleAccountSettingsUpdate }) => {
  if (!showAccountSettings) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
          <button
            onClick={() => setShowAccountSettings(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleAccountSettingsUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Username (optional)</label>
            <input
              type="text"
              value={accountSettings.newUsername}
              onChange={(e) => setAccountSettings({...accountSettings, newUsername: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              value={accountSettings.currentPassword}
              onChange={(e) => setAccountSettings({...accountSettings, currentPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password (optional)</label>
            <input
              type="password"
              value={accountSettings.newPassword}
              onChange={(e) => setAccountSettings({...accountSettings, newPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {accountSettings.newPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={accountSettings.confirmPassword}
                onChange={(e) => setAccountSettings({...accountSettings, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          )}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Update Settings
            </button>
            <button
              type="button"
              onClick={() => setShowAccountSettings(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;