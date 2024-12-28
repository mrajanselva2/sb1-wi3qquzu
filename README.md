# Excel File Splitter

This application splits an Excel file into multiple files based on unique values in a specified column.

## Usage

1. Place your Excel file in the project directory
2. Run the application with:

```bash
npm start <excel-file-path> <column-name>
```

For example:
```bash
npm start ./data.xlsx "Department"
```

The split files will be created in the `output` directory, named after the unique values in the specified column.

## Notes

- The input Excel file should be in .xlsx format
- The first sheet of the workbook will be processed
- Special characters in column values will be replaced with underscores in output filenames