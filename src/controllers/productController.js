// Correct version for mysql2 promise pool
exports.getAllProducts = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM products");
    res.json(results);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Database error" });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Missing name or price" });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
      [name, price, description]
    );
    res.status(201).json({ message: "Product created", id: result.insertId });
  } catch (err) {
    console.error("Error inserting product:", err);
    res.status(500).json({ error: "Database error" });
  }
};
