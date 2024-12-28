// Centralized folder path state management
let outputFolderPath = 'output';

export function setFolderPath(path) {
  outputFolderPath = path || 'output';
}

export function getFolderPath() {
  return outputFolderPath;
}