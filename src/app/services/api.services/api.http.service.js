


import * as http from "./api.client";
import * as $input from "./input.service";
import * as exception from "../misc/exception";


export let postBlog = (name, blog) => {

	return http.post({
		url:"/api/blogs/" + name,
		data:{blog:blog}
	})
}

export let getBlog = (blog) => {

	return http.get({
		url:"/api/blogs/" + blog
	})
}


export let getAllBlogs = () => {

	return http.get({
		url:"/api"
	})
}

// export var getBest = function (callback) {

//     var funcName = "getBest";

//     // try {

//     	http.post({
//     		url:"/evolve/best",
//             data:{input:$input.getInput()}
//     	})
//     	.then(function (res) {

//             if (typeof callback === "function")callback(res);

//         }, function (err) {

//             console.log("before throw Server error:", funcName,  err);

//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));

//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }

// };


// export var stepdata = function (callback) {

//     // console.log("call setpdata");

//     var funcName = "stepdata";

//     // try {

//     	http.post({
//     		url:"/evolve/stepdata",
//             data:{input:$input.getInput()}
//     	})
//     	.then(function (res) {

//             // console.log("stepdata raw response", res);

//             if (typeof callback === "function") callback(res);

//         }, function (err) {

//             // console.log("Server error: 'stepdata'", err)

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }

// 	};


// export var isRunning = function  (callback) {


//     var funcName = "isRunning";

//     // try {

//     	http.post({
//     		url:"/evolve/running",
//             data:{input:$input.getInput()}
//     	})
//     	.then(function (res) {

//             if (typeof callback === "function") callback(res);

//     	}, function (err) {

//     		// console.log("Server error: 'isRunning'", err)

//             // return $q.reject(err);
//             throw err;
//     	})
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }

// };


// export var setInput = function (resend, callback) {


//     // console.log("setInput http call get input or resendInput");

//     var funcName = "setInput";

//     // try {

//     	http.post({
//     		url:"/evolve/set",
//     		data:{input:resend ? $input.resendInput() : $input.getInput()}
//     	})
//     	.then(function (res) {

//             if (typeof callback === "function") callback(res);

//         }, function (err) {

//             // console.log("Server error: 'setInput'", err)

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }

// 	};


// export var instantiate = function (callback) {


//     var funcName = "instantiate";

//     // try {

//         http.get({
//             url:"/evolve/instantiate"
//         })
//         .then(function (res) {

//             if (typeof callback === "function") callback(res);

//         }, function (err) {

//             // console.log("Server error: 'instantiate'", err)

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }


// };


// export var initialize = function (callback) {


//     console.log("initialize http call get input");

//     var funcName = "initialize";

//     // try {

//         http.post({
//             url:"/evolve/initialize",
//             data:{input:$input.getInput()}
//         })
//         .then(function (res) {

//             if (typeof callback === "function") callback(res);

//         }, function (err) {

//             // console.log("Server error: 'initialize'", err)

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }


// };


// export var run = function (callback) {


//     // console.log("run call input", $input.getInput(true));

//     var funcName = "run";

//     // try {

//     	http.post({
//     		url:"/evolve/run",
//     		data:{input:$input.getInput(true)}
//     	})
//     	.then(function (res) {

//             if (!res.data.success) {

//             	initialize(function () {

//             		run(function  () {
//             			if (typeof callback === "function") callback(res);
//             		});
//             	});
//             }
//             else {

//             	 if (typeof callback === "function") callback(res);
//             }

//         }, function (err) {

//             // console.log("Server error: 'run'", err)

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }

// };

// export var instruct = function (clear, callback) {


//     var funcName = "instruct";

//     // try {

//         http.post({
//             url:"/evolve/instruct",
//             data:{input:$input.getInput(), clear:clear}
//         })
//         .then(function (res) {

//             if (typeof callback === "function") callback(res);

//         }, function (err) {

//             // console.log("Server error: 'instruct'", err);

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }

// };

// export var refreshEnvironment = function (callback) {


//     // console.log("refresh environment call get input");


//     var funcName = "refresh environment";

//     // try {


//         http.post({
//             url:"/trash/environment/refresh",
//             data:{input:$input.getInput()}
//         })
//         .then(function (res) {

//             // console.log("refresh response", res.data.env);

//             if (typeof callback === "function") callback(res);

//         }, function (err) {

//             // console.log("Server error: 'refresh environment'", err)

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }

// };

// export var resetEnvironment = function (callback) {


//     var funcName = "reset environment";

//     // try {

//         http.post({
//             url:"/trash/environment/reset",
//             data:{input:$input.getInput()}
//         })
//         .then(function (res) {

//             if (typeof callback === "function") callback(res);

//         }, function (err) {

//             // console.log("Server error: 'reset environment'", err)

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err)
//     // }

// };


// export var simulate = {


//     trash:function (_input, callback) {

//         var funcName = "simulate";


//         // try {

//             http.post({
//                 url:"/trash/simulate",
//                 data:{options:_input, input:$input.getInput()}
//             })
//             .then(function (res) {

//                 if (typeof callback === "function") callback(res);

//             }, function (err) {

//                 // console.log("Server error: 'simulate'", err);

//                 // return $q.reject(err);
//                 throw err;
//             })
//             .catch(exception.catcher(funcName));


//         // }
//         // catch (err) {

//         //     console.log(funcName, err);
//         // }


//     },
//     recognize:function (index, callback) {


//         var funcName = "simulate";

//         // try {

//             http.post({
//                 url:"/recognize/simulate",
//                 data:{index:index, input:$input.getInput()}
//             })
//             .then(function (res) {

//                 if (typeof callback === "function") callback(res);

//             }, function (err) {

//                 // console.log("Server error while running best individual", err);

//                 // return $q.reject(err);
//                 throw err;
//             })
//             .catch(exception.catcher(funcName));


//         // }
//         // catch (err) {

//         //     console.log(funcName, err);
//         // }
//     },
//     digit:function (index, callback) {


//         var funcName = "simulate";

//         // try {

//             http.post({
//                 url:"/recognize/digit",
//                 data:{index:index, input:$input.getInput()}
//             })
//             .then(function (res) {

//                 if (typeof callback === "function") callback(res);

//             }, function (err) {

//                 // console.log("Server error while running best individual", err);

//                 // return $q.reject(err);
//                 throw err;
//             })
//             .catch(exception.catcher(funcName));


//         // }
//         // catch (err) {

//         //     console.log(funcName, err);
//         // }

//     }

// };


// export var hardStop = function (callback) {


//     // console.log("hard stop call get input");

//     var funcName = "hardStop";


//     // try {

//     	http.post({
//     		url:"/evolve/hardStop",
//     		data:{input:$input.getInput()}
//     	})
//     	.then(function (res) {

//             if (typeof callback === "function") callback(res);

//         }, function (err) {

//             // console.log("Server error: 'hardStop'", err)

//             // return $q.reject(err);
//             throw err;
//         })
//         .catch(exception.catcher("Server error:" + funcName));


//     // }
//     // catch (err) {

//     //     console.log("Server error:", funcName, err);
//     // }


// };
