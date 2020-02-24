var http = require("http");
var querystring = require("querystring");

exports.get = function (uri, params) {
    var params_ = createParams("GET", uri, params);
    return httpRequest(params_);
};

exports.post = function (uri, params, body) {
    var params_ = createParams("GET", uri, params);
    return httpRequest(params_, body);
};

function createParams(method, path, query_params) {
    path += "?" + querystring.stringify(query_params);

    return {
        host: "localhost",
        port: 3001,
        method,
        path
    };
};

function httpRequest(params, postData) {
    return new Promise(function (resolve, reject) {
        var req = http.request(params, function (res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
};
