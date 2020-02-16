const router = require('express').Router(); // Создали роутер
const fs = require('fs');
const path = require('path');

const readFile = (req, res) => {
    fs.readFile(path.join(path.dirname(__dirname), 'data', `${req.url.substr(1)}.json`), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.set('Content-Type', 'application/json');
        res.send(data);
    });
};

router.get('/users', readFile);
router.get('/cards', readFile);

module.exports = {router}; // экспортировали роутер
