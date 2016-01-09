- [怎样用 Android Annotations 写出高性能代码](http://blog.csdn.net/feelang/article/details/49095235#0-tsina-1-68012-397232819ff9a47a7b7e80a40613cfe1)

### Thread Annotations
- @UiThread

```java
//如果标记 class，那么这个 class 的所有方法都必须在指定线程上执行
@UiThread
public class NavigationBar{
	//...
}
```

- __@MainThread__ 与 __@UiThread__ 的区别比较微妙。
- 总结起来一句话：@MainThread 用于标记与生命周期相关的方法，@UiThread 用于 View Hierarchy。
- 但是 Android Studio 认为两者是可以互换的，所以有这两种标记的方法可以互相调用。

- @CheckResult
> 要求调用方法时检查返回值

- @CallSuper
> 要求重写方法必须先调用父类方法

- @IntDef

```java
public class ActionBar{
	@IntDef({DARK, LIGHT})
    @Retention(RetentionPolicy.SOURCE)
    public @interface Theme {}

    public static final int DARK = 0x00;
    public static final int LIGHT = 0x01;
}
```


- @StringDef