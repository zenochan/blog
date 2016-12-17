# Android 单元测试那些事

- [(MVP+RxJava+Retrofit)解耦+Mockito单元测试 经验分享](http://www.jianshu.com/p/cdfeb6c3d099)

- [使用Mockito、Robolectric和RxJava及Retrofit进行单元测试](http://www.jianshu.com/p/b00586534fc1)

## mockito
```groovy
//java.lang.RuntimeException: Method isEmpty in android.text.TextUtils not mocked. See http://g.co/androidstudio/not-mocked for details.
//这样 Textutils.isEmpty 将一直返回 false
testOptions{
    unitTests.returnDefaultValues = true
}
```

## esppresso

[androidTestPractice](https://github.com/puppet2436/androidTestPractice)
