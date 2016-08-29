-  TextView 添加删除线  

```java
tv=(TextView)findViewById(R.id.tvId);
tv.getPaint().setFlags(Paint.STRIKE_THRU_TEXT_FLAG);
```

- TextView设置html内容

```java
holder.productDetail.setText(Html.fromHtml(应付金额:<font color="#EB5860">4.00</font> 元));
```

- 设置字间距和行距
         
```xml
<TextView
	<!-- 调节字间距, 如 "1.2" -->
	android:textScaleX="1.2"
	<!-- 设置行间距，如"3dp" -->
	android:lineSpacingExtra="3dp"
	<!-- 设置行间距的倍数，如"1.2" -->
	android:lineSpacingMultiplier="1.2"
/>
```
       
- 显示格式化的文字

```java
//strings.xml
<string name="string_format">
	应付金额: <Data><![CDATA[<font color="#EB5860">%s</font>]]></Data> 元
</string>
//java
holder.orderPrice.setText(Html.fromHtml(context.getString(R.string.string_format, "2.80")));
```

### [超链接实现](http://www.jb51.net/article/79268.htm)
1. Html.fromHtml 方式

	```java
	String webLinkText  = "<a href='https://souly.cn'> html超链接测试</a>";
	mTextView.setText(Html.fromHtml(webLinkText));
	//需要加上这句，点击后会用默认浏览器打开url
	mTextView.setMovementMethod(LinkMovementMethod.getInstance());
	
	//修改自提颜色和下划线
	String webLinkText =
   "<font color='#333333'><a href='https://souly.cn' style='text-decoration:none; color:#0000FF'>
   html超链接测试</a>" ;
	```
2. 设置 aotoLink 属性

	```xml
	<TextView
   android:id="@+id/text"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   android:textSize="20sp"
   android:text="souly.cn"
   android:autoLink="email|phone|web"
   />  
	```