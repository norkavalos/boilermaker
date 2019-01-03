const path = require('path');
const express = require('express');
const volleyball = require('volleyball');

const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));


app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});


module.exports = app;
