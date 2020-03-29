

import * as u from "./utility.service"; 
import * as display from "./display.service";


var loadmessage = "loading message...";
var $phases = [];
var $ = u.jquery();

export function getMessage (lmessage) {

	return loadmessage;
}

function setMessage (lmessage) {

    console.log("set message", lmessage);

    loadmessage = lmessage;
}


function runPhase (index) {

	console.log("run phase", index);

	

	// console.log("run complete index", index, "length", $phases.length);

	if (index <= $phases.length-1) {

		$("#loadingtoggle").css({opacity:1, display:"block"});
        display.toggle(false);
		setTimeout(function () {

    		setMessage($phases[index].message);

    		$phases[index].phase({
    			duration:$phases[index].duration,
    			complete:function () {

    				runPhase(index + 1);
    			}
    		});

		}, $phases[index].delay);

	}
	else {

		setMessage("");
        $("#loadingtoggle").animate({opacity:0, display:"none"}, 600);
        display.toggle(true);
	}

}


export function initialize (_phases) {

    $phases = _phases;

	// console.log("phases", this.$phases);

}

export function run () {

    console.log("run phase 0");

	runPhase(0);
}