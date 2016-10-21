# Gradle


- [翻译：Gradle之依赖管理](http://somefuture.iteye.com/blog/2003535)


- [Gradle Plugin User Guide](http://tools.android.com/tech-docs/new-build-system/user-guide)


### gradle 引入 properties 文件 ###

---

```groovy
Properties props = new Properties()
props.load(new FileInputStream(file("signing.properties")))

props['key.alias'] //获取 key.alias 属性值
```

## 依赖常见问题