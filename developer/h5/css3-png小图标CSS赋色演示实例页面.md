# [png小图标CSS赋色演示实例页面](http://www.zhangxinxu.com/study/201606/png-icon-color-fill.html)


CSS代码：
```css
.icon {
    display: inline-block;
    width: 20px; height: 20px;
    overflow: hidden;
}
.icon-del {
    background: url(delete.png) no-repeat center;
}
.icon > .icon {
    position: relative;
    left: -20px;
    border-right: 20px solid transparent;
    -webkit-filter: drop-shadow(20px red);
    filter: drop-shadow(20px red);
}
```

HTML代码：
```html
<p><strong>原始图标</strong></p>
<i class="icon icon-del"></i>
<p><strong>可以变色的图标</strong></p>
<i class="icon"><i class="icon icon-del"></i></i>
```


<style>
.icon {
    display: inline-block;
    width: 20px; height: 20px;
    overflow: hidden;
}
.icon-del {
    background: url(http://www.zhangxinxu.com/study/201606/delete.png) no-repeat center;
}
.icon > .icon {
    position: relative;
    left: -20px;
    border-right: 20px solid transparent;
    -webkit-filter: drop-shadow(20px 0 0 #FE630F);
    filter: drop-shadow(20px 0 0 #FE630F);
}
</style>
<p><strong>原始图标</strong></p>
<i class="icon icon-del"></i>
<p><strong>可以变色的图标</strong></p>
<i class="icon"><i class="icon icon-del"></i></i>
