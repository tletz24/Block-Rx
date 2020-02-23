/*
 * in /db/password.js: module.exports = "{my_password}";         
 * Must create this yourself. Because password.js 
 * is an excluded item in our .gitignore.
*/
var password = require("./password");
var MongoClient = require("mongodb").MongoClient;

const dbi = "mongodb+srv://cpu:" + password + "@cluster0-xs215.mongodb.net/test?retryWrites=true&w=majority";

var state = {
    db: null,
};

exports.connect = function (conn_str = null, options = null, done) {
    if (state.db) {
        return done(null, state.db);
    }

    if (!!conn_str) {
        conn_str = dbi;
    }

    if (!!options) {
        options = { useNewUrlParser: true }
    }

    MongoClient.connect(conn_str, options, function (err, db) {
        if (err) {
            return done(err, null);
        }

        state.db = db;

        done(null, db);
    });
};

exports.users = function (retryCount = 0) {
    // connect to users collection object
    if (state.db) {
        var db_ = state.db.db("users");
        return db_.collection("user");
    } else {
        // retry a total of three times then quit
        if (retryCount < 3) {
            module.exports.connect(done = function (err, db) {
                retryAttempt = retryCount + 1;
                console.log("Retry connect to db, try number " + retryAttempt);
                module.exports.users(retryAttempt);
            });
        } else {
            process.exit(1);
        }
    }
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