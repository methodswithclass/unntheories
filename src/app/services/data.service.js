import { useQuery } from '@tanstack/react-query';
import { getRaw, getGenres, getPublished } from './raw.service';
import * as file from './file.service';
import * as api from './api.service';
import moment from 'moment';

const shouldPost = false;

const genres = getGenres();

const postBlogsToDB = () => {
  getRaw().forEach((blog) => {
    file.process(blog);
  });
};

if (shouldPost) {
  postBlogsToDB();
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const validate = (blog) => {
  const now = moment();

  return (
    moment(blog.date).milliseconds() < now.milliseconds() && blog.published
  );
};

const listBlogs = async () => {
  const published = getPublished();
  const results = await api.listBlogs();

  const obj = results.sort((a, b) => {
    return moment(b.date).valueOf() - moment(a.date).valueOf();
  }).reduce((accum, item) => {
    const { genre } = item;
    let genreObj = accum[genre];
    let blogs = genreObj?.blogs;

    if (!genreObj) {
      const foundGenre = genres.genres.find((item) => item.id === genre);
      genreObj = { genre: foundGenre };
      blogs = [];
    }

    if (!validate(item) || published.none) {
      return accum;
    }

    const blog = file.makeBlog(item);

    return { ...accum, [genre]: { ...genreObj, blogs: [...blogs, blog] } };
  }, {});

  return Object.values(obj).sort((a, b) => a.genre.order - b.genre.order);
};

export const useListGenres = () => {
  return useQuery({
    queryKey: ['listBlogs'],
    queryFn: listBlogs,
  });
};

export const useGetBlog = (name) => {
  const { data, isLoading } = useListGenres();
  if (isLoading) {
    return null;
  }
  const list = data.reduce((accum, item) => {
    return [...accum, ...item.blogs];
  }, []);
  const blog = list.find((item) => item.name === name);
  return blog;
};

export const rubMcKenziesFeetSoSheMakesNoises = (rubsFeet) => {
  if (rubsFeet) {
    return "OOOHHHH"
  } else {
    return ":("
  }
}
