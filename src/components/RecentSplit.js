export function setupRecentSplit(container) {
  container.innerHTML = `
    <div class="bg-dark-800 rounded-lg shadow-md p-4">
      <h2 class="text-xl font-bold mb-4">Recent Split</h2>
      <div id="recentSplitContent">
        <p class="text-gray-500 text-center">No recent splits</p>
      </div>
    </div>
  `;
}

export function updateRecentSplit() {
  const container = document.querySelector('#recentSplitContent');
  if (!container) return;

  try {
    const history = JSON.parse(localStorage.getItem('excel_splitter_history') || '[]');
    const mostRecent = history[0];

    if (!mostRecent) {
      container.innerHTML = `<p class="text-gray-500 text-center">No recent splits</p>`;
      return;
    }

    container.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-medium text-gray-200">${mostRecent.fileName}</h3>
            <p class="text-sm text-gray-400">Split by: ${mostRecent.columnName}</p>
          </div>
          <span class="text-xs text-gray-500">${mostRecent.processedAt}</span>
        </div>
        ${mostRecent.results ? `
          <div class="bg-dark-700 rounded-lg p-3">
            <p class="text-sm text-gray-400 mb-2">Generated files:</p>
            <div class="space-y-1">
              ${mostRecent.results.map(file => `
                <div class="text-sm text-gray-300 flex items-center">
                  <svg class="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
                  </svg>
                  ${file.fileName} (${file.rowCount} rows)
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<p class="text-gray-500 text-center">No recent splits</p>`;
  }
}