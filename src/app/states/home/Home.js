import React, { Component } from 'react';

import Blogbtn from "../../components/navbtn/Blogbtn";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

// import * as views from "../../views/home.view.js";

import * as u from "../../services/utility.service";
// import * as state from "../services/state.service";
import * as data from "../../services/data.service";

let styles = {
  single:"single",
  double:"double"
}

let displayStyle = styles.double;
let changed = 0;

let increm = () => {

  resetCounter();
  changed++;
}

let resetCounter = () => {
  if (changed > 5) {
    changed = 0;
  }
}

class Home extends Component {


  constructor(props) {

    super(props);

    this.state = {
      display:u.checkMobile() ? styles.single : styles.double
    }

    this.getBlogButtons = this.getBlogButtons.bind(this);
    this.getGenres = this.getGenres.bind(this);
  }

  getBlogButtons(genre) {

    if (genre[0]) {

      let columnClass = this.state.display == styles.single ? "width80 left20" : "width80 left10";

      var blogButtons = data.getBlogsByGenre(genre[0].meta.genre).map((blog, key) => {

        if (blog) {
          return (
            <div key={key} className="relative width">
              <div className={`relative ${columnClass}`}>
                <Blogbtn state={blog.meta.genre} blog={blog.meta.name}></Blogbtn>
              </div>
            </div>
          )
        }
        else {
          return (
            <div key={key} className="relative width">
              <div className="absolute center font-40">
                no blog
                </div>
            </div>
          )

        }


      })

      return (
        <div className="relative width">
          {blogButtons};
        </div>
      )

    }
    else {

      return (
        <div key="key0" className="relative width">
          <div className="absolute center font-40">
            no blog
            </div>
        </div>
      )

    }


  }


  getGenres() {


    console.log("blogs", data.getGenres());

    var genres = data.getGenres().map(($genre, key) => {

      var genre = $genre[0];
      console.log("genre", genre);
      let columnClass = this.state.display == styles.single ? "width" : "width40 padding-h-50 inline cell-top";
      let scrollClass = this.state.display == styles.double ? "height-600 margin-bottom-100 border lowered scrollY scroll-vertical-dark-narrow" : "";
      // flex flex-wrap flex-row flex-justify-space 
      // width40 padding-h-50 inline cell-top
      return (

        <div key={`${key}${changed}`} className={`relative ${columnClass}`}>
          <div className="relative height-80 width border-bottom">
            <div className="absolute bottom0 font150-rem">
              {genre[0].meta.genre.toUpperCase()}
            </div>
          </div>
          <div className={`relative width ${scrollClass}`}>
            <div className="relative width">
                {this.getBlogButtons(genre)}
            </div>
          </div>
        </div>

      )


    })

    return (
      <div className="relative width">
        {genres}
      </div>
    )
  }


  render() {
    // return views.Home();

    let columnClass = this.state.display == styles.single ? "width65 left10" : "width90 left5";
    let isActive = (type) => {

      return type == this.state.display;
    }

    let change = (type) => {
      increm();
      this.setState({display:type});
    }

    return (
      <div className="relative width height scrollY scroll-vertical-dark-narrow">
        <Header button={{isActive, change, styles}}></Header>
        <div key={`${this.state.display}${changed}`} className={`relative white-back ${columnClass}`} id="button-group">
          <div className="relative width margin-v-50">
            {this.getGenres()}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;