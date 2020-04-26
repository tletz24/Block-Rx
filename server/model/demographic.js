var mongoose = require('mongoose');

var DemographicSchema = new mongoose.Schema({
    'gender': { type: String },
    'aliasFirstName': { type: String },
    'aliasLastName': { type: String },
    'aliasMiddleName': { type: String },
    'city': { type: String },
    'country': { type: String },
    'countryOfResidence': { type: String },
    'dateOfBirth': { type: Date },
    'diseaseDate': { type: Date },
    'diseaseHistory': { type: String },
    'email': { type: String },
    'ethnicity': { type: String },
    'iisPatientId': { type: String },
    'jurisdictionLevel': { type: String },
    'motherFirstName': { type: String },
    'motherLastName': { type: String },
    'motherMaidenName': { type: String },
    'motherMiddleName': { type: String },
    'multipleBirth': { type: Boolean },
    'orderOfBirth': { type: Number },
    'patientId': { type: String },
    'patientType': { type: String },
    'phoneNumber': { type: String },
    'phoneNumberType': { type: String },
    'primaryLanguage': { type: String },
    'protectionIndicator': { type: Boolean },
    'protectionIndicatorDate': { type: Date },
    'race': { type: String },
    'recallEffectiveDate': { type: Date },
    'recallStatus': { type: Boolean },
    'responsiblePatientRelationship': { type: String },
    'responsiblePersonFirstName': { type: String },
    'responsiblePersonLastName': { type: String },
    'responsiblePersonMiddleName': { type: String },
    'state': { type: String },
    'stateOfBirth': { type: String },
    'statusIndicatorProviderLevel': { type: String },
    'street': { type: String },
    'zip': { type: String }
});

module.exports = mongoose.model('Demographic', DemographicSchema, 'demographic');