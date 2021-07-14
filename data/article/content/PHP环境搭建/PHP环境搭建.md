# MAC环境下搭建
## Apache服务器搭建
apache服务器可以运行PHP脚本。而MAC下apache是默认安装的。
默认安装路径：`/etc/apache2/`
PHP项目部署位置： `/Library/WebServer/Documents/`
启动Apache服务：`sudo apachectl start`
重启Apache服务: ：`sudo apachectl restart`
停止Apache服务: `sudo apachectl stop`
查看Apache服务: `sudo apachectl -v`

## PHP配置
如果是需要部署php，以php7为例，需要在/etc/apache2下的httpd.conf配置文件中，将
`#LoadModule php7_module libexec/apache2/libphp7.so`改为
`LoadModule php7_module libexec/apache2/libphp7.so`重启apache即可。