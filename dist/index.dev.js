"use strict";

var fs = require('fs');

var https = require('https');

var express = require('express');

var path = require('path');

var session = require('express-session');

var Notify = require('./models/NotifyModel');

var settingsRouter = require('./routes/settings.route');

var apinewsanpham = require('./routes/apinewsanpham');

var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var MongoStore = require('connect-mongo');

var WebSocket = require('ws');

var moment = require('moment');

var app = express();

var db = require('./models/db');

var uri = 'mongodb+srv://trafdual:trafdual@cluster0.jsm1k.mongodb.net/baominhstore?retryWrites=true&w=majority&appName=Cluster0';
var mongoStoreOptions = {
  mongooseConnection: db.mongoose.connection,
  mongoUrl: uri,
  collection: 'sessions'
}; // Load SSL/TLS certificates

var privateKey = fs.readFileSync(path.join(__dirname, 'ssl', 'privatekey.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.pem'), 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate
}; // Set up HTTPS server

var server = https.createServer(credentials, app);
var wss = new WebSocket.Server({
  server: server
}); // Express middleware

app.use(session({
  secret: 'adscascd8saa8sdv87ds78v6dsv87asvdasv8',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create(mongoStoreOptions)
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use('/', settingsRouter);
app.use('/', apinewsanpham);
app.use(express["static"](path.join(__dirname, '/public')));
app.use(express["static"](path.join(__dirname, '/uploads')));
app.use(express["static"](path.join(__dirname, '/ssl'))); // WebSocket setup

wss.on('connection', function (ws) {
  console.log('Client connected');

  var checkForUpdates = function checkForUpdates() {
    Notify.notify.find().then(function (donhang) {
      var donHangIsReadTrue = donhang.filter(function (d) {
        return d.isRead === true;
      }).map(function (d) {
        return {
          _id: d._id,
          tenkhach: d.tenkhach,
          phone: d.phone,
          email: d.email,
          address: d.address,
          tensp: d.tensp,
          price: d.price,
          date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
        };
      });
      var donHangIsReadFalse = donhang.filter(function (d) {
        return d.isRead === false;
      }).map(function (d) {
        return {
          _id: d._id,
          tenkhach: d.tenkhach,
          phone: d.phone,
          email: d.email,
          address: d.address,
          tensp: d.tensp,
          price: d.price,
          date: moment(d.date).format('DD/MM/YYYY HH:mm:ss')
        };
      });
      ws.send(JSON.stringify({
        donHangIsReadTrue: donHangIsReadTrue,
        donHangIsReadFalse: donHangIsReadFalse
      }));
    });
    setTimeout(checkForUpdates, 1000);
  };

  checkForUpdates();
});
server.listen(3000, function () {
  console.log('HTTPS server is running on port 3000');
});