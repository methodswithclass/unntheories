// var AWS = require('aws-sdk');

var apiExpress = require('express');
var apiRouter = apiExpress.Router();

var fs = require('fs');

apiRouter.get('/file/:file', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  fs.readFile(
    'asset/files/' + req.params.file + '.txt',
    'utf8',
    function (err, data) {
      //console.log("data", data);
      if (err) {
        console.log('error', err);
      } else res.send({ blog: data });
    }
  );
});

module.exports = apiRouter;
