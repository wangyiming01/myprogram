define(["jquery","cookie"],function(){//定义一个模块，要做的事情是函数中具体的动作,依赖的模块用数组传递过来。
		$.ajax({
		url:"/myProject/src/html/include/header.html",
		type:"get",
		success:function(data){
			$(".nav").before(data);
			$(".right").on("keyup","input",function(){//用事件委派的方式来处理
			//json接口
			let val=$(this).val();
			//后面只保留code和query的内容还有callback函数；
			url=`https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=?`
			$.ajax({
				type:"get",
				url:url,
				dataType:"jsonp",
				success:function(data){//成功后要做的事情
					let html="";
					console.log(data);
					data.result.forEach(function(curr){//遍历一个一个的数组；
						html+=`<div>${curr[0]}</div>`;
					})
					$(".suggest").show().html(html)
				}				
			})
		})		
		$(".wrap .left").click(function(){
			location="/myProject/src/html/login.html"
		})
		$(".wrap .center").click(function(){
			location="/myProject/src/html/register.html"
		})
		}

	});		
	$.ajax({
		type:"get",
		url:"/myProject/src/html/include/footer.html",
		success:function(data){
			$(".link").after(data)
		}
	});
	
})