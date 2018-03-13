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
	})
})