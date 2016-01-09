- [Android开发 获取当前activity的屏幕截图](http://my.oschina.net/neil173352/blog/308353?fromerr=SA23YZaE)

```java
public Bitmap myShot(Activity activity) {
    // 获取windows中最顶层的view
    View view = activity.getWindow().getDecorView();
    view.buildDrawingCache();
 
    // 获取状态栏高度
    Rect rect = new Rect();
    view.getWindowVisibleDisplayFrame(rect);
    int statusBarHeights = rect.top;
    Display display = activity.getWindowManager().getDefaultDisplay();
 
    // 获取屏幕宽和高
    int widths = display.getWidth();
    int heights = display.getHeight();
 
    // 允许当前窗口保存缓存信息
    view.setDrawingCacheEnabled(true);
 
    // 去掉状态栏
    Bitmap bmp = Bitmap.createBitmap(view.getDrawingCache(), 0,statusBarHeights, widths, heights - statusBarHeights);
 
    // 销毁缓存信息
    view.destroyDrawingCache();
 
    return bmp;
}
```