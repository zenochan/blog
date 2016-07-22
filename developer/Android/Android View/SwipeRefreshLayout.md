# android.support.v4.widget.SwipeRefreshLayout

---

### gradle  

```groovy
compile 'com.android.support:support-v4:21.0.+'  
//或者
compile 'com.android.support:appcompat-v7:22.2.1'  
```


- 在KitKat版本中就有了SwipeRefreshLayout  
![](http://www.2cto.com/uploadfile/Collfiles/20141119/20141119083950116.gif)

- Lollipop中对SwipeRefreshLayout做了改进,进化成了一个圆  
![](http://www.2cto.com/uploadfile/Collfiles/20141119/20141119083950117.gif)



---



###	使用  



1. 将一个ListView添加进SwipeRefreshLayout控件  


```xml
<android.support.v4.widget.SwipeRefreshLayout
 	android:id="@+id/activity_main_swipe_refresh_layout"
 	android:layout_width="match_parent"
 	android:layout_height="wrap_content">
 	<ListView
     	android:id="@+id/activity_main_listview"
     	android:layout_width="match_parent"
     	android:layout_height="match_parent"
     	>
 	</ListView>
</android.support.v4.widget.SwipeRefreshLayout>
```
    

2. 实现、注册刷新监听  


```java
SwipeRefreshLayout.OnRefreshListener
{
	void onRefresh();
}

swipeRefreshLayout.setOnRefreshListener(this);
```
		
3. 刷新完成时

```java
public void setColorSchemeResources(int... colorResIds)
```

4. 设置颜色  

```java
public void setColorSchemeResources(int... colorResIds)
```

---

### 参考资料  

[Android全新的SwipeRefreshLayout控件教程](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2014/1215/2166.html)

