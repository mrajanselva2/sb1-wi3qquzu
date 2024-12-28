export function setupResultsDisplay(container) {
  window.displayResults = (files) => {
    container.innerHTML = `
      <div class="max-w-md mx-auto">
        <div class="bg-white shadow-md rounded-lg px-6 py-4 mb-6">
          <h2 class="text-xl font-bold mb-4">Split Complete!</h2>
          
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold mb-2">Created Files:</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <ul class="space-y-2">
                  ${files.map(file => `
                    <li class="flex items-center space-x-2">
                      <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="flex-1">
                        <span class="font-medium">${file.fileName}</span>
                        <span class="text-sm text-gray-500">(${file.rowCount} rows)</span>
                      </span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
            
            <div class="text-sm text-gray-600 bg-blue-50 rounded-lg p-4">
              <p class="flex items-center">
                <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Files have been saved in the <span class="font-mono mx-1">output</span> directory
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  };
}