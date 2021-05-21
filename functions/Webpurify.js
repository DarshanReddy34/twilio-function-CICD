const TokenValidator = require('twilio-flex-token-validator').functionValidator;
exports.handler = TokenValidator(function(context, event, callback) {
  
    const axios = require('axios');
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.appendHeader('Content-Type', 'application/json');
    const webpurifyConfig = {
        method: 'webpurify.live.return',
        apiKey: '7efc8ac3e6df4433ce809e1bad42989c',
        format: 'json'
    };
    const webpurifyUrl = `https://api1.webpurify.com/services/rest/?method=${webpurifyConfig.method}&api_key=${webpurifyConfig.apiKey}&text=${encodeURI(event.body)}&format=${webpurifyConfig.format}`;
    axios.get(webpurifyUrl).then(res => {
        if (res.data) {
            const modifedResponse = res.data;
            delete modifedResponse.rsp.api_key;
            response.setBody(modifedResponse);
            callback(null, response);
        } else {
            response.setBody({error: 'something wet wrong'})
            callback(null, response)
        }
    });
});