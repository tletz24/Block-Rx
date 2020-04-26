/*
# Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# 
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# A copy of the License is located at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# or in the "license" file accompanying this file. This file is distributed 
# on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
# express or implied. See the License for the specific language governing 
# permissions and limitations under the License.
#
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

/************************************************************************************************
 * 
 * GENERAL FUNCTIONS 
 * 
 ************************************************************************************************/

/**
 * Executes a query using a specific key
 * 
 * @param {*} key - the key to use in the query
 */
async function queryByKey(stub, key) {
  console.log('============= START : queryByKey ===========');
  console.log('##### queryByKey key: ' + key);

  let resultAsBytes = await stub.getState(key); 
  if (!resultAsBytes || resultAsBytes.toString().length <= 0) {
    throw new Error('##### queryByKey key: ' + key + ' does not exist');
  }
  console.log('##### queryByKey response: ' + resultAsBytes);
  console.log('============= END : queryByKey ===========');
  return resultAsBytes;
}

/**
 * Executes a query based on a provided queryString
 * 
 * I originally wrote this function to handle rich queries via CouchDB, but subsequently needed
 * to support LevelDB range queries where CouchDB was not available.
 * 
 * @param {*} queryString - the query string to execute
 */
async function queryByString(stub, queryString) {
  console.log('============= START : queryByString ===========');
  console.log("##### queryByString queryString: " + queryString);

  // CouchDB Query
  // let iterator = await stub.getQueryResult(queryString);

  // Equivalent LevelDB Query. We need to parse queryString to determine what is being queried
  // In this chaincode, all queries will either query ALL records for a specific docType, or
  // they will filter ALL the records looking for a specific NGO, Donor, Donation, etc. So far, 
  // in this chaincode there is a maximum of one filter parameter in addition to the docType.
  let docType = "";
  let startKey = "";
  let endKey = "";
  let jsonQueryString = JSON.parse(queryString);
  if (jsonQueryString['selector'] && jsonQueryString['selector']['docType']) {
    docType = jsonQueryString['selector']['docType'];
    //console.log(docType);
    //startKey = docType + "0";
    //console.log(startKey);
    //endKey = docType + "z";
    //console.log(endKey);
  }
  else {
    throw new Error('##### queryByString - Cannot call queryByString without a docType element: ' + queryString);   
  }

  let iterator = await stub.getStateByRange(startKey, endKey);
  console.log('Iterator: ' + iterator)
  // Iterator handling is identical for both CouchDB and LevelDB result sets, with the 
  // exception of the filter handling in the commented section below
  let allResults = [];
  while (true) {
    let res = await iterator.next();
    //console.log('##### queryByString Value: ' + res.value.value.toString('utf8'));

    if (res.value && res.value.value.toString()) {
      let response_json = JSON.parse(res.value.value.toString('utf8'));
      if (response_json["docType"] == jsonQueryString['selector']['docType']){
        let jsonRes = {};
        console.log('##### queryByString iterator: ' + res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;
        console.log('jsonRes.Key: ' + jsonRes.Key);
        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
          console.log('jsonRes.Record: ' + jsonRes.Record);
        }
        catch (err) {
          console.log('##### queryByString error: ' + err);
          jsonRes.Record = res.value.value.toString('utf8');
        }
        // ******************* LevelDB filter handling ******************************************
        // LevelDB: additional code required to filter out records we don't need
        // Check that each filter condition in jsonQueryString can be found in the iterator json
        // If we are using CouchDB, this isn't required as rich query supports selectors
        let jsonRecord = jsonQueryString['selector'];
        console.log(jsonRecord)
        // If there is only a docType, no need to filter, just return all
        console.log('##### queryByString jsonRecord - number of JSON keys: ' + Object.keys(jsonRecord).length);
        if (Object.keys(jsonRecord).length == 1) {
          allResults.push(jsonRes);
          continue;
        }
        for (var key in jsonRecord) {
          if (jsonRecord.hasOwnProperty(key)) {
            console.log('##### queryByString jsonRecord key: ' + key + " value: " + jsonRecord[key]);
            if (key == "docType") {
              continue;
            }
            console.log('##### queryByString json iterator has key: ' + jsonRes.Record[key]);
            if (!(jsonRes.Record[key] && jsonRes.Record[key] == jsonRecord[key])) {
              // we do not want this record as it does not match the filter criteria
              continue;
            }
            allResults.push(jsonRes);
            console.log('allResults: ' + allResults);
          }
        }
      }

      // ******************* End LevelDB filter handling ******************************************
      // For CouchDB, push all results
      // allResults.push(jsonRes);
    }
    if (res.done) {
      await iterator.close();
      console.log('##### queryByString all results: ' + JSON.stringify(allResults));
      console.log('============= END : queryByString ===========');
      return Buffer.from(JSON.stringify(allResults));
    }
  }
}


/************************************************************************************************
 * 
 * CHAINCODE
 * 
 ************************************************************************************************/

