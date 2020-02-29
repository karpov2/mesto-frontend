const errorPage = (req, res) => {
    res.set('Content-Type', 'application/json')
       .status(404)
       .send({ "message": "Запрашиваемый ресурс не найден" });
};

module.exports = errorPage;