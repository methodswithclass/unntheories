import React from 'react';
import * as data from '../../services/data.service';

var blogClick = function (name, genre) {
  return () => {
    console.log('clicked', name, genre);
  };
};

var getBlog = function (id) {
  return data.getBlogByName(id);
};

const Blogbtn = (props) => {
  const { blog: id } = props;
  const blog = getBlog(id);

  return (
    <div
      className="relative width height-200 hcenter margin-v-50 rounded20 border raised cutoff"
      onClick={blogClick(blog.id, blog.genre)}
    >
      <div className="relative width height black-back pointer rounded20 cutoff">
        <div
          className="absolute black-back center"
          style={{ width: '120%', height: '500%' }}
          id={'genre_thumb' + blog.id}
        >
          <img
            className="absolute width-auto height center"
            src={blog.image + '.jpg'}
          />
        </div>

        <div className="absolute width height font1-rem">
          <div className="absolute width80 rounded10 center black-back transparent opacity80">
            <div className="relative width80 hcenter padding-v-50 text-center">
              {blog.title}
            </div>
          </div>

          <div className="absolute width80 center beige">
            <div className="relative width80 hcenter padding-v-50 text-center">
              {blog.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogbtn;
