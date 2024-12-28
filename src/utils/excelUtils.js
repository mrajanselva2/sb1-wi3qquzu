export function groupRowsByColumn(rows, columnIndex) {
  return rows.reduce((acc, row) => {
    const value = row[columnIndex] ?? 'Undefined';
    if (!acc[value]) {
      acc[value] = [];
    }
    acc[value].push(row);
    return acc;
  }, {});
}

export function sanitizeFileName(value) {
  return value.toString()
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    || 'undefined';
}