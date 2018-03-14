require(["/myProject/src/js/config.js"],function(){//用短名称
	require(["jquery","cookie","template","load"],function($,cookie,template,load){
	/* 用户登录 */	
	//验证用户名是否存在
	let isExist = true; //true--占用 false--未被占用
	$(".user").blur(function(){
		let _username=$(".user").val();
		let _password=$(".password").val();
		$.post("/myProject/src/mock/check.php",{"username":_username,"password":_password},function(data){
			console.log(data);			
			if (data.res_body.status == 0) {
				isExist = false;
			} else if(data.res_body.status == 1){
					isExist = true;
				$(".user").val("邮箱已被注册，请重新输入");

			}
		}, "json");
	});
		/* 提交注册表单，注册用户 */
	$(".register_login").click(function(){
		if (!isExist) { // 邮箱未被占用，则提交注册信息
				let _username=$(".user").val();
				let _password=$(".password").val();
			$.post("/myProject/src/mock/register.php",{"username":_username,"password":_password},function(data){				
					if (data.res_code === 0) {
						let a =[{"username":_username,"password":_password}];
						// 保存注册成功的用户信息到 cookie 中
						$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
						$.cookie("loginUser", a, {path:"/"});
						location="/myProject/src/html/list.html"
					} else {
						$(".user").val("用户注册失败，请稍后重试...");
					}
				}, "json");
		}

		/*{
				email : $(":text[name='email']").val(),
				password : $(":password[name='password']").val(),
				firstname : $(":text[name='firstname']").val(),
				lastname : $(":text[name='lastname']").val()
			}*/
		// console.log($(".reg_form").serialize());

		return false;
	});

})
})