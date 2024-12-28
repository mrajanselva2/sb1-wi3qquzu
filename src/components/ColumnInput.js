import { setupSheetSelector } from './SheetSelector.js';

export function setupColumnInput(container, workbook) {
  if (!container) {
    throw new Error('Container element not found');
  }

  // Get or create container divs
  let sheetContainer = container.querySelector('#sheetSelectorContainer');
  let columnContainer = container.querySelector('#columnSelectorContainer');

  if (!sheetContainer || !columnContainer) {
    container.innerHTML = `
      <div id="sheetSelectorContainer"></div>
      <div id="columnSelectorContainer"></div>
    `;
    sheetContainer = container.querySelector('#sheetSelectorContainer');
    columnContainer = container.querySelector('#columnSelectorContainer');
  }

  if (workbook) {
    // Initialize sheet selector, which will in turn initialize column selector
    return setupSheetSelector(sheetContainer, workbook);
  }

  return { success: false, error: 'No workbook provided' };
}