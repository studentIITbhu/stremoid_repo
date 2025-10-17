const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

// simple test route
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
