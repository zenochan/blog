1. Download MySQL Yum Repository

- [mysql57-community-release-el6-7.noarch.rpm](http://dev.mysql.com/get/mysql57-community-release-el6-7.noarch.rpm "CentOS 6.5")
- [mysql57-community-release-el7-7.noarch.rpm](http://dev.mysql.com/get/mysql57-community-release-el7-7.noarch.rpm "CentOS 7")

```bash
//down load
# wget http://dev.mysql.com/get/mysql57-community-release-el6-7.noarch.rpm
# ls
mysql57-community-release-el6-7.noarch.rpm
//install mysql57 yum repository
# rpm -Uvh mysql57-community-release-el6-7.noarch.rpm
warning: mysql57-community-release-el6-7.noarch.rpm: Header V3 DSA/SHA1 Signature, key ID 5072e1f5: NOKEY
Preparing...                ########################################### [100%]
   1:mysql57-community-relea########################################### [100%]
//delete file
# rm -f mysql57-community-release-el6-7.noarch.rpm
//install mysql57
# yum install -y mysql-community-server
# mysql_install_db --datadir=/var/lib/mysql   //必须指定datadir,执行后会生成~/.mysql_secret密码文件
2015-10-27 00:20:30 [WARNING] mysql_install_db is deprecated. Please consider switching to mysqld --initialize
# mysqld --initialize                         //新版的推荐此方法，执行生会在/var/log/mysqld.log生成随机密码
# cat /var/log/mysqld.log
2015-12-31T14:43:25.579095Z 1 [Note] A temporary password is generated for root@localhost: <<+ttr2y7oR6
//更改mysql数据库目录的所属用户及其所属组(-R 递归所属组和用户设置)，然后启动mysql数据库
# chown mysql:mysql /var/lib/mysql -R
# service mysqld start					//CentOS 6.*
# systemctl start mysqld.service 		//CentOS 7
//根据第5步中的密码登录到mysql，更改root用户的密码
//新版的mysql在第一次登录后更改密码前是不能执行任何命令的
# mysql -uroot -p'<<+ttr2y7oR6'
mysql>select version();
ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.
mysql> set password for 'root'@'localhost'=password('eternalMAM27');
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> select version();
+-----------+
| version() |
+-----------+
| 5.7.10    |
+-----------+
1 row in set (0.00 sec)
mysql> grant all privileges on *.* to 'Zeno'@'%' identified by 'eternalMAM27' with grant option;
mysql> flush privileges;
```

>最后需要特别提醒注意的一点是，新版的mysql数据库下的user表中已经没有Password字段了
>而是将加密后的用户密码存储于 `authentication_string` 字段


### 参考资料
- [关于linux下mysql 5.7.x数据库的yum的安装方法](http://www.cnblogs.com/5201351/p/4912951.html)
- [Mysql5.7全新的root密码规则](http://www.bubuko.com/infodetail-1060208.html)