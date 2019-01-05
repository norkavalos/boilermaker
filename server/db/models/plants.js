const Sequelize = require('sequelize');
const db = require('../database.js');

const Plants = db.define('plants', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.ENUM,
    values: ['small', 'medium', 'large']
  },
  sunlight: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  species: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  flowers: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Plants;
