# WebView

### <font color='red'>0X02 WebView 任意代码执行漏洞</font>



- [Android安全开发之WebView中的地雷](http://www.devstore.cn/essay/essayInfo/7187.html)


### [WebView基本使用](http://www.cnblogs.com/mengdd/archive/2013/03/01/2938295.html)
---
     
- 互联网页面直接用

```java
myWebView.loadUrl(“http://www.google.com“);
```
		
- 本地文件用(本地文件存放在：assets文件中)

```java
myWebView.loadUrl(“file:///android_asset/XX.html“);  
```		


- 直接载入html的字符串

```java

String htmlString = "<h1>Title</h1><p>This is HTML text<br /><i>Formatted in italics</i><br />Anothor Line</p>";
// 载入这个html页面
//myWebView.loadData(htmlString, "text/html", "utf-8"); 
myWebView.loadData(htmlString, "text/html;charset=UTF-8", null); 
```		
- webView loadData 中文乱码问题  
	
```java
webView.getSettings().setDefaultTextEncodingName("UTF-8");//设置默认为utf-8
//webView.loadData(data, "text/html", "UTF-8");//API提供的标准用法，无法解决乱码问题
webView.loadData(data, "text/html; charset=UTF-8", null);//这种写法可以正确解码
```

### javascript
---

4.2以上版本调用js接口需要在方法使用声明@JavascriptInterface

```
-keepattributes *Annotation*
-keepattributes *JavascriptInterface*
```

- [Android WebView中的JavaScript代码使用](http://www.cnblogs.com/mengdd/archive/2013/03/02/2940185.html)
		
### Cookie
---
- [android webview里设置cookie](http://blog.csdn.net/encienqi/article/details/7912733)

### 其他
---
- [Android WebView常见问题及解决方案汇总](http://www.open-open.com/lib/view/open1383742461008.html)




### [还在用Android自带的WebView组件？太Out了！](http://www.jianshu.com/p/d3ef9c62b6c8)

