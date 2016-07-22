# RxJava
- [不要打破链式：使用Rxjava的compose()操作符](http://www.tuicool.com/articles/YrmiQj6) 
## 坏方法： "反模式"方法

```java
public <T> Observable<T> applySchedulers(Observable<T> observable) {  
    return observable.subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread());
}


applySchedulers(Observable.from(someSource).map(data -> manipulate(data)))
    .subscribe(data -> doSomething(data));
```

> 很丑，能用，但applySchedulers()导致其不再是操作符


## TransFormers

`TransFormers` 与 `Observable.coupose()` 一起使用

Transformer实际上就是Func1<Observable , Observable>, 提供给他一个Observable，它会返回给你另一个 Obserable

```java
<T> Transformer<T, T> applySchedulers() {  
  return new Transformer<T, T>() {
    @Override
    public Observable<T> call(Observable<T> observable) {
      return observable.subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread());
    }
  };
}

  //使用lambda 好看些
  <T> Observable.Transformer<T, T> applySchedulers()
  {
    return observable -> observable
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread());
  }
  
  //现在调用会是这样的
```