const Card = require('../models/card');

// возвращает все карточки
const cardsGet = (req, res) => {
    Card.find({})
        .then(cards => res.send(cards))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в выводе списка карточек', error: err }));
};

// создаёт карточку
const cardPost = (req, res) => {
    const {name, link} = req.body;
    Card.create({name, link, owner: req.user._id})
        .then(card => res.send(card))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в создании новой карточки', error: err }));
};

// удаляет карточку по идентификатору
const cardDelete = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
        .then(card => res.send(card))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в удалении карточки', error: err }));
};

// поставить лайк карточке
const cardLikePut = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: {likes: req.user._id} }, // добавить _id в массив, если его там нет
        { new: true },
    )
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка в добавлении лайка карточки', error: err }));
};

// убрать лайк с карточки
const cardLikeDelete = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
    )
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка в удалении лайка карточки', error: err }));
};

module.exports = {cardsGet, cardPost, cardDelete, cardLikePut, cardLikeDelete};
