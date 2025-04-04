import Blogbtn from "app/components/navbtn/Blogbtn";
import Header from "app/components/header/Header";
import Footer from "app/components/footer/Footer";
import { useListBlogs } from "app/services/query";
import { checkMobile, validate } from "app/utils/utils";
import { applyTimeout } from "app/services/auth";

const Genre = (props) => {
  const { blogs, title } = props;

  const isMobile = checkMobile();

  const columnClass = isMobile ? "width90 left5" : "width80 hcenter";

  return (
    <div className="relative width">
      <div className={`relative width`}>
        <div className="relative height-80 width border-bottom">
          <div className="absolute bottom0 font150-rem center">{title}</div>
        </div>
        <div className={`relative width`}>
          <div className="relative width">
            {blogs?.length > 0 ? (
              blogs.map((item) => (
                <div key={item.name} className="relative width">
                  <div className="relative width">
                    <div className={`relative ${columnClass}`}>
                      <Blogbtn blog={item}></Blogbtn>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="relative width">no blogs</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  applyTimeout();
  const { data, isPending } = useListBlogs();

  const isMobile = checkMobile();

  const mainColumnClass = isMobile ? "width80 left10" : "width60 hcenter";

  if (isPending) {
    return "Loading...";
  }

  return (
    <div className="relative width height">
      <Header state="home"></Header>
      <div
        className={`relative white-back ${mainColumnClass}`}
        id="button-group"
      >
        <div className="relative width margin-v-50">
          <Genre
            blogs={data
              .filter(validate)
              .filter((item) => item.genre === "blogs")}
            title="Writings"
          />
          <Genre
            blogs={data
              .filter(validate)
              .filter((item) => item.genre === "poetry")}
            title="Rhymings"
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
