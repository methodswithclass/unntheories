


import * as http from "./api.client";


export let postBlog = (name, blog) => {

	return Promise.resolve("nothing done");
}

export let getBlog = (url) => {

	console.log("url", url);
	let fileName = url.replace("files/", "");
	fileName = fileName.replace(".txt", "");
	return http.get({
		url:"/api/file/" + fileName
	})
}


export let getAllBlogs = () => {

	return Promise.resolve("nothing done");
}