let Chaincode = class {

  /**
   * Initialize the state when the chaincode is either instantiated or upgraded
   *
   * @param {*} stub
   */
  async Init(stub) {
    console.log('=========== Init: Instantiated / Upgraded ngo chaincode ===========');
    return shim.success();
  }

  /**
   * The Invoke method will call the methods below based on the method name passed by the calling
   * program.
   *
   * @param {*} stub
   */
  async Invoke(stub) {
    console.log('============= START : Invoke ===========');
    let ret = stub.getFunctionAndParameters();
    console.log('##### Invoke args: ' + JSON.stringify(ret));

    let method = this[ret.fcn];
    if (!method) {
      console.error('##### Invoke - error: no chaincode function with name: ' + ret.fcn + ' found');
      throw new Error('No chaincode function with name: ' + ret.fcn + ' found');
    }
    try {
      let response = await method(stub, ret.params);
      console.log('##### Invoke response payload: ' + response);
      return shim.success(response);
    } catch (err) {
      console.log('##### Invoke - error: ' + err);
      return shim.error(err);
    }
  }

  /**
   * Initialize the state. This should be explicitly called if required.
   *
   * @param {*} stub
   * @param {*} args
   */
  async initLedger(stub, args) {
    console.log('============= START : Initialize Ledger ===========');
    console.log('============= END : Initialize Ledger ===========');
  }

  /************************************************************************************************
   *
   * Vacination functions
   *
   ************************************************************************************************/

  /**
   * Creates a new vaccination event
   *
   * @param {*} stub
   * @param {*} args - JSON as follows:
   * {
   *    "vaccinationId":"EE1234",
   *    "patientId":"EE1234",
   *    "vLocation":"edge",
   *    "vContraindications":"A reason(s) to consider not giving a patient a vaccine proposed for administration.",
   *    "vContraindicationsDate":"2018-10-22T11:52:20.182Z",
   *    "vElegablity":"BlueCrossBlueSheild",
   *    "vExceptionDate":"2018-10-22T11:52:20.182Z",
   *    "vExceptionReason":"Sick",
   *    "vOrgOrigination":"Provider ID",   IIS-AO ID
   *    "vOrgSubmitter":"Provider ID",         IIS-AO ID
   *    "vAdminDate":"2018-10-22T11:52:20.182Z",
   *    "vaccinaitionIdSubmitting":"EE1234",
   *    "vEventType":"administered",
   *    "vProviderPersonName":"Joe Doe",
   *    "vProviderPersonSuffix":"RN",
   *    "vDoseVolume":".5",
   *    "vDoseVolumeUnits":"ml",
   *    "vExpirationDate":"2018-10-22T11:52:20.182Z",
   *    "vFundingSource":"private",
   *    "vInfoStatementPubDate":"2018-10-22T11:52:20.182Z",
   *    "vInfoStatementDate":"2018-10-22T11:52:20.182Z",
   *    "vLotNum":"120020",
   *    "vMfgName":"Pfizer",
   *    "vOrderingProvider":"Joe Person MD",
   *    "vProduct":"162",
   *    "vRouteOfAdmin":"Injection"
   *    "vSiteOfAdmin":"Left Arm"
   * }
   */
  async createVaccination(stub, args) {
    console.log('============= START : createVaccination ===========');
    console.log('##### createVaccination arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = json['vaccinationId'];
    json['docType'] = 'vaccinationRecord';

    console.log('##### createVaccination payload: ' + JSON.stringify(json));

    // Check if the donor already exists
    let donorQuery = await stub.getState(key);
    if (donorQuery.toString()) {
      throw new Error('##### createVaccination - This Vaccination already exists: ' + json['vaccinaitionId']);
    }

    await stub.putState(key, Buffer.from(JSON.stringify(json)));
    console.log('============= END : createVaccination ===========');
  }

  /**
   * Retrieves a specific vaccination
   *
   * @param {*} stub
   * @param {*} args
   */
  async queryVaccination(stub, args) {
    console.log('============= START : queryVaccination ===========');
    console.log('##### queryVaccination arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = json['vaccinationId'];
    console.log('##### queryVaccination key: ' + key);

    return queryByKey(stub, key);
  }

  /**
   * Retrieves all donors
   *
   * @param {*} stub
   * @param {*} args
   */
  async queryAllVaccinations(stub, args) {
    console.log('============= START : queryAllVaccinations ===========');
    console.log('##### queryAllVaccinations arguments: ' + JSON.stringify(args));

    let queryString = '{"selector": {"docType": "vaccinationRecord"}}';
    let query = queryByString(stub, queryString);
    console.log(query);
    return query;
  }

  /**
   * Retrieves all donors
   *
   * @param {*} stub
   * @param {*} args
   */
  async queryPatientVaccinations(stub, args) {
    console.log('============= START : queryAllVaccinations ===========');
    console.log('##### queryAllVaccinations arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    //let key = json['patientID'];

    // '{"selector": {"docType": "donation", "donorUserName": "' + json['donorUserName'] + '"}}';

    let queryString = '{"selector": {"docType": "vaccinationRecord", "patientId": "' + json['patientID'] + '"}}';
    let query = queryByString(stub, queryString);
    console.log(query);
    return query;
  }
};


shim.start(new Chaincode());
