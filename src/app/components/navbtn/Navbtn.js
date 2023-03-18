import React from 'react';
import { Link } from 'react-router-dom';

const Navbtn = (props) => {
  return (
    <Link to={props.to}>
      <div className={'absolute width height rounded10 pointer ' + props.class}>
        <div className="absolute center">{props.name}</div>
      </div>
    </Link>
  );
};

export default Navbtn;
