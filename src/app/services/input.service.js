

import * as config from "./config.service";
import * as shared from "./shared.service";

import * as $ from "jquery";

var gl = {};
var temp = {};

var n = "";


// var crossoverMethods;
var runPopTypes;
var reproductionTypes;
var $$master_initial;
var $master_input = {};
var $reset_input = {};
export var settings;




var displayTypes = {
	value:"value",
	string:"string"
}




var getValue = function ($value) {

	var value = parseFloat($value)
	return value ? shared.g.truncate(value/100, 2) : $value;
}

var getString = function ($value) {

	var value = parseFloat($value);
	return value ? Math.floor(value*100) : $value;
}

// var getFloatFromId = function (id) {

// 	var $value = $("#" + id + "input").val();
// 	var value = parseFloat($value);
// 	return value ? value : $value;
// }

var getIntFromId = function (id) {

	var $value = $("#" + id + "input").val();
	var value = parseInt($value);
	return value ? value : $value;
}

var resolveDisplay = function (options) {


	var pool = parseFloat(options.pool);
	var mutate = parseFloat(options.mutate);

	var $pool;
	var $mutate;


	var types = {
		value:"value",
		string:"string"
	}

	// console.log("resolve display input", options);

	if (options.type === types.value) {

		// console.log("type value");

		$pool = pool > 1 ? getValue(pool) : pool;
		$mutate = mutate > 1 ? getValue(mutate) : mutate;

	}
	else if (options.type === types.string) {

		// console.log("type string");

		$pool = pool < 1 ? getString(pool) : pool;
		$mutate = mutate < 1 ? getString(mutate) : mutate;
		}

		// console.log("resolve display result", {$pool, $mutate});

	return {
		pool:$pool,
		mutate:$mutate
	}

}

var setValues = function (input) {

    setInput(input);

	var values = resolveDisplay({
		pool:input.pool,
		mutate:input.mutate,
		type:displayTypes.string
	})

	$("#gensinput").val(input.gens);
	$("#runsinput").val(input.runs);
	$("#popinput").val(input.pop);
	$("#parentsinput").val(input.parents);
	$("#splicemininput").val(input.splicemin);
	$("#splicemaxinput").val(input.splicemax);
	$("#poolinput").val(values.pool);
	$("#mutateinput").val(values.mutate);
    $("#methodinput").val(input.method);

}

export var getSettings = function () {

	return settings;
}




var setSettings = function (input) {

	var values = resolveDisplay({
		pool:input.pool,
		mutate:input.mutate,
		type:displayTypes.string
	})


	// console.log("set settings", input.pool, input.mutate, values.pool, values.mutate);

	settings = {
    	gens: 				input.gens,
    	runs: 				input.runs,
    	pop:  				input.pop,
		parents: 			input.parents,
		splicemin: 			input.splicemin,
		splicemax: 			input.splicemax,
		pool: 				values.pool,
		mutate: 			values.mutate,
        goal:               "max",
        method:             input.method || temp[n].method,

    	runPopType: 		input.runPopType || temp[n].runPopType,
		reproductionType: 	input.reproductionType || temp[n].reproductionType
    }

    // console.log("set settings", $scope.settings);

    return settings;

}


export var changeInput = function () {

	var manual = {
        gens: 				$("#gensinput").val(),
        runs: 				$("#runsinput").val(),
        pop: 				$("#popinput").val(),
    	parents: 			$("#parentsinput").val(),
    	splicemin: 			$("#splicemininput").val(),
    	splicemax: 			$("#splicemaxinput").val(),
    	pool: 				$("#poolinput").val(),
    	mutate: 			$("#mutateinput").val(),
    	// method: 			($scope.settings ? ($scope.settings.method || crossoverMethods.default) : crossoverMethods.default)
        method:             $("#methodinput").val()   
    }

    

    // console.log("change input", manual);

	return manual;
}


export var setName = function ($name) {

    n = $name;
    temp[n] = {};
    gl[n] = {};
}

var resolveKeysForInitialInput = function (key) {

    return key !== "gens" && key !== "$name" && key !== "session" && key !== "programInput"
}


export var setInput = function (options) {

    // console.log("set input", n, options);

	for (var i in options) {

        if (resolveKeysForInitialInput(i)) $reset_input[n][i] = options[i];
			temp[n][i] = options[i];
        	gl[n][i] = options[i];
		}

	    shared.react.push({
	        name:"data" + n,
	        state:{
	            input:gl[n]
	        }
	    })

	}


export var getInput = function (update) {

	if (typeof update === "undefined") update = false;
	
	// update = false;

	var values = resolveDisplay({
		pool:update ? getIntFromId("pool") : temp[n].pool,
		mutate:update ? getIntFromId("mutate") : temp[n].mutate,
		type:displayTypes.value
	})


	var $method = $("#methodinput");

	// console.log("get input", n);

	gl[n] = {
		
		name: 				n,

		gens: 				update ? getIntFromId("gens") 						: temp[n].gens,
		runs: 				update ? getIntFromId("runs") 						: temp[n].runs,
		pop: 				update ? getIntFromId("pop") 						: temp[n].pop,
		parents: 			update ? getIntFromId("parents") 					: temp[n].parents,
		splicemin: 			update ? getIntFromId("splicemin") 					: temp[n].splicemin,
		splicemax: 			update ? getIntFromId("splicemax") 					: temp[n].splicemax,
        method:             update ? $method.val()                              : temp[n].method,

        pool:               values.pool,
        mutate:             values.mutate,
        goal:               "max",

		runPopType: 		temp[n].runPopType || runPopTypes.default,
		reproductionType: 	temp[n].reproductionType || reproductionTypes.default,
		programInput: 		temp[n].programInput || {},
		session: 			temp[n].session || ""
	}

	// console.log("get input", update, temp[n], gl[n]);

    temp[n] = gl[n];

    setValues(gl[n]);

    setSettings(gl[n]);

    return gl[n];
}


export var resendInput = function () {
	return gl[n];
}

export var masterReset = function ($name) {

    setInput($master_input[$name ? $name : n]);
}


export var setMaster = function ($name) {

    $master_input[$name] = {};
    $reset_input[$name] = {};

    // console.log("master", $$master_initial);

    for (var i in $$master_initial) {

        $master_input[$name][i] = $$master_initial[i];
        $reset_input[$name][i] = $$master_initial[i];
    }
}

var overrideAsync = function ($name, data) {

    // console.log("data", $name, data, $master_input);

    for (var i in data) {

        var override = data[i];

        if (override) {
            $master_input[$name][i] = override;
        }
    }

    $reset_input[$name] = $master_input[$name];

    masterReset($name);
}

export var setOverride = function ($name, complete) {

    setMaster($name);


	var data = config.get.sync("global.programs." + $name + ".override");    

	overrideAsync($name, data);


	if (typeof complete === "function") complete();
}

export var resetInput = function () {

    // sendVars();

    setOverride(n, function () {

        setInput($reset_input);
    });
    // console.log("reset input does nothing");
}






export var createInput = function ($name, complete) {

    setName($name);
    

    runPopTypes = config.get.sync("global.types.runPopTypes")
    reproductionTypes = config.get.sync("global.types.reproductionTypes");
    $$master_initial = config.get.sync("global.initial");


    setOverride($name, function () {

        if (typeof complete === "function") complete($name);
    })
    
}