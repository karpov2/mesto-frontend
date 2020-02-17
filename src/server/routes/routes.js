const router = require('express').Router(); // Создали роутер
const cards = require('./cards');
const users = require('./users.js');
const errorPage = require('./error.js');

router.get('/users', users);
router.get('/users/:_id', users);
router.get('/cards', cards);
router.get('*', errorPage);

module.exports = router;
