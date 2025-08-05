/**
 * Handles admin login
 * @param {Object} userData - Username and password
 * @param {Object} adminData - Current admin credentials
 * @param {Function} setIsLoggedIn - State setter for login status
 * @param {Function} setAdminData - State setter for admin data
 * @param {Function} navigate - React Router navigate function
 */
export const handleLogin = (userData, adminData, setIsLoggedIn, setAdminData, navigate) => {
  if (userData.username === adminData.username && userData.password === adminData.password) {
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify({
      username: userData.username,
      loginTime: new Date().toISOString(),
    }));
    navigate('/admin/dashboard');
  } else {
    alert('Invalid credentials');
  }
};

/**
 * Handles admin logout
 * @param {Function} setIsLoggedIn - State setter for login status
 * @param {Function} setCurrentPage - State setter for current page
 * @param {Function} setShowProfileMenu - State setter for profile menu visibility
 * @param {Function} navigate - React Router navigate function
 */
export const handleLogout = (setIsLoggedIn, setCurrentPage, setShowProfileMenu, navigate) => {
  setIsLoggedIn(false);
  setCurrentPage('dashboard');
  setShowProfileMenu(false);
  localStorage.removeItem('currentUser');
  navigate('/admin');
};

/**
 * Handles account settings update
 * @param {Event} e - Form submission event
 * @param {Object} accountSettings - Current account settings form data
 * @param {Object} adminData - Current admin credentials
 * @param {Function} setAdminData - State setter for admin data
 * @param {Function} setAccountSettings - State setter for account settings form
 * @param {Function} setShowAccountSettings - State setter for account settings modal
 */
