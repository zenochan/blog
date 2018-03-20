# [EhCache](http://www.ehcache.org/documentation/3.4/)

## 配置 EhCache
> 可以通过代码配置或者xml配置

1. 代码配置

```kotlin
import org.ehcache.Cache
import org.ehcache.config.builders.CacheConfigurationBuilder
import org.ehcache.config.builders.CacheManagerBuilder
import org.ehcache.config.builders.ResourcePoolsBuilder
import org.ehcache.config.units.MemoryUnit
import java.io.File
import java.io.Serializable

object Cache {
  private val cache: Cache<String, Serializable?>

  init {
    // 获取当前程序所在路径
    val path = System.getProperty("user.dir")
    val cacheConfig = CacheConfigurationBuilder.newCacheConfigurationBuilder(
        String::class.java, Serializable::class.java,
        // 内存缓存 10 实例, 缓存 1M
        ResourcePoolsBuilder.heap(10).disk(1, MemoryUnit.MB, true)
    )
    val cacheManager = CacheManagerBuilder.newCacheManagerBuilder()
        .with(CacheManagerBuilder.persistence(path + File.separatorChar + "wechat"))
        .withCache("wechat", cacheConfig)
        .build(true) // build with init

    // 程序退出时关闭 cacheManager
    Runtime.getRuntime().addShutdownHook(Thread { cacheManager.close() })

    cache = cacheManager.getCache("wechat", String::class.java, Serializable::class.java)
  }

  operator fun get(k: String): Serializable? = cache[k]
  operator fun set(k: String, v: Serializable?) = if (v != null) cache.put(k, v) else cache.remove(k)
}
```

2. xml 配置
