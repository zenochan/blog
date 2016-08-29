# [DataBinding](https://developer.android.com/topic/libraries/data-binding/index.html?hl=zh-cn)

## 环境配置

```groovy
//在需要使用dataBinding的配置中添加

android{
	dataBinding{
	    enabled true;
	}
}
```

## QA

- 因找不到 accesor 无法生成相应的 ViewBind

```
Error:(17, 38) 错误: 程序包com.baimoll.market.databinding不存在
Error:(49, 23) Could not find accessor com.baimoll.market.data.models.Product.name 
```

- 报错2： 与元素类型 "variable" 相关联的 "type" 属性值不能包含 '<' 字符。

```
Error:Execution failed for task ':app:dataBindingProcessLayoutsDebug'.
> org.xml.sax.SAXParseException; systemId: 
file:/C:/AdroidProjects/RecyclerViewDataBinding/app/build/intermediates/res/merged/debug/layout/activity_main.xml;lineNumber: 8; columnNumber: 45; 与元素类型 "variable" 相关联的 "type" 属性值不能包含 '<' 字符。

错误的写成了：
<variable name="userList" type="List<User>"/>

应该写成：
<variable name="userList" type="List&lt;User>"/>
```


- 报错3：程序包com.kodulf.recyclerviewdatabinding.databinding不存在

```
C:\AdroidProjects\RecyclerViewDataBinding\app\src\main\java\com\kodulf\recyclerviewdatabinding\MainActivity.java
Error:(10, 54) 错误: 程序包com.kodulf.recyclerviewdatabinding.databinding不存在
错误: cannot find type argument for User in List
错误: cannot generate view binders java.lang.RuntimeException: failure, see logs for details.
  cannot find type argument for User in List
解决方法，写全路劲
<variable name="userList" type="java.util.List&lt;com.kodulf.recyclerviewdatabinding.User>"/>
```