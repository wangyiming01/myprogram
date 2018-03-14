require(["/myProject/src/js/config.js"],function(){
	require(["jquery","template","load"],function($,template,load){
		// 加载省份
		function loadProvince() {
			var _url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=1";
			$.ajax({
				type : "get",
				url : _url,
				dataType : "json",
				success : function(data){
					var html = "<option value='-1'>请选择省份</option>";
					(data.showapi_res_body.data).forEach(function(curr){
						html += `<option value="${curr.id}">${curr.areaName}</option>`;
					});
					_url = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";
					$.ajax({
						type : "get",
						url : _url,
						dataType : "json",
						success : function(data){
						(data.showapi_res_body.data).forEach(function(curr){
								html += `<option value="${curr.id}">${curr.areaName}</option>`;
						});				
							$(".txt3").html(html);							
						}
					});
				}
			});
		}
		// 加载城市
		function loadCity() {			
			var _parentId = $(".txt3").val();
			if (_parentId == -1)
				return;
			var _url = "http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=" + _parentId;
			$.ajax({
				url : _url,
				dataType : "json",
				success : function(data){
					console.log(data)
					var html = "<option value='-1'>请选择城市</option>";
					$(data.showapi_res_body.data).each(function(){
						html += `<option value="${this.id}">${this.areaName}</option>`;
					});
					$(".txt4").html(html);
				}
			});
		}
		loadProvince();
		// 省份选择发生改变时，加载城市
		$(".txt3").change(loadCity)

	})
})