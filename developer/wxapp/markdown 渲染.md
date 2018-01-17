# 在微信小程序中显示 markdown

#### [towxml - sbfkcel](https://github.com/sbfkcel/towxml)
> 直接按照文档操作，<font color=red>不能修改依赖的路径</font>, 就能达到想要的效果
> 也是使用了 hljs 高亮库
- <font color=red>深色主题不生效</font>
- <font color=red>代码块样式错误</font>
  ```css
  /* 修改main.css 5~7 行 */
  /*word-wrap: break-word;*/
  /*word-wrap:break-word;*/
  word-break: break-all;
  width: 100%;
  ```
- <font color=red>外部链接没有做跳转处理</font>
