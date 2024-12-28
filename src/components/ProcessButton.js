import { processExcelSplit } from '../services/splitService.js';
import { displayResults } from './Results.js';
import { toggleButton, showError } from '../utils/uiUtils.js';

export function createProcessButton() {
  const button = document.createElement('button');
  button.className = 'w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-4 flex items-center justify-center';
  button.innerHTML = `
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Process File
  `;
  button.disabled = true;
  button.classList.add('opacity-50', 'cursor-not-allowed');
  
  return button;
}

export function setupProcessButton(container, workbook) {
  const button = createProcessButton();
  container.appendChild(button);

  const resultsContainer = document.querySelector('#results');
  
  button.addEventListener('click', async () => {
    const sheetSelect = document.querySelector('#sheetName');
    const columnSelect = document.querySelector('#columnName');
    
    if (!sheetSelect || !columnSelect) {
      showError(resultsContainer, 'Please select a sheet and column first');
      return;
    }

    try {
      toggleButton(button, true, 'Processing...');
      
      const results = await processExcelSplit(
        workbook,
        sheetSelect.value,
        columnSelect.value
      );
      
      resultsContainer.classList.remove('hidden');
      displayResults(resultsContainer, results);
    } catch (error) {
      showError(resultsContainer, error.message);
    } finally {
      toggleButton(button, false, 'Process File');
    }
  });

  return {
    enable: () => {
      button.disabled = false;
      button.classList.remove('opacity-50', 'cursor-not-allowed');
    },
    disable: () => {
      button.disabled = true;
      button.classList.add('opacity-50', 'cursor-not-allowed');
    }
  };
}