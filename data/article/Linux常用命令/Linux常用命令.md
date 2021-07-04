### 查看磁盘空间
* `df -h`
* `du -sh *`

### top命令
* `top -d 1` （每隔1秒刷新）
* `top -p 112233`（查看指定进程）
* `top -c`（显示整个命令行而不是每个命令）
* `top` 按1监控每个逻辑CPU

https://www.cnblogs.com/niuben/p/12017242.html

### grep命令
指令说明：
* `-C100` 显示匹配中上下行数
* `-c` 统计命中行数
* `-n` 显示行数
* `-i` 查找时不区分大小写

### 实例：
* `grep "xxx" -C2 nodelog.log`（匹配查找，并显示命中上下100行）
* `grep "xxx" -c nodelog.log`（匹配查找，返回匹配的数量）
* `grep "xxx" *.log`（在所有后缀是.log的文件中找）