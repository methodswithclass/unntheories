import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from 'app/components/header/Header';
import Footer from 'app/components/footer/Footer';
import { checkMobile, getMonth } from 'app/utils/utils';
import { useGetBlog } from 'app/services/data.service';

const getDateString = (date) => {
  const [year, month, day] = date.split('-');

  return `${getMonth(parseInt(month) - 1)} ${parseInt(day)}, ${year}`;
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

const Paragraph = (props) => {
  const { paragraph } = props;

  return (
    <div className="relative width">
      {paragraph.para == 'para' ? (
        <ParagraphType text={paragraph.text} />
      ) : (
        <ListType text={paragraph.text} />
      )}
      <div className="relative width height-30 white-back"></div>
    </div>
  );
};

const Section = (props) => {
  const { text: section } = props;

  const allParagraphs = section.map((paragraph, index) => {
    return <Paragraph key={index} paragraph={paragraph} />;
  });

  return (
    <div className="relative width">
      {allParagraphs}
      <div className="relative width60 height-70 margin-bottom-100 hcenter border-bottom"></div>
    </div>
  );
};

const Body = (props) => {
  const { content: sections, width } = props;

  const sectionElements = sections.map((section, index) => {
    return <Section key={index} text={section} />;
  });

  return <div className={`relative hcenter ${width}`}>{sectionElements}</div>;
};

const Title = (props) => {
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
  const { blog: name } = useParams();

  const isMobile = checkMobile();

  const blog = useGetBlog(name);

  const width = isMobile ? 'width' : 'width60';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return null;
  }

  return (
    <div className="relative width height cutoffX">
      <Header title={blog.title} img={blog.image} state={blog.name}></Header>
      <div className="relative width">
        <div className="relative width white-back">
          <div className="relative width padding-v-100">
            <div className="relative width80 font-15 line-height-30 hcenter">
              <div className="relative width padding-v-50">
                <Title content={blog} />
              </div>

              <div className="relative garamond font-20 width paddinv-v-50">
                <Body content={blog.blog} width={width} />
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
