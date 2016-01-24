[jgilfelt/SystemBarTint](https://github.com/jgilfelt/SystemBarTint 'GitHub')

1.设置主题 values-v19

```xml
<!-- translucent system bars -->
<item name="android:windowTranslucentStatus">true</item>
<item name="android:windowTranslucentNavigation">true</item>
<item name="android:fitsSystemWindows">true</item>
<item name="android:clipToPadding">true</item>
```

2.设置颜色和设置padding

```java
private void initSystemBar() {
	if (Build.VERSION.SDK_INT == Build.VERSION_CODES.KITKAT) {
    	//在 theme 中配置
    	//setTranslucentStatus(true);
    	SystemBarTintManager tintManager = new SystemBarTintManager(this);
    	tintManager.setStatusBarTintEnabled(true);
    	tintManager.setStatusBarTintResource(R.color.actionbar_bg);
    	//
    	//SystemBarConfig config = tintManager.getConfig();
    	//listViewDrawer.setPadding(0, config.getPixelInsetTop(true), 0, config.getPixelInsetBottom());
	}
}
```
