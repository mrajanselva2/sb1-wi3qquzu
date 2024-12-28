namespace ExcelSplitter.Forms;

partial class MainForm
{
    private System.ComponentModel.IContainer components = null;

    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }
        base.Dispose(disposing);
    }

    private void InitializeComponent()
    {
        components = new System.ComponentModel.Container();
        this.Text = "Excel File Splitter";
        this.Size = new System.Drawing.Size(800, 600);
        this.StartPosition = FormStartPosition.CenterScreen;

        // Initialize controls
        dropPanel = new Panel();
        fileNameLabel = new Label();
        configPanel = new Panel();
        primarySheetCombo = new ComboBox();
        columnCombo = new ComboBox();
        outputPathTextBox = new TextBox();
        browseButton = new Button();
        outputBrowseButton = new Button();
        splitButton = new Button();
        progressBar = new ProgressBar();
        tabControl = new TabControl();
        configTab = new TabPage();
        resultsTab = new TabPage();
        resultsListView = new ListView();

        // Set up drop panel
        dropPanel.BorderStyle = BorderStyle.FixedSingle;
        dropPanel.Dock = DockStyle.Top;
        dropPanel.Height = 100;
        dropPanel.Paint += (s, e) => {
            var g = e.Graphics;
            var text = "Drop Excel file here or click to browse";
            var font = new Font(FontFamily.GenericSansSerif, 12);
            var size = g.MeasureString(text, font);
            g.DrawString(text, font, Brushes.Gray, 
                (dropPanel.Width - size.Width) / 2,
                (dropPanel.Height - size.Height) / 2);
        };
        dropPanel.Click += (s, e) => browseButton.PerformClick();

        // Set up config panel
        configPanel.Enabled = false;
        configPanel.Dock = DockStyle.Fill;
        configPanel.Padding = new Padding(10);

        // Set up combo boxes
        primarySheetCombo.DropDownStyle = ComboBoxStyle.DropDownList;
        columnCombo.DropDownStyle = ComboBoxStyle.DropDownList;

        // Set up buttons
        splitButton.Text = "Split Excel File";
        splitButton.Click += splitButton_Click;

        // Set up progress bar
        progressBar.Visible = false;
        progressBar.Style = ProgressBarStyle.Continuous;

        // Set up results list view
        resultsListView.View = View.Details;
        resultsListView.Columns.Add("File Name", 200);
        resultsListView.Columns.Add("Rows", 100);
        resultsListView.Columns.Add("Path", 300);
        resultsListView.Dock = DockStyle.Fill;

        // Layout
        var layout = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 2,
            RowCount = 4,
            Padding = new Padding(10)
        };

        layout.Controls.Add(new Label { Text = "Primary Sheet:" }, 0, 0);
        layout.Controls.Add(primarySheetCombo, 1, 0);
        layout.Controls.Add(new Label { Text = "Split by Column:" }, 0, 1);
        layout.Controls.Add(columnCombo, 1, 1);
        layout.Controls.Add(new Label { Text = "Output Folder:" }, 0, 2);
        
        var outputPanel = new FlowLayoutPanel { Dock = DockStyle.Fill };
        outputPanel.Controls.Add(outputPathTextBox);
        outputPanel.Controls.Add(outputBrowseButton);
        layout.Controls.Add(outputPanel, 1, 2);
        
        layout.Controls.Add(splitButton, 1, 3);
        layout.Controls.Add(progressBar, 1, 4);

        configPanel.Controls.Add(layout);

        // Set up tabs
        configTab.Text = "Configuration";
        resultsTab.Text = "Results";
        
        configTab.Controls.Add(configPanel);
        resultsTab.Controls.Add(resultsListView);
        
        tabControl.Controls.Add(configTab);
        tabControl.Controls.Add(resultsTab);
        tabControl.Dock = DockStyle.Fill;

        // Add controls to form
        this.Controls.Add(tabControl);
        this.Controls.Add(dropPanel);
    }

    private Panel dropPanel;
    private Label fileNameLabel;
    private Panel configPanel;
    private ComboBox primarySheetCombo;
    private ComboBox columnCombo;
    private TextBox outputPathTextBox;
    private Button browseButton;
    private Button outputBrowseButton;
    private Button splitButton;
    private ProgressBar progressBar;
    private TabControl tabControl;
    private TabPage configTab;
    private TabPage resultsTab;
    private ListView resultsListView;
}