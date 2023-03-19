import blog from './models/blog.service';

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
  file: 'file/thefeast_one.txt',
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
  file: 'file/sexuality.txt',
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
  file: 'file/alien-contact3.txt',
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
  file: 'file/evolution.txt',
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
  file: 'file/extraterrestrial-life2.txt',
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
  file: 'file/intelligence2.txt',
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
  file: 'file/vaseoftheworld.txt',
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
  file: 'file/online-date.txt',
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
  file: 'file/girl_on_path.txt',
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
  file: 'file/mote.txt',
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
  file: 'file/prison.txt',
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
  file: 'file/meaning_god1.txt',
  published: published.meaning_god,
};

writeBlog = new blog.Blog(input);
allblogs.push(writeBlog);

writeBlog = null;
input = null;

export const getRaw = () => {
  return allblogs;
};

export const getGenres = () => {
  return genres;
};

export const getPublished = () => {
  return published;
};