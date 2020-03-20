exports.auth = (fverif) => {
    return (req, res, next) => {
        let id = 0;
        let password = 0;

        req.auth = fverif({ id, password });

        next();
    };
};