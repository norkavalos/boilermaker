const Sequelize = require('sequelize');
const db = require('../database.js');

const Flowershops = db.define('flowershops', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Flowershops;
