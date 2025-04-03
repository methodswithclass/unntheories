import Users from "./users";
import Blogs from "./blogs";
import Default from "./default";

export { getHandler } from "./handler";

export const NonAuth = {
  listBlogs: Blogs.listBlogs,
  getBlog: Blogs.getBlog,
  ...Default,
};

export const Auth = {
  ...NonAuth,
  createBlog: Blogs.createBlog,
  updateBlog: Blogs.updateBlog,
  listUsers: Users.listUsers,
  getUser: Users.getUser,
};

export default {
  ...Users,
  ...Blogs,
  ...Default,
};
