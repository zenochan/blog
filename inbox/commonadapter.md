# commonadapter review
- `@Keep` 代码优化时保留方法，用于反射等操作


### Q1

```kotlin
open class Base {
  fun getA():Int = 0
}

interface BaseI {
  val a: Int
}

class Test : Base(), BaseI {
  override val a: Int
    // error: accidental override
    // 这个地方奏是不知道怎么改了
    get() = 3
}
```
> Tip： 在接口中避免定义 val,var 属性, 否则如果父类和接口都是第三方库的时候，就等着哭了
