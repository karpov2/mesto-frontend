const Card = require('../models/card');

const cardsGet = (req, res) => {
    Card.find({})
        .then(cards => res.send(cards))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в выводе списка карточек', error: err }));
};

const cardPost = (req, res) => {
    const {name, link} = req.body;

    Card.create({name, link, owner: req.user._id})
        .then(card => res.send(card))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в создании новой карточки', error: err }));
};

const cardDelete = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
        .then(card => res.send(card))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в удалении карточки', error: err }));
};

module.exports = {cardsGet, cardPost, cardDelete};
