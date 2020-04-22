// **********************************************************
// *      General blockchain support applications           *
// **********************************************************




// **********************************************************
// *                  blocklistener.js                      *
// **********************************************************

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

// Starts a Fabric event hub listener to listen for new blocks
// Starts a websocket server to push notifications when new blocks arrive


'use strict';
var util = require('util');
var helper = require('./connection.js');
var logger = helper.getLogger('BlockListener');

var startBlockListener = async function(channelName, username, orgName, websocketServer) {
    logger.info(util.format('\n============ START startBlockListener on channel %s ============\n', channelName));
    try {
        // first setup the client for this org
        var client = await helper.getClientForOrg(orgName, username);
        logger.info('##### startBlockListener - Successfully got the fabric client for the organization "%s"', orgName);
        var channel = client.getChannel(channelName);
        if(!channel) {
            let message = util.format('##### startBlockListener - Channel %s was not defined in the connection profile', channelName);
            logger.error(message);
            throw new Error(message);
        }

        // Register a block listener.
        //
        // This will return a list of channel event hubs when using a connection profile,
        // based on the current organization defined in the currently active client section
        // of the connection profile. Peers defined in the organization that have the eventSource
        // set to true will be added to the list.
        let eventHubs = channel.getChannelEventHubsForOrg();
        logger.info('##### startBlockListener - found %s eventhubs for organization %s', eventHubs.length, orgName);

        eventHubs.forEach((eh) => {
            eh.registerBlockEvent((block) => {
                logger.info('##### startBlockListener - Successfully received the block event: %s', block);
                logger.info('##### startBlockListener - Block number: %s', block.header.number);
                logger.info('##### startBlockListener - Number of transactions in block: %s', block.data.data.length);
                var blockMsg = {
                    blockNumber: block.header.number,
                    txCount: block.data.data.length,
                    txInBlock: []
                }
                let txCount = 0;
                block.data.data.forEach((tx) => {
                    logger.info('##### startBlockListener - Transaction ID: %s', tx.payload.header.channel_header.tx_id);
                    blockMsg['txInBlock'][txCount] = tx.payload.header.channel_header.tx_id;
                    txCount++;
                })
                // Broadcast the new block to all websocket listeners
                websocketServer.broadcast = async function broadcast(msg) {
                    logger.info('##### startBlockListener - websocket broadcast msg: %s', JSON.stringify(msg));
                    websocketServer.clients.forEach(function each(client) {
                        logger.info('##### startBlockListener - client.readyState: %s', client.readyState);
                        if (client.readyState === 1) {
                            logger.info('##### startBlockListener - Websocket is open');
                            client.send(JSON.stringify(msg));
                        }
                    });
                };
                logger.info('##### startBlockListener - websocket starting to broadcast: %s', JSON.stringify(blockMsg));
                websocketServer.broadcast(blockMsg);
            }, (error)=> {
                logger.info('##### startBlockListener - Failed to receive the block event :: %s', error);
            });
            eh.connect(true);
        })
        logger.info(util.format('\n============ END startBlockListener - listener on channel %s started ============\n', channelName));

    } catch (error) {
        logger.error('##### startBlockListener - Error setting up client and registering block listener: ' + error.stack ? error.stack : error);
        error_message = error.toString();
    }
}

exports.startBlockListener = startBlockListener;


// **********************************************************
// *                  connection.js                         *
// **********************************************************

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
var log4js = require('log4js');
var logger = log4js.getLogger('Connection');
var util = require('util');
var hfc = require('fabric-client');
hfc.setLogger(logger);

