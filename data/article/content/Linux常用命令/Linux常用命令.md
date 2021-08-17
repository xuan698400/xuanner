# 查看磁盘空间
* 查看系统磁盘利用情况。`df -h`
* 查看当前文件夹下所有文件占用磁盘情况。`du -sh * `

# grep
## 选项解释
* -a ：将binary文件以text文件的方式搜寻数据
* -c ：统计显示匹配的字符串的数量。例子：`grep -c "xxx" nodelog.log`
* -i ：查找忽略大小写。例子：`grep -i "xxx" nodelog.log`
* -n ：显示行数。例子：`grep -n "xxx" nodelog.log`
* -v ：反向选择，及搜索出不匹配字符串的行。`grep -v "xxx" nodelog.log`
* -C ：显示匹配字符串上下行数。`grep -C100 "xxx" nodelog.log`
* --color=auto ：可以将找到的关键词部分加上颜色的显示喔！

## 组合搜索
* `grep "xxx" nodelog.log | grep "abc"`

## 搜索内容保存文件
* 覆盖输出：`grep "xxx" nodelog.log > save.txt`
* 追加输出：`grep "xxx" nodelog.log >> save.txt`

## 文件内容递归查找
* 当前目录下查找所有：`grep "xxx" *`
* 当前目录下及其子目录下查找所有：`grep -r "xxx" *`
* 搜索只显示文件：`grep -l "xxx" *`

## 正则搜索
* `[]`匹配。返回tast或者test的记录：`grep 't[ae]st' nodelog.log`。说明：[]中不论有多少字母，他仅代表某一个字母。
* `[^]`反向选择。需要返回oo的记录，但是不需要返回goo的记录：`grep '[^g]oo' nodelog.log`。说明：如果记录里面同时有oo和goo，会判定返回。oo前面不需要字母和数字：`grep '[^a-zA-Z0-9]oo' nodelog.log`。
* `^`首行定位。首行出现the的记录：`grep '^the' nodelog.log`。首行是小写字母的：`grep '^[a-z]' nodelog.log`。说明：'^'符号，在[]之内和之外的作用是不相同的，在[]之内，代表反向选择；在[]之外，代表定位在行首。
* `(.)`任意字节。返回g??d字符串，即共有4个字节，起头是g，结尾是d：`grep 'g..d' nodelog.log`
* `(*)`重复前一个字符，0个到无穷多个。搜索出含有oo,ooo,oooo...等数据时（至少含2个o）：`grep 'ooo*' nodelog.log`。说明：o*表示出现0个或者多个。

# top
* 详细可参考：https://www.cnblogs.com/niuben/p/12017242.html
* 每隔1秒刷新：`top -d 1`
* 查看指定进程：`top -p 12`
* 显示整个命令行而不是每个命令：`top -c`
* 按1监控每个逻辑CPU：`top`

# tail
* 从尾部查看指定行数，并持续刷新：`tail -fn 500 nodelog.log`

# head
* 从头部查看指定行数：`head -3 nodelog.log`

# cat
* 查看文件所有内容（小心超大文件）：`cat nodelog.log`

# vi
* 编辑文件，如果xuan.txt不存在就新建一个：`vi xuan.txt`
* 保存退出，加叹号表示强制：`:wq`、`:wq!`
* 不保存退出,加叹号表示强制：`:q`、`:q!`
* 输入i切换成输入模式，输入esc切换成命令模式

# ps
* 查看所有关于tomcat的进程：`ps -ef | grep tomcat`

# kill
* 强制结束进程：`kill -9 27063`

# jar（用的JDK）
* 把当前所有文件打包，包文件叫ROOT.war，并放在当前目录：`jar -cvf ROOT.war *`
* 解压ROOT.war到当前文件夹：`jar -xvf ROOT.war`

# history
* 查看历史cd命令：`history | grep cd`

# wget
* 从ftp上下载zip包：`wget ftp://192.168.0.222/var/xuan.txt`


# zip
* 压缩，后面那个xuan是文件夹：`zip xuan.zip xuan`
* 解压：`unzip xuan.zip`

# chmod
* 当你写好一个shell脚本，授权可执行：`chmod +x install.sh`

# lsof
* 查看端口占用：`lsof -i tcp:8081`
