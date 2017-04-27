# MariaDB (Mysql)

## Install

```bash
$ brew install mariadb

==> Installing mariadb
==> Downloading https://homebrew.bintray.com/bottles/mariadb-10.1.17.sierra.bottle.tar.gz
######################################################################## 100.0%
==> Pouring mariadb-10.1.17.sierra.bottle.tar.gz
==> /usr/local/Cellar/mariadb/10.1.17/bin/mysql_install_db --verbose --user=zenochan --basedir=/usr/local/Cellar/mariadb/10.1.17 --datadir=/usr/local/var/mysql --tmpdir=/tmp
==> Caveats
A "/etc/my.cnf" from another install may interfere with a Homebrew-built
server starting up correctly.

To connect:
    mysql -uroot

To have launchd start mariadb now and restart at login:
  brew services start mariadb
Or, if you don't want/need a background service you can just run:
  mysql.server start
==> Summary
🍺  /usr/local/Cellar/mariadb/10.1.17: 573 files, 136.6M

```


## 修改密码

```bash
$ mysqladmin -u root -p password yourpassword
Enter pass word:   #输入现在的用户密码
```

- [CentOS用yum安装、配置MariaDB](https://my.oschina.net/iluckyboy/blog/215949)