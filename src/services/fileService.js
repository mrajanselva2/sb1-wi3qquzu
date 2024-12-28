import * as XLSX from 'xlsx';

export async function saveExcelFile(workbook, fileName) {
  // Write workbook to array buffer
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Create Blob from buffer
  const blob = new Blob([buffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}