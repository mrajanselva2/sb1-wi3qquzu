const path = require('path');
const { ensureDirectoryExists, validateInputFile, sanitizeFileName } = require('./utils/fileUtils');
const { readExcelFile, createExcelFile, groupDataByColumn } = require('./utils/excelUtils');
const { promptForInputs } = require('./utils/cliUtils');

async function splitExcelFile(inputFile, columnName) {
  try {
    // Validate inputs
    validateInputFile(inputFile);

    // Read and process the Excel file
    const data = readExcelFile(inputFile);
    const groupedData = groupDataByColumn(data, columnName);

    // Create output directory
    const outputDir = path.join(__dirname, '../output');
    ensureDirectoryExists(outputDir);

    // Create separate Excel files for each group
    Object.entries(groupedData).forEach(([key, rows]) => {
      const outputPath = path.join(outputDir, `${sanitizeFileName(key)}.xlsx`);
      createExcelFile(rows, outputPath);
      console.log(`Created file: ${outputPath}`);
    });

    console.log('\nSplit completed successfully!');
  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  let inputFile, columnName;
  
  if (args.length === 2) {
    // Use command line arguments
    [inputFile, columnName] = args;
  } else {
    // Use interactive mode
    const answers = await promptForInputs();
    inputFile = answers.filePath;
    columnName = answers.columnName;
  }

  await splitExcelFile(inputFile, columnName);
}

main().catch(error => {
  console.error('\nError:', error.message);
  process.exit(1);
});