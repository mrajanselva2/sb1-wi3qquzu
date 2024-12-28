// Centralized file state management
let selectedFile = null;

export function setSelectedFile(file) {
  selectedFile = file;
}

export function getSelectedFile() {
  return selectedFile;
}