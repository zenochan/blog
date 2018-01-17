[阅读原文](http://www.thinksaas.cn/group/topic/328102/)

1. 检查 YUM 源中是否有 nginx

	```bash
	# yum update
	# yum list | grep nginx
	```

2. 如果 YUM 源中没有 nginx，执行下列命令

	```bash
	# yum install http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm
	```

3. 安装 nginx

	```bash
	# yum install nginx
	```

4. 把 nginx 加入到开机启动

	```bash
	# chkconfig nginx on
	```
