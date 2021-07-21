# 嵌入方法
```
<?php 这里是php代码 ?> 或者 <? 这里是php代码 ?>
```

# 引用文件
* require的使用方法。例如 `require("MyRequireFile.php")`这个函数通常放在 PHP 程序的最前面，PHP 程序在执行前，就会先读入 require 所指定引入的文件。使它变成 PHP 程序网页的一部份。常用的函数，亦可以这个方法将它引入网页中。
	
* include的使用方法。例如 `include("MyIncludeFile.php")`这个函数一般是放在流程控制的处理部分中。PHP 程序网页在读到 include 的文件时，才将它读进来。这种方式，可以把程序执行时的流程简单化。

# 注释方法
`//` 本例是 C++ 语法的注释
`/* xxx */` 本例采用多行的注释方式

# 变量类型
注意：这里引出两个问题，首先PHP变量以$开头，第二PHP语句以;结尾。没有变量的声明，赋值什么，就是什么。
```
$mystring = "我是字符串" ; 
$NewLine = "换行了n" ; 
$int1 = 38 ; 
$float1 = 1.732 ; 
$float2 = 1.4E+2 ; 
$MyArray1 = array( "子" , "丑" , "寅" , "卯" );
```

# 运算符号
## 数学运算
符号、意义

`+`  加法运算、`-`  减法运算、`* ` 乘法运算、`/`  除法运算、`%`  取余数、`++`  累加、`--`  递减

## 字符串运算
字符串运算只有一个，就是英文的点。它可以将字符串连接起来，变成合并的新字符串。
注意：这里也引出两个问题：首先PHP中输出语句是echo，第二，PHP中也可以<?=变量?>。例如：
```
<?
    $a = "PHP 4" ; 
    $b = "功能强大" ; 
    echo $a.$b; 
?> 
```

# 逻辑运算
符号 意义

`<`  小于、`>`  大于、`<=`  小于或等于、`>=`  大于或等于  
`==`  等于、`!=`  不等于、`&&`  而且 (And)、`and`  而且 (And)
`||`  或者 (Or)、`or`  或者 (Or)、`xor`  异或 (Xor)、`!`  不 (Not)

# 流程控制
## 判断分支流程
```
if (expr) { statement }
if (expr) { statement1 } else { statement2 }
if (expr1) { statement1 } elseif(expr2) { statement2 } else { statement3 }
```
## 循环
```
for (expr1; expr2; expr3) { statement }
```
## switch分支
java中expr只能是int或char，这里好像字符串也OK
```
switch (expr) { 
    case expr1: statement1; break; 
    case expr2: statement2; break; 
    default: statementN; break;
}
```

# 数据库操作
## 连接
注意：在使用数据库时，早点使用 `mysql_close()` 将连接关掉可以节省资源。
```
$conn=mysql_connect ("127.0.0.1:8043", [username], "[password]");
mysql_select_db("shop");
```
注意：在使用数据库时，早点使用 `mysql_close()` 将连接关掉可以节省资源。在实际应用中应当加强点错误判断

## 读取
如下构建SQL、查询、遍历解析数据
```
<? 
    $exec="select * from user";
    $result=mysql_query($exec);
    while($rs=mysql_fetch_object($result))
    {
        echo "username:".$rs->username."<br>"; 
    }
?>
```

## 增删改操作
单这个语句就可以执行所有的操作了，不同的是传入的语法不一样而已
```
//新增
$exec="insert into tablename (item1,item2) 
values ('".$_POST['item1']."',".$_POST['item1'].")"; 
//删除
$exec="delete from tablename where..."; 
//修改
$exec="update tablename set item1='".$_POST['item1']."' where ..."; 
```

# 表单中的数据传递
如果表单中的一个 `<input name="item1" type="text" id="item1">`，表单以POST提交的，那么处理表单文件就可以用`$_POST['item1']`得到变量值，同样以GET提交的就是`$_GET['item1']`

# session的使用
```
//开启
session_start();
//赋值
$_SESSION['item']="item1"
//取值
$item1=$_SESSION['item'];
//判空
empty($_SESSION['inum']);
```

# 分页查询逻辑
得到总共的记录数
```
$execc = "select count(*) from tablename ";
$resultc = mysql_query($execc);
$rsc = mysql_fetch_array($resultc);
$num = $rsc[0]; 
```
得到总页数,一页10条记录
```
$pageNum = ceil($num/10));
```

分页逻辑

```
if(empty($_GET['page'])){
    $page=0;
}else{
    $page=$_GET['page'];
    if($page<0) {
        $page=0;
    }
    if($page>=ceil($num/10)){
        $page=ceil($num/10)-1;
    }//因为page是从0开始的，所以要-1
} 
//写数据查询语句时可以这样写
$exec="select * from tablename limit ".($page*10).",10";
```

前端逻辑
```
<a href="xxx.php?page=0">第一页</a> 
<a href="xxx.php?page=<?=($page-1)?>">上一页</a> 
<a href="xxx.php?page=<?=($page+1)?>">下一页</a> 
<a href="xxx.php?page=<?=ceil($num/10)-1?>">最后一页</a>
```

# 上传文件
上传文件必须在表单上加上enctype="multipart/form-data"。且这个是上传文件控件
```
<input type="file" name="file">
```
接受文件并保存
```
//接受并保存文件
$f=&$HTTP_POST_FILES['file'];//接受文件
$dest_dir='uploads';//设定上传目录
$dest=$dest_dir.'/'.date("ymd")."_".$f['name'];//我这里设置文件名为日期加上文件名避免重复
$r=move_uploaded_file($f['tmp_name'],$dest);//把你上传的文件从临时目录移动到指定目录
chmod($dest, 0755);//设定上传的文件的属性(具体什么属性不知道，用时再可以查的)
```

# 发邮件
```
mail("收件人地址","主题","正文","From:发件人rnReply-to:发件人的地址");
```
注意：mail()需要服务器的支持，在WINDOWS下还需要配置SMTP服务器，一般来说外面的LINUX空间都行

# 总结
真心的发出一声感叹，一些语言就是纸老虎，不过要精通还需久而久而。
