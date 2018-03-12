require(["/myProject/src/js/config.js"],function(){//用短名称
	require(["jquery","cookie","template","load"],function($,cookie,template,load){//要用到的具体插件和需要传递的参数
		//将cookie中的json数据和js数据互换
		$.cookie.json=true;
		//读取cookie中保存的购物车数据
		let _products=$.cookie("products") || [];
		if(_products.length===0){
			$(".cart_table").hide();
			confirm("您的购物车为空，请返回购买")			
			location="/myProject/src/html/list.html";
			return;
		}else{
			$(".cart_table").show();
		}
		//渲染魔板
		let rendData={
			products:_products
		}
		let html=template("cart_template",rendData);
		$(".cart_table > tbody").html(html);//把数据放到tbody里面去
		//将_products中每个元素缓存到行中，缓存了之后，方便后面的操作
		$(".cart_table > tbody > tr").each(function(index,element){//each这个方法是两个参数，一个是可选的数组或对象，一个是函数
			// 在当前遍历到的行中缓存与之对应的商品对象数据
			$(this).data("prod",_products[index]);//这里的this其实是等价于element的，将数组中每个商品，缓存到一行，名字是叫prod
		})
		/**删除商品的操作**/
		$(".cart_table").on("click",".del",function(){
			//两个动作，一个是从cookie中删除元素，一个是从dom结构中删除元素，在cookie删除之前，就要先从数组中删除，指定索引处删除一个元素
		    //获取当前删除行中的商品对象
		    let _prod=$(this).parents("tr").data("prod");
		    let index=$.inArray(_prod,_products);
		    //从数组中删除元素，指定索引出的一个元素
		    _products.splice(index,1);
		    // 从cookie中删除(覆盖保存 _products 到 cookie 中)
		    $.cookie("products",_products,{expires:7,path:"/"});
		    //从dom结构中删除
		    $(this).parents("tr").remove();
		    if(_products.length===0){
			$(".cart_table").hide();
			confirm("您的购物车为空，请返回购买")			
			location="/myProject/src/html/list.html";}
		    calcTotal()
		})
		/*数量+/-*/
		$(".cart_table").on("click",".add,.minus",function(){//这里用的群组选择器
		//找出所在行中的商品信息
		let _prod=$(this).parents("tr").data("prod");
		//数量的+/-
		let _amount=parseFloat(_prod.amount);
		_prod.price=parseFloat(_prod.price);
		if($(this).is(".add")){
			_amount++;
		}else{
			if(_amount<=1)
			return;
			_amount--;
		}
		_prod.amount=_amount;
		//保存cookie
		$.cookie("products",_products,{expires:7,path:"/"});
		//页面软渲染，就是把文本框里面的数据改掉
		$(this).siblings(".amount").val(_amount);//this指的是加号或减号
		$(this).parents("tr").children(".sub").text((_prod.price*_prod.amount).toFixed(2));
		calcTotal()
		})
		/*输入数量修改*/
		$(".cart_table").on("blur",".amount",function(){
			//找出所在行中的商品信息
			let _prod=$(this).parents("tr").data("prod");
			//数量改成文本框里面的值
			_prod.amount=$(this).val();
			//保存cookie
			$.cookie("products",_products,{expires:7,path:"/"})
			//页面渲染了之后，后面的小计金额也要跟着改变
			$(this).parents("tr").children(".sub").text((_prod.price*_prod.amount).toFixed(2))
			calcTotal()
		})
		/*全选*/
		$(".ck_all").click(function(){
			//获取全选复选框中的状态
			let status=$(this).prop("checked");
			//设置所有行里面的复选框选中状态与全选一致，其他复选框的名字都叫ck_prod,把他们的属性设置成上面的属性值
			$(".ck_prod").prop("checked",status);
			calcTotal();
		})
		/*部分选中*/
		//部分选中是不是要点击一个一个的叫ck_prod的按钮，这里依然用事件委派的方式来做，给cart_table统一绑定点击的事件
		$(".cart_table").on("click",".ck_prod",function(){
			$(".ck_all").prop("checked",$(".ck_prod:checked").length===_products.length)
			/*if ($(".ck_prod:checked").legnth === _products.length)
			$(".ck_all").prop("checked", true);
			else
			$(".ck_all").prop("checked", false);*/
			calcTotal();
		})
		/*计算合计金额 ,这个很多地方都要用到，所以定义一个函数，用的时候直接调用*/
		function calcTotal(){
			//选中的这些行里面的小计进行累加的操作
			let total=0;
			$(".ck_prod:checked").each(function(){
				total+=Number($(this).parents("tr").children(".sub").text())
			});
			$(".cart_table >tfoot td:last").text(total)
		}
	})
})