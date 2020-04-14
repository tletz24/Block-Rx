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

exports.demographics = () => {
    return state.db.db("users").collection("demographic");
}

exports.vaccinations = () => {
    return state.db.db("vaccinations").collection("vaccination");
};

exports.connect = function (options, done) {
    if (state.db) return done(state.db);

    MongoClient.connect(dbi, options, function (err, db) {
        if (err) return done(err);

        state.db = db;
        done(null, db);
    });
};

// you must filter on the id, additional filtering is ok
exports.ObjectId = (id) => {
    const _id = new ObjectId(id);
    // placed in object here to semantics only
    return { _id };
};
