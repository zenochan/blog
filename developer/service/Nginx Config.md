# menu
- Nginx 配置文件位置
- 配置 Nginx 转发到 tomcat
- Nginx 区分 移动端 和 PC 端
- 重启 Nginx 命令
- http basic authorization
- Nginx配置proxy_pass转发的/路径问题
- 开启 Nginx 的 gzip 压缩功能

---

### Nginx 配置文件位置
>
/etc/nginx/nginx.conf  
/etc/nginx/conf.d/*.conf

### 配置 Nginx 转发到 tomcat

```
server { 
    listen       80; 
    server_name  bbs.mian.name; 
 
    # access_log  /var/log/nginx/log/bbs.mian.name.access.log  main; 
 
    location /jforum/{  
        proxy_pass http://localhost:8080/jforum/;  
    } 
 
    location / { 
         proxy_pass http://localhost:8080/jforum/; 
    } 
 
    error_page  404              /404.html; 
    error_page   500 502 503 504  /50x.html; 
    location = /50x.html { 
        root   /usr/share/nginx/html; 
    } 
} 
```

### Nginx 区分`移动端`和`PC 端`

```
location / {
	#默认PC端访问内容
    root /usr/local/website/web;

	#如果是手机移动端访问内容
    if ( $http_user_agent ~ "(MIDP)|(WAP)|(UP.Browser)|(Smartphone)|(Obigo)|(Mobile)|(AU.Browser)|(wxd.Mms)|(WxdB.Browser)|(CLDC)|(UP.Link)|(KM.Browser)|(UCWEB)|(SEMC\-Browser)|(Mini)|(Symbian)|(Palm)|(Nokia)|(Panasonic)|(MOT\-)|(SonyEricsson)|(NEC\-)|(Alcatel)|(Ericsson)|(BENQ)|(BenQ)|(Amoisonic)|(Amoi\-)|(Capitel)|(PHILIPS)|(SAMSUNG)|(Lenovo)|(Mitsu)|(Motorola)|(SHARP)|(WAPPER)|(LG\-)|(LG/)|(EG900)|(CECT)|(Compal)|(kejian)|(Bird)|(BIRD)|(G900/V1.0)|(Arima)|(CTL)|(TDG)|(Daxian)|(DAXIAN)|(DBTEL)|(Eastcom)|(EASTCOM)|(PANTECH)|(Dopod)|(Haier)|(HAIER)|(KONKA)|(KEJIAN)|(LENOVO)|(Soutec)|(SOUTEC)|(SAGEM)|(SEC\-)|(SED\-)|(EMOL\-)|(INNO55)|(ZTE)|(iPhone)|(Android)|(Windows CE)|(Wget)|(Java)|(curl)|(Opera)" )
	{
		root /usr/local/website/mobile;
	}

	index index.html index.htm;
}
```

### 重启 Nginx

```bash
# nginx -t					//检查 nginx 配置
# nginx -s reload			//不停止服务重载配置
# service nginx restart		//重新启动服务
```
### http basic authorization
- [Nginx Http认证 实现访问网站或目录密码认证保护][a1]
- [Module ngx_http_auth_basic_module][a2]

[a1]:http://my.oschina.net/loveking/blog/150180?fromerr=NCGDw3sf
[a2]:http://nginx.org/en/docs/http/ngx_http_auth_basic_module.html 

```
location /{
    auth_basic "认证提示";
    auth_basic_user_file path/file_name;
}
```


### Nginx配置proxy_pass转发的/路径问题


在`nginx`中配置`proxy_pass`时，如果是按照`^~`匹配路径时  
要注意`proxy_pass`后的`url`最后的`/`  
当加上了`/`，相当于是绝对根路径，则`nginx`不会把`location`中匹配的路径部分代理走;  
如果没有`/`，则会把匹配的路径部分也给代理走。

```
location ^~ /static_js/ { 
	proxy_cache js_cache; 
	proxy_set_header Host js.test.com; 
	proxy_pass http://js.test.com/; 
}
```

如上面的配置，如果请求的url是`http://servername/static_js/test.html`  
会被代理成 `http://js.test.com/test.html`

而如果这么配置

```
location ^~ /static_js/ { 
	proxy_cache js_cache; 
	proxy_set_header Host js.test.com; 
	proxy_pass http://js.test.com; 
}
```

则会被代理到`http://js.test.com/static_js/test.htm`  
当然，我们可以用如下的rewrite来实现/的功能

```
location ^~ /static_js/ { 
	proxy_cache js_cache; 
	proxy_set_header Host js.test.com; 
	rewrite /static_js/(.+)$ /$1 break; 
	proxy_pass http://js.test.com; 
} 
```

### 开启Nginx的gzip压缩功能详解
- [开启Nginx的gzip压缩功能详解](http://www.php100.com/html/program/nginx/2013/0905/5526.html)

---

- [配置Nginx反向代理Tomcat][1]
- [关于Nginx的server_name][2]
- [Nginx+Tomcat实现反向代理及动静分离][3]
- [Nginx配置proxy_pass转发的/路径问题][4]

[1]:http://www.linuxidc.com/Linux/2015-03/115208.htm 'Linux 公社'
[2]:http://onlyzq.blog.51cto.com/1228/535279
[3]:http://www.tuicool.com/articles/uA36biz
[4]:http://www.cnblogs.com/AloneSword/p/3673829.html