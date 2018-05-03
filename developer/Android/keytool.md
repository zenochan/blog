# [keytool为jdk自带工具](http://zenochan.win/blogs/125)

- 查看签名条目

```
$ keytool -list -v -keystore ./qiguaimarket_release.jks
```

- 修改密钥库密码
```
$ keytool -storepasswd -keystore zeno.jks
```

- 导出密钥条目
```
$ keytool -export -alias qiguai -keystore qiguai.jks -file qiguai.crt
```

- 导入密钥条目
```
$ keytool -import -alias qiguai -keystore zeno.jks -file qiguai.crt
```
