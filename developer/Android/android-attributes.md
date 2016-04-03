
[android:clipToPadding和android:clipChildren](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0317/2613.html)

> 编辑推荐：[稀土掘金](http://gold.xitu.io/)，这是一个针对技术开发者的一个应用，你可以在掘金上获取最新最优质的技术干货，不仅仅是Android知识、前端、后端以至于产品和设计都有涉猎，想成为全栈工程师的朋友不要错过！

```xml
<ListView
    android:layout_gravity="center_vertical"
    android:id="@+id/list"
    android:clipChildren="false"
    android:clipToPadding="false"
    android:paddingTop="50dip"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
```


#### layout_above
```java
((RelativeLayout.LayoutParams) view.getLayoutParams())
  .addRule(RelativeLayout.ABOVE, R.id.anchor_view_id);
```