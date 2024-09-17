"use strict";

var express = require('express');

var path = require('path');

var session = require('express-session');

var settingsRouter = require('./routes/settings.route');

var homeRouter = require('./routes/home.route');

var apinewsanpham = require('./routes/apinewsanpham');

var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var app = express();

var MongoStore = require('connect-mongo');

var db = require('./models/db');

var uri = 'mongodb+srv://trafdual:trafdual@cluster0.jsm1k.mongodb.net/baominhstore?retryWrites=true&w=majority';
var mongoStoreOptions = {
  mongooseConnection: db.mongoose.connection,
  mongoUrl: uri,
  collection: 'sessions'
}; // app.set('view engine', 'ejs');
// view engine setup

app.use(session({
  secret: 'adscascd8saa8sdv87ds78v6dsv87asvdasv8',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create(mongoStoreOptions) // ,cookie: { secure: true }

}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use('/', homeRouter); // app.use('/api', apiAccRouter);
// app.use('/accounts', accountsRouter);

app.use('/', settingsRouter); // app.use('/',sitmaprouter);
// app.use('/test', testRouter);

app.use('/', apinewsanpham);
app.use(express["static"](path.join(__dirname, '/public')));
app.use(express["static"](path.join(__dirname, '/uploads')));
app.listen(3000, function () {
  console.log('Server is running on port 3000');
  console.log(__dirname);
});
module.exports = app;