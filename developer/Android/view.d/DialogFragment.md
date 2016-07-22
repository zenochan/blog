- [DialogFragment详解](http://blog.csdn.net/huangyabin001/article/details/30053835)
- [如何设置DialogFragment的宽度和高度？](http://codego.net/504860/)

```java
@Override
public void onCreate(Bundle savedInstanceState)
{
    super.onCreate(savedInstanceState);
    setStyle(STYLE_NO_TITLE, 0);
    //全屏
    //setStyle(STYLE_NORMAL, android.R.style.Theme_Black_NoTitleBar);
    //setStyle(DialogFragment.STYLE_NORMAL, android.R.style.Theme_Black_NoTitleBar_Fullscreen);
}
```


- 设置大小

```java
@Override
public void onResume()
{
    super.onResume();
    //<dimen name="remind_dialog_width">250dp</dimen>
    int width = getResources().getDimensionPixelSize(R.dimen.remind_dialog_width);
    getDialog().getWindow().setLayout(width, ViewGroup.LayoutParams.WRAP_CONTENT);
    hintTv.setText(hint);
}
```


- 点击空白处消失

```java
@Override
public void onResume()
{
    super.onResume();
    getDialog().setCanceledOnTouchOutside(true);
}
```

- 设置背景

```java
getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
getDialog().getWindow().setBackgroundDrawableResource(R.color.transparent);
```

### [DialogFragment 进入退出动画](http://codego.net/525155/)

---

res/anim/dialog_in.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<translate xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="200"
    android:fromYDelta="-100%"
    android:toYDelta="0" />
```

res/anim/dialog_out.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<translate xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="200"
    android:fromYDelta="0"
    android:toYDelta="-100%" />
```

styles.xml

```xml
    <style name="DialogFragment" parent="@android:style/Theme.Translucent.NoTitleBar">
        <item name="android:windowAnimationStyle">@style/WindowsAnimation</item>
    </style>
    <style name="WindowsAnimation">
        <item name="android:windowEnterAnimation">@anim/dialog_in</item>
        <item name="android:windowExitAnimation">@anim/dialog_out</item>
    </style>
```

在 DialogFragment 中使用

```java
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setStyle(DialogFragment.STYLE_NO_TITLE, R.style.DialogFragment);
    }
```

kkjjkjkljk