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
    "diseaseDate": { type: Date, required: true },
    "ethnicity": { type: Number, required: true },
    "diseaseHistory": { type: String, required: true },
    "iisPatientId": { type: String, required: true },
    "motherFirstName": { type: String, required: true },
    "motherMiddleName": { type: String, required: true },
    "motherLastName": { type: String, required: true },
    "motherMaidenName": { type: String, required: true },
    "countryOfResidence": { type: String, required: true },
    "city": { type: String, required: true },
    "country": { type: String, required: true },
    "state": { type: String, required: true },
    "street": { type: String, required: true },
    "zip": { type: String, required: true },
    "aliasFirstName": { type: String, required: true },
    "aliasLastName": { type: String, required: true },
    "aliasMiddleName": { type: String, required: true },
    "orderOfBirth": { type: Number, required: true },
    "stateOfBirth": { type: String, required: true },
    "dateOfBirth": { type: Date, required: true },
    "email": { type: String, required: true },
    "gender": { type: Number, required: true },
    "patientId": { type: String, required: true },
    "patientType": { type: Number, required: true },
    "multipleBirth": { type: Boolean, required: true },
    "primaryLanguage": { type: String, required: true },
    "statusIndicatorProviderLevel": { type: String, required: true },
    "jurisdictionLevel": { type: Number, required: true },
    "phoneNumber": { type: String, required: true },
    "phoneNumberType": { type: Number, required: true },
    "protectionIndicator": { type: Boolean, required: true },
    "protectionIndicatorDate": { type: Date, required: true },
    "race": { type: Number, required: true },
    "recallEffectiveDate": { type: Date, required: true },
    "recallStatus": { type: Boolean, required: true },
    "responsiblePersonFirstName": { type: String, required: true },
    "responsiblePersonLastName": { type: String, required: true },
    "responsiblePersonMiddleName": { type: String, required: true },
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