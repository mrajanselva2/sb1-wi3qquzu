using ExcelSplitter.Models;

namespace ExcelSplitter.Services;

public interface IExcelService
{
    Task<List<SheetInfo>> GetSheetsAsync(string filePath);
    Task<List<SplitResult>> SplitExcelFileAsync(
        string filePath,
        string primarySheet,
        string columnName,
        string outputPath,
        IProgress<int>? progress = null);
}