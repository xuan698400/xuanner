# MySQL安装启动

下载MySQL(yum包)
```
wget http://repo.mysql.com/mysql57-community-release-el7-10.noarch.rpm
```
安转yum软件源
```
rpm -Uvh mysql57-community-release-el7-10.noarch.rpm
```
安装MySQL服务端
```
yum install -y mysql-community-server
```
启动MySQL
```
service mysqld start
```
检查mysql 的运行状态
```
service mysqld status
```
修改临时密码
```
grep 'temporary password' /var/log/mysqld.log
mysql -uroot -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'xxx';
```
修改密码策略
```
set global validate_password_policy=0;
set global validate_password_length=1;
```
查询命令
```
mysql -u root -p
xxx
show databases;
use xxx;
show tables;
```
