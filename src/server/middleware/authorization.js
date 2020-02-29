const authorization = (req, res, next) => {
    req.user = {_id: '5e5a98e279c940480c66a2d7'};
    next();
};

module.exports = authorization;
