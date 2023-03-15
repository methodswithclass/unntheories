import React, { Component } from 'react';

var getIcon = function ($this) {
  return 'fas ' + $this.props.icon;
};

var clicked = function () {
  // h.toggle(false);
};

class Iconbtn extends Component {
  render() {
    return (
      <div
        className="absolute width80 height80 center raised rounded20 black-back pointer"
        onClick={clicked}
      >
        <div className="absolute width height80 vcenter white">
          <div className="relative width height50">
            <div className="relative center text-center font-50">
              <i className={getIcon(this)}></i>
            </div>
          </div>

          <div className="relative width height50">
            <div className="relative center text-center font-30">
              {this.props.name}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Iconbtn;
