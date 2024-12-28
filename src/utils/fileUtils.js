export function validateExcelFile(file) {
  if (!file) {
    throw new Error('No file selected');
  }
  
  if (!file.name.toLowerCase().endsWith('.xlsx')) {
    throw new Error('Please select an Excel (.xlsx) file');
  }
  
  return true;
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function sanitizeFileName(value) {
  return value.toString()
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase() || 'undefined';
}