const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 3000;

//routes
app.get('/', (req, res) => {
  res.send('Hello!');
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
