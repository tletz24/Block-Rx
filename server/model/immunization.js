const mongoose = require('mongoose');
var hfc = require('fabric-client');

import { connection, query, invoke, blockListener } from '../util/blockchain.js';

hfc.addConfigFile('config.json');
var host = 'localhost';
var port = 3000;
var username = "member-healthwallet";
var orgName = "";
var channelName = hfc.getConfigSetting('channelName');
var chaincodeName = hfc.getConfigSetting('chaincodeName');
var peers = hfc.getConfigSetting('peers');

const ImmunizationSchema = new mongoose.Schema({
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

ImmunizationSchema.pre('save', async function (next) {
    // delete and throw unimplemented
    throw 'Do not store Immunization Records in MongoDB';
});

ImmunizationSchema.statics.create = async function (vaccine, options, cb) {
    try {
        if (!options) throw 'options:{username,orgName} required';
        // Need username and orgname defined
        username = options.username;
        orgName = options.orgName || 'health-wallet';

        // send vaccine to blockchain
        var args = vaccine;
        var fcn = "createVaccination";

        let message = await invoke.invokeChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
        // message is a transaction id
        cb(undefined, message);

    } catch (err) {
        cb(err, undefined);
    }
}

ImmunizationSchema.statics.read = async function (vaccineId, options, cb) {
    try {
        // Need username and orgname defined
        username = options.username;
        orgName = options.orgName || 'health-wallet';

        // read vaccine from blockchain
        let args = vaccineId;
        let fcn = "queryVaccination";

        let message = await query.queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
        // message is an array of json
        cb(undefined, message);
    } catch (err) {
        cb(err, undefined);
    }
}

module.exports = mongoose.model('Immunization', ImmunizationSchema, 'immunization');