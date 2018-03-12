require(["/myProject/src/js/config.js"],function(){//找到我们定义的那个短名称的文件
	require(["jquery","template","load"],function($,template,load){//要用到那些短名称
		$.getJSON("/myProject/src/mock/list.json",function(data){//获取数据成功后要做的事情	
			let renData={pictures:data.res_body.data};		
			let html=template("template",renData);
			$(".template_box").html(html);
		})
		/*加入购物车,用事件委派的方式*/
			$(".template_box").on("click",".pic_bigbox",function(){
			let product={//单个商品信息
				id:$(this).find(".id").text(),
				title:$(this).find(".title").text(),
				price:parseFloat($(this).find(".price").text()),
				img:$(this).find(".img").children("img").attr("src"),
				amount:1
			};
			/*处理cookie的信息*/
			$.cookie.json=true;
			//先查找cookie中是否已经有保存的购物车
			let _products=$.cookie("products") || [];
			let index=exist(product.id, _products);
			if(index===-1){
				_products.push(product);
			}else{
				_products[index].amount++;
			}
			//重新保存后cookie中
			$.cookie("products",_products,{expires:7,path:"/"});
			alert("购买成功");
			/*显示选购的所有商品的总价*/
			let sum =0;
			$.each(_products, function(index,element) {
				sum+=parseFloat(this.price);
				console.log(this.price)
			});
			$(".right .header_btn2 ").text(sum).click(function(){
				location="/myProject/src/html/pay.html"
			})
		})
			function exist(id,products){
				for(let i=0;i<products.length;i++){
					if(id===products[i].id){
						return i
					}
				}
				return -1;
			}
	})
})
