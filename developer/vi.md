### 行号
```
//显示光标所在行号
: nu
//显示所有当前行号
: set nu
```

[.ideavimrc 需要和 .IntelliJIdea13\ 同路径, 且文件编码为utf-8.](http://blog.xiazhiri.com/IntelliJ-IDEA-ideavimrc.html)

### tab (`\t`)
- 设置 tab 缩进长度

```vim
sudo vim /etc/vim/vimrc

set tabstop=4

:wq
```

```
:set tabstop=4 设定tab宽度为4个字符
:set shiftwidth=4 设定自动缩进为4个字符
:set expandtab 用space替代tab的输入
:set noexpandtab 不用space替代tab的输入
```