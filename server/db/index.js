//associations go here;
const db = require('./database');
const Plants = require('./models/plants');
const Flowershops = require('./models/flowershops');


Flowershops.hasMany(Plants);
Plants.belongsToMany(Flowershops, {through: 'PlantShop'});


module.exports = {
    db,
    Flowershops,
    Plants
};
