function auth(username, password) {
    // todo perform user authentication here.
    return true;
};

module.exports = function (options) {
    return function (req, res, next) {
        if (options.debug) {
            req.auth = true;
        } else {
            username = "";
            password = "";

            req.auth = auth(username, password);
        }
        next();
    }
}