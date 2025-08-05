import React, { useState } from 'react';
import { Eye, Edit, X, Save, Download } from 'lucide-react';

// Placeholder image Data URL (1x1 transparent PNG for testing)
const PLACEHOLDER_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNgAAIAAAUAAbF5P4oAAAAASUVORK5CYII=';

const MembershipForms = ({ membershipForms, updateMembershipStatus, updateMembershipForm }) => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showFileModal, setShowFileModal] = useState(false);

  // Generate file URL for citizenship document
 const getFileUrl = (form) => {
  if (!form || !form.citizenshipFile) return null;
  if (form.citizenshipFileDataUrl) return form.citizenshipFileDataUrl;
  return `/Uploads/membership/${form.citizenshipFile}`;
};

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!editFormData.name) newErrors.name = 'Name is required';
    if (!editFormData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!editFormData.phone || !/^\d{10}$/.test(editFormData.phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }
    if (!editFormData.citizenshipNumber) newErrors.citizenshipNumber = 'Citizenship number is required';
    if (!editFormData.address) newErrors.address = 'Address is required';
    if (!editFormData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!editFormData.monthlyPayment || editFormData.monthlyPayment <= 0) {
      newErrors.monthlyPayment = 'Monthly payment must be greater than 0';
    }
    if (!editFormData.entryShare || editFormData.entryShare < 1000) {
      newErrors.entryShare = 'Entry share must be at least ₹1000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleView = (form) => {
    setSelectedForm(form);
    setEditFormData({ ...form });
    setIsEditing(false);
    setErrors({});
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        alert('Only JPEG, PNG, and PDF files are supported');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setEditFormData((prev) => ({
          ...prev,
          citizenshipFile: file.name,
          citizenshipFileDataUrl: reader.result
        }));
        console.log('File read as Data URL:', file.name);
      };
      reader.onerror = () => {
        console.error('Error reading file:', file.name);
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSaveEdit = () => {
    if (!updateMembershipForm) {
      console.error('Error: updateMembershipForm function is not provided');
      alert('Error: updateMembershipForm function is not provided. Please contact the developer.');
      return;
    }

    if (!validateForm()) {
      console.log('Validation failed:', errors);
      return;
    }

    console.log('Saving form:', selectedForm.id, editFormData);
    updateMembershipForm(selectedForm.id, {
      ...editFormData,
      // Ensure Data URL is not sent to parent state to avoid large storage
      citizenshipFileDataUrl: undefined
    });
    setSelectedForm({ ...editFormData, citizenshipFileDataUrl: undefined });
    setIsEditing(false);
    setErrors({});
    alert('Saved successfully');
  };

  const handleClose = () => {
    setSelectedForm(null);
    setIsEditing(false);
    setErrors({});
  };

  const handleViewFile = () => {
    if (selectedForm.citizenshipFile) {
      setShowFileModal(true);
    } else {
      alert('No document uploaded');
    }
  };

  const handleCloseFileModal = () => {
    setShowFileModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-green-800">Membership Applications</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {membershipForms.map((form) => (
              <tr key={form.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{form.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{form.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{form.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      form.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : form.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {form.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleView(form)}
                    className="text-green-600 hover:text-green-800 text-sm flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  {form.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateMembershipStatus(form.id, 'approved')}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateMembershipStatus(form.id, 'rejected')}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing and editing form */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-green-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-green-800">Membership Details</h3>
              <button onClick={handleClose} className="text-green-600 hover:text-green-800">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 bg-green-50 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700">Name</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </>
                  ) : (
                    <p className="mt-1 text-gray-900 bg-white p-2 rounded-lg">{selectedForm.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">Email</label>
                  {isEditing ? (
                    <>
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </>
                  ) : (
                    <p className="mt-1 text-gray-900 bg-white p-2 rounded-lg">{selectedForm.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">Phone</label>
                  {isEditing ? (
                    <>
                      <input
                        type="tel"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleEditChange}
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </>
                  ) : (
                    <p className="mt-1 text-gray-900 bg-white p-2 rounded-lg">{selectedForm.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">Citizenship Number</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="citizenshipNumber"
                        value={editFormData.citizenshipNumber}
                        onChange={handleEditChange}
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                      />
                      {errors.citizenshipNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.citizenshipNumber}</p>
                      )}
                    </>
                  ) : (
                    <p className="mt-1 text-gray-900 bg-white p-2 rounded-lg">{selectedForm.citizenshipNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">Citizenship Document</label>
                  {isEditing ? (
                    <>
                      <input
                        type="file"
                        name="citizenshipFile"
                        onChange={handleEditChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg bg-white text-gray-900"
                      />
                      {editFormData.citizenshipFile && (
                        <p className="text-sm text-gray-600 mt-1">Selected: {editFormData.citizenshipFile}</p>
                      )}
                    </>
                  ) : (
                    <div className="mt-1">
                      {selectedForm.citizenshipFile ? (
                        <button
                          onClick={handleViewFile}
                          className="text-green-600 hover:underline flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View {selectedForm.citizenshipFile}
                        </button>
                      ) : (
                        <p className="text-gray-500 bg-white p-2 rounded-lg">No document uploaded</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">Address</label>
                  {isEditing ? (
                    <>
                      <textarea
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditChange}
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                        rows="3"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </>
                  ) : (
                    <p className="mt-1 text-gray-900 bg-white p-2 rounded-lg">{selectedForm.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">Date of Birth</label>
                  {isEditing ? (
                    <>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={editFormData.dateOfBirth}
                        onChange={handleEditChange}
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                      />
                      {errors.dateOfBirth && (
                        <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
                      )}
                    </>
                  ) : (
                    <p className="mt-1 text-gray-900 bg-white p-2 rounded-lg">{selectedForm.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">Monthly Payment (₹)</label>
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        name="monthlyPayment"
                        value={editFormData.monthlyPayment}
                        onChange={handleEditChange}
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                        min="1"
                      />
                      {errors.monthlyPayment && (
                        <p className="text-red-500 text-xs mt-1">{errors.monthlyPayment}</p>
                      )}
                    </>
                  ) : (
                    <p className="mt-1 text-gray-900 bg-white p-2 rounded-lg">{selectedForm.monthlyPayment}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700">Entry Share (₹)</label>
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        name="entryShare"
                        value={editFormData.entryShare}
                        onChange={handleEditChange}
                        className="mt-1 w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
                        min="1000"
                      />
                      {errors.entryShare && (
                        <p className="text-red-500 text-xs mt-1">{errors.entryShare}</p>
                      )}
                    </>
                  ) : (
                    <p className="mt-1 text-gray-900 bg-white p-2 rounded-lg">{selectedForm.entryShare}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center transition-colors shadow-md"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center transition-colors shadow-md"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for viewing citizenship document */}
      {showFileModal && selectedForm && selectedForm.citizenshipFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-green-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-green-800">Citizenship Document</h3>
              <button onClick={handleCloseFileModal} className="text-green-600 hover:text-green-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              {selectedForm.citizenshipFile.match(/\.(jpg|jpeg|png)$/i) ? (
                <img
                  src={getFileUrl(selectedForm)}
                  alt="Citizenship Document"
                  className="max-w-full max-h-[60vh] object-contain mx-auto"
                  onError={() => alert('Failed to load image. File may not exist or is unsupported.')}
                />
              ) : selectedForm.citizenshipFile.match(/\.pdf$/i) ? (
                <iframe
                  src={getFileUrl(selectedForm)}
                  title="Citizenship Document"
                  className="w-full h-[60vh]"
                  onError={() => alert('Failed to load PDF. File may not exist or is unsupported.')}
                />
              ) : (
                <p className="text-gray-500 text-center">Unsupported file format</p>
              )}
              <div className="mt-6 flex justify-end space-x-3">
                <a
                  href={getFileUrl(selectedForm)}
                  download={selectedForm.citizenshipFile}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center transition-colors shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </a>
                <button
                  onClick={handleCloseFileModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipForms;