export function setupFolderInput(container) {
  container.innerHTML = `
    <div class="bg-dark-800 rounded-lg shadow-md p-4 mb-4">
      <h3 class="text-lg font-semibold mb-4">Output Options</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-gray-300 text-sm font-bold mb-2">
            File Name Prefix (optional):
          </label>
          <input
            type="text"
            id="filePrefix"
            class="w-full p-2 bg-dark-700 border border-dark-600 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter prefix for output files"
          />
        </div>
        <div class="text-sm text-gray-400">
          <p>Files will be downloaded to your browser's default download location</p>
          <p>Each file will be named: [prefix]_[column_value]_[timestamp].xlsx</p>
        </div>
      </div>
    </div>
  `;

  const prefixInput = container.querySelector('#filePrefix');

  return {
    clear: () => {
      prefixInput.value = '';
    },
    getPrefix: () => prefixInput.value.trim()
  };
}