export function setupResults(container, results) {
  container.innerHTML = `
    <div class="bg-dark-800 rounded-lg shadow-md p-4">
      <h3 class="text-xl font-bold mb-4">Files Generated Successfully!</h3>
      <div class="space-y-4">
        <div class="bg-dark-700 rounded-lg p-4">
          <ul class="space-y-2">
            ${results.map(file => `
              <li class="flex items-center space-x-2">
                <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="flex-1 text-gray-300">
                  <span class="font-medium">${file.fileName}</span>
                  <span class="text-sm text-gray-400">(${file.rowCount} rows)</span>
                </span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}