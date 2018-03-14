<?php
//获取输入的登录用户名与密码
$username=$_POST["username"];
$password=$_POST["password"];
/*在数据库中对比用户信息*/
mysql_connect("localhost:3306","root","");
mysql_select_db("myproject");
//设置读取库编码
mysql_query("set character set 'utf8'");
mysql_query("set names 'utf8'");
//
$sql="INSERT INTO wym(username,password) VALUES ('$username','$password')";
//$sql="SELECT id, username, password,createtime FROM `wym` WHERE username='$username' and password='$password'";
$result=mysql_query($sql);
//判断查询结果
//if($row=mysql_fetch_array($result,MYSQL-ASSOC)){
//	echo '{"res_code":0, "res_error":"", "res_body":'. json_encode($row) .'}';
//}else{
//	echo '{"res_code":-1, "res_error":"用户名或密码错误", "res_body":{}}';
//}
if($result){
	echo '{"res_code":0, "res_error":"", "res_body":"成功"}';
}else{
	echo '{"res_code":-1, "res_error":"用户名或密码错误", "res_body":{}}';
}
//关闭数据库连接
mysql_close();

?>