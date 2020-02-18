const path = require('path');
const usersFile = require(path.join(__dirname, '../data/users.json'));

const users = (req, res) => {
    if(req.params._id) {
        const user = usersFile.find(item => item._id === req.params._id);
        if (user) return res.send(user);
        res.status(404).send({ "message": "Нет пользователя с таким id" });
    }

    res.send(usersFile);
};

module.exports = users;
