## 查看磁盘空间
```
df -h // 查看系统磁盘利用情况
```
```
du -sh * //查看当前文件夹下所有文件占用磁盘情况
```
## top命令
详细可参考：https://www.cnblogs.com/niuben/p/12017242.html
```
top -d 1 //每隔1秒刷新
```

```
top -p 12 //查看指定进程
```

```
top -c //显示整个命令行而不是每个命令
```

```
top //按1监控每个逻辑CPU
```

## grep命令
```
grep "xxx" -C100 nodelog.log //匹配查找，并显示命中上下100行
```

```
grep "xxx" -c nodelog.log //匹配查找，返回匹配的数量
```

```
grep "xxx" -n nodelog.log //显示行数
```

```
grep "xxx" -i nodelog.log //查找时不区分大小写
```

## tail命令
```
tail -3 -f myFile.txt //其中-f显示最尾部的内容，并不断刷新，使你看到最新的内容。-n 100是看100行。filename就是要看的文件了。
```

## head命令
```
head -3 myFile.txt // 查看头部开始
```

## cat命令
```
cat myFile.txt //查看所有
```
## vi命令
```
vi xuan.txt // 编辑文件，如果xuan.txt不存在就新建一个，:wq :q分别为保存退出，不保存退出，a esc键分别切换命令模式很输入模式
```

## ps命令
```
ps -ef | grep tomcat // 查看所有关于tomcat的进程
```

## kill命令
```
kill -9 27063 // 强制结束进程
```

## jar命令（用的JDK）
```
jar -cvf ROOT.war * // 把当前所有文件打包，包文件叫ROOT.war放在当前目录
```

```
jar -xvf ROOT.war // 解压ROOT.war到当前文件夹
```

## history
```
history | grep cd 查看历史cd命令
```

## wget
```
wget ftp://192.168.0.222/var/xuan.txt //从ftp上下载zip包
```

## zip命令
```
zip xuan.zip xuan //用zip命令压缩，后面那个xuan是文件夹
```
```
unzip xuan.zip
```

## chmod命令
```
chmod +x install.sh //当你写好一个shell脚本，授权可执行
```

## lsof命令
```
lsof -i tcp:8081 //查看端口占用
```
