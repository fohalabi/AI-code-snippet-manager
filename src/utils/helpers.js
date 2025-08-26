
// utils/helpers.js

// ID Generation
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Date Formatting
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatRelativeTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(timestamp);
};

// Text Processing
export const truncateText = (text, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const highlightSearchTerm = (text, searchTerm) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// Array Processing
export const sortSnippets = (snippets, sortBy = 'createdAt', order = 'desc') => {
  return [...snippets].sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });
};

export const filterSnippetsByLanguage = (snippets, language) => {
  if (!language || language === 'all') return snippets;
  return snippets.filter(snippet => snippet.language === language);
};

// Search and Filtering
export const searchSnippets = (snippets, searchTerm) => {
  if (!searchTerm) return snippets;
  
  const term = searchTerm.toLowerCase();
  return snippets.filter(snippet => 
    snippet.title.toLowerCase().includes(term) ||
    snippet.description.toLowerCase().includes(term) ||
    snippet.code.toLowerCase().includes(term) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

// Validation
export const validateSnippet = (snippetData) => {
  const errors = {};
  
  if (!snippetData.title?.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!snippetData.code?.trim()) {
    errors.code = 'Code is required';
  }
  
  if (snippetData.title && snippetData.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Storage Operations
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

// Clipboard Operations
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      document.body.removeChild(textArea);
      console.error('Failed to copy to clipboard:', fallbackError);
      return false;
    }
  }
};

// File Operations
export const exportSnippets = (snippets) => {
  const dataStr = JSON.stringify(snippets, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `code-snippets-${formatDate(Date.now())}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

// Constants
export const SUPPORTED_LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'csharp',
  'html', 'css', 'sql', 'bash', 'json', 'xml', 'yaml', 'markdown', 'other'
];

export const LANGUAGE_COLORS = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  python: '#3776ab',
  java: '#ed8b00',
  cpp: '#00599c',
  c: '#a8b9cc',
  csharp: '#239120',
  html: '#e34f26',
  css: '#1572b6',
  sql: '#336791',
  bash: '#4eaa25',
  json: '#000000',
  xml: '#ff6600',
  yaml: '#cb171e',
  markdown: '#083fa1',
  other: '#6c757d'
};