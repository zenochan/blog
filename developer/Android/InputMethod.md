# InputMethod #

### 隐藏输入法

```java
public void hideInputMethod(Context context, View view)
{
    InputMethodManager imm = 
    	(InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
    imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
}
```
### 显示输入法

```java
/**
 * @param view 接受软键盘输入的视图
 */
public void showInputMethod(Context context, View view)
{
    InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
    imm.showSoftInput(view, InputMethodManager.SHOW_FORCED);
}
```

### 响应输入法的操作按钮
- 设置 imeOptions

```java
//in xml
android:imeOptions="actionDone"
//in java code
passwordEt.setImeOptions(EditorInfo.IME_ACTION_SEARCH);
```

- 响应 imeOptions

```java
passwordEt.setOnEditorActionListener(new TextView.OnEditorActionListener() {
    @Override
    public boolean onEditorAction(TextView v, int actionId, KeyEvent event)
    {
        switch (actionId)
        {
            case EditorInfo.IME_ACTION_SEARCH:
                //TODO: search
                return true;
            //...
            default:
                return false;
         }
    }
});
```

### [设施页脚是否被输入法顶起](http://www.educity.cn/wenda/179416.html)

- SoftInputModes

```
{@link WindowManager.LayoutParam}
SOFT_INPUT_ADJUST_NOTHING:      不调整(输入法完全直接覆盖住,未开放此参数)
SOFT_INPUT_ADJUST_PAN:          把整个Layout顶上去露出获得焦点的EditText,不压缩多余空间
SOFT_INPUT_ADJUST_RESIZE:       整个Layout重新编排,重新分配多余空间
SOFT_INPUT_ADJUST_UNSPECIFIED:  系统自己根据内容自行选择上两种方式的一种执行(默认配置)
```
- 在 AndroidManifest.xml 中设置

```xml
<activity
    android:name=".ui.activity.MainActivity"
    android:launchMode="singleTask"
    android:screenOrientation="portrait"
    android:windowSoftInputMode="adjustUnspecified"
    >
    <!--android:windowSoftInputMode="adjustPan"-->
    <!--android:windowSoftInputMode="adjustResize"-->
</activity>
```

- 在 Activity 中设置

```java
@Override
protected void onCreate(Bundle savedInstanceState)
{
    super.onCreate(savedInstanceState);
    //getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
}
```

- [Android SoftInputMode为SOFT_INPUT_ADJUST_RESIZE（adjustResize）时没有resize动画的问题](http://blog.csdn.net/yellowcath/article/details/45893333)

```java
//{@link PhoneWindow}
@Override
public void setBackgroundDrawable(Drawable d) {
    super.setBackgroundDrawable(d);
    if (getWindowToken() != null) {
        updateWindowResizeState();
    }
}

void updateWindowResizeState() {
    Drawable bg = getBackground();
    hackTurnOffWindowResizeAnim(bg == null || bg.getOpacity() != PixelFormat.OPAQUE);
}
```
也就是如果window的backgroundDrawable为null或者不透明时，windowResize时就不会有动画效果。