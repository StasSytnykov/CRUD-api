const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    `mongodb+srv://stas82kak05:${process.env.MONGOOSE_DATABASE_PASS}@cluster0.pfdpdd6.mongodb.net/CRUD-API?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
