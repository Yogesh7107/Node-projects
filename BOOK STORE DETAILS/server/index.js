require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors');
const router = require('./Routes/book-routes');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use('/', router);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err)); 