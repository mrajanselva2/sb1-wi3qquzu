import XLSX from 'xlsx';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function processExcelFile(file, sheetName, columnName) {
  const workbook = XLSX.read(file.data);
  
  if (!workbook.SheetNames.includes(sheetName)) {
    throw new Error(`Sheet "${sheetName}" not found in Excel file`);
  }

  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  if (!data[0] || !(columnName in data[0])) {
    throw new Error(`Column "${columnName}" not found in sheet "${sheetName}"`);
  }

  const groupedData = groupByColumn(data, columnName);
  const outputDir = join(__dirname, '../output');
  await mkdir(outputDir, { recursive: true });

  const results = [];
  for (const [key, rows] of Object.entries(groupedData)) {
    const fileName = `${sanitizeFileName(key)}.xlsx`;
    const outputPath = join(outputDir, fileName);
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    await writeFile(outputPath, buffer);
    
    results.push({ fileName, rowCount: rows.length });
  }

  return { success: true, files: results };
}

function groupByColumn(data, columnName) {
  return data.reduce((acc, row) => {
    const key = row[columnName];
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});
}

function sanitizeFileName(name) {
  return name.toString().replace(/[^a-z0-9]/gi, '_');
}