const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Demographic = require('./demographic');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        required: true,
        default: 'patient'
    },
    demographic: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

UserSchema.pre('save', async function (next) {
    bcrypt.hash(this.password, 10, function (err, hash) {
        if (err) console.error(err.message);

        this.password = hash;
        next();
    });
});

UserSchema.methods.checkPassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);
};

UserSchema.methods.getDemographic = async function () {
    return await Demographic.findById(this.demographic).exec();
}

module.exports = mongoose.model('User', UserSchema, 'user');