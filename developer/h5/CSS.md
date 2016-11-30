- 使用 `position`:`absolute` 时，若不指定 `left`，部分浏览器会不兼容

```css
.class{
   position:absolute;
   top:0;
   left:0; 
}
```

- 指定盒子模型 padding 不撑大size

```css
* {
  -moz-box-sizing: border-box; /*Firefox3.5+*/
  -webkit-box-sizing: border-box; /*Safari3.2+*/
  -o-box-sizing: border-box; /*Opera9.6*/
  -ms-box-sizing: border-box; /*IE8*/
  box-sizing: border-box;
}
```