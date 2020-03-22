var request = require("request");

const placeholder = "localhost:3001";

export const post = (url, formData) => {
    url = placeholder + url;

    return new Promise((resolve, reject) => {
        request.post({ url, formData }, (err, httpResponse, body) => {
            if (err) {
                reject(err);
            } else {
                resolve({ body, httpResponse });
            }
        });
    });
};
