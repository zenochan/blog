# 权限与安全

[mysql数据库中的3 个权限表定义](./mysql数据库中的3个权限表定义.xlsx)

- 刷新权限

```sql
FLUSH PRIVILEGES;
```

#### 当用户进行连接的时候，权限表的存取过程有以下两个阶段。

1. 先从user表中的host、user和password这3个字段中判断链接的ip、用户名和密码是否存在于表中，如果存在，则通过身份认证，否则拒绝链接。
2. 如果通过身份认证，则按照以下权限表的循序得到数据库权限：

	> user-->db-->tables_priv-->colums_priv.

```sql
GRANT priv_type [(column_list)] [,priv_type[(column_list)]] ...
    ON [object_type] {tbl_name | * | *.* | db_name.* }
    TO user[@'host'] [ IDENTIFIED BY [PASSWORD] 'password']
        [, user[@'host'] [ IDENTIFIED BY [PASSWORD] 'password'] ]
    [ WITH GRANT OPTION ]
    
    object_type = 
          TABLE
        | FUNCTION
        | PROCEDURE
```
        
eg.

```sql
/* 只授予登录权限 */
GRANT USAGE ON *.* TO 'zeno'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'zeno'@'localhost' IDENTIFIED BY 'pwd' WITH GRANT OPTION;
GRANT SELECT, INSERT, UPDATE, DELETE ON test.* TO 'zeno'＠'%' IDENTIFIED BY 'pwd';
```

查看和更改账号权限

```sql
/* host可以不写， 默认是'%' */
SHOW GRANTS FOR 'user'[@'host'] ;
```

```
/* REVOKE 语句可以回收已经赋予的权限  usage权限不能被回收，也就是说，revoke用户不能删除用户 */
REVOKE priv_type [(column_list)] [,priv_type[(column_list)]] ...
    ON [object_type] {tbl_name | * | *.* | db_name.* }
    FROM user[@'host'] [, user[@'host']]
```


修改密码

```sql
/* 使用 mysqladmin 命令在命令行指定密码 */
shell > mysqladmin -u user_name -h host_name password "newpwd"
/* 执行 SET PASSWORD 语句 ，如果修改自己的密码，可以省略for语句 */
mysql > SET PASSWORD [ FOR 'user_name'@'host' ] = PASSWORD('newpwd');
/* 在全局级别使用GRANT USAGE 语句(在*.*)来指定某个账户的密码而不影响账户当前的权限 */
mysql > GRANT USAGE ON *.* TO 'user_name'@'host' IDENTIFIED BY 'newpwd';
/* 直接更改数据库的user表 */
mysql > UPDATE USER SET `Password` = PASSWORD('newpwd') WHERE `User` = 'user_name' AND `Host` = 'host';
```

删除账号

```sql
DROP USER 'user'[@'host'] [,'user'[@'host']];
```