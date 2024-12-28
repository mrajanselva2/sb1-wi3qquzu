import * as XLSX from 'xlsx';
import { getSheetData } from './excelService.js';
import { getTimestamp } from '../utils/dateUtils.js';
import { isElectron, saveFile } from './electronBridge.js';
import path from 'path';

export async function splitExcel(workbook, primarySheet, columnName, additionalSheets = [], outputFolder = null) {
  const data = getSheetData(workbook, primarySheet);
  const [headers, ...rows] = data;
  const columnIndex = headers.indexOf(columnName);
  
  const groups = rows.reduce((acc, row) => {
    const value = row[columnIndex] ?? 'undefined';
    if (!acc[value]) acc[value] = [];
    acc[value].push(row);
    return acc;
  }, {});

  const timestamp = getTimestamp();
  const results = [];

  for (const [value, groupRows] of Object.entries(groups)) {
    const fileName = `${value}_${timestamp}.xlsx`;
    const newWb = XLSX.utils.book_new();

    // Add primary sheet
    const primaryWs = XLSX.utils.aoa_to_sheet([headers, ...groupRows]);
    XLSX.utils.book_append_sheet(newWb, primaryWs, primarySheet);

    // Add additional sheets
    for (const sheetName of additionalSheets) {
      if (sheetName !== primarySheet) {
        const sheetData = getSheetData(workbook, sheetName);
        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(newWb, ws, sheetName);
      }
    }

    // Write file
    const buffer = XLSX.write(newWb, { bookType: 'xlsx', type: 'array' });

    if (isElectron && outputFolder) {
      // Save to specified folder in Electron
      const filePath = path.join(outputFolder, fileName);
      await saveFile(buffer, filePath);
    } else {
      // Download in browser
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    results.push({ 
      fileName, 
      rowCount: groupRows.length,
      path: outputFolder ? path.join(outputFolder, fileName) : null
    });
  }

  return results;
}