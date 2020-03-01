const User = require('../models/user');

// возвращает всех пользователей
const usersGet = (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в выводе списка пользователей', error: err }));
};

// возвращает пользователя по _id
const userGet = (req, res) => {
    User.findById(req.params.userId)
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в выводе пользователя', error: err }));
};

// обновляет профиль
const userProfilePatch = (req, res) => {
    const {name} = req.body;

    User.findByIdAndUpdate(req.user._id, {name: name})
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в обновлении информации пользователя', error: err }));
};

// обновляет аватар
const userProfileAvatarPatch = (req, res) => {
    const {avatar} = req.body;

    User.findByIdAndUpdate(req.user._id, {avatar: avatar})
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в обновлении аватарки пользователя', error: err }));
};

// создаёт пользователя
const userPost = (req, res) => {
    const {name, about, avatar} = req.body;

    User.create({name, about, avatar})
        .then(user => res.send(user))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка в создании нового пользователя', error: err }));
};

module.exports = {usersGet, userGet, userPost, userProfilePatch, userProfileAvatarPatch};
