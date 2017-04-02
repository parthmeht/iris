'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'GNK3BJSAZ6HQISI4JO7O7AP7PSDHRELW';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-161959011446-phCt0goF5CrCAVS8Ml15Innb';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});