import React from 'react';
import NavBtn from '../navbtn/Navbtn';
import ButtonGroup from '../common/ButtonGroup';
import * as u from '../../services/utility.service';

const pageTitle = 'unnecessary theories';

const showDisplayButtons = false;

const Header = (props) => {
  const { state, img, title, button } = props;
  const isMobile = u.checkMobile();
  return (
    <div className="relative width">
      {state === 'home' ? (
        <div className="relative width height-600 raised cutoff">
          <div className="absolute width height" id="splash">
            <img
              className={`absolute ${
                isMobile ? 'width-auto height' : 'width height-auto'
              } opacity70`}
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
            <div
              className={`absolute width80 height80 center beige ${
                isMobile ? 'font-50' : 'font-70'
              } dearjoe`}
            >
              <div className="absolute center">{pageTitle}</div>
            </div>
          </div>

          {showDisplayButtons ? (
            <div
              className={`absolute ${
                isMobile ? 'width40' : 'width20'
              } height-100 bottom-0 right0`}
            >
              <ButtonGroup
                isActive={button.isActive}
                change={button.change}
                styles={button.styles}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="relative width height-600 raised cutoff">
          <div className="absolute width height" id="splash">
            <img
              className={`absolute ${
                isMobile ? 'width-auto height' : 'width height-auto'
              }`}
              src={`/${img}.jpg`}
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
