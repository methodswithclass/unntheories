import axios from 'axios';

export var get = function (options) {
  return axios({
    method: 'get',
    url: options.url,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error('error in get', options, error.message);
    });
};

export var post = function (options) {
  return axios({
    method: 'post',
    url: options.url,
    data: options.data,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error('error in post', options, error.message);
    });
};
