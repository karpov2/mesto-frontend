const router = require('express').Router(); // Создали роутер
const {cardsGet, cardPost, cardDelete, cardLikePut, cardLikeDelete} = require('../controllers/cards');
const {usersGet, userGet, userPost, userProfilePatch, userProfileAvatarPatch} = require('../controllers/users');
const errorPage = require('../controllers/error');

router.get('/users', usersGet); // возвращает всех пользователей
router.get('/users/:userId', userGet); // возвращает пользователя по _id
router.patch('/users/me', userProfilePatch); // обновляет профиль
router.patch('/users/me/avatar', userProfileAvatarPatch); // обновляет аватар
router.post('/users', userPost); // создаёт пользователя

router.get('/cards', cardsGet); // возвращает все карточки
router.post('/cards', cardPost); // создаёт карточку
router.delete('/cards/:cardId', cardDelete); // удаляет карточку по идентификатору
router.put('/cards/:cardId/likes', cardLikePut); // поставить лайк карточке
router.delete('/cards/:cardId/likes', cardLikeDelete); // убрать лайк с карточки

router.get('*', errorPage);

module.exports = router;
