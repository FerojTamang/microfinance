import React from 'react';
import { CheckCircle, X, Eye } from 'lucide-react';

const MembershipForms = ({ membershipForms, updateMembershipStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium text-gray-900">Membership Applications</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {membershipForms.map((form) => (
              <tr key={form.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{form.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{form.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    inline-flex px-2 py-1 text-xs font-semibold rounded-full
                    ${form.status === 'approved' ? 'bg-green-100 text-green-800' :
                      form.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}
                  `}>
                    {form.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {form.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateMembershipStatus(form.id, 'approved')}
                        className="text-green-600 hover:text-green-900 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => updateMembershipStatus(form.id, 'rejected')}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <button className="text-blue-600 hover:text-blue-900 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipForms;