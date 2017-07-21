var pushCtrl = require('./controllers/push');
module.exports = function(app) {

  app.post('/register', function (){

DeviceToken.create({ user_id: userId, token: token }).then(cb);

DeviceToken.findAll().then(function(tokens) {
  var options = {
    uri: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: { 'Authorization': 'key=' + <your-fcm-server-key> },
    json: {
      // note that Sequelize returns token object array, we map it with token value only
      'registration_ids': tokens.map(token => token.token ),
      // iOS requires priority to be set as 'high' for message to be received in background
      'priority': 'high',
      'data': { 'title': message, 'body': message }
    }
  };
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // request was success, should early return response to client
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
    // extract invalid registration for removal
    if (body.failure > 0 && Array.isArray(body.results) && results.length == tokens.length) {
      var tokenToBeRemoved = [];
      var results = body.results;
      for (var i = 0; i < tokens.length; ++i) {
        if (results[i].error == 'InvalidRegistration') {
          tokenToBeRemoved.push(tokens[i].token);
        }
      }
      if (tokenToBeRemoved.length > 0) {
        DeviceToken.destroy({
          where: { token: { $in: tokenToBeRemoved } }
        }).then(cb);
      }
    }
  });
});
});
/*---------------------------------------------------*/

var express=require('express'),
    fs = require('fs'),
    path=require('path');

var formidable = require('formidable');
var FCM = require('fcm-node');
var fcm = new FCM(serverKey);
var serverKey="<Your server key>"; //You will find this in your firebase console
//To get server key Select your project > Click the Gear icon(Settings) > Move to 'Cloud Messaging' tab .
//Under Project credentials your will get your so called long 'Server Key'

module.exports=function(app){
  app.get('/sendFcmNotification',function (req,res){
    var data=req.body;
    var message="Hey! you got this notification.";
    var title="DigitSTORY Notification";
    var token="<Your Device Token for Android>"*;
    var message = {
        to: token,
        notification: {
            title: title, //title of notification
            body: message, //content of the notification
            sound: "default",
            icon: "ic_launcher" //default notification icon
        },
        data: data //payload you want to send with your notification
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Notification not sent");
            res.json({success:false})
        } else {
            console.log("Successfully sent with response: ", response);
            res.json({success:true})
        }
    });

  });
}
