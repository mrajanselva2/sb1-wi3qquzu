import { sendFeedback } from '../services/feedbackService.js';
import { emailConfig } from '../config/email.js';

export function setupFeedbackForm(container) {
  const isEmailConfigured = emailConfig.isConfigured();
  
  container.innerHTML = `
    <div class="bg-dark-800 rounded-lg shadow-md p-4 mt-8">
      <h3 class="text-xl font-semibold mb-4">Share Your Feedback</h3>
      
      ${!isEmailConfigured ? `
        <div class="mb-4 p-3 bg-dark-700 rounded-lg text-yellow-400 text-sm">
          <p>The feedback form is currently unavailable.</p>
          <p>Please send your feedback directly to 
            <a href="mailto:m.rajan.selva@gmail.com" class="underline hover:text-yellow-300">
              m.rajan.selva@gmail.com
            </a>
          </p>
        </div>
      ` : `
        <form id="feedbackForm" class="space-y-4">
          <div>
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Your Email (optional):
            </label>
            <input
              type="email"
              id="userEmail"
              class="w-full p-2 bg-dark-700 border border-dark-600 text-gray-300 rounded-md"
              placeholder="your@email.com"
            >
          </div>
          <div>
            <label class="block text-gray-300 text-sm font-bold mb-2">
              Your Feedback:
            </label>
            <textarea
              id="feedbackText"
              rows="4"
              required
              class="w-full p-2 bg-dark-700 border border-dark-600 text-gray-300 rounded-md"
              placeholder="Tell us what you think..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Send Feedback
          </button>
        </form>
        <div id="feedbackMessage" class="mt-4 text-center hidden"></div>
      `}
    </div>
  `;

  if (!isEmailConfigured) return;

  const form = container.querySelector('#feedbackForm');
  const messageDiv = container.querySelector('#feedbackMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    const email = form.querySelector('#userEmail').value;
    const feedback = form.querySelector('#feedbackText').value;

    try {
      button.disabled = true;
      button.textContent = 'Sending...';

      await sendFeedback(feedback, email);
      
      messageDiv.innerHTML = `
        <div class="text-green-500">
          Thank you for your feedback!
        </div>
      `;
      messageDiv.classList.remove('hidden');
      form.reset();
    } catch (error) {
      messageDiv.innerHTML = `
        <div class="text-red-500">
          ${error.message}
        </div>
      `;
      messageDiv.classList.remove('hidden');
    } finally {
      button.disabled = false;
      button.textContent = 'Send Feedback';
    }
  });
}