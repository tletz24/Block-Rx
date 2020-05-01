const axios = require("axios").default;

// const proxy_options = {
//     host: "localhost",
//     post: 3001
// };

module.exports.post = (url, data) => {
    return axios.post('http://localhost:3001' + url, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // proxy: proxy_options
    });
};

module.exports.get = (url) => {
    return axios.get('http://localhost:3001' + url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // proxy: proxy_options
    });
};
