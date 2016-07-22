# 正则表达式

## 手机号

```java
//(^1(3[0-9]|4[57]|5[0-35-9]|8[0-9])\d{8}$)|(^170[059]\d{7}$) provide by 赵阳阳@2015年08月21日
//(^1(3|4|5|7|8)[0-9]\d{8}$)@2015-08-22 
private static final Pattern PHONE_PATTERN = Pattern.compile("(^1(3|4|5|7|8)[0-9]\d{8}$)");
public static boolean validPhone(String phone)
{
    if (phone == null || phone.trim().isEmpty())
    {
            return false;
    }
    return PHONE_PATTERN.matcher(phone).matches();
}
```

## Email

`^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$`

## 用户名

`^[\\u4e00-\\u9fa5a-zA-Z0-9_-]{3,16}$`