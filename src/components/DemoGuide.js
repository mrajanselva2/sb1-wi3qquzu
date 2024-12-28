export function setupDemoGuide(container) {
  container.innerHTML = `
    <div class="bg-dark-800 rounded-lg p-4">
      <h3 class="text-lg font-semibold mb-4">How to Use the Sample File</h3>
      <ol class="space-y-3 text-gray-300">
        <li class="flex items-start space-x-3">
          <span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
          <div>
            <p class="font-medium">Download Sample File</p>
            <p class="text-sm text-gray-400">Click the button above to get a pre-made company data file</p>
          </div>
        </li>
        <li class="flex items-start space-x-3">
          <span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
          <div>
            <p class="font-medium">Upload the File</p>
            <p class="text-sm text-gray-400">Drag & drop or click to upload the sample Excel file</p>
          </div>
        </li>
        <li class="flex items-start space-x-3">
          <span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
          <div>
            <p class="font-medium">Choose Split Options</p>
            <p class="text-sm text-gray-400">Select "Department" as the column to split by</p>
          </div>
        </li>
        <li class="flex items-start space-x-3">
          <span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
          <div>
            <p class="font-medium">Process and Download</p>
            <p class="text-sm text-gray-400">Click "Split Excel File" to create separate files for each department</p>
          </div>
        </li>
      </ol>
    </div>
  `;
}