async function getClientForOrg (userorg, username) {
    logger.info('============ START getClientForOrg for org %s and user %s', userorg, username);
    let config = '../tmp/connection-profile/healthwallet-connection-profile.yaml';
    let orgLower = userorg.toLowerCase();
    let clientConfig = '../tmp/connection-profile/' + orgLower + '/client-' + orgLower + '.yaml';

    logger.info('##### getClient - Loading connection profiles from file: %s and %s', config, clientConfig);

    // Load the connection profiles. First load the network settings, then load the client specific settings
    let client = hfc.loadFromConfig(config);
    client.loadFromConfig(clientConfig);

    // Create the state store and the crypto store
    await client.initCredentialStores();

    // Try and obtain the user from persistence if the user has previously been
    // registered and enrolled
    if(username) {
        let user = await client.getUserContext(username, true);
        if(!user) {
            throw new Error(util.format('##### getClient - User was not found :', username));
        } else {
            logger.info('##### getClient - User %s was found to be registered and enrolled', username);
        }
    }
    logger.info('============ END getClientForOrg for org %s and user %s \n\n', userorg, username);

    return client;
}

var getRegisteredUser = async function(username, userorg, isJson) {
    try {
        logger.info('============ START getRegisteredUser - for org %s and user %s', userorg, username);
        var client = await getClientForOrg(userorg);
        var user = await client.getUserContext(username, true);
        if (user && user.isEnrolled()) {
            logger.info('##### getRegisteredUser - User %s already enrolled', username);
        } else {
            // user was not enrolled, so we will need an admin user object to register
            logger.info('##### getRegisteredUser - User %s was not enrolled, so we will need an admin user object to register', username);
            logger.info('##### getRegisteredUser - Got hfc %s', util.inspect(hfc));
            var admins = hfc.getConfigSetting('admins');
            logger.info('##### getRegisteredUser - Got admin property %s', util.inspect(admins));
            let adminUserObj = await client.setUserContext({username: admins[0].username, password: admins[0].secret});
            logger.info('##### getRegisteredUser - Got adminUserObj property %s', util.inspect(admins));
            let caClient = client.getCertificateAuthority();
            logger.info('##### getRegisteredUser - Got caClient %s', util.inspect(admins));
            let secret = await caClient.register({
                enrollmentID: username
            }, adminUserObj);
            logger.info('##### getRegisteredUser - Successfully got the secret for user %s', username);
            user = await client.setUserContext({username:username, password:secret});
            logger.info('##### getRegisteredUser - Successfully enrolled username %s  and setUserContext on the client object', username);
        }
        if(user && user.isEnrolled) {
            if (isJson && isJson === true) {
                var response = {
                    success: true,
                    secret: user._enrollmentSecret,
                    message: username + ' enrolled Successfully',
                };
                return response;
            }
        }
        else {
            throw new Error('##### getRegisteredUser - User was not enrolled ');
        }
    }
    catch(error) {
        logger.error('##### getRegisteredUser - Failed to get registered user: %s with error: %s', username, error.toString());
        return 'failed '+error.toString();
    }
};

var getLogger = function(moduleName) {
    var logger = log4js.getLogger(moduleName);
    return logger;
};

exports.getClientForOrg = getClientForOrg;
exports.getRegisteredUser = getRegisteredUser;
exports.getLogger = getLogger;


// **********************************************************
// *                     invoke.js                          *
// **********************************************************

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
var util = require('util');
var helper = require('./connection.js');
var logger = helper.getLogger('Invoke');

