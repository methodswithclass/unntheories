import React, { Component } from 'react';
import * as data from '../../services/data.service';

var blog;

var getIcon = function ($this) {
  return 'fas ' + $this.props.icon;
};

var clicked = function () {
  //   h.toggle(false);
};

var blogClick = function (name, genre) {
  return function () {
    console.log('clicked', name, genre);
  };
};

var getBlog = function (id) {
  //   console.log('blog name is', id);

  var $blog = data.getBlogByName(id);

  //   console.log('blog object is', $blog);

  return $blog;
};

class Blogbtn extends Component {
  render() {
    blog = getBlog(this.props.blog);

    return (
      <div
        className="relative width height-200 hcenter margin-v-50 rounded20 border raised cutoff"
        onClick={blogClick(blog.meta.name, blog.meta.genre)}
      >
        <div className="relative width height black-back pointer rounded20 cutoff">
          <div
            className="absolute black-back center"
            style={{ width: '120%', height: '500%' }}
            id={'genre_thumb' + blog.meta.name}
          >
            <img
              className="absolute width-auto height center"
              src={blog.meta.image + '.jpg'}
            />
          </div>

          <div className="absolute width height font1-rem">
            <div className="absolute width80 rounded10 center black-back transparent opacity80">
              <div className="relative width80 hcenter padding-v-50 text-center">
                {blog.meta.title.s.text}
              </div>
            </div>

            <div className="absolute width80 center beige">
              <div className="relative width80 hcenter padding-v-50 text-center">
                {blog.meta.title.s.text}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blogbtn;