export const handleAccountSettingsUpdate = (e, accountSettings, adminData, setAdminData, setAccountSettings, setShowAccountSettings) => {
  e.preventDefault();
  if (accountSettings.currentPassword !== adminData.password) {
    alert('Current password is incorrect');
    return;
  }
  if (accountSettings.newPassword && accountSettings.newPassword !== accountSettings.confirmPassword) {
    alert('New passwords do not match');
    return;
  }
  const updatedData = {
    username: accountSettings.newUsername || adminData.username,
    password: accountSettings.newPassword || adminData.password,
  };
  setAdminData(updatedData);
  setAccountSettings({ newUsername: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  setShowAccountSettings(false);
  alert('Account settings updated successfully!');
};

/**
 * Handles gallery form submission
 * @param {Event} e - Form submission event
 * @param {Object} galleryForm - Gallery form data
 * @param {Object} editingGallery - Current gallery item being edited
 * @param {Array} gallery - Current gallery items
 * @param {Function} setGallery - State setter for gallery
 * @param {Function} setGalleryForm - State setter for gallery form
 * @param {Function} setEditingGallery - State setter for editing gallery item
 * @param {Object} imageInputRef - Reference to image input
 */
export const handleGallerySubmit = (e, galleryForm, editingGallery, gallery, setGallery, setGalleryForm, setEditingGallery, imageInputRef) => {
  e.preventDefault();
  if (!galleryForm.title) {
    alert('Image title is required');
    return;
  }
  if (!galleryForm.image && !editingGallery) {
    alert('Image is required for new gallery items');
    return;
  }
  if (galleryForm.image && galleryForm.image.size > 5 * 1024 * 1024) {
    alert('Image size should be less than 5MB');
    return;
  }
  if (galleryForm.image && !['image/jpeg', 'image/png'].includes(galleryForm.image.type)) {
    alert('Only JPEG and PNG images are supported');
    return;
  }
  const saveGalleryItem = (imageDataUrl) => {
    const newItem = {
      id: editingGallery ? editingGallery.id : Date.now(),
      title: galleryForm.title,
      image: imageDataUrl || (editingGallery ? editingGallery.image : ''),
      date: new Date().toISOString().split('T')[0],
    };
    if (editingGallery) {
      setGallery(gallery.map((item) => (item.id === editingGallery.id ? newItem : item)));
    } else {
      setGallery([newItem, ...gallery]);
    }
    setGalleryForm({ title: '', image: null });
    setEditingGallery(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };
  if (galleryForm.image) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (dataUrl.startsWith('data:image/')) {
        saveGalleryItem(dataUrl);
      } else {
        alert('Failed to generate valid image Data URL');
      }
    };
    reader.onerror = () => {
      alert('Error reading image file');
    };
    reader.readAsDataURL(galleryForm.image);
  } else {
    saveGalleryItem(null);
  }
};

/**
 * Handles gallery item edit
 * @param {Object} item - Gallery item to edit
 * @param {Function} setEditingGallery - State setter for editing gallery item
 * @param {Function} setGalleryForm - State setter for gallery form
 */
export const handleGalleryEdit = (item, setEditingGallery, setGalleryForm) => {
  setEditingGallery(item);
  setGalleryForm({ title: item.title, image: null });
};

/**
 * Handles gallery item deletion
 * @param {Number} id - ID of gallery item to delete
 * @param {Array} gallery - Current gallery items
 * @param {Function} setGallery - State setter for gallery
 */
export const handleGalleryDelete = (id, gallery, setGallery) => {
  if (window.confirm('Are you sure you want to delete this gallery item?')) {
    setGallery(gallery.filter((item) => (item.id !== id)));
  }
};

/**
 * Updates loan status
 * @param {Number} id - Loan ID
 * @param {String} status - New status
 * @param {Array} loanForms - Current loan forms
 * @param {Function} setLoanForms - State setter for loan forms
 */
export const handleUpdateLoanStatus = (id, status, loanForms, setLoanForms) => {
  setLoanForms((prevForms) => {
    const updatedForms = prevForms.map((form) => (form.id === id ? { ...form, status } : form));
    try {
      localStorage.setItem('loanForms', JSON.stringify(updatedForms));
    } catch (error) {
      console.error('Error saving loanForms to localStorage:', error);
    }
    return updatedForms;
  });
};

/**
 * Updates loan data
 * @param {Number} id - Loan ID
 * @param {Object} updatedData - Updated loan data
 * @param {Array} loanForms - Current loan forms
 * @param {Function} setLoanForms - State setter for loan forms
 */
export const handleUpdateLoan = (id, updatedData, loanForms, setLoanForms) => {
  setLoanForms((prevForms) => {
    const updatedForms = prevForms.map((form) => (form.id === id ? { ...form, ...updatedData } : form));
    try {
      localStorage.setItem('loanForms', JSON.stringify(updatedForms));
    } catch (error) {
      console.error('Error saving loanForms to localStorage:', error);
    }
    return updatedForms;
  });
};

/**
 * Updates feedback data
 * @param {Number} id - Feedback ID
 * @param {Object} updatedData - Updated feedback data
 * @param {Array} feedbackList - Current feedback list
 * @param {Function} setFeedbackList - State setter for feedback list
 */
export const handleUpdateFeedback = (id, updatedData, feedbackList, setFeedbackList) => {
  setFeedbackList((prevList) => {
    const updatedList = prevList.map((item) => (item.id === id ? { ...item, ...updatedData } : item));
    try {
      localStorage.setItem('feedbackList', JSON.stringify(updatedList));
    } catch (error) {
      console.error('Error saving feedbackList to localStorage:', error);
    }
    return updatedList;
  });
};

/**
 * Updates membership form data
 * @param {Number} id - Membership form ID
 * @param {Object} updatedData - Updated membership form data
 * @param {Array} membershipForms - Current membership forms
 * @param {Function} setMembershipForms - State setter for membership forms
 */
export const handleUpdateMembershipForm = (id, updatedData, membershipForms, setMembershipForms) => {
  setMembershipForms((prevForms) => {
    const updatedForms = prevForms.map((form) => (form.id === id ? { ...form, ...updatedData } : form));
    try {
      localStorage.setItem('membershipForms', JSON.stringify(updatedForms));
    } catch (error) {
      console.error('Error saving updated membershipForms to localStorage:', error);
    }
    return updatedForms;
  });
};