import React, { Component } from 'react';

import { UISref, UISrefActive } from '@uirouter/react';


import '../../../assets/css/classes.css';

import * as h from "../../services/history.service";

var getIcon = function ($this) {

  return "fas " + $this.props.icon;
}

var clicked = function () {

	h.toggle(false);
}

class Iconbtn extends Component {

	render() {
		return (


			<UISrefActive class="active">
				<UISref to={this.props.state}>

					<div className="absolute width80 height80 center raised rounded20 black-back pointer" onClick={clicked}>
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

				</UISref>
			</UISrefActive>


		);
	}
}

export default Iconbtn;
