require(["/myProject/src/js/config.js"],function(){//用短名称
	require(["jquery","cookie","template","load"],function($,cookie,template,load){
	/* 用户登录 */	
	$(".register_login").click(function(){
		let _username=$(".user").val();
		let _password=$(".password").val();
		$.post("/myProject/src/mock/login.php",{"username":_username,"password":_password},function(data){
			console.log(data.res_code)
			if (data.res_code === 0) {
				// 保存登录成功的用户信息到 cookie 中
				let a =[{"username":_username,"password":_password}];
				$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
				$.cookie("loginUser", a, {path:"/"});
				location = "/myProject/src/html/list.html";
			} else {
				$(".user").val("用户名或密码错误");				
			}
		}, "json");
		return false;
	});
})
})