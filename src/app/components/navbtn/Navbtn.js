import React, { Component } from 'react';

var getIndex = function () {
  //   h.changePreviousIndex(h.getName());
};

class Navbtn extends Component {
  render() {
    return (
      <div
        className={
          'absolute width height rounded10 pointer ' + this.props.class
        }
        onClick={getIndex}
      >
        <div className="absolute center">{this.props.name}</div>
      </div>
    );
  }
}

export default Navbtn;
