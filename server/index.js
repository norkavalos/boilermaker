const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const db = require('./db');
const app = express();

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

dbStore.sync();
// logging middleware
app.use(volleyball);
app.use('/api', require('./api'));
// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());


// error handling middleware
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
