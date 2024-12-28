import { getWorksheetList } from '../services/excelService.js';
import { setupColumnSelector } from './ColumnSelector.js';
import { setupSplitButton } from './SplitButton.js';

export function setupSheetSelector(container, workbook) {
  const sheets = getWorksheetList(workbook);
  
  container.innerHTML = `
    <div class="space-y-4">
      <!-- Primary Sheet Selection -->
      <div>
        <label class="block text-gray-300 text-sm font-bold mb-2">
          Primary Sheet (for splitting):
        </label>
        <select id="primarySheet" class="w-full p-2 bg-dark-700 border border-dark-600 text-gray-300 rounded-md">
          ${sheets.map(sheet => `
            <option value="${sheet.name}">${sheet.name} (${sheet.rowCount} rows)</option>
          `).join('')}
        </select>
      </div>

      <!-- Column Selection -->
      <div id="columnSelectorContainer"></div>

      <!-- Additional Sheets -->
      <div>
        <label class="block text-gray-300 text-sm font-bold mb-2">
          Additional Sheets to Include (optional):
        </label>
        <div class="space-y-2 bg-dark-700 rounded-lg p-3 mb-4">
          ${sheets.map(sheet => `
            <label class="flex items-center space-x-2">
              <input type="checkbox" name="additionalSheets" value="${sheet.name}"
                class="rounded border-dark-600 text-blue-500 focus:ring-blue-500 bg-dark-600">
              <span class="text-gray-300">${sheet.name}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Split Button -->
      <div id="splitButtonContainer"></div>
    </div>
  `;

  const primarySheet = container.querySelector('#primarySheet');
  const columnSelectorContainer = container.querySelector('#columnSelectorContainer');
  const splitButtonContainer = container.querySelector('#splitButtonContainer');

  // Initialize components
  setupColumnSelector(columnSelectorContainer, workbook, sheets[0].name);
  setupSplitButton(splitButtonContainer, workbook);

  // Update column selector when primary sheet changes
  primarySheet.addEventListener('change', (e) => {
    setupColumnSelector(columnSelectorContainer, workbook, e.target.value);
    updateCheckboxes();
  });

  // Disable checkbox for selected primary sheet
  function updateCheckboxes() {
    const checkboxes = container.querySelectorAll('input[name="additionalSheets"]');
    checkboxes.forEach(cb => {
      if (cb.value === primarySheet.value) {
        cb.checked = false;
        cb.disabled = true;
      } else {
        cb.disabled = false;
      }
    });
  }

  updateCheckboxes();
}