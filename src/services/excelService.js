import * as XLSX from 'xlsx';

export async function readExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        resolve(workbook);
      } catch (error) {
        reject(new Error('Failed to read Excel file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

export function getSheetData(workbook, sheetName) {
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
}

export function getWorksheetList(workbook) {
  return workbook.SheetNames.map(name => ({
    name,
    rowCount: XLSX.utils.decode_range(workbook.Sheets[name]['!ref'] || 'A1').e.r + 1
  }));
}

export function getSheetColumns(workbook, sheetName) {
  const data = getSheetData(workbook, sheetName);
  return data[0] || [];
}