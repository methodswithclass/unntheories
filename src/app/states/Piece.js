import React, { Component } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import * as u from '../services/utility.service';
import * as data from '../services/data.service';

let ParagraphType = (props) => {
  return (
    <div className="relative width">
      <div className="relative width font-15 line-height-30">{props.text}</div>
    </div>
  );
};

let ListType = (props) => {
  return (
    <div className="relative width">
      <table className="relative width">
        <tbody>
          <tr className="relative width">
            <td className="relative width10 table-cell cell-top"></td>
            <td className="relative width10 font-20 line-height-40 table-cell cell-top">
              <div className="relative width height-30">
                <div className="absolute center">&bull;</div>
              </div>
            </td>
            <td className="relative width75 font-15 line-height-30 table-cell cell-top">
              {props.text}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

var ParagraphComponent = (props) => {
  var getParaType = (paragraph) => {
    if (paragraph.para == 'para') {
      return <ParagraphType text={paragraph.text} />;
    } else if ((paragraph.para = 'list')) {
      return <ListType text={paragraph.text} />;
    }
  };

  return (
    <div className="relative width">
      {getParaType(props.paragraph)}
      <div className="relative width height-30 white-back"></div>
    </div>
  );
};

var SectionComponent = (props) => {
  let section = props.text;

  var allParagraphs = section.map((paragraph, index) => {
    return <ParagraphComponent key={index} paragraph={paragraph} />;
  });

  return (
    <div className="relative width">
      {allParagraphs}
      <div className="relative width60 height-70 margin-bottom-100 hcenter border-bottom"></div>
    </div>
  );
};

var TextComponent = (props) => {
  // console.log("text", props.text);
  let sections = props.content;

  var sectionElements = sections.map((section, index) => {
    return <SectionComponent key={index} text={section} />;
  });

  return (
    <div className={`relative hcenter ${props.widths.body}`}>
      {sectionElements}
    </div>
  );
};

let TitleComponent = (props) => {
  var getDateString = function (date) {
    // var date = blog.meta.date;
    var year = date.getYear() + 1900;

    var getMonth = function () {
      return u.getMonth(date.getMonth());
    };

    return getMonth() + ' ' + date.getDate() + ', ' + year;
  };

  let meta = props.content;

  let dateString = getDateString(meta.date);

  return (
    <div className="relative width font-bold">
      <div className="relative width padding-v-20">
        <div className="relative width">{meta.by}</div>

        <div className="relative width">{dateString}</div>
      </div>
      <div className="relative width padding-v-20">{meta.title.l.text}</div>

      <div className="relative width border-bottom"></div>
    </div>
  );
};

class Piece extends Component {
  render() {
    //return views.Piece(this.props);

    let blog = data.getBlogByName(this.props.$stateParams.name);

    let widths = {};

    if (u.checkMobile()) {
      widths.body = 'width';
    } else {
      console.log('blog', blog);

      widths.body = 'width60';
    }

    return (
      <div className="relative width height cutoffX scrollY scroll-vertical-dark-narrow">
        <Header title={blog.meta.title.s.text} img={blog.meta.image}></Header>
        <div className="relative width">
          <div className="relative width white-back">
            <div className="relative width padding-v-100">
              <div className="relative width80 hcenter">
                <div className="relative width padding-v-50">
                  <TitleComponent content={blog.meta} />
                </div>

                <div className="relative width font-15 paddinv-v-50">
                  <TextComponent content={blog.content} widths={widths} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative width">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default Piece;
