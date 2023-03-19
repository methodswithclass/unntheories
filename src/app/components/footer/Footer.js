import React from 'react';

const Footer = () => {
  const getYear = () => {
    const date = new Date();

    return date.getYear() + 1900;
  };

  return (
    <div
      className="relative width height-400 black-back border-top-white"
      id="footer"
    >
      <div className="absolute width80 height-30 hcenter bottom-100 text-right white font-20">
        &copy;{getYear()} powered by Methods with Class, LLC
      </div>
    </div>
  );
};

export default Footer;
