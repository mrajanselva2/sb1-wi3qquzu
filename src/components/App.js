import { setupDropZone } from './DropZone.js';
import { setupDemoButton } from './DemoButton.js';
import { setupDemoGuide } from './DemoGuide.js';

export function setupApp(container) {
  container.innerHTML = `
    <div class="min-h-screen bg-dark-900 text-gray-100">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">Excel File Splitter</h1>
        
        <!-- Data Privacy Notice -->
        <div class="max-w-4xl mx-auto mb-8 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
          <div class="flex items-start space-x-3">
            <svg class="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div class="text-sm">
              <h2 class="font-semibold text-yellow-400 mb-1">Data Privacy Notice</h2>
              <p class="text-gray-300 mb-2">This application processes Excel files directly in your browser. Please note:</p>
              <ul class="list-disc list-inside space-y-1 text-gray-400">
                <li>No data is uploaded to any server</li>
                <li>All processing happens locally on your device</li>
                <li class="text-yellow-400">Do not upload files containing sensitive or confidential information</li>
                <li>We recommend removing sensitive data before processing</li>
                <li>Always keep backups of your original files</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="max-w-4xl mx-auto space-y-6">
          <!-- Upload Section -->
          <section id="uploadSection">
            <h2 class="text-xl font-semibold mb-4">1. Select Excel File</h2>
            <div id="dropZone"></div>
          </section>

          <!-- Configuration Section -->
          <section id="configSection" class="hidden">
            <h2 class="text-xl font-semibold mb-4">2. Configure Split</h2>
            <div id="sheetSelector" class="bg-dark-800 rounded-lg p-4"></div>
          </section>

          <!-- Results Section -->
          <section id="resultsSection" class="hidden">
            <h2 class="text-xl font-semibold mb-4">3. Results</h2>
            <div id="results"></div>
          </section>

          <!-- Demo Section -->
          <section id="demoSection" class="mt-12 pt-8 border-t border-dark-700">
            <h2 class="text-xl font-semibold text-center mb-6">Try it with Sample Data</h2>
            <div class="flex justify-center mb-6">
              <div id="demoButton"></div>
            </div>
            <div id="demoGuide"></div>
          </section>
        </div>
      </div>
    </div>
  `;

  setupDropZone(container.querySelector('#dropZone'));
  setupDemoButton(container.querySelector('#demoButton'));
  setupDemoGuide(container.querySelector('#demoGuide'));
}