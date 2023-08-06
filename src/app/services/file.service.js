import * as api from './api.service';

const clean = (string) => {
  return string
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, "'")
    .replace(/(?!\.)(.)\1{2,}/g, '$1');
};

const make = (string) => {
  var section = [];
  var blog = [];
  var array = string.split(/\n\n/);
  // console.log(string, array);
  var j = 0;
  var k = 0;
  var list = false;

  for (var i in array) {
    // console.log(array[i], array[i].match(/\./));
    if (array[i].match(/\./) && array[i].match(/\./).index == 0) {
      blog[k++] = section;

      section = [];
      j = 0;
    } else if (array[i] == '#') {
      list = !list;
    } else {
      section[j++] = { para: list ? 'list' : 'para', text: array[i] };
    }
  }

  blog.push(section);

  return blog;
};

// export const getBlog = async (options) => {
//   console.log('get api for blog', options.blog.meta.name);

//   const blog = await api.getBlog(options.blog.file);

//   options.blog.content = blog;
//   return make(clean(blog));
// };

export const makeBlog = (blog) => {
  const { content } = blog;
  const blogObj = make(clean(content));
  blog.blog = blogObj;
  return blog;
};

export const process = async (blog) => {
  const name = blog.name;

  const data = await api.getBlogFromFile(blog.file);

  console.log('debug res', data);
  blog.content = data;
  delete blog.file;

  const res = await api.postBlog(name, blog);

  console.log('post blog', res.data);
};
