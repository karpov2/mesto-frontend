// const usersFile = require('../data/users.json');
const fs = require('fs');
const path = require('path');
const usersFile = fs.createReadStream(path.join(__dirname, '../data/users.json'), 'utf8');
const bodyParser = require('body-parser');

const users = (req, res) => {
    let body = '';

    usersFile.on('data', (chunk) => {
        body += chunk; // добавляем каждый приходящий пакет в body
    });

    usersFile.on('end', () => { // когда всё пришло
        res.end(body); // можем работать с объектом из колбэк метода on
    });

    if(req.params._id) {
        const user = usersFile.find(item => item._id === req.params._id);
        console.log(typeof user);
        if(user) return res.send(user);
        return res.status(404).send({ "message": "Нет пользователя с таким id" });
    }

    // return res.send(usersFile);
};

module.exports = users;
