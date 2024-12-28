namespace ExcelSplitter.Models;

public class SplitResult
{
    public required string FileName { get; init; }
    public required string FilePath { get; init; }
    public int RowCount { get; init; }
}