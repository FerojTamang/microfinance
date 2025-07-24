import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const Gallery = ({
  gallery,
  galleryForm,
  editingGallery,
  imageInputRef,
  setGalleryForm,
  handleGallerySubmit,
  handleGalleryEdit,
  handleGalleryDelete
}) => {
  return (
    <div className="space-y-6">
      {/* Form for Add/Edit Gallery Item */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {editingGallery ? 'Edit Gallery Item' : 'Add Gallery Item'}
        </h3>
        <form onSubmit={handleGallerySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={galleryForm.title}
              onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.files[0] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required={!editingGallery}
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingGallery ? 'Update Gallery' : 'Add to Gallery'}
            </button>
            {editingGallery && (
              <button
                type="button"
                onClick={() => {
                  setGalleryForm({ title: '', image: null });
                  if (imageInputRef.current) imageInputRef.current.value = '';
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Gallery Items List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Gallery Items</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {gallery.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = '/fallback-image.png'; // Make sure this fallback image exists in your public folder
                }}
              />
              <div className="p-4">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                <div className="flex justify-end space-x-2 mt-3">
                  <button
                    onClick={() => handleGalleryEdit(item)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleGalleryDelete(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {gallery.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No gallery items added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
