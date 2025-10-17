// src/app.js
require('dotenv').config();
const express = require('express');
const app = express();

const upload = require('./middlewares/uploadMiddleware');
const { uploadCSV } = require('./controllers/uploadController');
const productRoutes = require('./routes/productRoutes'); // keep existing product routes

app.use(express.json());

// upload endpoint
app.post('/upload', upload.single('file'), uploadCSV);

// mount product routes (list/search)
app.use('/products', productRoutes);

app.get('/', (req, res) => res.json({ status: 'ok', message: 'Product CSV API running' }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
