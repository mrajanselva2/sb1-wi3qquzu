import { updateHistoryUI } from '../services/historyService.js';

export function setupHistory(container) {
  container.innerHTML = `
    <div class="border-t border-dark-700 mt-8 pt-8">
      <h2 class="text-xl font-bold mb-4 text-center">Recent Splits</h2>
      <div id="historyContent"></div>
    </div>
  `;

  // Initialize history display
  updateHistoryUI(container.querySelector('#historyContent'));
}