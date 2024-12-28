import { readExcelFile } from '../services/excelService.js';
import { setupSheetSelector } from './SheetSelector.js';
import { validateExcelFile } from '../utils/fileUtils.js';
import { showError } from '../utils/uiUtils.js';

export function setupDropZone(container) {
  container.innerHTML = `
    <div class="bg-dark-800 rounded-lg shadow-md p-6">
      <div id="dropTarget" class="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
        <div class="space-y-4">
          <svg class="mx-auto h-12 w-12 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div class="text-gray-300">
            <p class="font-medium">Drop your Excel file here</p>
            <p class="text-sm mb-4">or</p>
            <label for="fileInput" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer inline-block">
              Browse Files
            </label>
          </div>
        </div>
      </div>
      <input type="file" id="fileInput" class="hidden" accept=".xlsx">
    </div>
  `;

  const dropTarget = container.querySelector('#dropTarget');
  const fileInput = container.querySelector('#fileInput');

  async function handleFile(file) {
    try {
      validateExcelFile(file);
      const workbook = await readExcelFile(file);
      
      // Find sections in the document
      const configSection = document.querySelector('#configSection');
      const sheetSelector = document.querySelector('#sheetSelector');
      
      if (!configSection || !sheetSelector) {
        throw new Error('Required elements not found');
      }

      // Show configuration section and setup sheet selector
      configSection.classList.remove('hidden');
      setupSheetSelector(sheetSelector, workbook);
      
      // Scroll to the configuration section
      configSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error handling file:', error);
      showError(container, error.message);
    }
  }

  // Drag and drop handlers
  dropTarget.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropTarget.classList.add('border-blue-500');
  });

  dropTarget.addEventListener('dragleave', () => {
    dropTarget.classList.remove('border-blue-500');
  });

  dropTarget.addEventListener('drop', (e) => {
    e.preventDefault();
    dropTarget.classList.remove('border-blue-500');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  // File input handler
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  });
}