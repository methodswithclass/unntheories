import * as http from './api.client';

export let postBlog = (name, blog) => {
  return http.post({
    url: `/api/blogs/${name}`,
    data: blog,
  });
};

export let getBlog = (blog) => {
  return http.get({
    url: `/api/blogs/${blog}`,
  });
};

export let getAllBlogs = () => {
  return http.get({
    url: '/api/blogs',
  });
};
