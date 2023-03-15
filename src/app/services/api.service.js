import * as api from './api.services/api.file.service';

export let postBlog = (name, blog) => {
  return api.postBlog(name, blog);
};

export let getBlog = (blog) => {
  return api.getBlog(blog);
};

export let getAllBlogs = () => {
  return api.getAllBlogs();
};
