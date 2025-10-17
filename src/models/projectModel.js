// src/models/productModel.js
const pool = require('../config/db');

async function insertOrUpdateProduct(p) {
  const sql = `
    INSERT INTO products (sku, name, brand, color, size, mrp, price, quantity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      brand = VALUES(brand),
      color = VALUES(color),
      size = VALUES(size),
      mrp = VALUES(mrp),
      price = VALUES(price),
      quantity = VALUES(quantity)
  `;
  const params = [
    p.sku, p.name, p.brand, p.color || null, p.size || null,
    p.mrp, p.price, p.quantity || 0
  ];
  const [result] = await pool.execute(sql, params);
  return result;
}

module.exports = { insertOrUpdateProduct };
