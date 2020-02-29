const router = require('express').Router(); // Создали роутер
const {cardsGet, cardPost, cardDelete} = require('../controllers/cards');
const {usersGet, userGet, userPost, userProfilePatch} = require('../controllers/users');
const errorPage = require('../controllers/error');

router.use('/users', usersGet); // возвращает всех пользователей
router.get('/users/:userId', userGet); // возвращает пользователя по _id
router.patch('/users/me', userProfilePatch); // обновляет профиль
router.post('/users', userPost); // создаёт пользователя

router.get('/cards', cardsGet); // возвращает все карточки
router.post('/cards', cardPost); // создаёт карточку
router.delete('/cards/:cardId', cardDelete); // удаляет карточку по идентификатору

router.get('*', errorPage);

module.exports = router;
