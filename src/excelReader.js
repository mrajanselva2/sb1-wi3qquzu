export async function readExcelSheets(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const sheets = workbook.SheetNames.map(name => ({
          name,
          columns: getSheetColumns(workbook.Sheets[name])
        }));
        
        resolve(sheets);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

function getSheetColumns(worksheet) {
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return data[0] || [];
}