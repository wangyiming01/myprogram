require(["/myProject/src/js/config.js"],function(){
	require(["jquery","load","template","cookie"],function($,load,template,cookie){//用到的短名称
		var _amount=$("input",".amount").val();
		$(".add").click(function(){			
			_amount++;
			console.log(_amount)
			$("input",".amount").val(_amount);
			return false;
		})
		var _amount=$("input",".amount").val();
		$(".minus").click(function(){		
			_amount--;		
			if(_amount<=1)
			_amount=1;
			$("input",".amount").val(_amount);
			return false;
		})	
		$(".right .btn3").click(function(){	
			$(".right .btn4").show();
			$(".right .btn3").animate({"width":0,"height":0,"top":-171,"left":247},3000,function(){
				$(".right .btn3").empty();
			})			
		})

	})
})