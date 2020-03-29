



import * as axios from "axios";



export var get = function (options) {


	return axios({
		method:"get",
		url:options.url
	})
	.then((res) => {

		return res;
	})
}


export var post = function (options) {

	return axios({
		method:"post",
		url:options.url,
		data:options.data
	})
	.then((res) => {

		return res;
	})
}


