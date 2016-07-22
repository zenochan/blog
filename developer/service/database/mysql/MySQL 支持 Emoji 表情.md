- [修改Mysql字符集，支持Emoji表情](http://my.oschina.net/u/2958/blog/108257)
- [关于四字节字符入库时错误的解决方案（Incorrect string value: '\xF0\x9F\x99\x8F' for column 'Reply_Content' at row 1）](http://www.cnblogs.com/krisy/p/3524170.html)

####  将表字段字符集设置成utf8mb4

```bash
$ vim /etc/my.cnf

[mysqld]

character-set-server=utf8mb4

[mysql]

default-character-set=utf8mb4

$ service mysqld restart
```

#### 执行插入前执行：`SET NAMES utf8mb4;`

```sql
SET NAMES utf8mb4; 
INSERT test(Content) VALUES('～');
```