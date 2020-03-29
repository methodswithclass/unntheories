
import * as u from "./utility.service";
import * as $input from "./input.service";

var socket = {};
var delay = {};


var stopInterval = function (name) {

	clearInterval(delay[name]);
	delay[name] = null;
}

export var ready = function (name, complete) {

	// console.log("call ready", name);

	delay[name] = setInterval(function () {

		// console.log("readyState", name, socket[name].readyState)

		if (socket[name].readyState === 1) {
			// console.log(name, "is ready");
			if (typeof complete === "function") complete(name);
			stopInterval(name);
		}
		else if (socket[name].readyState === 3) {
			console.log(name, "is closed");
			stopInterval(name);
		}

	}, 100)
}

export var openWS = function (name, url) {

	var wsUrl = "ws://"+ u.getUrl() +url;

	// console.log("url is", wsUrl);

	socket[name] = new WebSocket(wsUrl, ["protocolOne", "protocolTwo"]);
	// console.log("socket state", socket[name].readyState);
	socket[name].onopen = function (open) {

		console.log("socket opened:", name);		
	}

	socket[name].onclose = function (close) {

		console.log("socket closed:", name);		
	}

	socket[name].onerror = function (error) {

		console.log("Server error:", name, error);
	}

	socket[name].onmessage = function ($message) {

		var message = JSON.parse($message);

		// console.log("this is the message", message);
		return false;
	}
}

export var onMessageFunc = function (funcName, callback) {

	return function ($message) {

		// console.log("the string message is", $message.data);

		var message = JSON.parse($message.data);

		// console.log("the message is:", funcName, message);

		if (typeof callback === "function") callback({data:message});
		return false;
	}

}

export var resolveName = function (name) {

    var found = names.find((p) => {

        return p.name == name;
    })        

    var result = (found && (found.print === false || found.print === undefined)) ? false : true;

    console.log("found", found, result);

    if (!found){
        console.log("print not found for name:", name, "returning: true");
    }

    return result;
}

export var onSendFunc = function (name, data) {

    if (resolveName(name)) console.log("send", name);
    socket[name].send(JSON.stringify(data));
}






export var openSockets = function (open) {

    console.log("call open sockets", "\n\n\n\n\n\n\n\n")

	if (!open.opened) {

        setTimeout(function () {
            
            console.log("open sockets")

        	for (var i in open) {

    	    	if (typeof open[i] === "function") open[i]();
    	    }

    	    open.opened = true;

        }, open.delay);
	}
}


