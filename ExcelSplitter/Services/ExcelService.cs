using ClosedXML.Excel;
using ExcelSplitter.Models;

namespace ExcelSplitter.Services;

public class ExcelService : IExcelService
{
    public async Task<List<SheetInfo>> GetSheetsAsync(string filePath)
    {
        return await Task.Run(() =>
        {
            using var workbook = new XLWorkbook(filePath);
            return workbook.Worksheets
                .Select(ws => new SheetInfo
                {
                    Name = ws.Name,
                    RowCount = ws.RowsUsed().Count(),
                    Columns = ws.FirstRowUsed()
                        .CellsUsed()
                        .Select(c => c.Value.ToString())
                        .ToList()
                })
                .ToList();
        });
    }

    public async Task<List<SplitResult>> SplitExcelFileAsync(
        string filePath,
        string primarySheet,
        string columnName,
        string outputPath,
        IProgress<int>? progress = null)
    {
        return await Task.Run(() =>
        {
            using var workbook = new XLWorkbook(filePath);
            var worksheet = workbook.Worksheet(primarySheet);
            
            // Get header row and find column index
            var headerRow = worksheet.FirstRowUsed();
            var columnIndex = headerRow.CellsUsed()
                .First(c => c.Value.ToString() == columnName)
                .WorksheetColumn()
                .ColumnNumber();

            // Group data by column value
            var groups = worksheet.RowsUsed()
                .Skip(1) // Skip header
                .GroupBy(row => row.Cell(columnIndex).Value.ToString())
                .ToList();

            var results = new List<SplitResult>();
            var totalGroups = groups.Count;
            var processed = 0;

            foreach (var group in groups)
            {
                var newWorkbook = new XLWorkbook();
                var newSheet = newWorkbook.AddWorksheet(primarySheet);

                // Copy header
                headerRow.CopyTo(newSheet.Row(1));

                // Copy data
                var rowIndex = 2;
                foreach (var row in group)
                {
                    row.CopyTo(newSheet.Row(rowIndex++));
                }

                // Save file
                var fileName = $"{SanitizeFileName(group.Key)}.xlsx";
                var filePath = Path.Combine(outputPath, fileName);
                
                Directory.CreateDirectory(outputPath);
                newWorkbook.SaveAs(filePath);

                results.Add(new SplitResult
                {
                    FileName = fileName,
                    FilePath = filePath,
                    RowCount = group.Count()
                });

                processed++;
                progress?.Report((int)((float)processed / totalGroups * 100));
            }

            return results;
        });
    }

    private static string SanitizeFileName(string fileName)
    {
        return string.Join("_", fileName.Split(Path.GetInvalidFileNameChars()));
    }
}