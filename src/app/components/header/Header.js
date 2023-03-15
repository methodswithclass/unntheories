import React, { Component } from 'react';
import NavBtn from '../navbtn/Navbtn';
import ButtonGroup from '../common/ButtonGroup';
import * as u from '../../services/utility.service';

var title = 'unnecessary theories';

const state = 'home';

var getHeader = function (font, props) {
  if (state == 'home') {
    return (
      <div className="relative width height-600 raised cutoff">
        <div className="absolute width height" id="splash">
          <img
            className="absolute width height-auto opacity70"
            src="img/evolution_chalk.jpg"
            id="banner"
          />
          <div className="absolute width90 height90 center">
            <div className="absolute width height text-right font-90 dearjoe">
              {u.makeTitle(
                "here are some theories, <br><br>they're probably unnecessary",
                '<br>'
              )}
            </div>
          </div>
        </div>

        <div className="absolute width60 height-200 bottom-50 left-minus-20">
          <div className="absolute width height rounded10 black-back opacity70 border-white"></div>
          <div className="absolute width80 height80 center beige font-70 dearjoe">
            <div className="absolute center">{title}</div>
          </div>
        </div>

        <div className="absolute width20 height-100 bottom-0 right0">
          <ButtonGroup
            isActive={props.button.isActive}
            change={props.button.change}
            styles={props.button.styles}
          />
        </div>
      </div>
    );
  } else {
    console.log('image', props.img);

    return (
      <div className="relative width height-600 raised cutoff">
        <div className="absolute width height" id="splash">
          <img
            className="absolute width height-auto"
            src={'/' + props.img + '.jpg'}
            id="banner"
          />
        </div>

        <div className="absolute width20 height-100 bottom-400 left-minus-20">
          <div className="absolute width height rounded10 black-back opacity70 border-white"></div>
          <NavBtn state="home" class="center white font-20" name="home" />
        </div>

        <div className="absolute width60 height-200 bottom-50 left-minus-20">
          <div className="absolute width height rounded10 black-back opacity70 border-white"></div>
          <div className="absolute width80 height80 center beige font-30 dearjoe">
            <div className="absolute center text-center">{props.title}</div>
          </div>
        </div>
      </div>
    );
  }
};

class Header extends Component {
  render() {
    var font;

    if (u.checkMobile()) {
      font = 'font-30';
    } else {
      font = 'font-15';
    }

    return <div className="relative width">{getHeader(font, this.props)}</div>;
  }
}

export default Header;
