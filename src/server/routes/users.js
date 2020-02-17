const fs = require('fs');
const path = require('path');

const users = (req, res) => {
    fs.readFile(path.join(__dirname, '../data/users.json'),
        'utf8', (err, data) => {
        if (err) return console.log('test error', err);

        if(req.params._id) {
            const user = JSON.parse(data).find(item => item._id === req.params._id);
            res.set('Content-Type', 'application/json');

            if(user) return res.end(JSON.stringify(user));
            return res.status(404).send({ "message": "Нет пользователя с таким id" });

        }

        res.set('Content-Type', 'application/json').end(data);
    });
};

module.exports = users;