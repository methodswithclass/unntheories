


import * as u from "./utility.service";


var $ = u.jquery();


var config = null;


var urls = {
	development:"/assets/config/config.json",
	test:"/temp/test/assets/config/config.json"
}


var url = function () {

	return urls[u.env()];
}

var doesExist = function () {


	var check;
	var count = 0;
	var countMax = 500;
	var duration = 30;
	var result = false;

	var checkConfig = function () {

		return config && Object.keys(config).length > 0;
	}

	// console.log("does exist", p.config);

	if (checkConfig()) result = true;
	else {

		check = setInterval(function() {

			if (checkConfig() || count >= countMax) {

				clearInterval(check);
				check = null;
				check = {};

				if (count < countMax) {
					result = true;
				}
				else {
					console.log("config check failed: timeout " + count*duration + " seconds");
					result = false;
				}

			}

			count++;

		}, duration)

	}

	return result;

}


var getConfig = function ($key) {


	var value;
	var prop;
	var i = 0;

	var keyArray = $key.split(".");

	var getProp = function (obj, $i, array) {

		if ($i < array.length-1) {

			prop = array[$i]

			if (obj.hasOwnProperty(prop)) {

				// console.log("get prop", $i, obj, prop, obj[prop]);
				return getProp(obj[prop], $i + 1, array);
			}
			else {
				return '';
			}

		}
		else {
			return obj[array[$i]];
		}
	}


	value = getProp(config, i, keyArray);

    return value || '';

}


var processConfig = function (_key, resolve) {

	var resultArray = [];

	if (Array.isArray(_key)) {

		for (var i in _key) {

			resultArray.push(getConfig(_key[i]));
		}

		return resolve(resultArray);

	}
	else {

		return resolve(getConfig(_key));
	}
}


var retrieveConfig = function () {

	// console.log("retrieve config");

	return new Promise(function (resolve) {

		if (!doesExist()) {

   			$.ajax(url(),
   			{
   				method:"GET"
   			})
   			.then(function (data) {
   				// console.log("response data", data);
   				resolve(data);
   			}, function (err) {

   				console.log("Server error: 'config'", err.message)
   			})
		}
		else {
			resolve(config);
		}


	})
}


var assignConfig = function () {

	return u.getEnv()
	.then(() => {

		retrieveConfig()
		.then(function (data) {

			config = data;

		})
	});
}



export var get = {
	sync:function ($$key) {

		return processConfig($$key, function (data) {

			return data;
		});
	},
	async:function ($$key) {

		return assignConfig()
		.then(function () {

			return new Promise(function ($resolve, $reject) {

				// console.log("get", $$key);
				if (doesExist()) {
					return processConfig($$key, $resolve);
				}
				else {
					return null;
				}
			})

		})

	}
}

// assignConfig();
