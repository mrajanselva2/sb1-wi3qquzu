// Detect if running in Electron
export const isElectron = window?.require ? true : false;

// Safely get electron modules
const electron = isElectron ? window.require('electron') : null;
const ipcRenderer = electron?.ipcRenderer;

export async function selectFolder() {
  if (!isElectron || !ipcRenderer) {
    return null;
  }
  return ipcRenderer.invoke('select-folder');
}

export async function saveFile(buffer, filePath) {
  if (!isElectron || !ipcRenderer) {
    return null;
  }
  return ipcRenderer.invoke('save-file', { buffer, filePath });
}