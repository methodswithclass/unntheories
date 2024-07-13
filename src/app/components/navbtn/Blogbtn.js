import React from 'react';
import { Link } from 'react-router-dom';

const Blogbtn = (props) => {
  const { blog } = props;

  return (
    <Link to={`blogs/${blog?.name}`}>
      <div className="relative width height-300 hcenter margin-v-50 rounded20 border raised cutoff">
        <div className="relative width height black-back pointer rounded20 cutoff">
          {blog ? (
            <>
              <div
                className="absolute white-back center"
                style={{ width: '120%', height: '200%' }}
                id={`genre_thumb${blog.name}`}
              >
                <img
                  className="absolute width-auto height center opacity60"
                  src={`/asset/${blog.image}.jpg`}
                />
              </div>

              <div className="absolute width height font1-rem">
                <div className="absolute width80 rounded10 center black-back transparent opacity90">
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
