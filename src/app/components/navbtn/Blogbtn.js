import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as data from '../../services/data.service';

const Blogbtn = (props) => {
  const { blog } = props;
  // const [blog, setBlog] = useState(null);

  // useEffect(async () => {
  //   const blog = await getBlog(id);
  //   setBlog(blog);
  // }, [id]);

  return (
    <Link to={`blogs/${blog.id}`}>
      <div className="relative width height-200 hcenter margin-v-50 rounded20 border raised cutoff">
        <div className="relative width height black-back pointer rounded20 cutoff">
          {blog ? (
            <>
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
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Blogbtn;
