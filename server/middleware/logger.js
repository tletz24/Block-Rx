module.exports = function (options) {
    return function (req, res, next) {
        if (options.debug) {
            console.log(req.method, req.hostname, req.url);
        }
        next();
    }
}