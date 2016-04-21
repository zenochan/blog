# [Android调用手机浏览器的正确方式](http://www.jianshu.com/p/eaae783b931f)

```java
Intent intent = new Intent();
intent.setAction(Intent.ACTION_VIEW);
Uri content_url = Uri.parse(url);
intent.setData(content_url);

if (intent.resolveActivity(getPackageManager()) != null) {
    //startActivity(intent);
    startActivity(Intent.createChooser(intent, "请选择浏览器"));
}
```

