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
import { configure, getLogger } from 'log4js';
configure({
  appenders: {
    out: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
  }
});
var logger = getLogger('NGOAPI');
import { Server } from 'ws';
import { Router } from 'express';
import { json, urlencoded } from 'body-parser';
import { createServer } from 'http';
import { inspect } from 'util';
var router = Router();
import cors from 'cors';
import { addConfigFile, getConfigSetting } from 'fabric-client';

import { getRegisteredUser } from '../util/connection.js';
import { queryChaincode } from '../util/query.js';
import { invokeChaincode } from '../util/invoke.js';
import { startBlockListener } from '../util/blocklistener.js';

addConfigFile('config.json');
var host = 'localhost';
var port = 3000;
var username = "member-healthwallet";
var orgName = "";
var channelName = getConfigSetting('channelName');
var chaincodeName = getConfigSetting('chaincodeName');
var peers = getConfigSetting('peers');
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// SET CONFIGURATIONS ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
router.options('*', cors());
router.use(cors());
router.use(json());
router.use(urlencoded({
  extended: false
}));
router.use(function (req, res, next) {
  logger.info(' ##### New request for URL %s', req.originalUrl);
  return next();
});
//wrrouterer to handle errors thrown by async functions. We can catch all
//errors thrown by async functions in a single place, here in this function,
//rather than having a try-catch in every function below. The 'next' statement
//used here will invoke the error handler function - see the end of this script
const awaitHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    }
    catch (err) {
      next(err)
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// START SERVER /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var server = createServer(router).listen(port, function () { });
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  Listening on: http://%s:%s  ******************', host, port);
server.timeout = 240000;

function getErrorMessage(field) {
  var response = {
    success: false,
    message: field + ' field is missing or Invalid in the request'
  };
  return response;
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// START WEBSOCKET SERVER ///////////////////////
///////////////////////////////////////////////////////////////////////////////
const wss = new Server({ server });
wss.on('connection', function connection(ws) {
  logger.info('****************** WEBSOCKET SERVER - received connection ************************');
  ws.on('message', function incoming(message) {
    console.log('##### Websocket Server received message: %s', message);
  });

  ws.send('something');
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////// REST ENDPOINTS START HERE ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Health check - can be called by load balancer to check health of REST API
router.get('/health', awaitHandler(async (req, res) => {
  res.sendStatus(200);
}));

// Register and enroll user. A user must be registered and enrolled before any queries 
// or transactions can be invoked
router.post('/users', awaitHandler(async (req, res) => {
  logger.info('================ POST on Users');
  username = req.body.username || 'michael';
  orgName = req.body.orgName || 'health-wallet';
  logger.info('##### End point : /users');
  logger.info('##### POST on Users- username : ' + username);
  logger.info('##### POST on Users - userorg  : ' + orgName);
  let response = await getRegisteredUser(username, orgName, true);
  logger.info('##### POST on Users - returned from registering the username %s for organization %s', username, orgName);
  logger.info('##### POST on Users - getRegisteredUser response secret %s', response.secret);
  logger.info('##### POST on Users - getRegisteredUser response secret %s', response.message);
  if (response && typeof response !== 'string') {
    logger.info('##### POST on Users - Successfully registered the username %s for organization %s', username, orgName);
    logger.info('##### POST on Users - getRegisteredUser response %s', response);
    // Now that we have a username & org, we can start the block listener
    await startBlockListener(channelName, username, orgName, wss);
    res.json(response);
  } else {
    logger.error('##### POST on Users - Failed to register the username %s for organization %s with::%s', username, orgName, response);
    res.json({ success: false, message: response });
  }
}));

/************************************************************************************
 * Vaccinations methods
 ************************************************************************************/

// GET vaccinations
router.get('/vaccinations', awaitHandler(async (req, res) => {
  logger.info('================ GET on vaccinations');
  let args = {};
  let fcn = "queryAllVaccinations";

  logger.info('##### GET on vaccinations - username : ' + username);
  logger.info('##### GET on vaccinations - userOrg : ' + orgName);
  logger.info('##### GET on vaccinations - channelName : ' + channelName);
  logger.info('##### GET on vaccinations - chaincodeName : ' + chaincodeName);
  logger.info('##### GET on vaccinations - fcn : ' + fcn);
  logger.info('##### GET on vaccinations - args : ' + JSON.stringify(args));
  logger.info('##### GET on vaccinations - peers : ' + peers);
  logger.info('##### GET on vaccinations - peers : ' + peers);

  let message = await queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
  res.send(message);
}));

// GET a specific vaccination
router.get('/vaccinations/:vaccinationId', awaitHandler(async (req, res) => {
  logger.info('================ GET on vac by vac ID');
  logger.info('Username : ' + req.params);
  let args = req.params;
  let fcn = "queryVaccination";

  logger.info('##### GET on vaccinations by username - username : ' + username);
  logger.info('##### GET on vaccinations by username - userOrg : ' + orgName);
  logger.info('##### GET on vaccinations by username - channelName : ' + channelName);
  logger.info('##### GET on vaccinations by username - chaincodeName : ' + chaincodeName);
  logger.info('##### GET on vaccinations by username - fcn : ' + fcn);
  logger.info('##### GET on vaccinations by username - args : ' + JSON.stringify(args));
  logger.info('##### GET on vaccinations by username - peers : ' + peers);

  let message = await queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
  res.send(message);
}));

router.get('/patient-vaccinations/:patientID', awaitHandler(async (req, res) => {
  // do our stuff 
  next();
}));

// GET a specific patient vaccinations
router.get('/patient-vaccinations/:patientID', awaitHandler(async (req, res) => {
  logger.info('================ GET on vac by patient ID');
  logger.info('Username : ' + req.params);
  let args = req.params;
  let fcn = "queryPatientVaccinations";

  logger.info('##### GET on patient vaccinations by username - username : ' + username);
  logger.info('##### GET on patient vaccinations by username - userOrg : ' + orgName);
  logger.info('##### GET on patient vaccinations by username - channelName : ' + channelName);
  logger.info('##### GET on patient vaccinations by username - chaincodeName : ' + chaincodeName);
  logger.info('##### GET on patient vaccinations by username - fcn : ' + fcn);
  logger.info('##### GET on patient vaccinations by username - args : ' + JSON.stringify(args));
  logger.info('##### GET on patient vaccinations by username - peers : ' + peers);

  let message = await queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
  res.send(message);
}));

// POST Donor
router.post('/vaccinations', awaitHandler(async (req, res) => {
  logger.info('================ POST on vaccinations');
  var args = req.body;
  var fcn = "createVaccination";

  logger.info('##### POST on vaccinations - username : ' + username);
  logger.info('##### POST on vaccinations - userOrg : ' + orgName);
  logger.info('##### POST on vaccinations - channelName : ' + channelName);
  logger.info('##### POST on vaccinations - chaincodeName : ' + chaincodeName);
  logger.info('##### POST on vaccinations - fcn : ' + fcn);
  logger.info('##### POST on vaccinations - args : ' + JSON.stringify(args));
  logger.info('##### POST on vaccinations - peers : ' + peers);

  let message = await invokeChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
  res.send(message);
}));


/************************************************************************************
 * Blockchain metadata methods
 ************************************************************************************/

// GET details of a blockchain transaction using the record key (i.e. the key used to store the transaction
// in the world state)
router.get('/blockinfos/:docType/keys/:key', awaitHandler(async (req, res) => {
  logger.info('================ GET on blockinfo');
  logger.info('Key is : ' + req.params);
  let args = req.params;
  let fcn = "queryHistoryForKey";

  logger.info('##### GET on blockinfo - username : ' + username);
  logger.info('##### GET on blockinfo - userOrg : ' + orgName);
  logger.info('##### GET on blockinfo - channelName : ' + channelName);
  logger.info('##### GET on blockinfo - chaincodeName : ' + chaincodeName);
  logger.info('##### GET on blockinfo - fcn : ' + fcn);
  logger.info('##### GET on blockinfo - args : ' + JSON.stringify(args));
  logger.info('##### GET on blockinfo - peers : ' + peers);

  let history = await queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
  logger.info('##### GET on blockinfo - queryHistoryForKey : ' + inspect(history));
  res.send(history);
}));

/************************************************************************************
 * Error handler
 ************************************************************************************/

router.use(function (error, req, res, next) {
  res.status(500).json({ error: error.toString() });
});

export default router;
