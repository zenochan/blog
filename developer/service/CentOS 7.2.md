# CentOS 7.2

## 安装 vim

```bash
$ yum install -y vim
```

## 安装 MariaDB

查看系统版本

```bash
[root@iZ23752urr5Z ~]# lsb_release -a
LSB Version:	:core-4.1-amd64:core-4.1-noarch
Distributor ID:	CentOS
Description:	CentOS Linux release 7.2.1511 (Core)
Release:	7.2.1511
Codename:	Core
[root@iZ23752urr5Z ~]#
```

[添加相应系统版本的 yum 源](https://downloads.mariadb.org/mariadb/repositories/#mirror=yamagata-university&distro=CentOS&distro_release=centos7-amd64--centos7&version=10.1)

```bash
$ vim /etc/yum.repos.d/MariaDB.repo

# MariaDB 10.1 CentOS repository list - created 2016-10-22 04:42 UTC
# http://downloads.mariadb.org/mariadb/repositories/
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.1/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1


$ yum list | grep mariadb
$
```

安装 MariaDB 客户端和服务端

```bash
# MariaDB-server: 服务端
# MariaDB-client：客户端
# MariaDB-devel：header files，debug symbols。Required when building source them
$ yum install MariaDB-server MariaDB-client MaraiaDB-devel
```




### 常用命令

- servcie mariadb start
- service mariadb restart
- servcie mariadb stop
- mysqladmin -u root password 'new-password'  //设置初始密码
- mysql -uroot -p //用户登录

### 忘记密码
- vi /etc/my.cnf

	> 在[mysqld]的段中加上一句: `skip-grant-tables`
- service mariadb restart  //重启
- mysql //直接登录
- use mysql;
- UPDATE user SET Password = password('new _password') WHERE User = 'root';



## 安装 nginx

添加 yum 源

---


```bash
$ vim /etc/yum.repos.d/nginx.repo

[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1

$ yum list|grep nginx
$ yum install -y nginx

```

常用命令

- service nginx (start, stop, restart, try-restart, reload, force-reload, status)

默认项目路径

```bash
$ pwd
/usr/share/nginx
$ ls
html
$
```

nginx 配置文件

- /etc/nginx/nginx.conf
- /etc/nginx/conf.d/*

## 安装 php 7.0.12


```
# 卸载旧版本 php
$ yum remove php* php-common

# rpm 安装 Php7 相应的 yum源
$ rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
$ yum install epel-release

# 安装 php 7
$ yum install php70w php70w-fpm
```

#### 权限

1. 修改 fpm 对的用户和用户组

```
$ vi /etc/php-fpm.d/www.conf #编辑
user = nginx #修改用户为nginx
group = nginx #修改组为nginx
$ service php-fpm restart
```

2. 设置部署目录的用户和用户组为 nginx

```bash
chown nginx.nginx /usr/share/nginx/html/ -R #设置目录所有者
# chmod 700 /usr/share/nginx/html/ -R #设置目录权限
```

启动 php-fpm

```
root@iZ23752urr5Z php# php-fpm -R
systemctl start  php-fpm.service
systemctl restart  php-fpm.service
systemctl status php-fpm.service
```


#### php ngixn 配置

/etc/php.ini

```
;cgi.fix_pathinfo=1
cgi.fix_pathinfo=0
```


- /usr/share/nginx/html 是脚本项目的路径

```nginx
server {

    listen 80;
    server_name mjtown.cn;
    set $root_path  '/usr/share/nginx/php/blog';
    root $root_path;

    error_log /var/log/nginx/eee.error.log warn;

    index index.php index.html index.htm;

    try_files $uri $uri/ @rewrite;

    location @rewrite {
        rewrite ^/(.*)$ /index.php?_url=/$1;
    }

    location ~ \.php {

        # php-fpm是绑定本地9000端口，nginx通过fastcgi_pass 127.0.0.1:9000;将请求转发到本地9000端口上
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index /index.php;

        fastcgi_split_path_info    ^(.+\.php)(/.+)$;
        fastcgi_param PATH_INFO    $fastcgi_path_info; 
        # 网上搜罗的很多都有这一条配置，是个很大的坑，千万要注释掉， 不然会 access denied
        #fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include            fastcgi_params;
    }

    location ~* ^/(css|img|js|flv|swf|download)/(.+)$ {
        root $root_path;
    }

    location ~ /\.ht {
        deny all;
    }
}
```
