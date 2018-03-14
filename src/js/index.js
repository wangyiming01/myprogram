require(["/myProject/src/js/config.js"], function(){
	require(["jquery","template","load","carousel"],function($,template,load,carousel){	
		$("img").css("cursor","pointer").click(function(){
			location="/myProject/src/html/list.html"
		})
		$(".banner").carousel({
		imgs : [
			{src:"/myProject/src/images/5.jpg", href:"#"},
			{src:"/myProject/src/images/1111.jpg", href:"#"},
			{src:"/myProject/src/images/002.jpg", href:"#"},
			{src:"/myProject/src/images/003.jpg", href:"#"},
			{src:"/myProject/src/images/004.jpg", href:"#"},
		],
		width: 1263,
		height: 557,
		duration: 2000,
		type:"slide",
		isAutoPlay:false
	});
	});
});