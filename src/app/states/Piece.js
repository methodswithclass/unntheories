import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import * as u from '../services/utility.service';
import * as data from '../services/data.service';

export const loader = async ({ params }) => {
  const blog = await data.getBlogByName(params.blog);

  return blog;
};

const ParagraphType = (props) => {
  const { text } = props;
  return (
    <div className="relative width">
      <div className="relative width">{text}</div>
    </div>
  );
};

const ListType = (props) => {
  const { text } = props;
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
            <td className="relative width75 table-cell cell-top">{text}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ParagraphComponent = (props) => {
  const { paragraph } = props;
  const getParaType = () => {
    if (paragraph.para == 'para') {
      return <ParagraphType text={paragraph.text} />;
    } else if ((paragraph.para = 'list')) {
      return <ListType text={paragraph.text} />;
    }
  };

  return (
    <div className="relative width">
      {getParaType()}
      <div className="relative width height-30 white-back"></div>
    </div>
  );
};

const SectionComponent = (props) => {
  const { text: section } = props;

  const allParagraphs = section.map((paragraph, index) => {
    return <ParagraphComponent key={index} paragraph={paragraph} />;
  });

  return (
    <div className="relative width">
      {allParagraphs}
      <div className="relative width60 height-70 margin-bottom-100 hcenter border-bottom"></div>
    </div>
  );
};

const TextComponent = (props) => {
  const { content: sections, widths } = props;

  const sectionElements = sections.map((section, index) => {
    return <SectionComponent key={index} text={section} />;
  });

  return (
    <div className={`relative hcenter ${widths.body}`}>{sectionElements}</div>
  );
};

const TitleComponent = (props) => {
  const getDateString = (date) => {
    const [year, month, day] = date.split('-');

    const getMonth = () => {
      return u.getMonth(parseInt(month) - 1);
    };

    return `${getMonth()} ${parseInt(day)}, ${year}`;
  };

  const { content: blog } = props;

  const dateString = getDateString(blog.date);

  return (
    <div className="relative width font-bold">
      <div className="relative width padding-v-20">
        <div className="relative width">{blog.by}</div>

        <div className="relative width">{dateString}</div>
      </div>
      <div className="relative width padding-v-20">{blog.description}</div>

      <div className="relative width border-bottom"></div>
    </div>
  );
};

const Piece = () => {
  const blog = useLoaderData();

  const isMobile = u.checkMobile();

  const widths = { body: isMobile ? 'width' : 'width60' };

  if (!blog?.blog) {
    return null;
  }

  return (
    <div className="relative width height cutoffX">
      <Header title={blog.title} img={blog.image} state={blog.id}></Header>
      <div className="relative width">
        <div className="relative width white-back">
          <div className="relative width padding-v-100">
            <div
              className={`relative width80 ${
                isMobile ? 'font-30 line-height-70' : 'font-15 line-height-30'
              } hcenter`}
            >
              <div className="relative width padding-v-50">
                <TitleComponent content={blog} />
              </div>

              <div className="relative width paddinv-v-50">
                <TextComponent content={blog.blog} widths={widths} />
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
};

export default Piece;
