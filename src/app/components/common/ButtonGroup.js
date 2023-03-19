import React from 'react';

export default (props) => {
  let inactive = 'white-back black';
  let active = 'black-back white';
  return (
    <div className="absolute width height">
      <div className="absolute width height"></div>

      <div className="relative width height">
        <div className="absolute width80 height40 center rounded10 cutoff border-white">
          <div className="absolute width130 height">
            <div
              className="relative width40 height inline pointer"
              onClick={(e) => props.change(props.styles.double)}
            >
              <div
                className={`relative width height rounded ${
                  props.isActive(props.styles.double) ? active : inactive
                }`}
              >
                <div className="absolute center">view some</div>
              </div>
            </div>
            <div
              className="relative width40 height inline pointer"
              onClick={(e) => props.change(props.styles.single)}
            >
              <div
                className={`relative width height rounded ${
                  props.isActive(props.styles.single) ? active : inactive
                }`}
              >
                <div className="absolute center">view all</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
