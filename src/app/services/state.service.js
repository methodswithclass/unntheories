


import { pushStateLocationPlugin } from "@uirouter/react";

import Home from "../states/home/Home";
import Piece from "../states/piece/Piece";


import * as h from "./history.service";


var statename = "";

var $roots = [
	"home"
]


function setStateName ($name) {

	// previousIndex++;

	statename = $name;

	h.$history($name);

	// var found = $roots.find((p) => {

	// 	return p == $name;
	// })


	// if (!found) {

	// 	h.toggle(false);
	// }
}


var back = [
{
	id:"home",
	state:"home",
	back:"home"
},
{
	id:"blogs",
	state:"blogs",
	back:"home"
},
{
	id:"poetry",
	state:"poetry",
	back:"home"
}
]


export var states = [
{
	name: 'home',
	url: '/home',
	component: Home,
	resolve:[{
	token: 'home',
	deps: ['$transition$'],
	resolveFn: (trans) => {
	  setStateName("home");
	}
	}]
},
{
	name: 'blogs',
	url: '/blogs/:name',
	component: Piece,
	resolve:[{
	token: 'name',
	deps: ['$transition$'],
	resolveFn: (trans) => {
	  setStateName(trans.params().name);
	}
	}]
},
{
	name: 'poetry',
	url: '/poetry/:name',
	component: Piece,
	resolve:[{
	token: 'name',
	deps: ['$transition$'],
	resolveFn: (trans) => {
	  setStateName(trans.params().name);
	}
	}]
}
]


var setupHistory = function () {


	h.setup({
		roots:$roots,
		index:0,
		states:states
	});
}

setupHistory();

export const configRouter = ($router) => {

	console.log("$router", $router);

	$router.urlRouter.otherwise({state:"home"});
	$router.urlService.config.html5Mode(true);

}



export var plugins = [pushStateLocationPlugin];



export function getName() {

	// var name = router.stateService.current.name;

	console.log("get name in service", statename);

	return statename;

}

export function getBack () {

	var state = getName();


	var found = back.find((p) => {

		return p.state == state;
	})


	if (found) {

		return found.back;
	}
	else {
		return "home";
	}
}


export function getTitle () {

	var name = getName();

	// console.log("get name", state, name);

	var capital = name.substr(0,1);

	return capital.toUpperCase() + name.slice(1);
}

