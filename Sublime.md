# Sublime

## vim


#### 开启 `vim` 模式
```javascript
{
    "caret_style": "blink",
    "font_size": 12,
    //开启 vim 模式
    "ignored_packages":[],
    //开启sublime时就是命令模式
    "vintage_start_in_command_mode": true,
}
```

#### 末行模式

- VintageEx for Sublime 2
- Vintageous for Sublime 3


**usage**: pressing the `:` key

#### 按键冲突


安装 [FindKeyConflicts](https://sublime.wbond.net/packages/FindKeyConflicts) 插件


## [Terminal](http://www.jianshu.com/p/20eb268b2223)

#### 安装

sublime下，
ctrl+shift+P打开package control面板,
输入pci进入安装插件列表，
输入Terminal找到插件安装


#### 默认快捷键
- ctrl+shift+t 打开文件所在文件夹，
- ctrl+shift+alt+t 打开文件所在项目的根目录文件夹


## [Sublime Text 3 使用MarkDown编写带预览的文本](http://blog.csdn.net/marksinoberg/article/details/50993456)

#### 首先是安装Sublime Text

无论是2还是3，都是支持markdown标记语言的，所以我们不必为选择那个版本而纠结。 
下载完成之后一般来说我们都要先配置一下。 
（那个Go to anything 的很简单，在这里就不再叙述了。）

#### 然后是安装需要的包

为了达成我们的目标，我们通常来说会安装下面的一些package。

- package control install
- markdown editting
- markdown preview

> 具体的步骤是，按住ctrl + shift + P 来调出一个弹出的输入框   
然后输入package control install。等待左下角的缓冲结束，   
接着再向弹出的输入框中分别输入markdown editing 和markdown preview .这样就完成了我们需要的包的安装了，重启之后即可使用。

#### 额外的配置

其实到上面已经是完成了我们今天的任务了，但是作为一名追（zhi）求（shi）省（tai）事（lan）的程序猿。我们还需要做的更加的方便才行啊。本人一般来说喜欢在浏览器中进行预览的实现。 
于是，我们就需要在Sublime的配置中进行自定义的配置了。

在浏览器中进行预览的步骤如下：

- preference--> key bunding user 中输入

```json
[
    {"keys": ["alt+m"], "command": "markdown_preview", "args": { "target": "browser"}}
]
```


- 然后是设置语法高亮和mathjax支持 `preference - setting`

```json
{
    "font_size": 13,
    "ignored_packages":
    [
        "Vintage"
    ],

    /*
        Enable or not mathjax support.
    */
    "enable_mathjax": true,

    /*
        Enable or not highlight.js support for syntax highlighting.
    */
    "enable_highlight": true,


}
```




