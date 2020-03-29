

import * as $input from "./input.service";
import * as $socket from "./api.socket.service";


var prints = {
    evolve:false,
    singles:true
}

var names = [
{
    name:"getBest",
    print:prints.evolve && true
},
{
    name:"stepdata",
    print:prints.evovle && true
},
{
    name:"running",
    print:prints.evolve && true
},
{
    name:"instantiate",
    print:prints.singles && true
},
{
    name:"initialize",
    print:prints.singles && true
},
{
    name:"input",
    print:prints.evolve && true
},
{
    name:"instruct",
    print:prints.singles && true
},
{
    name:"refresh",
    print:prints.singles && false
},
{
    name:"reset",
    print:prints.singles && false
},
{
    name:"simulateTrash",
    print:prints.singles && true
},
{
    name:"simulateRecognize",
    print:prints.singles && true
},
{
    name:"simulateDigit",
    print:prints.singles && true
},
{
    name:"hardStop",
    print:prints.singles && true
}
]



var open = {
	opened:false,
    delay:1000,
    instantiate:function () {
    	$socket.openWS("instantiate", "/api/instantiate");
    },
    initialize:function () {
    	$socket.openWS("initialize", "/api/initialize");
    }
};


export var instantiate = function (callback) {

	var funcName = "instantiate";

	console.log("instantiate ws call");

	socket[funcName].onmessage = $socket.onMessageFunc(funcName, callback);

	$socket.ready(funcName, function (name) {
		$socket.onSendFunc(name, {message:"instantiate"});
	});
};


export var initialize = function (callback) {


    console.log("initialize ws call");

    var funcName = "initialize";

    socket[funcName].onmessage = $socket.onMessageFunc(funcName, callback);

    $socket.ready(funcName, function (name) {
		$socket.onSendFunc(name, {data:{input:$input.getInput()}});
	});

};



$socket.openSockets(open);


