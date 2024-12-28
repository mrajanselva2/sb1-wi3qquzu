const HISTORY_KEY = 'excel_splitter_history';

export function addToHistory(entry) {
  const history = getHistory();
  
  const formattedEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
    processedAt: new Date().toLocaleString()
  };
  
  history.unshift(formattedEntry);
  
  if (history.length > 10) {
    history.pop();
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  updateRecentSplit();
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}