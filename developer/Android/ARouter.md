# [ARouter - alibaba](https://github.com/alibaba/ARouter)

- [谈谈App的统一跳转和ARouter][4a91d5b4]
- [ Android 路由框架ARouter最佳实践][19ad2127]

```groovy
// ARouter
kapt {
  arguments {
    arg("moduleName", project.getName())
  }
}

dependencies {
  //...
  // ARouter
  api "com.alibaba:arouter-api:1.3.1"
  kapt "com.alibaba:arouter-compiler:1.1.4"
}
```



  [4a91d5b4]: https://www.jianshu.com/p/c0eecbbf1481
  [19ad2127]: http://blog.csdn.net/zhaoyanjun6/article/details/76165252 "Android 路由框架ARouter最佳实践"
