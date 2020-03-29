



var history = [];
var historynoroot = [];
var previousIndex = 1;
var pressedBack = false;
var statename;
var $state = {};
var $index;
var historyToggle = false;

export var toggle = function ($toggle) {

	historyToggle = $toggle;
}

var getToggle = function () {

	return historyToggle;
}

export var setup = function (options) {


	$index = options.hasOwnProperty("index") ? options.index : 0;
	// $state.roots =  ? options.roots : [states[$index].name];
	$state.roots = {};

	if (options.hasOwnProperty("roots")) {

		for (var i in options.roots) {
			$state.roots[i] = {};
			$state.roots[i].root = options.roots[i];
		}
	}
}


export var getName = function () {

	return statename;
}


export var stateIsARoot = function(state) {

	var $statename = state || getName();

	var found = getRoot($statename)

	if (found) {
		return true;
	}
	else {
		return false;
	}
}

export function $history ($name) {


	statename = $name;

	if ($name == $state.roots[0]) {
		history = [$state.roots[0]];
		historynoroot = [$state.roots[0]];
		previousIndex = 1;
	}
	else if (!pressedBack) {
		history.splice(0, 0, $name);
	}


	if (!stateIsARoot($name) && !pressedBack) {

		historynoroot.splice(0, 0, $name);
	}

	pressedBack = false;

}


var getRoot = function ($root) {

	var found = null;

	for (var i in $state.roots) {

		if ($state.roots[i].root == $root) {

			found = $state.roots[i];
		}
	}

	return found;
}



export var setRootBack = function ($root) {

	var found = getRoot($root);


	if (found) {

		found.back = getName();
	}
	else {
		console.log("root not found, cannot set 'back'");
	}
}


export var getRootBack = function ($root) {

	var found = getRoot($root);

	if (found) {

		return found.back;
	}
	else {
		console.log("root not found, cannot return 'back'");
		return "home";
	}
}


export var changePreviousIndex = function ($name) {

	if (!stateIsARoot($name)) {
		previousIndex++;
		toggle(false);
	}
	else {
		toggle(true);
	}
	pressedBack = true;
}

var getPreviousName = function ($name) {

	if (getToggle()) {
		return historynoroot[previousIndex];
	}
	else {
		return history[previousIndex];
	}
}


export var getPrevious = function ($name) {

	if (stateIsARoot($name)) {
		return getRootBack($name);
	}
	else {
		return getPreviousName($name);
	}
}
