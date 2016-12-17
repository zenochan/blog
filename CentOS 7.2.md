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
[root@iZ23752urr5Z ~]# vim /etc/yum.repos.d/MariaDB.repo

# MariaDB 10.1 CentOS repository list - created 2016-10-22 04:42 UTC 
# http://downloads.mariadb.org/mariadb/repositories/ 
[mariadb] 
name = MariaDB 
baseurl = http://yum.mariadb.org/10.1/centos7-amd64 
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB 
gpgcheck=1 


root@iZ23752urr5Z ~]# yum list | grep mariadb
mariadb-libs.x86_64                     1:5.5.44-2.el7.centos          @anaconda
MariaDB-client.x86_64                   10.1.18-1.el7.centos           mariadb  
MariaDB-common.x86_64                   10.1.18-1.el7.centos           mariadb  
MariaDB-compat.x86_64                   10.1.18-1.el7.centos           mariadb  
MariaDB-connect-engine.x86_64           10.1.18-1.el7.centos           mariadb  
MariaDB-cracklib-password-check.x86_64  10.1.18-1.el7.centos           mariadb  
MariaDB-devel.x86_64                    10.1.18-1.el7.centos           mariadb  
MariaDB-gssapi-client.x86_64            10.1.18-1.el7.centos           mariadb  
MariaDB-gssapi-server.x86_64            10.1.18-1.el7.centos           mariadb  
MariaDB-oqgraph-engine.x86_64           10.1.18-1.el7.centos           mariadb  
MariaDB-server.x86_64                   10.1.18-1.el7.centos           mariadb  
MariaDB-shared.x86_64                   10.1.18-1.el7.centos           mariadb  
MariaDB-test.x86_64                     10.1.18-1.el7.centos           mariadb  
galera.x86_64                           25.3.18-1.rhel7.el7.centos     mariadb  
mariadb.x86_64                          1:5.5.50-1.el7_2               updates  
mariadb-bench.x86_64                    1:5.5.50-1.el7_2               updates  
mariadb-devel.i686                      1:5.5.50-1.el7_2               updates  
mariadb-devel.x86_64                    1:5.5.50-1.el7_2               updates  
mariadb-embedded.i686                   1:5.5.50-1.el7_2               updates  
mariadb-embedded.x86_64                 1:5.5.50-1.el7_2               updates  
mariadb-embedded-devel.i686             1:5.5.50-1.el7_2               updates  
mariadb-embedded-devel.x86_64           1:5.5.50-1.el7_2               updates  
mariadb-libs.i686                       1:5.5.50-1.el7_2               updates  
mariadb-libs.x86_64                     1:5.5.50-1.el7_2               updates  
mariadb-server.x86_64                   1:5.5.50-1.el7_2               updates  
mariadb-test.x86_64                     1:5.5.50-1.el7_2               updates  
[root@iZ23752urr5Z ~]#
```

安装 MariaDB 客户端和服务端

```bash
[root@iZ23752urr5Z ~]# yum install MariaDB-server MariaDB-client MaraiaDB-devel
```

- MariaDB-server: 服务端
- MariaDB-client：客户端
- MariaDB-devel：header files，debug symbols。Required when building source them


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
root@iZ23752urr5Z ~# vim /etc/yum.repos.d/nginx.repo 

[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1

root@iZ23752urr5Z ~# yum list|grep nginx
collectd-nginx.x86_64                   5.6.0-1.el7                    epel     
munin-nginx.noarch                      2.0.25-11.el7                  epel     
nginx.x86_64                            1:1.10.2-1.el7.ngx             nginx    
nginx-all-modules.noarch                1:1.10.1-1.el7                 epel     
nginx-debug.x86_64                      1:1.8.0-1.el7.ngx              nginx    
nginx-debuginfo.x86_64                  1:1.10.2-1.el7.ngx             nginx    
nginx-filesystem.noarch                 1:1.10.1-1.el7                 epel     
nginx-mod-http-geoip.x86_64             1:1.10.1-1.el7                 epel     
nginx-mod-http-image-filter.x86_64      1:1.10.1-1.el7                 epel     
nginx-mod-http-perl.x86_64              1:1.10.1-1.el7                 epel     
nginx-mod-http-xslt-filter.x86_64       1:1.10.1-1.el7                 epel     
nginx-mod-mail.x86_64                   1:1.10.1-1.el7                 epel     
nginx-mod-stream.x86_64                 1:1.10.1-1.el7                 epel     
nginx-module-geoip.x86_64               1:1.10.2-1.el7.ngx             nginx    
nginx-module-geoip-debuginfo.x86_64     1:1.10.2-1.el7.ngx             nginx    
nginx-module-image-filter.x86_64        1:1.10.2-1.el7.ngx             nginx    
nginx-module-image-filter-debuginfo.x86_64
                                        1:1.10.2-1.el7.ngx             nginx    
nginx-module-njs.x86_64                 1:1.10.2.0.0.20160414.1c50334fbea6-2.el7.ngx
                                                                       nginx    
nginx-module-njs-debuginfo.x86_64       1:1.10.2.0.0.20160414.1c50334fbea6-2.el7.ngx
                                                                       nginx    
nginx-module-perl.x86_64                1:1.10.2-1.el7.ngx             nginx    
nginx-module-perl-debuginfo.x86_64      1:1.10.2-1.el7.ngx             nginx    
nginx-module-xslt.x86_64                1:1.10.2-1.el7.ngx             nginx    
nginx-module-xslt-debuginfo.x86_64      1:1.10.2-1.el7.ngx             nginx    
nginx-nr-agent.noarch                   2.0.0-10.el7.ngx               nginx    
owncloud-nginx.noarch                   9.0.4-1.el7                    epel     
pcp-pmda-nginx.x86_64                   3.10.6-2.el7                   base     
root@iZ23752urr5Z ~# yum install -y nginx

```

