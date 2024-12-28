import express from 'express';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { processExcelFile } from './excelProcessor.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(join(__dirname, '../dist')));
app.use(fileUpload());

app.post('/api/split', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { file } = req.files;
    const { sheetName, columnName } = req.body;

    if (!sheetName || !columnName) {
      return res.status(400).json({ error: 'Sheet name and column name are required' });
    }

    const result = await processExcelFile(file, sheetName, columnName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});