var invokeChaincode = async function(peerNames, channelName, chaincodeName, args, fcn, username, orgName) {
    logger.info(util.format('\n============ invokeChaincode - chaincode %s, function %s, on the channel \'%s\' for org: %s\n',
        chaincodeName, fcn, channelName, orgName));
    var error_message = null;
    var txIdAsString = null;
    try {
        // first setup the client for this org
        var client = await helper.getClientForOrg(orgName, username);
        logger.info('##### invokeChaincode - Successfully got the fabric client for the organization "%s"', orgName);
        var channel = client.getChannel(channelName);
        if(!channel) {
            let message = util.format('##### invokeChaincode - Channel %s was not defined in the connection profile', channelName);
            logger.error(message);
            throw new Error(message);
        }
        var txId = client.newTransactionID();
        txIdAsString = txId.getTransactionID();

        // send proposal to endorsing peers
        var request = {
            targets: peerNames,
            chaincodeId: chaincodeName,
            fcn: fcn,
            args: [JSON.stringify(args)],
            chainId: channelName,
            txId: txId
        };

        logger.info('##### invokeChaincode - Invoke transaction request to Fabric %s', JSON.stringify(request));
        let results = await channel.sendTransactionProposal(request);

        // the returned object has both the endorsement results
        // and the actual proposal, the proposal will be needed
        // later when we send a transaction to the ordering service
        var proposalResponses = results[0];
        var proposal = results[1];

        // lets have a look at the responses to see if they are
        // all good, if good they will also include signatures
        // required to be committed
        var successfulResponses = true;
        for (var i in proposalResponses) {
            let oneSuccessfulResponse = false;
            if (proposalResponses && proposalResponses[i].response &&
                proposalResponses[i].response.status === 200) {
                oneSuccessfulResponse = true;
                logger.info('##### invokeChaincode - received successful proposal response');
            } else {
                logger.error('##### invokeChaincode - received unsuccessful proposal response');
            }
            successfulResponses = successfulResponses & oneSuccessfulResponse;
        }

        if (successfulResponses) {
            logger.info(util.format(
                '##### invokeChaincode - Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s"',
                proposalResponses[0].response.status, proposalResponses[0].response.message));

            // wait for the channel-based event hub to tell us
            // that the commit was good or bad on each peer in our organization
            var promises = [];
            let event_hubs = channel.getChannelEventHubsForOrg();
            event_hubs.forEach((eh) => {
                logger.info('##### invokeChaincode - invokeEventPromise - setting up event handler');
                let invokeEventPromise = new Promise((resolve, reject) => {
                    let event_timeout = setTimeout(() => {
                        let message = 'REQUEST_TIMEOUT:' + eh.getPeerAddr();
                        logger.error(message);
                        eh.disconnect();
                    }, 10000);
                    eh.registerTxEvent(txIdAsString, (tx, code, block_num) => {
                            logger.info('##### invokeChaincode - The invoke chaincode transaction has been committed on peer %s',eh.getPeerAddr());
                            logger.info('##### invokeChaincode - Transaction %s has status of %s in block %s', tx, code, block_num);
                            clearTimeout(event_timeout);

                            if (code !== 'VALID') {
                                let message = util.format('##### invokeChaincode - The invoke chaincode transaction was invalid, code:%s',code);
                                logger.error(message);
                                reject(new Error(message));
                            } else {
                                let message = '##### invokeChaincode - The invoke chaincode transaction was valid.';
                                logger.info(message);
                                resolve(message);
                            }
                        }, (err) => {
                            clearTimeout(event_timeout);
                            logger.error(err);
                            reject(err);
                        },
                        // the default for 'unregister' is true for transaction listeners
                        // so no real need to set here, however for 'disconnect'
                        // the default is false as most event hubs are long running
                        // in this use case we are using it only once
                        {unregister: true, disconnect: true}
                    );
                    eh.connect();
                });
                promises.push(invokeEventPromise);
            });

            var orderer_request = {
                txId: txId,
                proposalResponses: proposalResponses,
                proposal: proposal
            };
            var sendPromise = channel.sendTransaction(orderer_request);
            // put the send to the ordering service last so that the events get registered and
            // are ready for the orderering and committing
            promises.push(sendPromise);
            let results = await Promise.all(promises);
            logger.info(util.format('##### invokeChaincode ------->>> R E S P O N S E : %j', results));
            let response = results.pop(); //  ordering service results are last in the results
            if (response.status === 'SUCCESS') {
                logger.info('##### invokeChaincode - Successfully sent transaction to the ordering service.');
            } else {
                error_message = util.format('##### invokeChaincode - Failed to order the transaction. Error code: %s',response.status);
                logger.info(error_message);
            }

            // now see what each of the event hubs reported
            for(let i in results) {
                let event_hub_result = results[i];
                let event_hub = event_hubs[i];
                logger.info('##### invokeChaincode - Event results for event hub :%s',event_hub.getPeerAddr());
                if(typeof event_hub_result === 'string') {
                    logger.info('##### invokeChaincode - ' + event_hub_result);
                }
                else {
                    if (!error_message) error_message = event_hub_result.toString();
                    logger.info('##### invokeChaincode - ' + event_hub_result.toString());
                }
            }
        }
        else {
            error_message = util.format('##### invokeChaincode - Failed to send Proposal and receive all good ProposalResponse. Status code: ' +
                proposalResponses[0].status + ', ' +
                proposalResponses[0].message + '\n' +
                proposalResponses[0].stack);
            logger.info(error_message);
        }
    }
    catch (error) {
        logger.error('##### invokeChaincode - Failed to invoke due to error: ' + error.stack ? error.stack : error);
        error_message = error.toString();
    }

    if (!error_message) {
        let message = util.format(
            '##### invokeChaincode - Successfully invoked chaincode %s, function %s, on the channel \'%s\' for org: %s and transaction ID: %s',
            chaincodeName, fcn, channelName, orgName, txIdAsString);
        logger.info(message);
        let response = {};
        response.transactionId = txIdAsString;
        return response;
    }
    else {
        let message = util.format('##### invokeChaincode - Failed to invoke chaincode. cause:%s', error_message);
        logger.error(message);
        throw new Error(message);
    }
};