常用命令

- service nginx (start, stop, restart, try-restart, reload, force-reload, status)

默认项目路径

```bash
root@iZ23752urr5Z nginx# pwd
/usr/share/nginx
root@iZ23752urr5Z nginx# ls
html
root@iZ23752urr5Z nginx# 
```

nginx 配置文件

- /etc/nginx/nginx.conf
- /etc/nginx/conf.d/*

## 安装 php 7.0.12

1. 卸载旧版本 php
  - yum remove php* php-common
	
2. rpm 安装 Php7 相应的 yum源

  - rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
  
  ```bash
  root@iZ23752urr5Z html# rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm  
获取https://mirror.webtatic.com/yum/el7/webtatic-release.rpm  
警告：/var/tmp/rpm-tmp.k2RotC: 头V4 RSA/SHA1 Signature, 密钥 ID 62e74ca5: NOKEY  
错误：依赖检测失败：  
	epel-release >= 7 被 webtatic-release-7-3.noarch 需要  
root@iZ23752urr5Z html# rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm  
获取https://mirror.webtatic.com/yum/el7/webtatic-release.rpm  
警告：/var/tmp/rpm-tmp.2kZNxS: 头V4 RSA/SHA1 Signature, 密钥 ID 62e74ca5: NOKEY  
错误：依赖检测失败：  
	epel-release >= 7 被 webtatic-release-7-3.noarch 需要  
root@iZ23752urr5Z html# yum install epel-release  
root@iZ23752urr5Z html# rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
  ```

3. 安装 php 7

  ```bash
  root@iZ23752urr5Z html# yum install php70w php70w-fpm
  依赖关系解决

  =======================================================================================================================
 Package                      架构                  版本                                 源                       大小
  =======================================================================================================================
  正在安装:
   php70w                       x86_64                7.0.12-1.w7                          webtatic                2.8 M
 php70w-fpm                   x86_64                   7.0.12-1.w7                    webtatic                   1.5 M
为依赖而安装:
 apr                          x86_64                1.4.8-3.el7                          base                    103 k
 apr-util                     x86_64                1.5.2-6.el7                          base                     92 k
 httpd                        x86_64                2.4.6-40.el7.centos.4                updates                 2.7 M
 httpd-tools                  x86_64                2.4.6-40.el7.centos.4                updates                  83 k
 mailcap                      noarch                2.1.41-2.el7                         base                     31 k
 php70w-cli                   x86_64                7.0.12-1.w7                          webtatic                2.9 M
 php70w-common                x86_64                7.0.12-1.w7                          webtatic                1.2 M

  事务概要
  =======================================================================================================================
安装  2 软件包 (+7 依赖软件包)
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


