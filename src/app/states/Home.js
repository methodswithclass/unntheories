import React from 'react';
import Blogbtn from 'app/components/navbtn/Blogbtn';
import Header from 'app/components/header/Header';
import Footer from 'app/components/footer/Footer';
import { useListGenres } from 'app/services/data.service';
import { checkMobile } from 'app/utils/utils';

const Buttons = (props) => {
  const { blogs } = props;

  const isMobile = checkMobile();

  const columnClass = isMobile ? 'width90 left5' : 'width80 hcenter';

  if (!blogs || blogs.length === 0) {
    return (
      <div className="relative width">
        <div className="absolute center font-40">no blog</div>
      </div>
    );
  }

  return (
    <div className="relative width">
      {blogs.map((blog, key) => {
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
              <Blogbtn blog={blog}></Blogbtn>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Genres = (props) => {
  const { genres } = props;
  if (!genres || genres.length === 0) {
    return <div className="relative width">no blogs</div>;
  }

  return (
    <div className="relative width">
      {genres.map((item, key) => {
        const genre = item.genre;
        const blogs = item.blogs;

        return (
          <div key={`${key}`} className={`relative width`}>
            <div className="relative height-80 width border-bottom">
              <div className="absolute bottom0 font150-rem center">{genre.title}</div>
            </div>
            <div className={`relative width`}>
              <div className="relative width">
                <Buttons blogs={blogs} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const { data, isLoading } = useListGenres();

  const isMobile = checkMobile();

  const mainColumnClass = isMobile ? 'width80 left10' : 'width60 hcenter';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative width height">
      <Header state="home"></Header>
      <div
        className={`relative white-back ${mainColumnClass}`}
        id="button-group"
      >
        <div className="relative width margin-v-50">
          <Genres genres={data} />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
