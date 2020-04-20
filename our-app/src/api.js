const axios = require("axios").default;

const proxy_options = {
    host: "localhost",
    post: 3001
};

module.exports.post = (url, data) => {
    return axios.post(url, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy: proxy_options
    });
};

module.exports.get = (url, data) => {
				return axios.get(url, data, {
								headers: {
												'Access-Control-Allow-Origin': '*',
								},
								proxy: proxy_options
				});
};
