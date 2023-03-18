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

export const getBlog = (options) => {
  // console.log("get api for blog", options.blog.meta.name);

  return api
    .getBlog(options.blog.file)
    .then((res) => {
      // console.log("data", options.blog.meta.name);
      return res.data.blog;
    })
    .then((data) => {
      options.blog.content = data;
      return make(clean(data));
    });
};

const postBlog = (name, blog) => {
  return api.postBlog(name, blog);
};

export const process = (blog) => {
  const url = `/${blog.file}`;
  const name = blog.id;

  $.ajax(url).then((response) => {
    blog.content = response;
    delete blog.file;

    postBlog(name, blog).then((res) => {
      console.log('post blog', res.data);
    });

    console.log('process data', response, data);
    return make(clean(response));
  });
};
