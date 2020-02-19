var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null,
};

exports.connect = function (url, done) {
    if (state.db) return done();

    MongoClient.connect(url, function (err, db) {
        if (err) return done(err);
        console.log("Connected Database");
        state.db = db;
        done();
    });
};

get_db = function (db_name) {
    if (state.db) {
        return state.db.db(db_name);
    } else {
        console.log("Database Not Found");
    }
};

exports.collection = function (db_name, cl_name) {
    return get_db(db_name).collection(cl_name);
};

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        });
    };
};