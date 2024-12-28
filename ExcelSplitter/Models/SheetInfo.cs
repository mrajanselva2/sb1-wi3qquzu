namespace ExcelSplitter.Models;

public class SheetInfo
{
    public required string Name { get; init; }
    public int RowCount { get; init; }
    public required List<string> Columns { get; init; }
}