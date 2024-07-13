import React from 'react';
import NavBtn from 'app/components/navbtn/Navbtn';
import { checkMobile } from 'app/utils/utils';

const pageTitle = 'weight of the stone';

const Header = (props) => {
  const { state, img, title, button } = props;
  const isMobile = checkMobile();
  return (
    <div className="relative width">
      {state === 'home' ? (
        <div className="relative width height-400">
          <div className="absolute width80 height-400 center">
            <div className={`relative width height50 garamond ${isMobile ? 'font-60 text-center' : 'font-100'}`}><div className="absolute center">{pageTitle}</div></div>
            <div className="relative width80 height50 font-20 hcenter text-center"><div className="absolute center">toss it around in your hand and throw it in the pond</div></div>
          </div>
          
        </div>
      ) : (
        <div className="relative width height-600 raised cutoff">
          <div className="absolute width height" id="splash">
            <img
              className={`absolute ${
                isMobile ? 'width-auto height' : 'width height-auto'
              }`}
              src={`/asset/${img}.jpg`}
              id="banner"
            />
          </div>

          <div
            className={`absolute ${
              isMobile ? 'width40' : 'width20'
            } height-100 bottom-400 left-minus-20`}
          >
            <div className="absolute width height rounded10 black-back opacity70 border-white"></div>
            <NavBtn class="center white font-20" name="home" to="/" />
          </div>

          <div className="absolute width60 height-200 bottom-50 left-minus-20">
            <div className="absolute width height rounded10 black-back opacity70 border-white"></div>
            <div className="absolute width80 height80 center beige font-30 dearjoe">
              <div className="absolute center text-center">{title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
