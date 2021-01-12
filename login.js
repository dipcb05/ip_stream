var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodelogin'
});

var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
    //    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
           // if (results.length > 0) {
           if(username === 'admin' && password === 'abcd'){
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        //});
    }
     else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});


app.post('/stream', function(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    const ip_address = request.body.ip_address;
    if (username && password && ip_address) {
        Stream = require('node-rtsp-stream');
        stream = new Stream({
            streamUrl: 'rtsp://' + username + ':' + password + '@' + ip_address + ':554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
            wsPort: 9999
        });
        response.sendFile(path.join(__dirname + 'index.html'));
        response.end();
    }
    else {
        response.send('Please enter IP address, Username and Password properly!');
        response.end();
    }
});


app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + 'test.html'));
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(3000);