import { getSheetColumns } from '../services/excelService.js';

export function setupColumnSelector(container, workbook, sheetName) {
  const columns = getSheetColumns(workbook, sheetName);
  
  container.innerHTML = `
    <div>
      <label class="block text-gray-300 text-sm font-bold mb-2">
        Select Column to Split By:
      </label>
      <select id="columnSelect" class="w-full p-2 bg-dark-700 border border-dark-600 text-gray-300 rounded-md">
        ${columns.map(column => `
          <option value="${column}">${column}</option>
        `).join('')}
      </select>
    </div>
  `;

  return container.querySelector('#columnSelect');
}