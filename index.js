const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3012;
const DB_URL = 'mongodb://localhost:27017/example-db';

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require('./routes');
app.use(routes);


app.listen(PORT, () => {
  console.log(`SERVER is running on http://localhost:${PORT}`);
});
