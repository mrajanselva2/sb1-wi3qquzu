import { formatFileSize } from '../utils/fileUtils.js';

export function createFilePreview(file) {
  const container = document.createElement('div');
  container.className = 'mb-6 bg-dark-800 rounded-lg shadow-md p-4';
  
  container.innerHTML = `
    <h2 class="text-lg font-semibold mb-3 text-gray-100">Input File</h2>
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <p class="font-medium text-gray-100">${file.name}</p>
        <p class="text-sm text-gray-400">Size: ${formatFileSize(file.size)}</p>
        <p class="text-sm text-gray-400">Type: ${file.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}</p>
      </div>
    </div>
  `;
  
  return container;
}