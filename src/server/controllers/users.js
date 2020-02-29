const User = require('../models/user');

const usersGet = (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в выводе списка пользователей', error: err }));
};

const userGet = (req, res) => {
    User.findById(req.params.userId)
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в выводе пользователя', error: err }));
};

const userProfilePatch = (req, res) => {
    const {name} = req.body;

    User.findByIdAndUpdate(req.user._id, {name})
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в выводе пользователя', error: err }));
};

const userPost = (req, res) => {
    const {name, about, avatar} = req.body;

    User.create({name, about, avatar})
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в создании нового пользователя', error: err }));
};

module.exports = {usersGet, userGet, userPost, userProfilePatch};
