export function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[-:]/g, '').split('.')[0];
}