'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'GNK3BJSAZ6HQISI4JO7O7AP7PSDHRELW';
const witClient = require('../server/witClient')(witToken);

const slackTokenPart1 = 'xoxb-161959011446-';
const slackTokenPart2 = 'mzPWkTOxarnHzXJvKQLU7hy1';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackTokenPart1+""+slackTokenPart2, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`);
});