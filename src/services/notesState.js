// Centralized notes state management
let notes = '';

export function setNotes(text) {
  notes = text || '';
}

export function getNotes() {
  return notes;
}