import * as api from './api.services/api.http.service';
import * as file from './api.services/api.file.service';

export const postBlog = (name, blog) => {
  return api.postBlog(name, blog);
};

export const getBlog = (name) => {
  return api.getBlog(name);
};

export const listBlogs = () => {
  return api.listBlogs();
};

export const getBlogFromFile = (name) => {
  return file.getBlogfromFile(name);
};
