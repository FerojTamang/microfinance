/**
 * Safely retrieves data from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if retrieval fails
 * @returns {any} Retrieved or default value
 */
export const getFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : defaultValue;
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely saves data to localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to save
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};