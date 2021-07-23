<?php
//建立链接
$conn = mysqli_connect("127.0.0.1:3306", "bpmweb", "123456");
//选择数据库
mysqli_select_db($conn, "bpmweb");
//查询
$result = mysqli_query($conn, "SELECT * FROM bw_user");
//遍历数据输出
while ($rs = mysqli_fetch_object($result)) {
    echo "username:" . $rs->id . "\n";
    echo "username:" . $rs->username . "\n";
}
//关闭链接
mysqli_close($conn);
?>