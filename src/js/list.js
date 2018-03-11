require(["/myProject/src/js/config.js"],function(){//找到我们定义的那个短名称的文件
	require(["jquery","template","load"],function($,template,load){//要用到那些短名称
		$.getJSON("/myProject/src/mock/list.json",function(data){//获取数据成功后要做的事情	
			let renData={pictures:data.res_body.data};		
			let html=template("template",renData);
			$(".template_box").html(html);
		})
		
	})
})
