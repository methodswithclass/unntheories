import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Blogbtn from '../components/navbtn/Blogbtn';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import * as data from '../services/data.service';
import * as u from '../services/utility.service';

const styles = {
  single: 'single',
  double: 'double',
};

let changed = 0;

const increm = () => {
  resetCounter();
  changed++;
};

const resetCounter = () => {
  if (changed > 5) {
    changed = 0;
  }
};

export const loader = async () => {
  const blogs = await data.getAllBlogs();

  return blogs;
};

const Home = (props) => {
  const genres = useLoaderData();

  const [display, setDisplay] = useState(styles.single);

  const isMobile = u.checkMobile();

  const mainColumnClass =
    display == styles.single ? 'width65 left10' : 'width90 left5';

  const mainColumnClassMobile =
    display == styles.single ? 'width80 left10' : 'width90 left5';

  const isActive = (type) => {
    return type === display;
  };

  const change = (type) => {
    increm();
    setDisplay(type);
  };

  const getBlogButtons = (blogs) => {
    if (!blogs || blogs.length === 0) {
      return (
        <div key="key0" className="relative width">
          <div className="absolute center font-40">no blog</div>
        </div>
      );
    }

    const columnClass =
      display == styles.single ? 'width80 left20' : 'width80 left10';

    const columnClassMobile =
      display == styles.single ? 'width90 left5' : 'width80 left10';

    const blogButtons = blogs.map((blog, key) => {
      if (!blog) {
        return (
          <div key={key} className="relative width">
            <div className="absolute center font-40">no blog</div>
          </div>
        );
      }

      return (
        <div key={key} className="relative width">
          <div
            className={`relative ${isMobile ? columnClassMobile : columnClass}`}
          >
            <Blogbtn blog={blog}></Blogbtn>
          </div>
        </div>
      );
    });

    return <div className="relative width">{blogButtons};</div>;
  };

  const getGenres = (genres) => {
    // console.log('blogs', data.getGenres());

    if (!genres) {
      return <div className="relative width">no genres</div>;
    }

    return (
      <div className="relative width">
        {genres.map((item, key) => {
          const genre = item.genre;
          const blogs = item.blogs;

          const columnClass =
            display == styles.single
              ? 'width'
              : 'width40 padding-h-50 inline cell-top';
          const scrollClass =
            display == styles.double
              ? 'height-600 margin-bottom-100 border lowered scrollY scroll-vertical-dark-narrow'
              : '';

          return (
            <div key={`${key}${changed}`} className={`relative ${columnClass}`}>
              <div className="relative height-80 width border-bottom">
                <div className="absolute bottom0 font150-rem">
                  {genre.title}
                </div>
              </div>
              <div className={`relative width ${scrollClass}`}>
                <div className="relative width">{getBlogButtons(blogs)}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative width height">
      <Header button={{ isActive, change, styles }} state="home"></Header>
      <div
        key={`${display}${changed}`}
        className={`relative white-back ${
          isMobile ? mainColumnClassMobile : mainColumnClass
        }`}
        id="button-group"
      >
        <div className="relative width margin-v-50">{getGenres(genres)}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
