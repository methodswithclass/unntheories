const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const apiRoutes = require('./backend/files/api.js');

var PORTS = {
  heroku: 8080,
  http: 80,
  // livereload:config.livereloadPort,
  misc1: 3501,
  misc2: 4801,
  misc3: 4861,
};

app.use(bodyParser.urlencoded({ extended: 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//app.use(express.static(path.join(__dirname, "public")));

app.use('/api', apiRoutes);

app.use('/img', express.static(path.join(__dirname, 'asset/img')));
app.use('/home', express.static(path.join(__dirname, 'build')));
app.use('/blogs/*', express.static(path.join(__dirname, 'build')));
app.use('/poetry/*', express.static(path.join(__dirname, 'build')));

app.use('/', express.static(path.join(__dirname, 'build')));

var env = process.env.NODE_ENV;
var port;

if (process.env.PORT) {
  port = process.env.PORT;
} else if (env === 'production') {
  port = PORTS.heroku;
} else if (env === 'development') {
  port = PORTS.misc2;
} else {
  port = PORTS.misc1;
}

var listener = app.listen(port, function () {
  console.log('listening on port', listener.address().port);
});
