// src/controllers/uploadController.js
const csvParser = require('csv-parser');
const { validateRow } = require('../utils/validator');
const { insertOrUpdateProduct } = require('../models/productModel');

async function uploadCSV(req, res) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: 'No file uploaded. Use form field "file" with a .csv file.' });
    }

    const stored = { count: 0 };
    const failed = [];
    const stream = require('stream');
    const readable = new stream.Readable();
    readable.push(req.file.buffer);
    readable.push(null);

    let rowNum = 0;

    readable
      .pipe(csvParser({ mapHeaders: ({ header }) => header.trim().toLowerCase() })) // trim + lower-case headers
      .on('data', async (data) => {
        readable.pause();
        rowNum += 1;
        try {
          const { valid, errors, cleaned } = validateRow(data, rowNum);
          if (!valid) {
            failed.push({ row: rowNum, errors });
          } else {
            try {
              await insertOrUpdateProduct(cleaned);
              stored.count += 1;
            } catch (dbErr) {
              failed.push({ row: rowNum, errors: ['DB insert error', dbErr.message] });
            }
          }
        } catch (err) {
          failed.push({ row: rowNum, errors: [err.message] });
        } finally {
          readable.resume();
        }
      })
      .on('end', () => {
        return res.json({ stored: stored.count, failed });
      })
      .on('error', (err) => {
        return res.status(500).json({ error: 'CSV parse error', message: err.message });
      });

  } catch (err) {
    console.error('uploadCSV error', err);
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { uploadCSV };
