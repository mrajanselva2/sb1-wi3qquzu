import { isElectron, selectFolder } from './electronBridge.js';

let outputFolder = null;

export async function selectOutputFolder() {
  if (!isElectron) {
    return null; // Return null for browser environment
  }
  
  try {
    const folder = await selectFolder();
    if (folder) {
      outputFolder = folder;
      return folder;
    }
  } catch (error) {
    console.error('Folder selection failed:', error);
  }
  return null;
}

export function getOutputFolder() {
  return outputFolder;
}

export function isDesktopApp() {
  return isElectron;
}