const path = require('path');
const express = require('express');
const router = require('./routes/routes.js'); // импортируем роутер

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
