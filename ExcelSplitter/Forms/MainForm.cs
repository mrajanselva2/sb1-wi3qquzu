using ExcelSplitter.Services;
using ExcelSplitter.Models;

namespace ExcelSplitter.Forms;

public partial class MainForm : Form
{
    private readonly IExcelService _excelService;
    private string? _currentFilePath;
    private List<SheetInfo>? _sheets;

    public MainForm()
    {
        InitializeComponent();
        _excelService = new ExcelService();
        SetupDragDrop();
    }

    private void SetupDragDrop()
    {
        dropPanel.AllowDrop = true;
        dropPanel.DragEnter += DropPanel_DragEnter;
        dropPanel.DragDrop += DropPanel_DragDrop;
    }

    private void DropPanel_DragEnter(object? sender, DragEventArgs e)
    {
        if (e.Data?.GetDataPresent(DataFormats.FileDrop) == true)
        {
            e.Effect = DragDropEffects.Copy;
        }
    }

    private async void DropPanel_DragDrop(object? sender, DragEventArgs e)
    {
        try
        {
            var files = (string[]?)e.Data?.GetData(DataFormats.FileDrop);
            if (files?.Length > 0)
            {
                await LoadExcelFile(files[0]);
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private async Task LoadExcelFile(string filePath)
    {
        try
        {
            _currentFilePath = filePath;
            fileNameLabel.Text = Path.GetFileName(filePath);
            
            // Load sheets
            _sheets = await _excelService.GetSheetsAsync(filePath);
            
            // Update UI
            primarySheetCombo.Items.Clear();
            primarySheetCombo.Items.AddRange(_sheets.Select(s => s.Name).ToArray());
            if (primarySheetCombo.Items.Count > 0)
            {
                primarySheetCombo.SelectedIndex = 0;
            }

            // Enable controls
            configPanel.Enabled = true;
        }
        catch (Exception ex)
        {
            MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private async void splitButton_Click(object sender, EventArgs e)
    {
        if (string.IsNullOrEmpty(_currentFilePath) || primarySheetCombo.SelectedItem == null || columnCombo.SelectedItem == null)
        {
            MessageBox.Show("Please select all required options", "Validation", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        try
        {
            splitButton.Enabled = false;
            progressBar.Visible = true;

            var results = await _excelService.SplitExcelFileAsync(
                filePath: _currentFilePath,
                primarySheet: primarySheetCombo.SelectedItem.ToString()!,
                columnName: columnCombo.SelectedItem.ToString()!,
                outputPath: outputPathTextBox.Text,
                progress: new Progress<int>(p => progressBar.Value = p)
            );

            DisplayResults(results);
        }
        catch (Exception ex)
        {
            MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
        finally
        {
            splitButton.Enabled = true;
            progressBar.Visible = false;
        }
    }

    private void DisplayResults(IEnumerable<SplitResult> results)
    {
        resultsListView.Items.Clear();
        foreach (var result in results)
        {
            var item = new ListViewItem(result.FileName);
            item.SubItems.Add(result.RowCount.ToString());
            item.SubItems.Add(result.FilePath);
            resultsListView.Items.Add(item);
        }
        
        tabControl.SelectedTab = resultsTab;
        MessageBox.Show("Split operation completed successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }

    private void browseButton_Click(object sender, EventArgs e)
    {
        using var dialog = new OpenFileDialog
        {
            Filter = "Excel Files|*.xlsx",
            Title = "Select an Excel file"
        };

        if (dialog.ShowDialog() == DialogResult.OK)
        {
            LoadExcelFile(dialog.FileName);
        }
    }

    private void outputBrowseButton_Click(object sender, EventArgs e)
    {
        using var dialog = new FolderBrowserDialog
        {
            Description = "Select output folder"
        };

        if (dialog.ShowDialog() == DialogResult.OK)
        {
            outputPathTextBox.Text = dialog.SelectedPath;
        }
    }

    private void primarySheetCombo_SelectedIndexChanged(object sender, EventArgs e)
    {
        if (_sheets == null || primarySheetCombo.SelectedItem == null) return;

        var selectedSheet = _sheets.First(s => s.Name == primarySheetCombo.SelectedItem.ToString());
        
        columnCombo.Items.Clear();
        columnCombo.Items.AddRange(selectedSheet.Columns.ToArray());
        if (columnCombo.Items.Count > 0)
        {
            columnCombo.SelectedIndex = 0;
        }
    }
}