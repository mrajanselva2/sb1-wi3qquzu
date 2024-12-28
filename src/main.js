import './style.css';
import { setupApp } from './components/App.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('#app');
  if (appContainer) {
    setupApp(appContainer);
  }
});