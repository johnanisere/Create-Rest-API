var config = require('../../config/config')
var querystring = require('querystring')
var https       = require('https')

exports.post=function (req,res,next) {
    // Define the recipient numbers in a comma separated string
    // Numbers should be in international format as shown
   console.log(req.body)
    var to      = req.body.number
    
    // And of course we want our recipients to know what we really do
    var message = req.body.message
    
    // Build the post string from an object
    
    var post_data = querystring.stringify({
        'username' : 'myBukkanext',
        'to'       : to,
        'message'  : message
    });
    
    var post_options = {
        host   : 'api.africastalking.com',
        path   : '/version1/messaging',
        method : 'POST',
        
        rejectUnauthorized : false,
        requestCert        : true,
        agent              : false,
        
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length,
            'Accept': 'application/json',
            'apikey': "ba369df4791b0c99a542792497805095c94cd4f1882b4bf5d2ef960e67bbccc5"
        }
    };
    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var jsObject   = JSON.parse(chunk);
            var recipients = jsObject.SMSMessageData.Recipients;
            if ( recipients.length > 0 ) {
                for (var i = 0; i < recipients.length; ++i ) {
                    var logStr  = 'number=' + recipients[i].number;
                    logStr     += ';cost='   + recipients[i].cost;
                    logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                    console.log(logStr);
                    }
                } else {
                    console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
            }
        });
    });
    post_req.write(post_data);
    post_req.end();
    res.status(200).json("A message has been sent to "+to)
}