exports.invokeChaincode = invokeChaincode;

// **********************************************************
// *                     query.js                           *
// **********************************************************

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
*/

var util = require('util');
var helper = require('./connection.js');
var logger = helper.getLogger('Query');

var queryChaincode = async function(peers, channelName, chaincodeName, args, fcn, username, orgName) {
    try {
        // setup the client for this org
        var client = await helper.getClientForOrg(orgName, username);
        logger.info('============ START queryChaincode - Successfully got the fabric client for the organization "%s"', orgName);
        var channel = client.getChannel(channelName);
        if(!channel) {
            let message = util.format('##### queryChaincode - Channel %s was not defined in the connection profile', channelName);
            logger.error(message);
            throw new Error(message);
        }

        // send query
        var request = {
            targets : peers,
            chaincodeId: chaincodeName,
            fcn: fcn,
            args: [JSON.stringify(args)]
        };

        logger.info('##### queryChaincode - Query request to Fabric %s', JSON.stringify(request));
        let responses = await channel.queryByChaincode(request);
        let ret = [];
        if (responses) {
            // you may receive multiple responses if you passed in multiple peers. For example,
            // if the targets : peers in the request above contained 2 peers, you should get 2 responses
            for (let i = 0; i < responses.length; i++) {
                logger.info('##### queryChaincode - result of query: ' + responses[i].toString('utf8') + '\n');
            }
            // check for error
            let response = responses[0].toString('utf8');
            logger.info('##### queryChaincode - type of response: %s', typeof response);
            logger.info('##### queryChaincode - response: %s', response);
            if (responses[0].toString('utf8').indexOf("Error: transaction returned with failure") != -1) {
                let message = util.format('##### queryChaincode - error in query result: %s', responses[0].toString('utf8'));
                logger.error(message);
                throw new Error(message);
            }
            // we will only use the first response. We strip out the Fabric key and just return the payload
            let json = JSON.parse(responses[0].toString('utf8'));
            logger.info('##### queryChaincode - Query json %s', util.inspect(json));
            if (Array.isArray(json)) {
                for (let key in json) {
                    if (json[key]['Record']) {
                        ret.push(json[key]['Record']);
                    }
                    else {
                        ret.push(json[key]);
                    }
                }
            }
            else {
                ret.push(json);
            }
            return ret;
        }
        else {
            logger.error('##### queryChaincode - result of query, responses is null');
            return 'responses is null';
        }
    }
    catch(error) {
        logger.error('##### queryChaincode - Failed to query due to error: ' + error.stack ? error.stack : error);
        return error.toString();
    }
};

exports.queryChaincode = queryChaincode;
