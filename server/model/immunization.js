const mongoose = require('mongoose');

const VaccineSchema = new mongoose.Schema({
    "diseaseDate": { type: Date },
    "ethnicity": { type: Number },
    "diseaseHistory": { type: String },
    "iisPatientId": { type: String },
    "motherFirstName": { type: String },
    "motherMiddleName": { type: String },
    "motherLastName": { type: String },
    "motherMaidenName": { type: String },
    "countryOfResidence": { type: String },
    "city": { type: String },
    "country": { type: String },
    "state": { type: String },
    "street": { type: String },
    "zip": { type: String },
    "aliasFirstName": { type: String },
    "aliasLastName": { type: String },
    "aliasMiddleName": { type: String },
    "orderOfBirth": { type: Number },
    "stateOfBirth": { type: String },
    "dateOfBirth": { type: Date },
    "email": { type: String },
    "gender": { type: Number },
    "patientId": { type: String },
    "patientType": { type: Number },
    "multipleBirth": { type: Boolean },
    "primaryLanguage": { type: String },
    "statusIndicatorProviderLevel": { type: String },
    "jurisdictionLevel": { type: Number },
    "phoneNumber": { type: String },
    "phoneNumberType": { type: Number },
    "protectionIndicator": { type: Boolean },
    "protectionIndicatorDate": { type: Date },
    "race": { type: Number },
    "recallEffectiveDate": { type: Date },
    "recallStatus": { type: Boolean },
    "responsiblePersonFirstName": { type: String },
    "responsiblePersonLastName": { type: String },
    "responsiblePersonMiddleName": { type: String },
    "responsiblePatientRelationship": { type: String }
});

VaccineSchema.pre('save', async function (next) {
    // delete and throw unimplemented
});

VaccineSchema.statics.create = async function (vaccine, options, cb) {
    // send vaccine to blockchain
}

VaccineSchema.statics.read = async function (vaccineId, cb) {
    // read vaccine from blockchain
}

module.exports = mongoose.model('Vaccine', VaccineSchema, 'vaccination');