import { createSampleExcel } from '../utils/createSampleData.js';

export function setupDemoButton(container) {
  const button = document.createElement('button');
  button.className = 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center';
  button.innerHTML = `
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-13" />
    </svg>
    Download Sample Excel
  `;

  button.addEventListener('click', () => {
    const blob = createSampleExcel();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sample Company Data.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  container.appendChild(button);
}