import React, { useState } from 'react';

import Blogbtn from '../components/navbtn/Blogbtn';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import * as data from '../services/data.service';

let styles = {
  single: 'single',
  double: 'double',
};

let displayStyle = styles.double;
let changed = 0;

let increm = () => {
  resetCounter();
  changed++;
};

let resetCounter = () => {
  if (changed > 5) {
    changed = 0;
  }
};

const Home = (props) => {
  const [display, setDisplay] = useState(styles.single);

  const columnClass =
    display == styles.single ? 'width65 left10' : 'width90 left5';

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

    let columnClass =
      display == styles.single ? 'width80 left20' : 'width80 left10';

    var blogButtons = blogs.map((blog, key) => {
      if (!blog) {
        return (
          <div key={key} className="relative width">
            <div className="absolute center font-40">no blog</div>
          </div>
        );
      }

      return (
        <div key={key} className="relative width">
          <div className={`relative ${columnClass}`}>
            <Blogbtn state={blog.genre} blog={blog.id}></Blogbtn>
          </div>
        </div>
      );
    });

    return <div className="relative width">{blogButtons};</div>;
  };

  const getGenres = () => {
    // console.log('blogs', data.getGenres());

    var genres = data.getGenres().map((item, key) => {
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
            <div className="absolute bottom0 font150-rem">{genre.title}</div>
          </div>
          <div className={`relative width ${scrollClass}`}>
            <div className="relative width">{getBlogButtons(blogs)}</div>
          </div>
        </div>
      );
    });

    return <div className="relative width">{genres}</div>;
  };

  return (
    <div className="relative width height scrollY scroll-vertical-dark-narrow">
      <Header button={{ isActive, change, styles }}></Header>
      <div
        key={`${display}${changed}`}
        className={`relative white-back ${columnClass}`}
        id="button-group"
      >
        <div className="relative width margin-v-50">{getGenres()}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
