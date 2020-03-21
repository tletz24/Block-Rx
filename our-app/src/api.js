var needle = require("needle");
var request = require("request");

const placeholder = "localhost:3001";

// module.exports.post = (url, body) => {
//     return needle.request('post', url, body, { json: true, port: 3000 });
// };

module.exports.post = (url, formData, callback = undefined) => {
    request.post({ url: placeholder + url, formData: formData }, (err, httpResponse, body) => {
        if (!!callback || callback === undefined) {
            return new Promise((resolve, reject) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ body, httpResponse });
                }
            })
        } else {
            callback({ body, httpResponse }, err);
        }
    });
};

module.exports.get = (url, params) => {
    return needle.request('get', url, params);
};

module.exports.put = (url, body) => {
    return needle.request('put', url, body, { json: true });
};
