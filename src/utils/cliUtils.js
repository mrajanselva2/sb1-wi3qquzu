const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

async function promptForInputs() {
  const questions = [
    {
      type: 'input',
      name: 'filePath',
      message: 'Enter the path to your Excel file:',
      validate: (input) => {
        if (!input) return 'File path is required';
        if (!fs.existsSync(input)) return 'File does not exist';
        if (path.extname(input).toLowerCase() !== '.xlsx') {
          return 'File must be an .xlsx file';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'columnName',
      message: 'Enter the column name to split by:',
      validate: (input) => input ? true : 'Column name is required'
    }
  ];

  return inquirer.prompt(questions);
}

module.exports = {
  promptForInputs
};