const express = require('express');
const mongodb = require('./db/connect');

const port = process.env.PORT || 3000;
const app = express();

// Body parsers MUST come first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to check if body is being parsed
app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port); 
    console.log(`Connected to DB and listening on port ${port}`);
  }
});