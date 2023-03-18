// var AWS = require('aws-sdk');

const apiExpress = require('express');
const apiRouter = apiExpress.Router();
const axios = require('axios');

const env = process.env.NODE_ENV;

const url = {
  development: 'https://naxu9iprab.execute-api.us-east-1.amazonaws.com/prod',
  production: 'aws.apigateway.url',
};

apiRouter.get('/blogs', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  axios({
    method: 'get',
    url: `${url[env]}/blogs`,
  }).then((response) => {
    res.send({ blogs: response });
  });
});

apiRouter.get('/blogs/:blog', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  axios({
    method: 'get',
    url: `${url[env]}/blogs/${req.params.blog}`,
  }).then((response) => {
    res.send({ blog: response });
  });
});

apiRouter.post('/blogs/:blog', function (req, res, next) {
  console.log('debug api post', req);

  axios({
    method: 'post',
    url: `${url[env]}/blogs/${req.params.blog}`,
    body: req.body,
  }).then((response) => {
    res.send({ data: response });
  });
});

module.exports = apiRouter;
