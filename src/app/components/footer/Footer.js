import React, { Component } from 'react';

import * as u from "../../services/utility.service";

// import '../../../assets/css/classes.css';


class Footer extends Component {

  getYear() {

    let date = new Date();

    return date.getYear() + 1900;
  }

  render() {

    var font;

    if (u.checkMobile()) {

        font = "font-40";
    }
    else {
        font = "font-20";
    }


    return (

      <div className="relative width height-400 black-back border-top-white" id="footer">
        <div className={"absolute width80 height-30 hcenter bottom-100 text-right white " + font}>&copy;{this.getYear()} powered by Methods with Class, LLC</div>
      </div>


    );
  }
}

export default Footer;
