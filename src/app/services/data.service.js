import { getRaw, getGenres, getPublished } from './raw.service';
import * as file from './file.service';
import * as api from './api.service';
import moment from 'moment';

const testOverride = false;

const dev = {
  test: true,
  name: 'unnecessary-theories-dev',
  // url: 'https://unnecessarytheories-dev.herokuapp.com/',
  url: 'localhost:4801',
  id: '725062234262184',
};

const prod = {
  test: false,
  name: 'unnecessary-blog',
  url: 'https://www.unnecessarytheories.io/',
  id: '696572137111194',
};

export const env = (_test) => {
  // console.log(
  //   'location',
  //   window.location.href,
  //   window.location.href == prod.url
  // );

  return _test !== undefined
    ? _test
      ? dev
      : prod
    : testOverride
    ? dev
    : window.location.href == prod.url
    ? prod
    : dev;
};

const genres = getGenres();
const published = getPublished();

const home = {
  id: 'home',
  title: 'unnecessary theories',
  image: 'img/landscape',
};

const fromFile = (blog) => {
  file.process(blog);
};

const fromApi = (blog) => {
  file.getBlog({ blog }).then((blogObj) => {
    blog.blog = blogObj;
  });
};

const postBlogsToDB = () => {
  getRaw().forEach((blog) => {
    fromFile(blog);
  });
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const sortByDate = () => {
  allblogs.sort((a, b) => {
    return moment(b.date).milliseconds() < moment(a.date).milliseconds()
      ? -1
      : 1;
  });
};

const validate = (blog) => {
  const now = moment();

  return (
    moment(blog.date).milliseconds() < now.milliseconds() && published[blog.id]
  );
};

const filterBlogs = () => {
  return getRaw().filter((blog) => {
    return validate(blog) && !published.none;
  });
};

const blogRequests = filterBlogs();
// postBlogsToDB();

const getBlogsFromApi = () => {
  blogRequests.forEach((blog) => {
    fromApi(blog);
  });
};

const resolveName = (name) => {
  if (name == 'scale_time') {
    name = 'contact';
  }

  return name;
};

export const getBlogByName = async (name) => {
  if (name === 'home') {
    return home;
  }

  name = resolveName(name);

  const blogObj = await api.getBlog(name);

  if (!blogObj || !validate(blogObj)) {
    console.log('debug invalid request');
    return null;
  }

  return file.makeBlog(blogObj);
};

export const getAllBlogs = async () => {
  const result = await api.getAllBlogs();

  return Object.entries(result)
    .map(([genre, value]) => {
      const genreObj = genres.genres.find((item) => item.id === genre);
      const blogs = value.filter((blog) => {
        return validate(blog);
      });
      return {
        genre: genreObj,
        blogs,
      };
    })
    .sort((a, b) => {
      return b.genre.order < a.genre.order ? -1 : 1;
    });
};

export const getBlogsByGenre = (genre) => {
  return blogRequests.filter((blog) => blog.genre === genre);
};

export const getAllGenres = () => {
  filterBlogs();

  return genres.genres
    .sort((a, b) => (b.order < a.order ? -1 : 1))
    .map((genre) => {
      return {
        genre: genre,
        blogs: getBlogsByGenre(genre.id),
      };
    });
};
