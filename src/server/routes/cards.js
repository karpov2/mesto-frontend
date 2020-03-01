const path = require('path');
const usersFile = require(path.join(__dirname, '../data/cards.json'));

const cards = (req, res) => res.send(usersFile);

module.exports = cards;