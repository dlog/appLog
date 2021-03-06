var express = require('express');
var app = express();

var dLog = require('../');

dLog = new dLog.Client({
    service : 'mps_admin',
    hosts: [
        'tcp://0.0.0.0:9602'
    ]
});


app.configure(function() {
    app.use(dLog.middleware());
    app.use(app.router);

});

var level = ['ERROR', 'WARNING', 'INFO', 'DEBUG'];
var KeyIndex = function(){
    return Math.round(Math.random()*100 % 3);
}


app.get('*', function (req, res) {
    var _level = level[ KeyIndex() ];

    // example: dLog.send( 'ERROR', 'error here');
    // dLog.send( _level,  _level + ' !! Hello!!');

    dLog.log({a:1});

    res.send('Hello World!!');
});


app.listen(3000);
console.log('Listening on port 3000');
