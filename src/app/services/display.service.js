

import * as u from "./utility.service";
import * as settings from "./settings.service";

var $ = u.jquery();


export var toggle = function (toggle) {


	if (toggle) {


		

		setTimeout(function () {

			settings.animateToggle(false);

	        $("#demoid").animate({opacity:1}, 600);
	        u.toggle("show", "settings", {delay:300});
	        
		}, 600);

	}
	else {

		$("#demoid").css({opacity:0});
		u.toggle("hide", "settings");

	}

}