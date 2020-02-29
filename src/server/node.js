const path = require('path');
const express = require('express');
const router = require('./routes/routes'); // импортируем роутер
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authorization = require('./middleware/authorization');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(bodyParser.json()); // parse application/json
app.use(authorization);
app.use(router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
