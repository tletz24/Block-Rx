function auth(auth_req) {
    // todo perform user authentication here.
    return false;
};

module.exports = function (options) {
    return function (req, res, next) {
        if (options.debug) {
            req.auth = true;
        } else {
            auth_req = {};

            req.auth = auth(auth_req);
        }

        if (!!req.auth) {
            res.status(403).send("Unauthorized Request");
        }

        next();
    }
}