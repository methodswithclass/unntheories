import axios from "axios";
import { getUserDetails } from "./auth";
import { makeBlog } from "./file";
import { sortByDate, sortByGenre, validate } from "app/utils/utils";

const url = `${process.env.REACT_APP_URL}/process`;
const authUrl = `${process.env.REACT_APP_URL}/process-auth`;

const instance = axios.create({
  baseURL: url,
  timeout: 10000,
});

const authInstance = axios.create({
  baseURL: authUrl,
  timeout: 10000,
});

authInstance.interceptors.request.use(async (config) => {
  const { accessToken } = await getUserDetails();

  const { headers } = config;

  return { ...config, headers: { ...headers, Authorization: accessToken } };
});

export const post = async ({ url = "/", data }) => {
  return instance.post(url, data).then((result) => result.data);
};

export const authPost = async ({ url = "/", data }) => {
  return authInstance.post(url, data).then((result) => result.data);
};

export const callDummy = async () => {
  return post({
    data: { operation: "callDummy" },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log("debug error calling dummy", error.message);
      return { success: false };
    });
};

const listBlogsApi = async (input) => {
  return post({
    data: { operation: "listBlogs", input },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log("debug error listing blogs", error);
      return { success: false };
    });
};

export const listBlogs = async (input) => {
  const results = await listBlogsApi(input);

  const sorted = results.sort(sortByDate).map((item) => {
    item.blog = makeBlog(item.content);
    return item;
  });

  return sorted;
};

export const getBlog = async (input) => {
  return post({
    data: { operation: "getBlog", input },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log("debug error getting blog", error);
      return { success: false };
    });
};

export const listUsers = async () => {
  return authPost({
    data: { operation: "listUsers" },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log("debug error listing users", error);
      return { success: false };
    });
};

export const createBlog = async (input) => {
  return authPost({
    data: { operation: "createBlog", input },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log("debug error creating blog", error);
      return { success: false };
    });
};

export const updateBlog = async (input) => {
  console.log("debug update blog", input);
  return authPost({
    data: { operation: "updateBlog", input },
  })
    .then((res) => res.data)
    .catch((error) => {
      console.log("debug error updating blog", error);
      return { success: false };
    });
};
