import blog from './models/blog.service';
import * as file from './file.service';
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

const genres = {
  genres: [
    {
      id: 'blogs',
      title: 'Blogs',
      map: 'nonFict',
      order: 3,
    },
    {
      id: 'poetry',
      title: 'Poetry',
      map: 'poetry',
      order: 2,
    },
  ],
  nonFict: 'blogs',
  poetry: 'poetry',
};

const published = {
  none: false,
  prison: true,
  scale_time: false,
  meaning_god: false,
  intelligence: true,
  vase: true,
  online_dating: true,
  girl: true,
  contact: true,
  perspective: true,
  extraterrestrial_life: true,
  evolution: true,
  sexuality: true,
  feast: false,
};

const home = {
  id: 'home',
  title: 'unnecessary theories',
  image: 'img/landscape',
};

let allblogs = [];

let writeBlog;
let input;

input = {
  date: new Date(2019, 3, 13, 6, 0, 0),
  by: 'Christopher Polito',
  name: 'feast',
  genre: genres.nonFict,
  title: 'the feast: an analysis',
  description: 'Analysis of an allegory of heaven and hell',
  image: 'img/thefeast',
  file: 'files/thefeast_one.txt',
  published: published.feast,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2019, 0, 5, 6, 0, 0),
  by: 'Christopher Polito',
  name: 'sexuality',
  genre: genres.nonFict,
  title: 'on sexuality',
  description: 'We need to talk about sex',
  image: 'img/gender',
  file: 'files/sexuality.txt',
  published: published.sexuality,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2016, 10, 15, 6, 0, 0),
  by: 'Christopher Polito',
  name: 'contact',
  genre: genres.nonFict,
  title: 'challenges with alien contact',
  description: 'How evolution makes alien contact very improbable',
  image: 'img/contact',
  file: 'files/alien-contact3.txt',
  published: published.contact,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2018, 2, 11, 12, 0, 0),
  by: 'Christopher Polito',
  name: 'evolution',
  genre: genres.nonFict,
  title: "evolution and it's popular understanding",
  description: "There is no 'selection' in Evolution",
  image: 'img/evolution2',
  file: 'files/evolution.txt',
  published: published.evolution,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2018, 0, 23, 12, 0, 0),
  by: 'Christopher Polito',
  name: 'extraterrestrial_life',
  genre: genres.nonFict,
  title: 'influences on the search for intelligent alien life',
  description:
    'How ideas about aliens have been influenced by science fiction and the Drake Equation',
  image: 'img/extraterrestrial-life5',
  file: 'files/extraterrestrial-life2.txt',
  published: published.extraterrestrial_life,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2016, 0, 7, 12, 0, 0),
  by: 'Christopher Polito',
  name: 'intelligence',
  genre: genres.nonFict,
  title: 'defining intelligence',
  description:
    "How can we, as humans, be so intelligent when we can't really define it?",
  image: 'img/machine',
  file: 'files/intelligence2.txt',
  published: published.intelligence,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2016, 7, 21, 6, 0, 0),
  by: 'Christopher Polito',
  name: 'vase',
  genre: genres.poetry,
  title: 'vase of the world',
  description:
    'Caution to you, when you create in order to relieve, you know not what you make',
  image: 'img/cavemen',
  file: 'files/vaseoftheworld.txt',
  published: published.vase,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2016, 9, 1, 6, 0, 0),
  by: 'Christopher Polito',
  name: 'online_dating',
  genre: genres.poetry,
  title: 'online dating',
  description:
    'Online dating is not a fun activity, so I wrote some poetry about it.',
  image: 'img/online-date',
  file: 'files/online-date.txt',
  published: published.online_dating,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2016, 9, 30, 6, 0, 0),
  by: 'Christopher Polito',
  name: 'girl',
  genre: genres.poetry,
  title: 'girl on the path',
  description:
    'I was lost in a world of my own thinking thoughts, then I came upon her, and she connected the dots.',
  image: 'img/girl',
  file: 'files/girl_on_path.txt',
  published: published.girl,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2016, 10, 16, 6, 0, 0),
  by: 'Christopher Polito',
  name: 'perspective',
  genre: genres.poetry,
  title: 'perspective',
  description: 'For the stone and the mote, the grass is always greener...',
  image: 'img/dust',
  file: 'files/mote.txt',
  published: published.girl,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2015, 11, 22, 12, 0, 0),
  by: 'Christopher Polito',
  name: 'prison',
  genre: genres.poetry,
  title: 'the prison',
  description:
    'Even prisons with three walls are impossible to break free from',
  image: 'img/prison',
  file: 'files/prison.txt',
  published: published.prison,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

input = {
  date: new Date(2016, 5, 1, 6, 0, 0),
  by: 'Christopher Polito',
  name: 'meaning_god',
  genre: genres.nonFict,
  title: 'the meaning of god',
  description:
    "Whether God exists or not is the wrong question. Instead what is the 'meaning' of god?",
  image: 'img/space',
  file: 'files/meaning_god1.txt',
  published: published.meaning_god,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

const fromFile = (blog) => {
  file.process(blog);
};

const fromApi = (blog) => {
  file.getBlog({ blog }).then((blogObj) => {
    blog.blog = blogObj;
  });
};

const postBlogsToDB = () => {
  allblogs.forEach((blog) => {
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

const filterBlogs = () => {
  return allblogs.filter((blog) => {
    var now = moment();

    return (
      moment(blog.date).milliseconds() < now.milliseconds() &&
      published[blog.id] &&
      !published.none
    );
  });
};

const blogs = filterBlogs();
// getBlogsFromApi();
// postBlogsToDB();

const getBlogsFromApi = () => {
  blogs.forEach((blog) => {
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

  const blogRequest = blogs.find((p) => {
    return p.id == name;
  });

  if (!blogRequest) {
    console.log('debug invalid name');
    return null;
  }

  const blogObj = await file.getBlog({ blog: blogRequest });

  if (!blogObj) {
    console.log('debug invalid request');
    return null;
  }

  return { ...blogRequest, blog: blogObj };
};

export const getBlogsByGenre = (genre) => {
  return blogs.filter((blog) => blog.genre === genre);
};

export const getGenres = () => {
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
