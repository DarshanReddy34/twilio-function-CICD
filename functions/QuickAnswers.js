const TokenValidator = require('twilio-flex-token-validator').functionValidator;
exports.handler = TokenValidator(function(context, event, callback) {
  
    const fs = require('fs');
    const fileName = '/quickanswers.json';
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.appendHeader('Content-Type', 'application/json');
    let file = Runtime.getAssets()[fileName].path;
    let data = fs.readFileSync(file);
    let quickanswersList = JSON.parse(data);
    response.setBody(quickanswersList);
  
    callback(null, response);
});