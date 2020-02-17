const fs = require('fs');
const path = require('path');

const cards = (req, res) => {
    fs.readFile(path.join(__dirname, '../data/cards.json'),
        'utf8', (err, data) => {
        if (err) return console.log('test error', err);

        res.set('Content-Type', 'application/json').end(data);
    });
};

module.exports = cards;