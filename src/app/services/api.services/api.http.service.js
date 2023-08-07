import * as http from './api.client';

const url = process.env.REACT_APP_URL;

export const postBlog = (name, blog) => {
  return http.post({
    url: `${url}/blogs/${name}`,
    data: { blog },
  });
};

export const getBlog = (name) => {
  return http
    .get({
      url: `${url}/blogs/${name}`,
    })
    .then((res) => {
      return res.data.blog;
    });
};

export const listBlogs = () => {
  return http
    .get({
      url: `${url}/blogs`,
    })
    .then((res) => {
      return res.data.blogs;
    });
};
