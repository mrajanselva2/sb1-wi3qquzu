export function showError(container, message) {
  container.innerHTML = `
    <div class="text-red-400 text-center p-4 bg-dark-800 rounded-lg">
      <svg class="h-6 w-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>${message}</p>
    </div>
  `;
}

export function toggleButton(button, disabled, text) {
  button.disabled = disabled;
  button.textContent = text;
  button.classList.toggle('opacity-50', disabled);
  button.classList.toggle('cursor-not-allowed', disabled);
}

export function showSuccess(container, message) {
  container.innerHTML = `
    <div class="text-green-400 text-center p-4 bg-dark-800 rounded-lg">
      <svg class="h-6 w-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <p>${message}</p>
    </div>
  `;
}