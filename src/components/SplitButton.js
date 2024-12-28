import { splitExcel } from '../services/splitService.js';
import { setupResults } from './Results.js';
import { getOutputFolder } from '../services/folderService.js';

export function setupSplitButton(container, workbook) {
  container.innerHTML = `
    <button id="splitButton" class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
      Split Excel File
    </button>
  `;

  const splitButton = container.querySelector('#splitButton');

  splitButton.addEventListener('click', async () => {
    try {
      const primarySheet = document.querySelector('#primarySheet').value;
      const columnSelect = document.querySelector('#columnSelect').value;
      const additionalSheets = Array.from(
        document.querySelectorAll('input[name="additionalSheets"]:checked')
      ).map(cb => cb.value);

      splitButton.disabled = true;
      splitButton.textContent = 'Processing...';

      const results = await splitExcel(
        workbook,
        primarySheet,
        columnSelect,
        additionalSheets,
        getOutputFolder()
      );

      const resultsSection = document.querySelector('#resultsSection');
      const resultsContainer = document.querySelector('#results');
      
      if (resultsSection && resultsContainer) {
        resultsSection.classList.remove('hidden');
        setupResults(resultsContainer, results);
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      splitButton.disabled = false;
      splitButton.textContent = 'Split Excel File';
    }
  });

  return splitButton;
}