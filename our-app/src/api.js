var needle = require("needle");

module.exports.post = (url, body) => {
    return needle.request('post', url, body, { json: true });
};

module.exports.get = (url, params) => {
    return needle.request('get', url, params);
};

module.exports.put = (url, body) => {
    return needle.request('put', url, body, { json: true });
};