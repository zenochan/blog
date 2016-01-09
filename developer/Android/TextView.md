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