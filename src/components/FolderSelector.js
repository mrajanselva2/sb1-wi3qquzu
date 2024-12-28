import { selectOutputFolder, isDesktopApp } from '../services/folderService.js';

export function setupFolderSelector(container) {
  // For browser environment, don't show folder selection
  if (!isDesktopApp()) {
    container.innerHTML = `
      <div class="bg-dark-800 rounded-lg shadow-md p-4 mb-4">
        <p class="text-gray-300 text-sm">
          Files will be downloaded to your browser's default download location
        </p>
      </div>
    `;
    return {
      getFolder: () => null
    };
  }

  // Desktop app UI
  container.innerHTML = `
    <div class="bg-dark-800 rounded-lg shadow-md p-4 mb-4">
      <label class="block text-gray-300 text-sm font-bold mb-2">
        Output Folder:
      </label>
      <div class="flex space-x-2">
        <input
          type="text"
          id="folderPath"
          class="flex-1 p-2 bg-dark-700 border border-dark-600 text-gray-300 rounded-md"
          readonly
          placeholder="Select output folder"
        >
        <button
          id="selectFolderBtn"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Browse
        </button>
      </div>
    </div>
  `;

  const folderInput = container.querySelector('#folderPath');
  const selectButton = container.querySelector('#selectFolderBtn');

  selectButton.addEventListener('click', async () => {
    const folder = await selectOutputFolder();
    if (folder) {
      folderInput.value = folder;
    }
  });

  return {
    getFolder: () => folderInput.value
  };
}