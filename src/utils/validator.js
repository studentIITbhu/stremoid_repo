// src/utils/validator.js
const requiredFields = ['sku','name','brand','mrp','price'];

function normalizeRow(rawRow) {
  const row = {};
  Object.keys(rawRow || {}).forEach(k => {
    const key = k ? k.trim().toLowerCase() : k;
    row[key] = rawRow[k] !== undefined && rawRow[k] !== null ? String(rawRow[k]).trim() : '';
  });
  return row;
}

function validateRow(rawRow, rowNum = null) {
  const row = normalizeRow(rawRow);
  const errors = [];

  for (const f of requiredFields) {
    if (!row[f] || row[f].length === 0) errors.push(`Missing required field: ${f}`);
  }

  const mrp = row.mrp !== '' ? parseFloat(row.mrp) : NaN;
  const price = row.price !== '' ? parseFloat(row.price) : NaN;
  const quantity = row.quantity !== '' ? parseInt(row.quantity, 10) : 0;

  if (isNaN(mrp)) errors.push('Invalid mrp (not a number)');
  if (isNaN(price)) errors.push('Invalid price (not a number)');
  if (!isNaN(mrp) && !isNaN(price) && price > mrp) errors.push('price must be <= mrp');
  if (row.quantity !== '' && (isNaN(quantity) || quantity < 0)) errors.push('quantity must be a non-negative integer');

  const cleaned = {
    sku: row.sku || null,
    name: row.name || null,
    brand: row.brand || null,
    color: row.color || null,
    size: row.size || null,
    mrp: isNaN(mrp) ? null : mrp,
    price: isNaN(price) ? null : price,
    quantity: isNaN(quantity) ? 0 : quantity
  };

  return { valid: errors.length === 0, errors, cleaned };
}

module.exports = { validateRow };
