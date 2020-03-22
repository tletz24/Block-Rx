var password = require("./password");
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var ObjectId = mongo.ObjectId
const dbi = "mongodb+srv://cpu:" + password + "@cluster0-xs215.mongodb.net/test?retryWrites=true&w=majority";

var state = {
    db: null,
};

exports.users = () => {
    return state.db.db("users").collection("user");
};

exports.connect = function (done) {
    if (state.db) return done(state.db);

    MongoClient.connect(dbi, { useNewUrlParser: true }, function (err, db) {
        if (err) return done(err);

        state.db = db;
        done();
    });
};

// you must filter on the id, additional filtering is ok
exports.filter = (id, other_filters = {}) => {
    const _id = new ObjectId(id);

    return {
        _id,
        ...other_filters
    };
};