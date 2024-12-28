import { setupDropZone } from '../components/DropZone.js';
import { setupResults } from '../components/Results.js';

export function createApp(container) {
  // Create app structure
  container.innerHTML = `
    <div class="min-h-screen bg-dark-900 text-gray-100">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">Excel File Splitter</h1>
        
        <div class="max-w-4xl mx-auto space-y-6">
          <!-- Upload Section -->
          <section id="uploadSection">
            <h2 class="text-xl font-semibold mb-4">1. Select Excel File</h2>
            <div id="dropZone"></div>
          </section>

          <!-- Configuration Section -->
          <section id="configSection" class="hidden">
            <h2 class="text-xl font-semibold mb-4">2. Configure Split</h2>
            <div id="columnInput" class="space-y-4">
              <div id="sheetSelectorContainer"></div>
              <div id="columnSelectorContainer"></div>
              <div id="optionsContainer"></div>
            </div>
          </section>

          <!-- Results Section -->
          <section id="resultsSection" class="hidden">
            <h2 class="text-xl font-semibold mb-4">3. Results</h2>
            <div id="results"></div>
          </section>
        </div>
      </div>
    </div>
  `;

  // Initialize components
  initializeComponents(container);
}

function initializeComponents(container) {
  const components = {
    dropZone: container.querySelector('#dropZone'),
    results: container.querySelector('#results')
  };

  // Validate required elements exist
  Object.entries(components).forEach(([name, element]) => {
    if (!element) {
      throw new Error(`Required element #${name} not found`);
    }
  });

  // Initialize components
  setupDropZone(components.dropZone);
  setupResults(components.results);
}