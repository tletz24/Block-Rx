const password = require("./password");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId
const dbi = "mongodb+srv://cpu:" + password + "@cluster0-xs215.mongodb.net/test?retryWrites=true&w=majority";

const state = {
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
exports.ObjectId = (id) => {
    const _id = new ObjectId(id);
    // placed in object here to semantics only
    return { _id };
};