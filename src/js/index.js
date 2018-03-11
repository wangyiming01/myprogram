require(["/myProject/src/js/config.js"], function(){
	require(["jquery","template","load"],function($,template,load){	
		$("img").css("cursor","pointer").click(function(){
			location="/myProject/src/html/list.html"
		})
	});
});