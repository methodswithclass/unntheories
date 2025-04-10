const clean = (string) => {
  return string
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, "'")
    .replace(/(?!\.)(.)\1{2,}/g, "$1");
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
    } else if (array[i] == "#") {
      list = !list;
    } else {
      section[j++] = { para: list ? "list" : "para", text: array[i] };
    }
  }

  blog.push(section);

  return blog;
};

export const makeBlog = (content) => {
  return make(clean(content));
};
