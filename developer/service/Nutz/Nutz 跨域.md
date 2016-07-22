# 使用 Nutz 是如何允许跨域访问

[nutz如何设置允许跨域？](http://www.nutz.cn/yvr/t/0k5q26ctccgr5oqqlphn5lqhu3)

- @Filters
- Processor
- nginx重写一下header

## @Filters + CrossOrginFilter 解决跨域问题

定义 Filter 继承 CrossOriginFilter

```java
import org.nutz.mvc.ActionContext;
import org.nutz.mvc.View;
import org.nutz.mvc.filter.CrossOriginFilter;

import javax.servlet.http.HttpServletResponse;

public class OriginFilter extends CrossOriginFilter
{
  @Override
  public View match(ActionContext ac)
  {
    HttpServletResponse resp = ac.getResponse();
    resp.addHeader("Access-Control-Allow-Origin", "*");
    return super.match(ac);
  }
}
```
主模块中使用Filter

```java
@Modules(packages = "name.zeno.zervice.action", scanPackage = true)
@Filters(@By(type = OriginFilter.class))
@SetupBy(ZerviceSetup.class)
public class MainModule
{
}
```