var password = require("./password");
var MongoClient = require("mongodb").MongoClient;

const dbi = "mongodb+srv://cpu:" + password + "@cluster0-xs215.mongodb.net/test?retryWrites=true&w=majority";

var state = {
    db: null,
};

exports.connect = function (conn_str = null, done) {
    if (state.db) {
        return done(null, state.db);
    }
    conn_str = dbi;

    options = { useNewUrlParser: true }

    MongoClient.connect(conn_str, options, function (err, db) {
        if (err) {
            return done(err, null);
        }

        state.db = db;

        done(null, db);
    });
};

exports.users = function (retryCount = 0) {
    var db_ = state.db.db("users");
    return db_.collection("user");
};

/**
 * todo remove this function entirely
 */
get_db = function (db_name) {
    if (state.db) {
        return state.db.db(db_name);
    } else {
        console.log("Database Not Found");
    }
};

/**
 * todo remove this function entirely
 */
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