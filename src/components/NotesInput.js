import { getNotes, setNotes } from '../services/notesState.js';

export function setupNotesInput(container) {
  container.innerHTML = `
    <div class="bg-dark-800 rounded-lg shadow-md p-4 mt-4">
      <label class="block text-gray-300 text-sm font-bold mb-2">
        Notes:
      </label>
      <textarea
        id="notes"
        class="w-full p-2 bg-dark-700 border border-dark-600 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
        placeholder="Add any notes about this split (optional)"
      >${getNotes() || ''}</textarea>
    </div>
  `;

  const textarea = container.querySelector('#notes');
  textarea.addEventListener('input', (e) => {
    setNotes(e.target.value.trim());
  });

  return {
    clear: () => {
      textarea.value = '';
      setNotes('');
    },
    getValue: () => textarea.value.trim()
  };
}