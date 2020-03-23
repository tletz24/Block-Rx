exports.auth = (fverif) => {
    return (req, res, next) => {
        const id = 0;
        const password = 0;

        req.auth = fverif({ id, password });

        next();
    };
};