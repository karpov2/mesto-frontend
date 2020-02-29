const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: { // имя карточки
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    link: { // ссылка на картинку
        type: String,
        required: true
    },
    owner: { // ссылка на модель автора карточки
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    likes: [{ // список лайкнувших пост пользователей
        type: mongoose.Schema.Types.ObjectId,
        default: [],
    }],
    createdAt: { // дата создания
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('card', cardSchema);
