const apiExpress = require('express');
const apiRouter = apiExpress.Router();
const axios = require('axios');

const fs = require('fs');

const env = process.env.NODE_ENV;

const url = {
  development: 'https://3hfp2iy3cl.execute-api.us-east-1.amazonaws.com/prod',
  production: 'https://whwtmhikve.execute-api.us-east-1.amazonaws.com/prod',
};

apiRouter.get('/file/:file', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  fs.readFile('asset/files/' + req.params.file, 'utf8', function (err, data) {
    //console.log("data", data);
    if (err) {
      console.log('error', err);
    } else res.send({ blog: data });
  });
});

apiRouter.get('/blogs', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  axios({
    method: 'get',
    url: `${url[env]}/blogs`,
  })
    .then((response) => {
      res.send({ blogs: response.data.data });
    })
    .catch((error) => {
      console.log('debug error', error.message);
      res.send({ error });
    });
});

apiRouter.get('/blogs/:blog', function (req, res, next) {
  //console.log("debug api file", req.params.file);

  axios({
    method: 'get',
    url: `${url[env]}/blogs/${req.params.blog}`,
  })
    .then((response) => {
      res.send({ blog: response.data.data });
    })
    .catch((error) => {
      console.log('debug error', error.message);
      res.send({ error });
    });
});

apiRouter.post('/blogs/:blog', function (req, res, next) {
  console.log('debug api post', req.body);

  axios({
    method: 'post',
    url: `${url[env]}/blogs/${req.params.blog}`,
    data: req.body,
  })
    .then((response) => {
      res.send({ data: response.data });
    })
    .catch((error) => {
      console.log('debug error', error.message);
      res.send({ error });
    });
});

module.exports = apiRouter;
