- [GitHub](https://github.com/square/retrofit)
- [Retrofit](http://square.github.io/retrofit/)

通常情况下定义一个异步方法添加一个回调是这样的

```java
@GET("/user/{id}/photo")
void getUserPhoto(@Path("id") int id, Callback<Photo> cb);
```

在Rxjava下，你可以用Observable代替

```java
@GET("/user/{id}/photo")
Observable<Photo> getUserPhoto(@Path("id") int id);
```

# 2.0.0

---

```groovy
compile 'com.squareup.retrofit:retrofit:2.0.0-beta2'
//compile 'com.squareup.retrofit:retrofit2:2.0.0-beta3'//beta3 包名改变，不能与 adapter-rxjava 协同工作
compile 'com.squareup.retrofit:adapter-rxjava:2.0.0-beta2'
compile 'com.squareup.retrofit:converter-gson:2.0.0-beta2'
```

```java
retrofit = new Retrofit.Builder().baseUrl(BASE_URL)
        .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
        .addConverterFactory(GsonConverterFactory.create())
        .build();
```

### 关于 REST API 不能定义返回类型为 rx.Observable<T> 的问题

[Retrofit 2.0 beta1][rx1] [Retrofit 2.0: The biggest update yet on the best HTTP Client Library for Android][rx2]

[rx1]:http://stackoverflow.com/questions/32311334/retrofit-2-0-beta1 'stack overflow'
[rx2]:http://inthecheesefactory.com/blog/retrofit-2.0/en


---

- [Android上最流行的HTTP Client库,Retrofit 2.0：有史以来最大的改进][1]

[1]:http://www.open-open.com/news/view/1c265f