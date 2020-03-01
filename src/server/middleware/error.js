const error = (error, req, res, next) => {
    if (error instanceof SyntaxError) {
        return res.status(400).json({
            message: 'Invalid Json Body',
            error
        });
    }
    next();
};

module.exports = error;
