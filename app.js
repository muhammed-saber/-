var app = express();
require('./routes')(app);
app.listen(config.APP_PORT);

var FCM = require('fcm-push');

var serverKey = 'AIzaSyAcDkr8-aXdZGWzEk2BRCW5ujwjXzEojFw';
var fcm = new FCM(serverKey);

var message = {
    to: 'c5355j-XGEI:APA91bEkYswCt3nmHDT6FGDGMh1yioSFmYfJqcd7kURBkc6RXEuKnG_fklkLU7wX1X1zS_r5ZYmlePOGx3G6VonnaNGTrSwOSCKKi8XJqrbFDA7gtvvOOYoOmmNWV4yG0i_O0rl-0k6n', // required fill with device token or topics
    collapse_key: '713190758664',
    data: {
        your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
};

//callback style
fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});

//promise style
fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })
/*--------------------------------------------------------*/
/*--------------------------------------------------------*/
    'use strict';
    var express = require('express');
    var bodyParser = require('body-parser');
    var errorHandler = require('errorhandler');
    var cookieParser = require('cookie-parser');
    var path = require('path');
    var http = require('http');

    var app = express();
    var port = 4747;

    app.set('views', path.join(__dirname, 'images'));
    app.set('view engine', 'html');

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(cookieParser());

    /*CORS middleware */
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    app.use(nocache);
    app.use(errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    function nocache(req, res, next) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
    require('./serverRoute')(app);

    app.listen(port);

    console.log("server running on " + port);
