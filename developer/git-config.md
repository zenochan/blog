# Git Config

## 设置记住密码

#### 默认15分钟

```bash
git config --global credential.helper cache
```

#### 如果想自己设置时间，可以这样做：

```bash
git config --global credential.helper 'cache --timeout=3600'
```

> 这样就设置一个小时之后失效

#### 长期存储密码

```bash
git config --global credential.helper store
```

#### 增加远程地址的时候带上密码也是可以的。(推荐)

```
http://yourname:password@git.oschina.net/name/project.git 
```