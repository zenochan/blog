# Apache Rewrite mod


#### httpd.conf
`LoadModule rewrite_module libexec/mod_rewrite.so`

#### httpd-vhost.conf

> Rewirte主要的功能就是<font color='red'>实现URL的跳转</font>，它的正则表达式是基于Perl语言。可基于服务器级的(httpd.conf)和目录级的(.htaccess)两种方式。如果要想用到rewrite模块，必须先安装或加载rewrite模块。方法有两种一种是编译apache的时候就直接安装rewrite模块，别一种是编译apache时以DSO模式安装apache,然后再利用源码和apxs来安装rewrite模块。

> <font color='red'>基于服务器级的(httpd.conf)</font>有两种方法，一种是在httpd.conf的全局下直接利用RewriteEngine on来打开rewrite功能;另一种是在局部里利用RewriteEngine on来打开rewrite功能,下面将会举例说明，需要注意的是,<font color='red'>必须在每个virtualhost里用RewriteEngine on来打开rewrite功能</font>。否则virtualhost里没有RewriteEngine on它里面的规则也不会生效。

> <font color='red'>基于目录级的(.htaccess)</font>,要注意一点那就是<font color='red'>必须打开此目录的FollowSymLinks属性（httpd.conf中的Option FollowSymLinks）且在.htaccess里要声明RewriteEngine on</font>。


```xml
<VirtualHost *:80>
    <Directory "/usr/local/var/www/service">
        Options +Indexes +FollowSymLinks
        AllowOverride all
    </Directory>

    ServerAdmin Zeno

    DocumentRoot "/usr/local/var/www/service"
    ServerName laravel.local
    ErrorLog "/usr/local/var/log/apache2/laravel.local.com-error_log"
    CustomLog "/usr/local/var/log/apache2/laravel.local.com-access_log" common
</VirtualHost>
```

#### 以 `laravel` 的 `.htaccess` 为例

```xml
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews
    </IfModule>

    RewriteEngine On

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d 
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    # Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d 
    RewriteCond %{REQUEST_FILENAME} !-f 
    RewriteRule ^ /laravel5.3/index.php [L] 

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
</IfModule>
```