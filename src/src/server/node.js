const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {router} = require('./routes/routes.js'); // импортируем роутер
const fs = require('fs');

const { PORT = 3000 } = process.env;
const app = express();

const pageUrl = (req, res, next) => {
    // console.log('Запрос залогирован! ', req.url);
    next();
};

app.use(pageUrl);
app.use('/', router); // запускаем

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    // console.log('path.dirname - ', path.dirname(process.mainModule.filename));
    // console.log('path.join - ', path.join(__dirname));
});
