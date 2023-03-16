// var AWS = require('aws-sdk');

const apiExpress = require('express');
const apiRouter = apiExpress.Router();
const axios = require('axios');

const url = 'aws.lambda.url';

apiRouter.get('/blogs', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  axios({
    method: 'get',
    url: `${url}/blogs`,
  }).then((response) => {
    res.send({ blogs: response });
  });
});

apiRouter.get('/blogs/:blog', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  axios({
    method: 'get',
    url: `${url}/blogs/${req.params.blog}`,
  }).then((response) => {
    res.send({ blog: response });
  });
});

apiRouter.post('/blogs/:blog', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  axios({
    method: 'post',
    url: `${url}/blogs/${req.params.blog}`,
    data: req.body,
  }).then((response) => {
    res.send({ data: response });
  });
});

module.exports = apiRouter;
