const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { // имя пользователя
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    about: { // информация о пользователе
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    avatar: { // ссылка на аватарку
        type: String,
        required: true,
        validate: {
            validator: (link) => {
                return /^https?:\/\/\S+(?:\.[a-zA-Z]{2,8})\/\S+(?:jpg|jpeg|png)$/.test(link);
            },
            message: props => `${props.value} не правильно указана ссылка на картинку`
        }
    }
});

module.exports = mongoose.model('user', userSchema);
